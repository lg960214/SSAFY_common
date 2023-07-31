package com.example.a104.project.util;

import org.eclipse.paho.client.mqttv3.*;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MqttConfig implements MqttCallback {
    private MqttClient mqttClient;
    private MqttConnectOptions mqttOptions;

    //clientId는 broker가 클라이언트를 식별하기 위한 문자열 - 고유
    public MqttConfig init(String server, String clientId){
        try {
            mqttOptions = new MqttConnectOptions();
            mqttOptions.setCleanSession(true);
            //mqttOptions.setKeepAliveInterval(30);
            //broker의 subscriber하기위한 클라이언트 객체 생성
            mqttClient = new MqttClient(server, clientId);
            System.out.println(mqttClient);
            //클라이언트 객체에 Mqttcallback을 등록- 구독신청 후 적절한 시점에 처리하고 싶은 기능을 구현하고
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
    public void close(){
        if(mqttClient != null){
            try {
                mqttClient.disconnect();
                mqttClient.close();
            } catch (MqttException e) {
                e.printStackTrace();
            }
        }
    }

    public boolean send(String topic, String msg){
        try {
            //broker로 전송할 메세지 생성 -MqttMessage
            MqttMessage message = new MqttMessage();
            message.setPayload(msg.getBytes()); //실제 broker로 전송할 메세지
            System.out.println("message 전송!!");
            mqttClient.publish(topic,message);
        } catch (MqttException e) {
            e.printStackTrace();
        }

        return true;
    }
    @Override
    public void connectionLost(Throwable throwable) {

    }


    //메세지가 도착하면 호출되는 메소드드
    @Override
    public void deliveryComplete(IMqttDeliveryToken iMqttDeliveryToken) {

    }

    //메세지의 배달이 완료되면 호출
    @Override
    public void messageArrived(String topic, MqttMessage message) throws Exception {
        System.out.println("=====================메세지 도착=================");
        System.out.println(message);
        System.out.println("topic: " +topic +",id: "+ message.getId() + ",payload: " + new String(message.getPayload()));
        String msg = new String(message.getPayload());
        System.out.println(msg);
        String arr[] = msg.split("&");
        if(arr[2].equals("noshow")){
            System.out.println("노쇼");
            send("esp32/led","on");
        }
        else{
            System.out.println("종료를 안찍음");
            send("esp32/led","notag");

        }

//        System.out.println(arr[0]);
//        System.out.println(arr[1]);
//        System.out.println(arr[2]);
        // 노쇼 -> 2분 지나고 메세지가 오게 되면
        // 예약에서 취소 후 다음 사람에게 알람(mqtt) 보내기

        // 종료태그 안할 시 -> 시작 후 20분이 지나게 되어 메세지가 오는 경우
        // 해당 사람 종료로 바꾼 후 다음 사람에게 알람 보내기
    }
    public boolean subscriber(String topic){
        boolean result = true ;
        try {
            if(topic!=null) {
                //topic과 Qos를 전달
                //Qos는 메세지가 도착하기 위한 품질에 값을 설정 - 서비스 품질
                //0,1,2를 설정할 수 있음
                System.out.println(mqttClient);
                mqttClient.subscribe(topic, 0);


            }
        } catch (MqttException e) {
            e.printStackTrace();
            result = false;
        }
        return result;
    }
}
