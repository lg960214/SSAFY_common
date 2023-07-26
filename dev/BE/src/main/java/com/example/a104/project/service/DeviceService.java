package com.example.a104.project.service;


import com.example.a104.project.entity.DeviceVo;
import com.example.a104.project.repository.DeviceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DeviceService {
    private final DeviceRepository deviceRepository;

    public List<DeviceVo> DeviceList(int gymCode){
        return deviceRepository.findByGymCodeAndUseIsNull(gymCode);
    }
}
