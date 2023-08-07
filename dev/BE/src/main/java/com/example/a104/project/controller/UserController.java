package com.example.a104.project.controller;

import com.example.a104.project.dto.SearchDataDto;
import com.example.a104.project.dto.TagInfoDto;
import com.example.a104.project.entity.*;
import com.example.a104.project.repository.*;
import com.example.a104.project.service.ReaderService;
import com.example.a104.project.service.UserDateService;
import com.example.a104.project.service.UserService;
import com.example.a104.project.util.JwtTokenProvider;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
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

@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/user")
@RestController
public class UserController {
    private final UserService userService;
    private final UserDateService userDateService;
    private final AdminRepository adminRepository;
    private final ReaderService readerService;
    private final CountRepository countRepository;
    private final ReaderRepository readerRepository;
    private final ReservationRepository reservationRepository;
    private final WaitRepository waitRepository;
    // 헬스장에 매칭된 리더기 보여주기
    @GetMapping("readers")
    public List<ReaderEntity> MatchReaders(@RequestHeader(value = "Authorization") String token){
        Claims claims = JwtTokenProvider.parseJwtToken(token);
        String id = (String) claims.get("sub");
        UserEntity user = userService.getUserInfo(id);
        int gymCode = user.getGymCode();
        return readerService.getMatchReaders(gymCode);

    }

    // 기구랑 시간 선택 후 클릭하면 기구와 해당 날짜 카운트 + 1 AND 현재 선택 기구의 대기인원과 1주일 2주일 3주일전 대기인원 반환
    @GetMapping("search")
    public SearchDataDto searchDataDto(@RequestHeader(value = "Authorization") String token, @RequestParam String date, String reader){
        SearchDataDto searchDataDto = new SearchDataDto();
        Claims claims = JwtTokenProvider.parseJwtToken(token);
        String id = (String) claims.get("sub");
        UserEntity user = userService.getUserInfo(id);
        int gymCode = user.getGymCode();
        String name = readerRepository.findByReader(reader).getName();

        List<CountEntity> countVo = countRepository.findBySearchAndName(LocalDate.now(),name);
        // 검색 시 카운트 +1 하는 부분
        // db 에 정보가 없는 경우
        if(countVo.size()==0){
            CountEntity countVo1 = CountEntity.builder()
                    .count(1)
                    .search(LocalDate.now())
                    .name(name)
                    .gymCode(gymCode)
                    .build();
            countRepository.save(countVo1);
        }
        else{
            countRepository.Count(LocalDate.now(),name);
        }
        // 검색 시 카운트 +1 하는 부분 끝

        // 현재 기구의 대기인원과 1주일 2주일 3주일 전 대기 인원 반환
        List<ReservationEntity> reservationVoList = reservationRepository.findByReaderOrderByReservationAsc(reader);
        searchDataDto.setNow(reservationVoList.size());
        String datetime = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd "))+date;

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        LocalDateTime date2 = LocalDateTime.parse(datetime,formatter);

        String week1  = date2.minusDays(7).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
        String week2  = date2.minusDays(14).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
        String week3  = date2.minusDays(21).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));

        searchDataDto.setWeek(waitRepository.getWeek(week1,reader));
        searchDataDto.setWeek2(waitRepository.getWeek(week2,reader));
        searchDataDto.setWeek3(waitRepository.getWeek(week3,reader));
        return searchDataDto;
    }


    @GetMapping("using-gym")
    public int countUsers(@RequestHeader(value = "Authorization") String token){
        Claims claims = JwtTokenProvider.parseJwtToken(token);
        String id = (String) claims.get("sub");
        int gymCode = userService.getUserInfo(id).getGymCode();
        int count = userService.countUsers(gymCode);
        return count;

    }

    @GetMapping("regist")
    public UserEntity userInfo(@RequestHeader(value = "Authorization") String token){
        Claims claims = JwtTokenProvider.parseJwtToken(token);
        String id = (String) claims.get("sub");
        return userService.getUserInfo(id);
    }

    @GetMapping("records")
    public List<TagInfoDto> userDate(@RequestHeader(value = "Authorization") String token, @RequestParam String date){
        Claims claims = JwtTokenProvider.parseJwtToken(token);
        String id = (String) claims.get("sub");
        int userId = userDateService.createUserId(id);
        List<TagInfoEntity> list = userService.getUserDate(date,userId);
        userService.getTagInfo(list);
        return  userService.getTagInfo(list);
    }
    // 헬스장 등록
    @Transactional
    @PutMapping("regist-gym")
    public Map<String, String> RegistGym(@RequestHeader(value = "Authorization") String token,
            @RequestBody Map<String, String> map) {
        Claims claims = JwtTokenProvider.parseJwtToken(token);
        String id = (String) claims.get("sub");
        userService.UpdateGymCode(Integer.valueOf(map.get("gym_code")), id);
        int userId = userDateService.createUserId(id);
        userDateService.accessUser(userId);
        Map<String, String> returnMsg = new HashMap<>();
        returnMsg.put("msg", "헬스장등록완료");
        return returnMsg;

    }

    // 중복체크
    @GetMapping("check")
    @ResponseBody
    public Map<String, String> DuplicateCheck(@RequestParam String id) {
        Map<String, String> map = new HashMap<>();
        if (userService.checkId(id)) {
            map.put("msg", "이미 있는 아이디");
        } else {
            map.put("msg", "사용가능");

        }

        return map;

    }

    // 로그인
    @PostMapping("login")
    public TokenResponse login(@RequestBody Map<String, String> map) {
        List<UserEntity> user = userService.login(map.get("id"));
        TokenDataResponse tokenDataResponse;
        TokenResponse tokenResponse;
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
                return tokenResponse;

                }

        } catch (Exception exception) {
            System.out.println(exception.getMessage());
        }
        tokenResponse = new TokenResponse("200", "FAIL", "FAIL");
        return tokenResponse;

        }



    @PostMapping("signup")
    public ResponseEntity<UserEntity> singUp(@RequestBody Map<String, String> map) {
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
        return new ResponseEntity<>(savedUser, HttpStatus.OK);
    }
}
