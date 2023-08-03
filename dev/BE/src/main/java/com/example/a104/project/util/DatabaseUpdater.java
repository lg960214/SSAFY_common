package com.example.a104.project.util;


import com.example.a104.project.entity.ReservationVo;
import com.example.a104.project.entity.WaitVo;
import com.example.a104.project.repository.ReaderRepository;
import com.example.a104.project.repository.ReservationRepository;
import com.example.a104.project.repository.WaitRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class DatabaseUpdater {

    private final ReservationRepository reservationRepository;
    private final WaitRepository waitRepository;
    private final ReaderRepository readerRepository;

    public DatabaseUpdater(ReservationRepository reservationRepository, WaitRepository waitRepository, ReaderRepository readerRepository) {
        this.reservationRepository = reservationRepository;
        this.waitRepository = waitRepository;
        this.readerRepository = readerRepository;
    }

    @Scheduled(cron = "0 0,10,20,30,40,50 * * * *")
    public void updateDatabase(){
        List<ReservationVo> list = reservationRepository.findAll();
        for(ReservationVo reservationVo : list){

            String reader = reservationVo.getReader();
            System.out.println(reader);
            WaitVo waitVo = WaitVo.builder()
                    .reader(reservationVo.getReader())
                    .waitTime(LocalDateTime.now())
                    .count(reservationRepository.findByReaderOrderByReservationAsc(reader).size())
                    .name(readerRepository.findByReader(reader).getName())
                    .build();
            waitRepository.save(waitVo);
        }
        System.out.println("디비정보 저장");
        System.out.println(LocalDateTime.now());
    }
}
