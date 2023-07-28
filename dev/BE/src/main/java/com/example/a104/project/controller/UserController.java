package com.example.a104.project.controller;

import com.example.a104.project.entity.TokenDataResponse;
import com.example.a104.project.entity.TokenResponse;
import com.example.a104.project.entity.UserDateVo;
import com.example.a104.project.entity.UserVo;
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
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/user")
@RestController
public class UserController {
    private final UserService userService;
    private final UserDateService userDateService;


    // 헬스장 등록
    @Transactional
    @PutMapping("regist-gym")
    public Map<String,String> RegistGym(@RequestHeader(value = "Authorization") String token,@RequestBody Map<String,String> map){
        Claims claims = JwtTokenProvider.parseJwtToken(token);
        String id = (String) claims.get("sub");
        System.out.println(id);
        int a = userService.UpdateGymCode(Integer.valueOf(map.get("gym_code")),id);
        int userId = userDateService.createUserId(id);
        userDateService.accessUser(userId);
        Map<String,String> returnMsg = new HashMap<>();
        returnMsg.put("msg","헬스장등록완료");
        return returnMsg;

    }

    // 중복체크
    @GetMapping("check")
    @ResponseBody
    public Map<String,String> DuplicateCheck(@RequestParam String id){
        System.out.println(id);
        Map<String,String> map = new HashMap<>();
        if(userService.checkId(id)){
            map.put("msg","이미 있는 아이디");
        }
        else{
            map.put("msg","사용가능");

        }

        return map;

     }

     // 로그인
     @PostMapping("login")
     public TokenResponse login(@RequestBody Map<String,String> map) {
         List<UserVo> user = userService.login(map.get("id"));
         System.out.println(user);
         TokenDataResponse tokenDataResponse;
         TokenResponse tokenResponse;
        try{
            if (user.size()!=0 && BCrypt.checkpw(map.get("password"),user.get(0).getPassword())){
                String token = JwtTokenProvider.createToken(user.get(0).getId()); // 토큰 생성
                Claims claims = JwtTokenProvider.parseJwtToken("Bearer " + token); // 토큰 검증
                tokenDataResponse = new TokenDataResponse(token, claims.getSubject(),user.get(0).getName(), claims.getIssuedAt().toString(), claims.getExpiration().toString());
                tokenResponse = new TokenResponse("200", "OK", tokenDataResponse);
                return tokenResponse;

            }

        }
        catch (Exception exception){


        }
         tokenResponse = new TokenResponse("200", "FAIL", "FAIL");
         return tokenResponse;



     }

    @PostMapping("signup")
    public ResponseEntity<UserVo> singUp(@RequestBody Map<String,String> map){
        System.out.println(map);
        UserVo user = UserVo.builder()
                .id(map.get("id"))
                .password(BCrypt.hashpw(map.get("password"),BCrypt.gensalt()))
                .email(map.get("email"))
                .phoneNumber(map.get("phone_number"))
                .sex(map.get("sex"))
                .name(map.get("name"))


                .build();
        System.out.println(user);
        UserVo savedUser = userService.createUser(user);

        System.out.println("Controller :"+map.get("id"));
        int userId = userDateService.createUserId(map.get("id"));
        System.out.println("userID: "+userId);
        UserDateVo userDate = UserDateVo.builder()
                .userId(userId)
                .signin(LocalDateTime.now())
                .build();
        System.out.println(userDate);
        userDateService.createUserDate(userDate);
        return new ResponseEntity<>(savedUser, HttpStatus.OK);
    }
}
