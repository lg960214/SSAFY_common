package com.example.a104;

import com.example.a104.project.repository.ReaderStateRepository;
import com.example.a104.project.repository.ReservationRepository;
import com.example.a104.project.repository.UserRepository;
import com.example.a104.project.util.MqttConfig;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.example.a104.project")
public class A104Application {
    
    public static void main(String[] args) {
        ConfigurableApplicationContext context = SpringApplication.run(A104Application.class, args);
        UserRepository userRepository = context.getBean(UserRepository.class);
        ReservationRepository reservationRepository = context.getBean(ReservationRepository.class);
        ReaderStateRepository readerStateRepository = context.getBean(ReaderStateRepository.class);
        //SpringApplication.run(A104Application.class, args);

        //MqttConfig mqtt = new MqttConfig(userService);
        MqttConfig mqtt = new MqttConfig(userRepository,reservationRepository,readerStateRepository);
        // mqtt.init("tcp://localhost:1883","backend").subscriber("sub");
        mqtt.init("tcp://13.124.11.62:1883", "backend").subscriber("esp32");
        System.out.println("구독 완료");
    }

}
