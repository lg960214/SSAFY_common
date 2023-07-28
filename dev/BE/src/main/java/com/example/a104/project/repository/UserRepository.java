package com.example.a104.project.repository;

import com.example.a104.project.entity.UserVo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

public interface UserRepository extends JpaRepository<UserVo,Integer> {

    @Modifying
    @Query("update UserVo u set u.gymCode = :code where u.id= :id")
    int UpdateGymCode(int code, String id);

    @Modifying
    @Query("update UserVo u set u.regist = :c where u.id = :id")
    int Approval(int c,String id);

    @Modifying
    @Query("update UserVo u set u.regist = NULL, u.gymCode = NULL where u.id = :id")
    int Delete(String id);

    @Modifying
    @Transactional
    @Query("update UserVo u set u.deviceCode = NULL where u.id = :id")
    void DeleteDevice(String id);

    @Modifying
    @Transactional
    @Query("update UserVo u set u.deviceCode = :deviceCode where u.id = :id")
    void MatchDevice(String deviceCode,String id);


    UserVo findByDeviceCode(String deviceCode);
    UserVo findByUserId(int userId);
    List<UserVo> findByNameContainingAndGymCode(String keyword,int gymCode);
    List<UserVo> findById(String Id);
    List<UserVo> findByGymCodeAndRegistIsNotNull(int GymCode);
    List<UserVo> findByGymCodeAndDeviceCodeIsNotNull(int GymCode);
    List<UserVo> findByGymCodeAndRegistIsNull(int gymCode);
}
