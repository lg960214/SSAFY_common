package com.example.a104.project.util;


import com.example.a104.project.entity.ReservationVo;
import com.example.a104.project.entity.WaitVo;
import com.example.a104.project.repository.ReaderRepository;
import com.example.a104.project.repository.ReservationRepository;
import com.example.a104.project.repository.WaitRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

    @Scheduled(cron = "* 10 * * * *")
    public void updateDatabase(){
        List<ReservationVo> list = reservationRepository.findAll();
        System.out.println(list.size());
        Set<String> set = new HashSet<>();
        for(ReservationVo reservationVo : list){
            set.add(reservationVo.getReader());
        }
        System.out.println(list.get(3));
        for(String reader : set){
            WaitVo waitVo = WaitVo.builder()
                    .reader(reader)
                    .waitTime(LocalDateTime.now())
                    .count(reservationRepository.findByReaderOrderByReservationAsc(reader).size())
                    .name(readerRepository.findByReader(reader).getName())
                    .build();
            System.out.println(waitVo);
            waitRepository.save(waitVo);
        }
//        for(ReservationVo reservationVo : list){
//            String reader = reservationVo.getReader();
//            WaitVo waitVo = WaitVo.builder()
//                    .reader(reservationVo.getReader())
//                    .waitTime(LocalDateTime.now())
//                    .count(reservationRepository.findByReaderOrderByReservationAsc(reader).size())
//                    .name(readerRepository.findByReader(reader).getName())
//                    .build();
//            System.out.println(waitVo);
//            waitRepository.save(waitVo);
//        }
        System.out.println("디비정보 저장");
        System.out.println(LocalDateTime.now());
    }
}
