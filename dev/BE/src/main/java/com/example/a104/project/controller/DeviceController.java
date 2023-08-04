package com.example.a104.project.controller;

import com.example.a104.project.entity.DeviceVo;
import com.example.a104.project.entity.UserVo;
import com.example.a104.project.service.AdminService;
import com.example.a104.project.service.DeviceService;
import com.example.a104.project.service.UserService;
import com.example.a104.project.util.JwtTokenProvider;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/devices")
@RestController
public class DeviceController {
    private final AdminService adminService;
    private final DeviceService deviceService;
    private final UserService userService;

    @GetMapping
    public List<DeviceVo> DeviceList(@RequestHeader(value = "Authorization") String token) {
        Claims claims = JwtTokenProvider.parseJwtToken(token);
        int gymCode = adminService.getGymCode((String) claims.get("sub"));
        List<DeviceVo> list = deviceService.DeviceList(gymCode);
        return list;
    }

    @GetMapping("offer-present")
    public List<UserVo> UserDevice(@RequestHeader(value = "Authorization") String token) {
        Claims claims = JwtTokenProvider.parseJwtToken(token);
        int gymCode = adminService.getGymCode((String) claims.get("sub"));
        return deviceService.UserDevice(gymCode);

    }

    // 디바이스 삭제
    @PutMapping
    public void DeleteDeviceCode(@RequestBody Map<String, String> map) {
        String deviceCode = map.get("device_code");
        String id = map.get("id");
        deviceService.DeleteDevice(deviceCode);
        userService.DeleteDevice(id);

    }

    // 디바이스 매칭
    @PutMapping("match")
    public void MatchDevice(@RequestBody Map<String, String> map) {
        String deviceCode = map.get("device_code");
        String id = map.get("id");
        deviceService.MatchDevice(deviceCode);
        userService.MatchDevice(deviceCode, id);
    }

}
