# WaitWeight

> 💪태그 장치를 활용한 헬스장 기구 실시간 예약 IoT 서비스💪

헬스장에서 헬스 기구 이용에 눈치본적이 있나요?

퇴근 후 사람이 많은 헬스장에서 기구 이용에 불편함을 느낀 적이 있나요?

**WaitWeight**은 헬스장 이용 고객들에게는 **헬스 기구 예약** 기능을 제공하고 헬스장 관리자에게는 **헬스 기구 관리** 기능을 제공해줍니다.

더 이상 눈치보지 말고 운동하세요!!

![WaitWeight](https://github.com/lg960214/SSAFY_common/assets/46098797/e799a39b-3f8b-453a-a0ec-312070bd0ab0)


## 💡 주요기능

| 구분 | 기능           | 설명                                                     |
| ---- | -------------- | -------------------------------------------------------- |
| 1    | 운동 기구 예약                 | 제공 받은 웨어러블 이용하여 리더기에 태그 시 운동기구 예약 
| 2    | 실시간 대기 현황 제공 | Iot 기기와는 MQTT 프로토콜을 클라이언트와는 SSE(Server-Sent-Event)를 활용하여 예약 시 실시간으로 변경 된 예약 현황을 볼 수 있도록 제공 |예약                                                              |
| 3    | 운동 기록 제공      | 사용자의 운동 기록을 캘린더로 확인 가능, 월 별 운동 통계 제공                                        |
| 4    | 헬스장 관리         | 헬스장의 기구 및 회원에 대한 관리가 가능하도록 서비스 제공  |


## 💡 부가기능

| 구분 | 기능           | 설명                                                     |
| ---- | -------------- | -------------------------------------------------------- |
| 1    | 현재 헬스장 이용객 수 제공  | 현재 헬스장을 이용 중인 고객의 수를 제공합니다.                        |
| 2    | 기구의 이전 혼잡도 정보 제공 | 선택한 기구의 1,2,3주전의 해당 시간대의 혼잡도 정보 제공  |
                  

## 🖥️ 서비스 화면

### 메인화면(반응형 페이지로 모바일은 이용자, 웹페이지는 관리자)

<p align="center">  
<img src="https://github.com/lg960214/SSAFY_common/assets/46098797/35f7df98-f3b9-4c4e-b8e6-057683ef2ba1"  >

</p>

---
<br>

### 회원관리 페이지(관리자)

<p align="center">  
<img src="https://github.com/lg960214/SSAFY_common/assets/46098797/3f61ee41-7377-45a4-9dff-a5c377a1ef22"  >


</p>

---
<br>

### 기구관리 페이지(관리자)
<p align="center">
<img src="https://github.com/lg960214/SSAFY_common/assets/46098797/75f1d914-8de8-4e23-b084-95086e053b02"  >
</p>

---
<br>

### 이용현황 페이지(관리자)
<p align="center">
<img src="https://github.com/lg960214/SSAFY_common/assets/46098797/4117205d-8fc2-4aa8-8445-f5cd60adfa6c"  >
</p>

---
<br>

### 대기현황 페이지(공통)

<p align="center">
<img src="https://github.com/lg960214/SSAFY_common/assets/46098797/26149a4e-b812-4c6b-b8b3-54c7904733ea">


</p>

---
<br>

### 운동기록 조회 페이지(사용자)

<p align="center">
<img src="https://github.com/lg960214/SSAFY_common/assets/46098797/82d28b01-71e4-45d4-96e6-5dba19039e9f">

</p>

---
<br>

### 운동기록 월별 통계 페이지(사용자)

<p align="center">
<img src="https://github.com/lg960214/SSAFY_common/assets/46098797/21694ca6-2a54-469b-a455-7a3171faf0fe"/>


</p>

---
<br>

### 기구 검색 페이지(사용자)

<p align="center">
<img src="https://github.com/lg960214/SSAFY_common/assets/46098797/f1a70d92-4306-494c-b4a6-0b8be118982b"/>


</p>

## 태그 로직 Flow Chart

![TagLogic](https://github.com/lg960214/SSAFY_common/assets/46098797/9b03c9d8-af2c-4f8c-8e00-4eb825494749)

## 🐳 아키텍처

![Architecture](https://github.com/lg960214/SSAFY_common/assets/46098797/98071af2-352c-40e2-a49b-ac6b1f84a73a)

## 🛠️ 기술스택

`Backend`

- IntelliJ IDE
- Java Open-JDK zulu `1.8.0_192`
- SpringBoot `2.7.13`
    - Maven `4.0.0`
    - jbcrypt  `0.4`
    - jjwt `0.9.1`
    - Swagger `1.6.11`
    - lombok
    - JPA

`Data`
- MYSQL


`Frontend`

- React `18.2.0`
- TypeScript `5.0.2`
- Vite `4.4.0`
- tailwindcss `3.3.3`

`IoT`
- Mosquitto `1.6.9`
- ESP32
    - `DM2285`
    - `WROOM-32`
- Arduino IDE `2.1.1`

`Infra`

- Mobaxterm
- AWS EC2
- Nginx
- Jenkins
- Docker


`etc`

- Gitlab
- Notion
- Jira
- Mattermost

## 📅 프로젝트 진행 기간

2023.07.10 - 2023.08.20 (7주간 진행)

## 👨‍💻 팀원 소개

![image](https://github.com/lg960214/SSAFY_common/assets/46098797/af4cfe5a-3003-458c-97ab-d1052aaf6ef9)

