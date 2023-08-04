package com.example.a104.project.repository;

import com.example.a104.project.entity.WaitVo;
import com.example.a104.project.entity.WaitVoId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface WaitRepository extends JpaRepository<WaitVo, WaitVoId> {

    @Query("select w.count from WaitVo w where function('date_format', w.waitTime, '%Y-%m-%d %H:%i') =:date and w.reader =:reader")
    Integer getWeek(String date, String reader);
}
