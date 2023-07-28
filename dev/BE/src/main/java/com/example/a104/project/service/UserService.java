package com.example.a104.project.service;

import com.example.a104.project.entity.UserVo;
import com.example.a104.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public void MatchDevice(String deviceCode,String id){
        userRepository.MatchDevice(deviceCode,id);
    }

    public void DeleteDevice(String id){
        userRepository.DeleteDevice(id);
    }


    public void DeleteUser(String id){
        userRepository.Delete(id);
    }

    public int UpdateGymCode(int code, String id){
        int count = userRepository.UpdateGymCode(code,id);
        return count;
    }


    public boolean checkId(String id){
        List<UserVo> userid = userRepository.findById(id);
        if(userid.size()==1){
            return true;
        }
        return false;
    }
    public List<UserVo> login(String id){
        List<UserVo> user = userRepository.findById(id);
        return user;
    }
    public UserVo createUser(UserVo user){
        UserVo savedUser = userRepository.save(user);
        return savedUser;
    }
}
