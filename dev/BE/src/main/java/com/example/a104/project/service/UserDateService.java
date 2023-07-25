package com.example.a104.project.service;

import com.example.a104.project.entity.UserDateVo;
import com.example.a104.project.repository.UserDateRepository;
import com.example.a104.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserDateService {
    private final UserDateRepository userDateRepository;
    private final UserRepository userRepository;

    public UserDateVo createUserDate(UserDateVo userDate){
        UserDateVo savedUserDate = userDateRepository.save(userDate);
        return savedUserDate;
    }

    public int createUserId(String id){
        int userId = userRepository.findById(id).get(0).getUserId();
        return userId;
    }

    public void accessUser(int userId){
        LocalDate date = LocalDate.now();
        userDateRepository.access_user(date,userId);
    }

    public void accessAdmin(int userId){
        LocalDate date = LocalDate.now();
        userDateRepository.access_admin(date,userId);
    }

    public void dropout(int userId){
        LocalDateTime date = LocalDateTime.now();
        userDateRepository.dropout(date,userId);
    }
}