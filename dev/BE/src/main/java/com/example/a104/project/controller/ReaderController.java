package com.example.a104.project.controller;

import com.example.a104.project.entity.ReaderVo;
import com.example.a104.project.service.AdminService;
import com.example.a104.project.service.ReaderService;
import com.example.a104.project.util.JwtTokenProvider;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/readers")
@RestController
public class ReaderController {
    private final ReaderService readerService;
    private final AdminService adminService;
    @GetMapping
    public List<ReaderVo> getReaderList(@RequestHeader(value = "Authorization")String token){
        Claims claims = JwtTokenProvider.parseJwtToken(token);
        int gymCode = adminService.getGymCode((String) claims.get("sub"));
        return readerService.getReaderList(gymCode);
    }

    @PutMapping
    public String updateReader(@RequestBody List<ReaderVo> readers){
        readerService.updateReader(readers);
        return "update";
    }
}
