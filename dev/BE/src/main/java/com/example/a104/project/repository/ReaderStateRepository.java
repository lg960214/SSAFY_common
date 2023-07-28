package com.example.a104.project.repository;

import com.example.a104.project.entity.ReaderStateVo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ReaderStateRepository extends JpaRepository<ReaderStateVo,String> {
    // 리더기 상태
    ReaderStateVo findByReader(String reader);

    // 내가 지금 운동기구 사용중인지 체크
    ReaderStateVo findByUserId(int userId);

    //대기없는 상태로 변경(미사용)
    @Query("update ReaderStateVo r set r.state = 1,r.userId=null where r.reader = :reader")
    void nExistReservation(String reader);

    //대기있는 상태로 변경(미사용)
    @Query("update ReaderStateVo r set r.state = 2,r.userId=null where r.reader = :reader")
    void ExistReservation(String reader);

    //사용중 상태로 변경
    @Query("update ReaderStateVo r set r.state = 0, r.userId=null where r.reader= :reader")
    void updateState(String reader);
}
