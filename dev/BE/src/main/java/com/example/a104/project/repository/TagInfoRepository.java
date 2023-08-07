package com.example.a104.project.repository;

import com.example.a104.project.entity.TagInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface TagInfoRepository extends JpaRepository<TagInfoEntity, Integer> {

    @Query("select t from TagInfoEntity t  where function('date_format', t.tagDate, '%Y-%m') = :tagDate and t.userId = :userId")
    List<TagInfoEntity> getRecord(String tagDate, int userId);

    @Query("select  t from TagInfoEntity t  where t.tagDate = :tagDate and t.userId = :userId and t.reader = :reader order by t.startTime desc ")
    List<TagInfoEntity> getStartDate(LocalDate tagDate, int userId, String reader);

    @Modifying
    @Transactional
    @Query("update TagInfoEntity t set t.endTime = :endTime where t.startTime = :startTime")
    void setEndTime(@Param("endTime") LocalDateTime endTime, @Param("startTime") LocalDateTime startTime);

    List<TagInfoEntity> findByReaderAndTagDate(String reader, LocalDate date);

    List<TagInfoEntity> findByUserIdAndReaderAndEndTimeIsNullOrderByStartTimeAsc(int userId, String reader);
}
