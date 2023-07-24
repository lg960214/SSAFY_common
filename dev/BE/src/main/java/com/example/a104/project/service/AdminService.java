package com.example.a104.project.service;

import com.example.a104.project.entity.AdminVo;
import com.example.a104.project.repository.AdminRepository;
import com.example.a104.project.entity.UserVo;
import com.example.a104.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final AdminRepository adminRepository;
    private final UserRepository userRepository;

    public void Approval(int regist,String id){
        System.out.println("Service: "+id);
        System.out.println(regist);
        userRepository.Approval(regist,id);
    }

    public List<UserVo> unauthorizedUser(int gymCode){
        return userRepository.findByGymCodeAndRegistIsNull(gymCode);
    }

    public List<UserVo> userList(int GymCode){
        List<UserVo> userList = userRepository.findByGymCodeAndRegistIsNotNull(GymCode);
        System.out.println(userList);
        return userList;
    }

    // 관리자 id 를 가지고 헬스장 코드 알아내기
    public int getGymCode(String id){
        List<AdminVo> admin = adminRepository.findById(id);
        System.out.println(admin.get(0));
        return admin.get(0).getGymCode();
    }

    public List<AdminVo> login(String id){
        List<AdminVo> admin = adminRepository.findById(id);
        System.out.println(admin);
        return admin;
    }
    public AdminVo createAdmin(AdminVo admin){
        AdminVo savedAdmin = adminRepository.save(admin);
        return savedAdmin;
    }
}
