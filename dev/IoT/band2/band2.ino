#include <WiFi.h>
#include <PubSubClient.h>
#include <Adafruit_NeoPixel.h>
#include <SPIFFS.h>

// 네트워크 및 MQTT 정보 설정
const char* ssid = "";
const char* password = "";
const char* mqttServer = ""; // MQTT 브로커의 IP 주소
const int mqttPort = ; // MQTT 브로커의 포트 번호
const char* clientId = "";

// 핀 번호 설정
const int movePin = 17; // 진동센서가 연결된 핀 번호
#define LED_PIN    2   // 연결된 GPIO 핀 번호
#define LED_COUNT  8   // LED의 개수
Adafruit_NeoPixel strip(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800);

// 장치 및 리더 번호 설정
const char* deviceNum = "a582c5a3"; 
const char* readerNum = "2222";     


WiFiClient espClient;
PubSubClient client(espClient);

bool ledBlinking = false;


bool ledOn = false;
unsigned long ledOnTime = 0;

const unsigned long duration = 20 * 1000; 

bool ledOff = false;
unsigned long offTimestamp = 0;
const unsigned long offDuration = 20 * 60 * 1000;

TaskHandle_t countdownTask; // Task handle for the countdown task


// WiFi 연결 설정
void setup_wifi() {
  delay(10);
  //Serial.println();
  //Serial.print("Connecting to ");
  //Serial.println(ssid);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    //Serial.print(".");
  }

  //Serial.println("");
  //Serial.println("WiFi connected");
  //Serial.println("IP address: ");
  //Serial.println(WiFi.localIP());
}


// MQTT 메시지 콜백 함수
void handleReceivedMessage(char* topic, byte* payload, unsigned int length) {
  String message;
  for (int i = 0; i < length; i++) {
    message += (char)payload[i];
  }

  //Serial.print("Message received in topic: ");
  //Serial.println(topic);
  //Serial.print("Message: ");
  //Serial.println(message);


  if (message == "your turn") {
    ledBlinking = true;
    ledOn = true;
    ledOnTime = millis();
  } 
  else if (message == "off") {
    ledBlinking = false;
    for (int i = 0; i < strip.numPixels(); i++) {
      strip.setPixelColor(i, 0);  
    }
    strip.show();
    digitalWrite(movePin, LOW);
    ledOn = false;  // led가 켜진 상태에서 off메시지를 받으면 2분 카운트 정지

    // led가 꺼지면 20분 카운트 시작
    ledOff = true;
    offTimestamp = millis();
  } 
  else if (message == "end") {
    ledOff = false;
  }
} 

// MQTT 브로커 연결
void reconnect() {
  while (!client.connected()) {
    //Serial.print("Attempting MQTT connection...");
    if (client.connect(clientId)) {
      //Serial.println("connected");
      client.subscribe(deviceNum);  // Topic
      digitalWrite(2, HIGH);
    } 
    else {
      digitalWrite(2, LOW);
      //Serial.print("failed, rc=");
      //Serial.print(client.state());
      //Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

// LED 및 센서 작동 설정 함수
void handleLEDActions(void* parameter) {
  static int currentLED = 0;

  while(1){
    client.loop();
    if (ledBlinking) {
      strip.setPixelColor(currentLED, strip.Color(0, 0, 255));  // 파란색으로 설정
      strip.show();
      digitalWrite(movePin, HIGH);
      delay(500);
      strip.setPixelColor(currentLED, 0);  
      strip.show();
      digitalWrite(movePin, LOW);
      currentLED = (currentLED + 1) % strip.numPixels();  // 다음 LED로 이동
    }
    if (ledOn && (millis() - ledOnTime >= duration)) {
      for (int i = 0; i < strip.numPixels(); i++) {
        strip.setPixelColor(i, 0);  
      }
      strip.show();
      digitalWrite(movePin, LOW);
      ledBlinking = false;
      ledOn = false;  // 카운트 비활성화
      char message[50];
      // deviceNum&readerNum&noshow 형식으로 메시지 저장
      snprintf(message, sizeof(message), "%s&%s&noshow", deviceNum, readerNum);
      // topic "esp32"으로 메시지 송신
       bool result = client.publish("esp32", message);
      if(result) {
          Serial.println("Message successfully published!");
          //logToFile("Message successfully published!");
      } else {
          Serial.println("Failed to publish the message.");
      }
      //Serial.println(message);
      //logToFile(message);
    }

    if (ledOff && (millis() - offTimestamp >= offDuration)) {
      ledOff = false; //// 카운트 비활성화
      char message[50];
      // deviceNum&readerNum&notag 형식으로 메시지 저장
      snprintf(message, sizeof(message), "%s&%s&notag", deviceNum, readerNum);
      // topic "esp32"으로 메시지 송신
      client.publish("esp32", message);
    }
    vTaskDelay(100 / portTICK_PERIOD_MS); // delay를 줄이기 위해
  }
}

void setup() {
  pinMode(2, OUTPUT); 
  strip.begin();
  strip.show();
  pinMode(movePin, OUTPUT);
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqttServer, mqttPort);
  client.setCallback(handleReceivedMessage);

  xTaskCreatePinnedToCore(
    handleLEDActions, 
    "LEDActionTask",       
    4096,                  
    NULL,                  
    1,                     
    &countdownTask,        
    0                      
  );
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
 
  client.loop();
}
