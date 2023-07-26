package com.example.a104.project.repository;

import com.example.a104.project.entity.DeviceVo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DeviceRepository extends JpaRepository<DeviceVo,String> {

    List<DeviceVo> findByGymCodeAndUseIsNull(int gymCode);
}
