package com.example.a104.project.repository;

import com.example.a104.project.entity.TagInfoVo;
import com.example.a104.project.entity.TagInfoVoId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface TagInfoRepository extends JpaRepository<TagInfoVo, TagInfoVoId> {
    // @Query("select t from TagInfoVo t join t.readerVo r where
    // function('date_format', t.tagDate, '%Y-%m') = :tagDate and t.userId =
    // :userId")
    // List<TagInfoVo> getRecord(String tagDate, int userId);

    @Query("select t from TagInfoVo t  where function('date_format', t.tagDate, '%Y-%m') = :tagDate and t.userId = :userId")
    List<TagInfoVo> getRecord(String tagDate, int userId);

    @Query("select  t from TagInfoVo t  where t.tagDate = :tagDate and t.userId = :userId and t.reader = :reader order by t.startTime desc ")
    List<TagInfoVo> getStartDate(LocalDate tagDate, int userId, String reader);

    @Modifying
    @Transactional
    @Query("update TagInfoVo t set t.endTime = :endTime where t.startTime = :startTime")
    void setEndTime(@Param("endTime") LocalDateTime endTime, @Param("startTime") LocalDateTime startTime);
}
