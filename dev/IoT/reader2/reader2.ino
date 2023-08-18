#include <WiFi.h>
#include <MFRC522.h>
#include <SPI.h>
#include <PubSubClient.h>

#define SS_PIN  5  // ESP32 pin GIOP5 
#define RST_PIN 27 // ESP32 pin GIOP27 
MFRC522 rfid(SS_PIN, RST_PIN);

const char* ssid = "alveo";//"alveo";
const char* password = "905612yy@@";//"905612yy@@";

const int buzzerPin = 25;  // 부저를 연결한 GPIO 핀
// 소리 크기 조절을 하기 위한 변수 세팅
const int freq = 2000;
const int channel = 0;
const int resolution = 8;

const char* mqttServer = "13.124.11.62"; // MQTT 브로커의 IP 주소
const int mqttPort = 1883; // MQTT 브로커의 포트 번호
const char* clientId = "reader1";

WiFiClient espClient;
PubSubClient client(espClient);



// wifi 연결
void initializeWiFi() {
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    digitalWrite(2, LOW);
    delay(1000);
    //Serial.println("Connecting to WiFi..");
  }
  digitalWrite(2, HIGH);
  delay(1000);
  //Serial.println("Connected to the WiFi network");
  //Serial.println("Please tag your band");
}

// RFID 초기화
void initializeRFID() {
  SPI.begin();
  rfid.PCD_Init();
}

// 부저 울림 함수
void beep(int duration = 500) {
  int dutyCycle = 10;
  ledcWrite(channel, dutyCycle);
  delay(duration);
  ledcWrite(channel, 0);
  delay(duration);
}

// RFID 태그 UID 읽기
String getRFIDTagUID() {

    // RFID 태그 UID를 문자열로 변환
    String tagUID;
    for (int i = 0; i < rfid.uid.size; i++) {
      tagUID += String(rfid.uid.uidByte[i] < 0x10 ? "0" : "");
      tagUID += String(rfid.uid.uidByte[i], HEX);
    }
    //Serial.println(tagUID);
    return tagUID;

}

// MQTT 브로커 연결
void initializeMQTT() {
    client.setServer(mqttServer, mqttPort);
    while (!client.connected()) {
        //Serial.println("Connecting to MQTT...");

        if (client.connect(clientId)) {
            //Serial.println("Connected to MQTT");
            digitalWrite(2, HIGH);
        } 
        else {
            digitalWrite(2, LOW);
            //Serial.print("failed with state ");
            //Serial.println(client.state());
            //Serial.println(" try again in 5 seconds");
            delay(5000);
        }
    }
}

void sendViaMQTT(const String& tagUID) {
    String message = tagUID + "&WW1002&tag";  // 메시지 형식에 따라 조합
    //Serial.println("Sending via MQTT: " + message);

    if (client.publish("esp32", message.c_str())) {  // c_str()로 변환
        //Serial.println("Message sent successfully");
        beep();
    } 
    else {
        //Serial.println("Failed to send the message");
        beep();
        beep();
    }
}

void setup() {
  Serial.begin(115200);
  ledcSetup(channel, freq, resolution);
  ledcAttachPin(buzzerPin, channel);
  pinMode(2, OUTPUT);
  
  initializeWiFi();
  initializeRFID();
  initializeMQTT();
}

void loop() {
  
  if (!client.connected()) {
    initializeMQTT();
  }

  client.loop();

  if (WiFi.status() == WL_CONNECTED) {

    if(rfid.PICC_IsNewCardPresent() && rfid.PICC_ReadCardSerial()){
      String tagUID = getRFIDTagUID();
      sendViaMQTT(tagUID);
    }
  } 
  else {
    Serial.println("Error in WiFi connection or RFID reading.");
    initializeWiFi();
    initializeMQTT();

  }
  delay(500);
}
