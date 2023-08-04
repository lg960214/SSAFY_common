package com.example.a104.project.service;

import com.example.a104.project.dto.TagInfoDto;
import com.example.a104.project.entity.TagInfoVo;
import com.example.a104.project.entity.UserVo;
import com.example.a104.project.repository.ReaderRepository;
import com.example.a104.project.repository.TagInfoRepository;
import com.example.a104.project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final TagInfoRepository tagInfoRepository;
    private final ReaderRepository readerRepository;

    public int countUsers(int gymCode){
        return userRepository.findByGymCodeAndDeviceCodeIsNotNull(gymCode).size();
    }

    public List<TagInfoVo> getUserDate(String date, int userId){
        List<TagInfoVo> userRecords = tagInfoRepository.getRecord(date,userId);
        System.out.println(userRecords);
        return userRecords;
    };


    public List<TagInfoDto> getTagInfo(List<TagInfoVo> list){
        List<TagInfoDto> tagInfoDtoList = new ArrayList<>();
        for(TagInfoVo tag: list){
            TagInfoDto tagInfoDto = new TagInfoDto();
            tagInfoDto.setTagData(tag.getTagDate());
            tagInfoDto.setEndTime(tag.getEndTime());
            tagInfoDto.setUserId(tag.getUserId());
            tagInfoDto.setReader(tag.getReader());
            tagInfoDto.setStartTime(tag.getStartTime());
            tagInfoDto.setName(readerRepository.findByReader(tag.getReader()).getName());
            tagInfoDtoList.add(tagInfoDto);
        }
        return tagInfoDtoList;
    }

    public UserVo getUser(String deviceCode){
        return userRepository.findByDeviceCode(deviceCode);
    }

    public void MatchDevice(String deviceCode, String id) {
        userRepository.MatchDevice(deviceCode, id);
    }

    public void DeleteDevice(String id) {
        userRepository.DeleteDevice(id);
    }

    public void DeleteUser(String id) {
        userRepository.Delete(id);
    }

    public int UpdateGymCode(int code, String id) {
        int count = userRepository.UpdateGymCode(code, id);
        return count;
    }

    public UserVo getUserInfo(String id){
        return userRepository.findById(id).get(0);
    }
    public boolean checkId(String id){

        List<UserVo> userid = userRepository.findById(id);
        if (userid.size() == 1) {
            return true;
        }
        return false;
    }

    public List<UserVo> login(String id) {
        List<UserVo> user = userRepository.findById(id);
        return user;
    }

    public UserVo createUser(UserVo user) {
        UserVo savedUser = userRepository.save(user);
        return savedUser;
    }
}
