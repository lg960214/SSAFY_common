package com.example.a104.project.repository;

import com.example.a104.project.entity.ReaderVo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReaderRepository extends JpaRepository<ReaderVo,String> {
    List<ReaderVo> findByGymCode(int gymCode);
    ReaderVo findByReader(String reader);

    List<ReaderVo> findByGymCodeAndRegion(int gymCode, String region);
}
