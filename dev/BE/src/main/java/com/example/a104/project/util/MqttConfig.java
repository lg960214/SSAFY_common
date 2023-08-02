package com.example.a104.project.util;

import com.example.a104.project.entity.ReservationVo;
import com.example.a104.project.repository.ReaderStateRepository;
import com.example.a104.project.repository.ReservationRepository;
import com.example.a104.project.repository.UserRepository;
import com.example.a104.project.service.ReaderService;
import com.example.a104.project.service.UserService;

import lombok.RequiredArgsConstructor;

import org.apache.tomcat.jni.User;
import org.eclipse.paho.client.mqttv3.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;


@Component
@Configuration
public class MqttConfig implements MqttCallback {
    private MqttClient mqttClient;
    private MqttConnectOptions mqttOptions;
    
    private final UserRepository userRepository;
    private final ReservationRepository reservationRepository;
    private final ReaderStateRepository readerStateRepository;
    public MqttConfig(UserRepository userRepository, ReservationRepository reservationRepository, ReaderStateRepository readerStateRepository) {
        this.userRepository = userRepository;
        this.reservationRepository = reservationRepository;
        this.readerStateRepository = readerStateRepository;
    }

    // clientId는 broker가 클라이언트를 식별하기 위한 문자열 - 고유
    public MqttConfig init(String server, String clientId) {
        try {
            mqttOptions = new MqttConnectOptions();
            mqttOptions.setCleanSession(true);
            // mqttOptions.setKeepAliveInterval(30);
            // broker의 subscriber하기위한 클라이언트 객체 생성
            mqttClient = new MqttClient(server, clientId);
            System.out.println(mqttClient);
            // 클라이언트 객체에 Mqttcallback을 등록- 구독신청 후 적절한 시점에 처리하고 싶은 기능을 구현하고
            // 메소드가 자동으로 그 시점에 호출되도록 할 수 있다.
            mqttClient.setCallback(this);
            System.out.println("StartConnect");
            mqttClient.connect(mqttOptions);
            System.out.println("Connect");
        } catch (MqttException e) {
            e.printStackTrace();
        }
        return this;
    }

    public void close() {
        if (mqttClient != null) {
            try {
                System.out.println("=============종료================");
                mqttClient.disconnect();
                mqttClient.close();
            } catch (MqttException e) {
                e.printStackTrace();
            }
        }
    }

    public boolean send(String topic, String msg) {
        try {
            // broker로 전송할 메세지 생성 -MqttMessage
            MqttMessage message = new MqttMessage();
            message.setPayload(msg.getBytes()); // 실제 broker로 전송할 메세지
            System.out.println("message 전송!!");
            System.out.println(message);
            System.out.println(topic);
            mqttClient.publish(topic, message);
        } catch (MqttException e) {
            e.printStackTrace();
        }

        return true;
    }

    @Override
    public void connectionLost(Throwable throwable) {

    }

    // 메세지가 도착하면 호출되는 메소드드
    @Override
    public void deliveryComplete(IMqttDeliveryToken iMqttDeliveryToken) {

    }

    // 메세지의 배달이 완료되면 호출
    @Override
    public void messageArrived(String topic, MqttMessage message) throws Exception {
        System.out.println("=====================메세지 도착=================");

        String msg = new String(message.getPayload());
        System.out.println("메세지 :" + msg);
        String arr[] = msg.split("&");
        System.out.println("user repository " + userRepository);
        System.out.println(Arrays.toString(arr));
        System.out.println(arr[2]);
        if (arr[2].equals("noshow")) {
            //arr[0] = 노쇼한 사람의 deviceCode , arr[1] = 노쇼한 사람이 예약한 reader

            int userId = userRepository.findByDeviceCode(arr[0]).getUserId(); // 노쇼한 사람의 userId

            // 1. 노쇼 한 사람의 예약 취소
            String reader = reservationRepository.findByUserId(userId).getReader();
            reservationRepository.deleteByUserId(userId);
            // 2. 해당 기국 다음 차례 사람 찾기 => deviceCode
            List<ReservationVo> list =
            reservationRepository.findByReaderOrderByReservationAsc(arr[1]);

            // 다음 예약자가 있는 경우
            if (list.size() != 0) {
                int next = list.get(0).getUserId();
                String deviceCode = userRepository.findByUserId(next).getDeviceCode();
                // 3. 해당 deviceCode(Topic)으로 메세지 전송
                send(deviceCode, "your turn");
            }
            //다음 예약자가 없는 경우 -> 리더기 상태를 1로 변경
            else{
                readerStateRepository.nExistReservation(reader);
            }
        } else {
            System.out.println("종료를 안찍음");
            send(arr[0], "notag");
            /*
            //arr[0] = 노태그한 사람의 deviceCode , arr[1] = 노태그한 사람이 예약한 reader

            int userId = userRepository.findByDeviceCode(arr[0]).getUserId(); // 노태그한 사람의 userId

            // 1. 노태그한 사람의 예약 취소
            String reader = reservationRepository.findByUserId(userId).getReader();
            reservationRepository.deleteByUserId(userId);
            // 2. 해당 기국 다음 차례 사람 찾기 => deviceCode
            List<ReservationVo> list =
            reservationRepository.findByReaderOrderByReservationAsc(arr[1]);

            // 다음 예약자가 있는 경우
            if (list.size() != 0) {
                int next = list.get(0).getUserId();
                String deviceCode = userRepository.findByUserId(next).getDeviceCode();
                // 3. 해당 deviceCode(Topic)으로 메세지 전송
                send(deviceCode, "your turn");
            }
            //다음 예약자가 없는 경우 -> 리더기 상태를 1로 변경
            else{
                readerStateRepository.nExistReservation(reader);
            }
            */
        }

        // 노쇼 -> 2분 지나고 메세지가 오게 되면
        // 예약에서 취소 후 다음 사람에게 알람(mqtt) 보내기

        // 종료태그 안할 시 -> 시작 후 20분이 지나게 되어 메세지가 오는 경우
        // 해당 사람 종료로 바꾼 후 다음 사람에게 알람 보내기
    }

    public boolean subscriber(String topic) {
        boolean result = true;
        try {
            if (topic != null) {
                // topic과 Qos를 전달
                // Qos는 메세지가 도착하기 위한 품질에 값을 설정 - 서비스 품질
                // 0,1,2를 설정할 수 있음
                
                mqttClient.subscribe(topic, 0);
                System.out.println(topic);
	

            }
        } catch (MqttException e) {
            e.printStackTrace();
            result = false;
        }
        return result;
    }
}
