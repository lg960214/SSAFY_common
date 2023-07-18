## ✔️ Commit Convention

### 1. Commit Message Structure

|   개요    |             설명             |
| :-------: | :--------------------------: |
| 작성 방법 | **`깃모지_내용_(이슈번호)`** |
|   예제    |  :art: 코드 수정 ([#234]())  |
|   코드    | **`:art: 코드 수정 (#234)`** |

### 2. Commit Type : 깃모지

- 필요 기능 발견 시 담당자에게 건의
- [참고](https://gitmoji.dev/) : IntelliJ, VSCode에서도 연동 가능

| 아이콘 |             코드             |           설명            |                  원문                   |
| :----: | :--------------------------: | :-----------------------: | :-------------------------------------: |
|   🎨   |           `:art:`            |   코드의 구조/형태 개선   | Improve structure / format of the code. |
|  ⚡️   |           `:zap:`            |         성능 개선         |          Improve performance.           |
|   🔥   |           `:fire:`           |      코드/파일 삭제       |          Remove code or files.          |
|   🐛   |           `:bug:`            |       **버그 수정**       |               Fix a bug.                |
|   🚑   |        `:ambulance:`         |         긴급 수정         |            Critical hotfix.             |
|   ✨   |         `:sparkles:`         |        **새 기능**        |         Introduce new features.         |
|   📝   |           `:memo:`           |      문서 추가/수정       |      Add or update documentation.       |
|   💄   |         `:lipstick:`         | UI/스타일 파일 추가/수정  |  Add or update the UI and style files.  |
|   🎉   |           `:tada:`           |       프로젝트 시작       |            Begin a project.             |
|   ✅   |     `:white_check_mark:`     |   **테스트 추가/수정**    |          Add or update tests.           |
|   🔒   |           `:lock:`           |      보안 이슈 수정       |          Fix security issues.           |
|   🔖   |         `:bookmark:`         |   **릴리즈/버전 태그**    |         Release / Version tags.         |
|   💚   |       `:green_heart:`        |       CI 빌드 수정        |              Fix CI Build.              |
|   📌   |         `:pushpin:`          |   특정 버전 의존성 고정   | Pin dependencies to specific versions.  |
|   👷   |   `:construction_worker:`    | CI 빌드 시스템 추가/수정  |     Add or update CI build system.      |
|   📈   | `:chart_with_upwards_trend:` | 분석, 추적 코드 추가/수정 | Add or update analytics or track code.  |

### 3. Commit Type : 내용

- 선택사항
- **`어떻게`** 보다는 **`'무엇을'`, `'왜'`** 변경했는 지에 대해 작성
- 72자를 넘기지 말기

### 4. Commit Type : 이슈번호

- 선택사항
- Issue Tracker ID를 작성
- 여러 개의 이슈번호는 **`,`** 로 구분

---
