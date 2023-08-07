package com.example.a104.project.service;

import com.example.a104.project.dto.TagInfoDto;
import com.example.a104.project.entity.TagInfoEntity;
import com.example.a104.project.entity.UserEntity;
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

    public List<TagInfoEntity> getUserDate(String date, int userId){
        List<TagInfoEntity> userRecords = tagInfoRepository.getRecord(date,userId);
        return userRecords;
    };


    public List<TagInfoDto> getTagInfo(List<TagInfoEntity> list){
        List<TagInfoDto> tagInfoDtoList = new ArrayList<>();
        for(TagInfoEntity tag: list){
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

    public UserEntity getUser(String deviceCode){
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

    public UserEntity getUserInfo(String id){
        return userRepository.findById(id).get(0);
    }
    public boolean checkId(String id){

        List<UserEntity> userid = userRepository.findById(id);
        if (userid.size() == 1) {
            return true;
        }
        return false;
    }

    public List<UserEntity> login(String id) {
        List<UserEntity> user = userRepository.findById(id);
        return user;
    }

    public UserEntity createUser(UserEntity user) {
        UserEntity savedUser = userRepository.save(user);
        return savedUser;
    }
}
