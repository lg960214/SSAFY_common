#include <WiFi.h>
#include <PubSubClient.h>
#include <Adafruit_NeoPixel.h>
#include <HTTPClient.h>
#include <SPIFFS.h>

//const int BOOT_BUTTON_PIN = 0;  // Boot 버튼의 GPIO 번호

/*
// 로깅 한수 정의
void initFileSystem() {
    if (!SPIFFS.begin(true)) {
        Serial.println("An error occurred while mounting SPIFFS");
        return;
    }
}

// SPIFFS 초기화
void logToFile(const String& message) {
    File logFile = SPIFFS.open("/log.txt", "a");
    if (!logFile) {
        Serial.println("Failed to open log file for writing");
        return;
    }
    logFile.println(message);
    logFile.close();
}
*/
// 네트워크 및 MQTT 정보 설정
const char* ssid = "alveo";
const char* password = "905612yy@@";
const char* mqttServer = "13.124.11.62"; // MQTT 브로커의 IP 주소
const int mqttPort = 1883; // MQTT 브로커의 포트 번호
const char* clientId = "band1";

// 핀 번호 설정
const int movePin = 17; // 진동센서가 연결된 핀 번호
#define LED_PIN    2   // 연결된 GPIO 핀 번호
#define LED_COUNT  8   // LED의 개수
Adafruit_NeoPixel strip(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800);

// 장치 및 리더 번호 설정
const char* deviceNum = "f566c3a3"; // 53E26709
const char* readerNum = "2222";     // 2222


WiFiClient espClient;
PubSubClient client(espClient);

bool ledBlinking = false;
//bool moving = false;

bool ledOn = false;
unsigned long ledOnTime = 0;
//const unsigned long duration = 2 * 60 * 1000; // 2 minutes in milliseconds
const unsigned long duration = 10 * 1000; // 

bool ledOff = false;
unsigned long offTimestamp = 0;
const unsigned long offDuration = 20 * 60 * 1000;

TaskHandle_t countdownTask; // Task handle for the countdown task


// WiFi 연결 설정
void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}


// HTTP GET 요청 보내기
void sendGetRequest(const String& deviceCode) {
  HTTPClient http;
  String url = "https://i9a104.p.ssafy.io/api/tags?deviceCode=" + deviceCode;
  http.begin(url);

  int httpResponseCode = http.GET();
  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.println("HTTP Response code: " + String(httpResponseCode));
    logToFile("HTTP Response code: " + String(httpResponseCode));
    Serial.println("Response: " + response);
  } 
  else {
    Serial.println("Error on sending GET request: " + String(httpResponseCode));
    sendGetRequest(deviceCode);
  }
  
  http.end();
}


// MQTT 메시지 콜백 함수
void handleReceivedMessage(char* topic, byte* payload, unsigned int length) {
  String message;
  for (int i = 0; i < length; i++) {
    message += (char)payload[i];
  }

  Serial.print("Message received in topic: ");
  Serial.println(topic);
  Serial.print("Message: ");
  Serial.println(message);
  logToFile("message");

  if (message == "your turn") {
    ledBlinking = true;
    ledOn = true;
    ledOnTime = millis();
  } 
  else if (message == "off") {
    ledBlinking = false;
    for (int i = 0; i < strip.numPixels(); i++) {
      strip.setPixelColor(i, 0);  // LED를 끕니다.
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
    Serial.print("Attempting MQTT connection...");
    if (client.connect(clientId)) {
      Serial.println("connected");
      client.subscribe(deviceNum);  // Topic
      digitalWrite(2, HIGH);
    } 
    else {
      digitalWrite(2, LOW);
      Serial.print("failed, rc=");
      logToFile("MQTT fail");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
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
      strip.setPixelColor(currentLED, 0);  // LED를 끕니다.
      strip.show();
      digitalWrite(movePin, LOW);
      currentLED = (currentLED + 1) % strip.numPixels();  // 다음 LED로 이동
    }
    if (ledOn && (millis() - ledOnTime >= duration)) {
      for (int i = 0; i < strip.numPixels(); i++) {
        strip.setPixelColor(i, 0);  // LED를 끕니다.
      }
      strip.show();
      Serial.println("noshownoshow");
      digitalWrite(movePin, LOW);
      ledBlinking = false;
      ledOn = false;  // 카운트 비활성화
      char message[50];
      // deviceNum&readerNum&noshow 형식으로 메시지 저장
      snprintf(message, sizeof(message), "%s&%s&noshow", deviceNum, readerNum);
      // topic "esp32/status"으로 메시지 송신
       bool result = client.publish("esp32", message);
      if(result) {
          Serial.println("Message successfully published!");
          //logToFile("Message successfully published!");
      } else {
          Serial.println("Failed to publish the message.");
      }
      Serial.println(message);
      //logToFile(message);
      // HTTP GET 요청 보내기
      sendGetRequest(deviceNum);
      Serial.println("stop");
    }

    if (ledOff && (millis() - offTimestamp >= offDuration)) {
      ledOff = false; //// 카운트 비활성화
      char message[50];
      // deviceNum&readerNum&notag 형식으로 메시지 저장
      snprintf(message, sizeof(message), "%s&%s&notag", deviceNum, readerNum);
      // topic "esp32/status"으로 메시지 송신
      client.publish("esp32", message);
    }
    vTaskDelay(100 / portTICK_PERIOD_MS); // delay를 줄이기 위해
  }
}
/*
void printLogFileToSerial() {
    File logFile = SPIFFS.open("/log.txt", "r");
    if (!logFile) {
        Serial.println("Failed to open log file for reading");
        return;
    }

    while (logFile.available()) {
        Serial.write(logFile.read());
    }
    logFile.close();
}
*/
void setup() {
  pinMode(2, OUTPUT); 
  // Boot 버튼 설정
  //pinMode(BOOT_BUTTON_PIN, INPUT_PULLUP);  // 내부 풀업 저항 사용
  //initFileSystem();
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
  /*
  if (digitalRead(BOOT_BUTTON_PIN) == LOW) {
        printLogFileToSerial();
        delay(1000);  // 버튼 디바운싱과 연속적인 호출을 방지하기 위한 딜레이
    }
  */
  client.loop();
}