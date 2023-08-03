package com.example.a104.project.service;

import com.example.a104.project.dto.RealTimeDto;
import com.example.a104.project.entity.*;
import com.example.a104.project.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final AdminRepository adminRepository;
    private final UserRepository userRepository;
    private final ReaderRepository readerRepository;
    private final ReaderStateRepository readerStateRepository;
    private final ReservationRepository reservationRepository;
    private final TagInfoRepository tagInfoRepository;
    private final CountRepository countRepository;
    public int getDayUsing(ReaderVo readerVo,LocalDate date){
        int cnt = 0;
        try{
            cnt = tagInfoRepository.findByReaderAndTagDate(readerVo.getReader(),date).size();
        }
        catch (Exception e){

        }
        return cnt;
    }

    public int getDaySearch(ReaderVo readerVo, LocalDate date){
        int cnt = 0;
        try{
            cnt = countRepository.findBySearchAndName(date,readerVo.getName()).get(0).getCount();
        }
        catch (Exception e){

        }
        return cnt;

    }
    // 실시간 대기, 사용 현황
    public List<RealTimeDto> realTimeDtoList(int gymCode){
        List<ReaderVo> readerVoList =readerRepository.findByGymCode(gymCode); // 헬스장 구역 별 리더기 리스트
        List<RealTimeDto> realTimeDtoList = new ArrayList<>();
        for(ReaderVo readerVo: readerVoList){
            //String reader = readerVo.getReader(); // 해당 리더기 번호 => 해당 리더기 번호의 사용, 예약 정보 Dto 에 저장
            RealTimeDto realTimeDto = new RealTimeDto();
            realTimeDto.setName(readerVo.getName());
            realTimeDto.setReader(readerVo.getReader());
            realTimeDto.setGymCode(readerVo.getGymCode());
            realTimeDto.setRegion(readerVo.getRegion());


            try{
                realTimeDto.setUserId(readerStateRepository.findByReader(readerVo.getReader()).getUserId()); // 사용중인 사람의 Id
            }
            catch (NullPointerException e){
                realTimeDto.setUserId(null);
            }

            List<ReservationVo> reservationVoList = reservationRepository.findByReaderOrderByReservationAsc(readerVo.getReader());
            List<Integer> userList = new ArrayList<>();
            int cnt = reservationVoList.size();
            int i = 0;
            for(ReservationVo reservationVo: reservationVoList){
                userList.add(reservationVo.getUserId());
                i++;
                if(i== 6) break;
            }

            realTimeDto.setWaitingList(userList); // 대기중인 사람들 리스트
            realTimeDto.setWaitingCount(cnt);
            realTimeDtoList.add(realTimeDto);
        }
        return realTimeDtoList;

    }


    // 회원 검색
    public List<UserVo> search(String keyword,int gymCode){
        return userRepository.findByNameContainingAndGymCode(keyword,gymCode);
    }

    // 회원 승인
    public void approval(int regist,String id){
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
