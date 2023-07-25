package com.example.a104.project.repository;

import com.example.a104.project.entity.AdminVo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminRepository extends JpaRepository<AdminVo, Integer> {
    List<AdminVo> findById(String id);

}
