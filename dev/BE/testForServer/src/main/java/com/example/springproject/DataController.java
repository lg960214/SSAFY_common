package com.example.springproject;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DataController {

    private String receivedData = "No data received yet.";

    @GetMapping("/rdata")
    public String receiveData() {
        // 데이터를 확인하고 원하는 처리를 수행합니다.
        System.out.println("Received data: " + receivedData);

        // 클라이언트에 응답을 보내거나, 추가적인 처리를 할 수 있습니다.
        return receivedData;
    }

    @PostMapping("/sdata")
    public String sendData(@RequestBody String data) {
        // 데이터를 수신하면 receivedData를 업데이트합니다.
        receivedData = data;
        System.out.println("Received data: " + receivedData);

        // 클라이언트에 응답을 보내거나, 추가적인 처리를 할 수 있습니다.
        return "Data received successfully!";
    }
}