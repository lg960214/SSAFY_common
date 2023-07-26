package com.example.a104.project.controller;

import com.example.a104.project.entity.DeviceVo;
import com.example.a104.project.service.AdminService;
import com.example.a104.project.service.DeviceService;
import com.example.a104.project.util.JwtTokenProvider;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/devices")
@RestController
public class DeviceController {
    private final AdminService adminService;
    private final DeviceService deviceService;
    @GetMapping
    public List<DeviceVo> DeviceList(@RequestHeader(value = "Authorization") String token){
        Claims claims = JwtTokenProvider.parseJwtToken(token);
        int gymCode = adminService.getGymCode((String) claims.get("sub"));
        List<DeviceVo> list = deviceService.DeviceList(gymCode);
        return list;
    }



}
