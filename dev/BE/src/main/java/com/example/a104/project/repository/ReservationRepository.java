package com.example.a104.project.repository;

import com.example.a104.project.entity.ReservationVo;
import com.example.a104.project.entity.ReservationVoId;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface ReservationRepository extends JpaRepository<ReservationVo, ReservationVoId> {


    List<ReservationVo> findByReaderOrderByReservationAsc(String reader);
    ReservationVo findByUserId(int userId);

    @Transactional
    void deleteByUserId(int userId);
}
