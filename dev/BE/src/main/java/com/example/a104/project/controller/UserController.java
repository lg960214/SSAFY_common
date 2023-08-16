package com.example.a104.project.controller;

import com.example.a104.project.dto.MonthRanking;
import com.example.a104.project.dto.SearchDataDto;
import com.example.a104.project.dto.TagInfoDto;
import com.example.a104.project.entity.*;
import com.example.a104.project.repository.AdminRepository;
import com.example.a104.project.service.*;
import com.example.a104.project.util.JwtTokenProvider;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Tag(name="이용자페이지 API", description = "이용자 페이지에서 사용되는 API 입니다.")
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/user")
@RestController
@Slf4j
public class UserController {
    private final UserService userService;
    private final UserDateService userDateService;
    private final AdminRepository adminRepository;
    private final ReaderService readerService;
    private final ReservationService reservationService;
    private final CountService countService;
    private final WaitService waitService;

    // 헬스장에 매칭된 리더기 보여주기
    @Operation(summary = "기구와 매칭된 리더기 목록",description = "헬스장에 기구와 리더기가 매칭된 리더기 목록을 반환합니다..")
    @Parameter(name="Authorization", description = "유저의 정보를 담은 JWT")
    @GetMapping("readers")
    public ResponseEntity<List<ReaderEntity>> MatchReaders(@RequestHeader(value = "Authorization") String token){
        try{
            Claims claims = JwtTokenProvider.parseJwtToken(token);
            String id = (String) claims.get("sub");
            UserEntity user = userService.getUserInfo(id);
            int gymCode = user.getGymCode();
            log.info("Method : MatchReaders, gymCode : {} , get MatchedReaders",gymCode);
            return ResponseEntity.ok(readerService.getMatchReaders(gymCode));
        }
        catch(JwtException e){
            log.info("Method: MatchReaders, JWT is invalid");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        catch (Exception e2){
            log.info("Method: MatchReaders, Exception");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }


    }

    // 기구랑 시간 선택 후 클릭하면 기구와 해당 날짜 카운트 + 1 AND 현재 선택 기구의 대기인원과 1주일 2주일 3주일전 대기인원 반환
    @Operation(summary = "선택 기구의 현재 대기인원과 1,2,3 주전 대기인원",description = "사용자가 기구와 시간을 선택하면 현재 기구의 대기인원과 1,2,3주일 전의 그 시간에 대기인원을 반환.")
    @Parameters({
            @Parameter(name="Authorization", description = "유저의 정보를 담은 JWT"),
            @Parameter(name="date", description = "HH:mm 형식의 시간, 분 데이터 (타입은 문자열)"),
            @Parameter(name="reader", description = "리더기 번호")
    })
    @GetMapping("search")
    public ResponseEntity<SearchDataDto> searchDataDto(@RequestHeader(value = "Authorization") String token, @RequestParam String date, String reader){
        SearchDataDto searchDataDto = new SearchDataDto();
        try{
            Claims claims = JwtTokenProvider.parseJwtToken(token);
            String id = (String) claims.get("sub");
            UserEntity user = userService.getUserInfo(id);
            int gymCode = user.getGymCode();
            String name = readerService.getReader(reader).getName();
            log.info("Method : searchDataDto, gymCode : {} , date : {}, reader : {}, name : {}",gymCode, date, reader, name);
            List<CountEntity> countVo = countService.CountList(LocalDate.now(ZoneId.of("Asia/Seoul")),name);
            // 검색 시 카운트 +1 하는 부분
            // db 에 정보가 없는 경우
            if(countVo.size()==0){
                log.info("{} is already exist in DB",name);
                CountEntity countVo1 = CountEntity.builder()
                        .count(1)
                        .search(LocalDate.now(ZoneId.of("Asia/Seoul")))
                        .name(name)
                        .gymCode(gymCode)
                        .build();
                countService.save(countVo1);
            }
            else{
                log.info("{} is not exist in DB",name);
                countService.Count(LocalDate.now(ZoneId.of("Asia/Seoul")),name);
            }
            // 검색 시 카운트 +1 하는 부분 끝

            // 현재 기구의 대기인원과 1주일 2주일 3주일 전 대기 인원 반환
            List<ReservationEntity> reservationVoList = reservationService.getReservationList(reader);
            searchDataDto.setNow(reservationVoList.size());
            String datetime = LocalDate.now(ZoneId.of("Asia/Seoul")).format(DateTimeFormatter.ofPattern("yyyy-MM-dd "))+date;

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
            LocalDateTime date2 = LocalDateTime.parse(datetime,formatter);

            String week1  = date2.minusDays(7).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
            String week2  = date2.minusDays(14).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
            String week3  = date2.minusDays(21).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));

            searchDataDto.setWeek(waitService.getWeek(week1,reader));
            searchDataDto.setWeek2(waitService.getWeek(week2,reader));
            searchDataDto.setWeek3(waitService.getWeek(week3,reader));
            return ResponseEntity.ok(searchDataDto);
        }
        catch(JwtException e){
            log.info("Method: searchDataDto, JWT is invalid");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        catch (Exception e2){
            log.info("Method: searchDataDto, Exception");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }


    @Operation(summary = "현재 헬스장 이용자 수",description = "현재 헬스장을 이용하는 사람들의 숫자를 반환합니다.")
    @Parameter(name="Authorization", description = "유저의 정보를 담은 JWT")
    @GetMapping("using-gym")
    public ResponseEntity<Integer> countUsers(@RequestHeader(value = "Authorization") String token){
        try{
            Claims claims = JwtTokenProvider.parseJwtToken(token);
            String id = (String) claims.get("sub");
            int gymCode = userService.getUserInfo(id).getGymCode();
            int count = userService.countUsers(gymCode);
            log.info("Method : countUsers, count : {}",count);
            return ResponseEntity.ok(count);
        }
        catch(JwtException e){
            log.info("Method: countUsers, JWT is invalid");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        catch (Exception e2){
            log.info("Method: countUsers, Exception");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }


    }

    @Operation(summary = "현재 헬스장을 등록했는지 여부",description = "회원가입을 하고 헬스장에 등록을 했는지 안했는지 파악하기 위해 유저정보 반환.")
    @Parameter(name="Authorization", description = "유저의 정보를 담은 JWT")
    @GetMapping("regist")
    public ResponseEntity<UserEntity> userInfo(@RequestHeader(value = "Authorization") String token){
        try{
            Claims claims = JwtTokenProvider.parseJwtToken(token);
            String id = (String) claims.get("sub");
            log.info("Method : userInfo, id : {}", id);
            return ResponseEntity.ok(userService.getUserInfo(id));
        }
        catch(JwtException e){
            log.info("Method: userInfo, JWT is invalid");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        catch (Exception e2){
            log.info("Method: userInfo, Exception");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }


    }

    @Operation(summary = "사용자의 운동 기록",description = "해당 년,월에 사용자의 운동기록에 대한 데이터를 반환합니다.")
    @Parameters({
            @Parameter(name="Authorization", description = "유저의 정보를 담은 JWT"),
            @Parameter(name="date", description = "YY-MM 형식의 년, 월 데이터 (타입은 문자열)"),

    })
    @GetMapping("records")
    public ResponseEntity<List<TagInfoDto>> userDate(@RequestHeader(value = "Authorization") String token, @RequestParam String date){
        try{
            Claims claims = JwtTokenProvider.parseJwtToken(token);
            String id = (String) claims.get("sub");
            int userId = userDateService.createUserId(id);
            List<TagInfoEntity> list = userService.getUserDate(date,userId);
            List<TagInfoDto> userRecord = userService.getTagInfo(list);
            log.info("Method : userDate, User Exercise Record : {}", userRecord);
            return ResponseEntity.ok(userRecord);
        }
        catch(JwtException e){
            log.info("Method: userDate, JWT is invalid");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        catch (Exception e2){
            log.info("Method: userDate, Exception");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }


    }
    // 헬스장 등록
    @Operation(summary = "헬스장 등록",description = "사용자가 헬스장코드를 입력 하여 등록합니다.")
    @Transactional
    @PutMapping("regist-gym")
    public ResponseEntity<Map<String, String>> RegistGym(@RequestHeader(value = "Authorization") String token,
            @RequestBody Map<String, String> map) {
        try{
            Claims claims = JwtTokenProvider.parseJwtToken(token);
            String id = (String) claims.get("sub");
            Map<String, String> returnMsg = new HashMap<>();
            int check = userService.UpdateGymCode(Integer.valueOf(map.get("gym_code")), id);
            log.info("check: "+check);
            if (check != 0){
                int userId = userDateService.createUserId(id);
                userDateService.accessUser(userId);
                returnMsg.put("msg", "헬스장등록완료");
                log.info("Method : RegistGym, RegistGym and gymCode : {} => Regist Success", map.get("gym_code"));
            }
            else{
                returnMsg.put("msg","존재하지 않는 헬스장입니다.");
                log.info("Method : RegistGym, RegistGym and gymCode : {} => Regist Fail", map.get("gym_code"));
            }


            return ResponseEntity.ok(returnMsg);
        }
        catch(JwtException e){
            log.info("Method: RegistGym, JWT is invalid");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        catch (Exception e2){
            log.info("Method: RegistGym, Exception");
            log.error(e2.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }

    // 중복체크
    @Operation(summary = "아이디 중복체크",description = "아이디가 중복인지 아닌지 반환해줍니다..")
    @Parameter(name="id", description = "사용자가 작성한 아이디")
    @GetMapping("check")
    @ResponseBody
    public Map<String, String> DuplicateCheck(@RequestParam String id) {
        Map<String, String> map = new HashMap<>();
        if (userService.checkId(id)) {
            map.put("msg", "이미 있는 아이디");
            log.info("Method: DuplicateCheck, ID Duplicate check => imPossible");
        } else {
            map.put("msg", "사용가능");
            log.info("Method: DuplicateCheck, ID Duplicate check => Possible");

        }

        return map;

    }

    // 로그인
    @Operation(summary = "사용자 로그인",description = "아이디와 비밀번호를 입력받아 로그인.")
    @PostMapping("login")
    public TokenResponse login(@RequestBody Map<String, String> map) {
        List<UserEntity> user = userService.login(map.get("id"));
        TokenDataResponse tokenDataResponse;
        TokenResponse tokenResponse;
        log.info("Method : login, login request user id : {}",map.get("id"));
        try {
            if (user.size() != 0 && BCrypt.checkpw(map.get("password"), user.get(0).getPassword())) {
                String token = JwtTokenProvider.createToken(user.get(0).getId()); // 토큰 생성
                Claims claims = JwtTokenProvider.parseJwtToken("Bearer " + token); // 토큰 검증
                String gymName;
                try {
                    gymName = adminRepository.findByGymCode(user.get(0).getGymCode()).getName();
                }
                catch (Exception e){
                    gymName = null;
                }
                tokenDataResponse = new TokenDataResponse(token, claims.getSubject(), user.get(0).getName(), user.get(0).getRegist(), gymName,
                        claims.getIssuedAt().toString(), claims.getExpiration().toString());
                tokenResponse = new TokenResponse("200", "OK", tokenDataResponse);
                log.info("{} login success",map.get("id"));
                return tokenResponse;

                }

        } catch (Exception exception) {
            log.error(exception.getMessage());
        }
        tokenResponse = new TokenResponse("200", "FAIL", "FAIL");
        return tokenResponse;

        }

    @GetMapping("rank")
    public ResponseEntity<List<MonthRanking>> rank(@RequestHeader(value = "Authorization") String token, String date){
        try{
            Claims claims = JwtTokenProvider.parseJwtToken(token);
            String id = (String) claims.get("sub");
            int gymCode = userService.getUserInfo(id).getGymCode();
            List<UserEntity> userEntityList = userService.getGymUsers(gymCode);
            String [] dateArr = date.split("-");
            int month = Integer.valueOf(dateArr[1]);
            int year = Integer.valueOf(dateArr[0]);
            List<MonthRanking> monthRankingList = userService.getMonthRanking(year,month, gymCode);
            log.info("Method : rank, {} ranking : {}",date,monthRankingList);
            return ResponseEntity.ok(monthRankingList);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }




    }

    @PostMapping("signup")
    public ResponseEntity<UserEntity> signUp(@RequestBody Map<String, String> map) {
        UserEntity user = UserEntity.builder()
                .id(map.get("id"))
                .password(BCrypt.hashpw(map.get("password"), BCrypt.gensalt()))
                .email(map.get("email"))
                .phoneNumber(map.get("phone_number"))
                .sex(map.get("sex"))
                .name(map.get("name"))

                .build();
        UserEntity savedUser = userService.createUser(user);

        int userId = userDateService.createUserId(map.get("id"));
        UserDateEntity userDate = UserDateEntity.builder()
                .userId(userId)
                .signin(LocalDateTime.now(ZoneId.of("Asia/Seoul")))
                .build();
        userDateService.createUserDate(userDate);
        log.info("Method : signUp, signUp User : {}",user);
        return new ResponseEntity<>(savedUser, HttpStatus.OK);
    }
}
