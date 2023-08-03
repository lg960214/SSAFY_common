package com.example.a104.project.service;

import com.example.a104.project.entity.ReaderVo;
import com.example.a104.project.repository.ReaderRepository;
import com.example.a104.project.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReaderService {
    private final ReaderRepository readerRepository;
    private final ReservationRepository reservationRepository;
    public List<ReaderVo> getReaderList(int gymCode){
        return readerRepository.findByGymCode(gymCode);
    }
    public List<ReaderVo> getMatchReaders(int gymCode){
        return readerRepository.findByGymCodeAndNameIsNotNull(gymCode);
    }
    public void updateReader(List<ReaderVo> readers){
        for(ReaderVo reader: readers){
            readerRepository.save(reader);
        }
    }

    public void deleteReservation(int userId){
        reservationRepository.deleteByUserId(userId);
    };
}
