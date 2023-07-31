package com.example.a104;

import com.example.a104.project.util.MqttConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class A104Application {

    public static void main(String[] args) {

        SpringApplication.run(A104Application.class, args);
        MqttConfig mqtt = new MqttConfig();
        mqtt.init("tcp://localhost:1883","backend").subscriber("sub");
    }

}
