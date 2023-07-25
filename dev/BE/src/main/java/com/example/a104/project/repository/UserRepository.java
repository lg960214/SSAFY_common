package com.example.a104.project.repository;

import com.example.a104.project.entity.UserVo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

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

    List<UserVo> findById(String Id);
    List<UserVo> findByGymCodeAndRegistIsNotNull(int GymCode);

    List<UserVo> findByGymCodeAndRegistIsNull(int gymCode);
}
