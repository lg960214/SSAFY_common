package com.example.a104;

import com.example.a104.project.repository.*;
import com.example.a104.project.service.AdminService;
import com.example.a104.project.service.DeviceService;
import com.example.a104.project.service.ReaderService;
import com.example.a104.project.service.TagService;
import com.example.a104.project.util.DatabaseUpdater;
import com.example.a104.project.util.EmitterList;
import com.example.a104.project.util.MqttConfig;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.time.LocalDateTime;
import java.time.ZoneId;

@Slf4j
@SpringBootApplication
@EnableScheduling
@ComponentScan(basePackages = "com.example.a104.project")
public class A104Application {
    
    public static void main(String[] args) {
        ConfigurableApplicationContext context = SpringApplication.run(A104Application.class, args);
        UserRepository userRepository = context.getBean(UserRepository.class);
        ReservationRepository reservationRepository = context.getBean(ReservationRepository.class);
        ReaderStateRepository readerStateRepository = context.getBean(ReaderStateRepository.class);
        ReaderRepository readerRepository = context.getBean(ReaderRepository.class);
        WaitRepository waitRepository = context.getBean(WaitRepository.class);
        TagService tagService = context.getBean(TagService.class);
        ReaderService readerService = context.getBean(ReaderService.class);
        AdminService adminService = context.getBean(AdminService.class);
        DeviceService deviceService = context.getBean(DeviceService.class);
        EmitterList emitterList = context.getBean(EmitterList.class);
        new DatabaseUpdater(reservationRepository,waitRepository, readerRepository);
        MqttConfig mqtt = new MqttConfig(userRepository,reservationRepository,readerStateRepository,tagService,readerService,adminService,deviceService,emitterList);
        mqtt.init("tcp://13.124.11.62:1883", "backend").subscriber("esp32");
        log.info("MQTT 구독 완료");
        log.info("start time : {}", LocalDateTime.now(ZoneId.of("Asia/Seoul")));
    }
}
