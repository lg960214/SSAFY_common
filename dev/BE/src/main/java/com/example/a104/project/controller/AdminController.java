package com.example.a104.project.controller;

import com.example.a104.project.entity.AdminVo;
import com.example.a104.project.entity.TokenDataResponse;
import com.example.a104.project.entity.TokenResponse;
import com.example.a104.project.entity.UserVo;
import com.example.a104.project.service.AdminService;
import com.example.a104.project.service.UserDateService;
import com.example.a104.project.service.UserService;
import com.example.a104.project.util.JwtTokenProvider;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/admin")
@RestController
public class AdminController {
    private final AdminService adminService;
    private final UserDateService userDateService;
    private final UserService userService;

    // 헬스장 회원 검색(이름으로 검색)
    @GetMapping("search")
    public List<UserVo> search(@RequestHeader(value = "Authorization") String token, @RequestParam String keyword) {
        Claims claims = JwtTokenProvider.parseJwtToken(token);
        int gymCode = adminService.getGymCode((String) claims.get("sub"));
        List<UserVo> users = adminService.search(keyword, gymCode);
        System.out.println(users);
        return users;
    }

    // 헬스장 회원 삭제
    @Transactional
    @PutMapping("users")
    public String delete(@RequestBody Map<String, String> map) {
        // 회원의 gymCode 와 regist 모두 null 로 초기화
        userService.DeleteUser(map.get("id"));
        // 회원의 탈퇴 날짜 저장
        int userId = userDateService.createUserId(map.get("id"));
        userDateService.dropout(userId);
        return "Delete Success";
    }

    // 헬스장 등록 회원 승인
    @Modifying
    @Transactional
    @PutMapping("approval")
    public String approval(@RequestHeader(value = "Authorization") String token, @RequestBody Map<String, String> map) {
        Claims claims = JwtTokenProvider.parseJwtToken(token);
        int gymCode = adminService.getGymCode((String) claims.get("sub"));
        String id = map.get("id");
        adminService.approval(1, id);

        // 승인 후 승인 날짜 저장
        int userId = userDateService.createUserId(id);
        userDateService.accessAdmin(userId);
        return "Success";
    }

    // 헬스장 등록은 했지만 승인되지 않은 사용자 목록
    @GetMapping("unauthorized-users")
    public List<UserVo> unautorizedUsers(@RequestHeader(value = "Authorization") String token) {
        Claims claims = JwtTokenProvider.parseJwtToken(token);
        int gymCode = adminService.getGymCode((String) claims.get("sub"));
        List<UserVo> users = adminService.unauthorizedUser(gymCode);
        return users;
    }

    // 헬스장 등록 후 승인 완료된 사용자 목록록
    @GetMapping("users")
    public List<UserVo> userList(@RequestHeader(value = "Authorization") String token) {
        Claims claims = JwtTokenProvider.parseJwtToken(token);
        int gymCode = adminService.getGymCode((String) claims.get("sub"));
        System.out.println(gymCode);
        List<UserVo> userList = adminService.userList(gymCode);
        System.out.println(claims);
        return userList;
    }

    @PostMapping("login")
    public TokenResponse login(@RequestBody Map<String, String> map) {
        List<AdminVo> admin = adminService.login(map.get("id"));

        TokenDataResponse tokenDataResponse;
        TokenResponse tokenResponse;
        try {
            if (admin.size() != 0 && admin.get(0).getPassword().equals(map.get("password"))) {
                String token = JwtTokenProvider.createToken(admin.get(0).getId()); // 토큰 생성
                Claims claims = JwtTokenProvider.parseJwtToken("Bearer " + token); // 토큰 검증
                tokenDataResponse = new TokenDataResponse(token, claims.getSubject(), admin.get(0).getName(),
                        claims.getIssuedAt().toString(), claims.getExpiration().toString());
                tokenResponse = new TokenResponse("200", "OK", tokenDataResponse);

                return tokenResponse;
            }
        } catch (Exception siginError) {

        }

        tokenResponse = new TokenResponse("200", "FAIL", "FAIL");
        return tokenResponse;
    }
    // if(admin.size()!=0 && admin.get(0).getPassword().equals(map.get("password"))
    // ){
    // returnMsg.put("msg","로그인 성공");
    // }
    // else{
    // returnMsg.put("msg","로그인 실패");
    // }
    // return returnMsg;

    @PostMapping("create")
    public ResponseEntity<AdminVo> createAdmin(@RequestBody Map<String, Object> map) {
        AdminVo admin = AdminVo.builder()
                .gymCode((int) map.get("code"))
                .id((String) map.get("id"))
                .name((String) map.get("name"))
                .password((String) map.get("password"))
                .build();
        AdminVo savedAdmin = adminService.createAdmin(admin);
        return new ResponseEntity<>(savedAdmin, HttpStatus.OK);
    }

}
