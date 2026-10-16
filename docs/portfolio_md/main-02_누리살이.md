# [MAIN-02] 누리살이 (GameAIfy AI 기술상 수상작)

> **문서 안내**: 기존 `projects/project-02-nuri.html`에 임의로 작성되어 있던 AI 창작 문구를 배제하고, **`MDGroup/03_Resources/프로젝트 참고/누리살이/Notion/`과 취업 준비 문서**, 그리고 **Google Drive 공모전 제출 원본(`현명한 청년들_기획서.pdf`, `현명한 청년들_에셋리스트.pdf`, `현명한 청년들_증빙자료.pdf`, `현명한 청년들_플레이 영상.mp4`)**에서 확인된 실제 개발 사실만으로 작성한 상세 문서입니다.

---

## 1. 카드 요약 정보 (메인 페이지 및 상단 히어로 노출용)

- **프로젝트명**: 누리살이 (`Nurisari`)
- **수상 내역**: **GameAIfy AI 기반 게임제작 공모전 2025 `AI 기술상` 수상** (2025.09.15, 앵커노드 주최 / 참가 팀명: `현명한 청년들(WISE YOUTH)`)
- **한 줄 소개**: 7단계 곡물 정제(도정)와 운반 대기열(`BuildingQueue`) 자동화, 강화소(`Forge UI`), 도감 수집을 하나의 성장 루프로 구현하고 AI 제작 파이프라인의 한계를 기술적으로 극복해 공모전 AI 기술상을 수상한 2D 방치형 게임
- **분류**: 2D 농사·곡물 정제 기반 방치형/클리커 시뮬레이션 게임 (`Unity 6.0`)
- **진행 기간 및 학기**: 2학년 하계방학 (`2025.06 ~ 2025.08` / 집중 개발 일지 `2025.07.15 ~ 2025.08.31`, 최종 수상 `2025.09.15`)
- **참여 인원 및 담당 역할**: 2인 팀 프로젝트 (`현명한 청년들`: 조준수, 조완우) — **프로젝트 매니저(PM) · 메인 프로그래머(리드 개발자)** (핵심 루프 기획, 7단계 건물 전이·`BuildingQueue` 대기열·`Forge UI` 강화소·도감·선형 미션/대화·세이브/오프라인 보상 시스템 전담 구현, 밸런싱, 홍보 영상 제작)
  - `[확인 필요: 메인 카드에 표기할 정확한 본인 기여도 수치(%) 확정]`
- **핵심 기술 태그**: `#Unity6` `#C#` `#ScriptableObject` `#BuildingQueue` `#방치형자동화` `#GameAIfy` `#Udio` `#AI기술상`
- **외부 링크 및 증빙 경로**:
  - **Google Drive 공모전 제출 폴더 (`2025 GameAify 공모전`)**: [https://drive.google.com/drive/folders/1rjeZ_7pTQD0LA6gi8YFiXn-aO8zhfR0r?usp=drive_link](https://drive.google.com/drive/folders/1rjeZ_7pTQD0LA6gi8YFiXn-aO8zhfR0r?usp=drive_link)
    - **공식 기획서 PDF (`현명한 청년들_기획서.pdf`)**: [https://drive.google.com/file/d/1HTh0tr88M5W5NuMBjVj4bVfie03aJ72s/view?usp=drive_link](https://drive.google.com/file/d/1HTh0tr88M5W5NuMBjVj4bVfie03aJ72s/view?usp=drive_link)
    - **개발 일지 및 AI 활용 증빙자료 PDF (`현명한 청년들_증빙자료.pdf`)**: [https://drive.google.com/file/d/1teIQwFexBMw1RThzQ0LEyH3dkeSaUohz/view?usp=drive_link](https://drive.google.com/file/d/1teIQwFexBMw1RThzQ0LEyH3dkeSaUohz/view?usp=drive_link)
    - **AI 생성 에셋 리스트 PDF (`현명한 청년들_에셋리스트.pdf`)**: [https://drive.google.com/file/d/1hKJnkVEsGxN1v3w64d5fy-Gag632CgYo/view?usp=drive_link](https://drive.google.com/file/d/1hKJnkVEsGxN1v3w64d5fy-Gag632CgYo/view?usp=drive_link)
    - **인게임 플레이 영상 (`현명한 청년들_플레이 영상.mp4`, 145.7MB)**: [https://drive.google.com/file/d/1d7AEnCYodCg1QVBBF5FjoElMdFnXo1Tx/view?usp=drive_link](https://drive.google.com/file/d/1d7AEnCYodCg1QVBBF5FjoElMdFnXo1Tx/view?usp=drive_link)
    - **실행 게임 빌드 (`현명한 청년들_게임빌드.zip`, 99.3MB)**: [https://drive.google.com/file/d/1i7GT-XDToGwggMsS2VX0tp0ZpJReJHr-/view?usp=drive_link](https://drive.google.com/file/d/1i7GT-XDToGwggMsS2VX0tp0ZpJReJHr-/view?usp=drive_link)
  - **MDGroup 원본 근거 문서**:
    - 노션 포트폴리오 요약: `MDGroup/03_Resources/프로젝트 참고/누리살이/Notion/누리살이__363ab24d893b8063affed9d133337fc5.md`
    - 넥토리얼 노션 포트폴리오 및 지원서: `MDGroup/02_Areas/커리어/취업 준비/넥토리얼/넥토리얼_노션_포트폴리오_첫페이지.md`, `넥토리얼 실제 지원서.md`

---

## 2. 목차 (ON THIS PAGE)

1. [경험 평가와 배운 점 (BEFORE / AFTER)](#growth)
2. [프로젝트 개요 및 세계관·기획 의도](#overview)
3. [핵심 게임 규칙과 7단계 곡물 정제·자동화 루프](#mechanics)
4. [담당 역할 및 핵심 기여](#role)
5. [C# 시스템 아키텍처 및 AI 제작 파이프라인](#architecture)
6. [문제 해결 및 트러블슈팅 사례 (클라이언트 & AI 파이프라인)](#troubleshooting)
7. [핵심 결과물 및 시연 자료 목록](#showcase)
8. [배운 점과 아쉬운 점 / 회고](#takeaways)

---

## 3. 경험 평가와 배운 점 (`#growth` — BEFORE / AFTER)

### 수행 전 (BEFORE: 직면한 과제와 한계)
- **2인 소규모 팀의 리소스 한계와 AI 툴의 제약**: 2인 체제로 농사·도정 시설 7단계, 일꾼, 도감, UI, 사운드를 모두 제작해야 했으며, `GameAIfy`로 생성한 UI는 통짜 이미지로 출력되어 인게임에서 크기 조절·재사용이 불가능했고 `Open Pose` 기능 부재로 캐릭터 애니메이션 제작이 막히는 문제가 있었습니다.
- **데이터 변경과 UI 갱신의 결합 문제**: 재화, 건물/알바 강화 단계, 도감 해금, 미션 진행도가 실시간으로 변하는 방치형 게임 특성상, 초기에는 `UniRx` 같은 반응형 구독 구조를 도입하지 못해 데이터 변경 시마다 UI의 `Load` 함수를 수동 호출하는 높은 결합도를 겪었습니다.

### 수행 후 (AFTER: 달성한 성과 및 역량 성장)
- **`ScriptableObject` 분리 설계 및 `BuildingQueue` 파이프라인 구축**: 정적 템플릿(`ScriptableObject`)과 런타임 진행 데이터를 분리하고, `[드랍 생성 → 운반 알바 픽업 → 다음 건물 대기열(BuildingQueue) 등록 → 정제 후 재드랍]`으로 이어지는 7단계 자동화 파이프라인과 오프라인 보상·세이브 무결성을 완성했습니다.
- **AI 파이프라인 한계 돌파 및 `AI 기술상` 수상**: 클립 스튜디오(Clip Studio Paint) 아웃라인 분할로 모듈형 UI를 구축하고, `GameAIfy Creative Reference`와 `Cartoon FX`를 결합해 모션 애니메이션을 구현하며 `Udio` AI로 BGM/효과음까지 통합해 **GameAIfy 공모전 `AI 기술상`**을 수상했습니다.

---

## 4. 개요 및 기획 의도 (`#overview`, `#mechanics`)

### 4.1 기획 의도 및 세계관 (`#overview`)
- **'마비노기 모바일' 생활 콘텐츠 모티브의 방치형 재해석**: 평소 즐겨 플레이하던 게임의 채집·가공 생활 콘텐츠에서 느낀 성취감을 모티브로, 바쁜 현대인이 짧은 조작과 방치만으로도 생산 라인이 돌아가는 시각적 만족감을 느낄 수 있는 힐링 방치형 시뮬레이션을 기획했습니다.
- **세계관 스토리**: 마력 폭주로 황폐해진 대지에서 유일하게 정화의 힘을 지닌 마법의 벼 **'청벼'**를 발견한 주인공이, 정령들과 함께 벼를 수확하고 **7단계의 정제(도정) 과정**을 거쳐 고품질 곡물로 가공하며 오염된 땅과 생태계를 되살려 나가는 이야기입니다.

### 4.2 핵심 게임 규칙 및 7단계 정제·자동화 루프 (`#mechanics`)
단순 클릭만으로 숫자가 오르는 클리커를 넘어, **건물 간 물류 이동과 7단계 도정 공정**이 맞물려 돌아가는 구조로 설계했습니다.

```text
[1단계: 수확] ➔ [2단계: 건조] ➔ [3단계: 탈곡] ➔ [4단계: 왕겨 제거]
   ➔ [5단계: 미강 제거] ➔ [6단계: 세척 및 살균] ➔ [7단계: 마법 부여]
       ↓
[고품질 곡물 도감(Collection) 등록 & 상위 탐색 생명체/알바 해금 & 재투자]
```

1. **클리커 & 자동 수확 정령**:
   - 플레이어가 논을 직접 클릭해 벼를 수확하거나, 소환된 정령이 일정 주기로 자동 수확을 수행합니다. 클리커 강화 시 1회 수확량과 도감 수집 확률 보정이 증가합니다.
2. **7단계 정제 건물과 전이 확률**:
   - 수확된 작물은 건조 → 탈곡 → 왕겨 제거 → 미강 제거 → 세척·살균 → 마법 부여의 7단계 건물을 거치며 가치가 상승합니다.
   - 각 건물을 강화하면 **가공된 곡물의 가치**, **신규 도감 등장 확률**, 그리고 **다음 단계 건물로 넘어갈 전이(Transfer) 확률**이 증가합니다.
3. **운반 생명체(알바)와 건물 대기열(`BuildingQueue`)**:
   - 각 공정에서 배출된 드랍 아이템을 운반 생명체(알바)가 픽업하여 다음 단계 건물의 대기열(`BuildingQueue`)로 운반합니다.
4. **강화소(`Forge UI`)와 선형 미션·대화 체인**:
   - 건물 클릭 시 열리는 통합 허브인 `Forge UI`에서 **클리커 / 건물 / 알바**를 한눈에 강화·해금할 수 있으며, 약 8개 챕터 분량의 선형 미션과 NPC 대화 스토리가 성장을 가이드합니다.

---

## 5. 담당 역할 및 핵심 기여 (`#role`)

### 2인 팀 (`현명한 청년들`) 역할 분담
- **조준수 (본인 — 프로젝트 매니저(PM) & 메인 프로그래머)**:
  - **PM 및 총괄 기획**: 전체 게임 루프 및 7단계 정제 시스템 기획, 개발 일정/마일스톤 관리(`2025.07.15 ~ 08.31`), 공모전 중간 미션 및 최종 제출 문서(`기획서`, `증빙자료`, `에셋리스트`) 작성, 플레이 영상 촬영 및 발표
  - **클라이언트 시스템 프로그래밍 (`Unity 6.0 / C#` 전담)**:
    - **`ScriptableObject` 기반 아키텍처**: 건물(`Building`) 및 일꾼(`Worker`)의 정적 템플릿 SO와 런타임 세이브 데이터를 분리 설계 (`07.15 ~ 07.25`)
    - **드랍·운반·건물 대기열(`BuildingQueue`) 파이프라인**: 드랍 아이템 생성 → 알바 픽업 → 다음 건물 대기열 등록 → 가공 완료 후 재드랍으로 이어지는 전이 파이프라인 및 큐 만석 시 재시도/자원 환산 예외 처리 구현 (`07.26 ~ 08.05`)
    - **강화소(`Forge UI`) 및 비용 스케일링**: 건물 클릭 연동 강화소 허브 UI 및 단계별 강화 비용/성능 스케일링 로직 구현 (`08.06 ~ 08.13`)
    - **도감(`Collection`) 및 선형 미션·대화 체인**: 곡물 등급별 도감 해금·보상 시스템과 미션↔NPC 대화가 선형으로 이어지는 스토리 체인(중복 수령 방지, CPS 텍스트 출력 속도 조절) 구현 (`08.14 ~ 08.25`)
    - **오프라인 방치 보상·사운드·빌드 폴리싱**: 미접속 시간 기반 오프라인 보상 정산, `Udio` AI 기반 BGM/효과음 매니저 연동, 화면 비율 고정·윈도우 모드·`VSync`·`ESC` 종료 패널 등 최종 빌드 안정화 (`08.26 ~ 08.31`)
- **조완우 (팀원 — 아트 & 연출 담당)**:
  - 캐릭터/건물 페르소나 기획 및 `GameAIfy` 기반 2D 에셋 생성·후가공
  - 환경설정 UI 리소스, 클립 스튜디오 UI 분할 리소스, 캐릭터 스프라이트 애니메이션 및 `Cartoon FX` 이펙트 연출

---

## 6. C# 시스템 아키텍처 및 AI 제작 파이프라인 (`#architecture`)

### 6.1 주요 클라이언트 구현 구조
1. **`ScriptableObject` 템플릿과 런타임 데이터의 분리**:
   - 건물 7종과 일꾼(알바), 도감 아이템의 기본 능력치·해금 조건·아이콘 참조는 불변 `ScriptableObject` 템플릿으로 관리하고, 플레이 중 변동되는 레벨·해금 여부·보유 수량은 런타임 데이터 클래스로 분리하여 밸런싱 수정과 세이브/로드 무결성을 확보했습니다.
2. **`BuildingQueue` 기반 물류 전이 파이프라인**:
   - 이전 건물에서 가공이 끝난 곡물이 드랍되면 유휴 상태의 운반 알바가 이를 탐색해 픽업하고, 다음 단계 건물의 `BuildingQueue`에 등록합니다.
   - 만약 다음 건물의 큐가 가득 찬(Full) 상태라면 대기 후 재시도하며, 전이 실패 또는 큐 초과 시에는 즉시 재화(자원)로 환산 처리하여 아이템 증발이나 데드락이 발생하지 않도록 방어했습니다.
3. **선형 미션 ↔ NPC 대화 체인 시스템**:
   - 특정 건물 해금, 강화 달성, 오프라인 보상 확인 등의 미션 조건이 충족되면 대응하는 NPC 대화 스크립트가 해금되고, 대화 및 보상 수령이 끝나면 다음 미션으로 자동 전이되는 선형 체인을 구축했습니다.

### 6.2 AI 제작 파이프라인 (`GameAIfy` · `Udio` · `Gemini`)
- **2D 그래픽 (`GameAIfy` + `Clip Studio Paint`)**: 배경, 7단계 도정 건물, 농작물 아이콘, 정령·운반 생명체, UI 프레임을 `GameAIfy`로 생성하고 클립 스튜디오로 후가공했습니다.
- **사운드 (`Udio` AI)**: 인게임 배경음악(BGM)과 수확·강화·버튼 클릭 등 효과음(SFX)을 음악 생성 AI인 **`Udio`(`http://Udio.com`)**로 제작해 저작권 이슈 없는 오리지널 사운드를 구축했습니다.
- **이펙트 및 폰트**: `Cartoon FX Remaster Free` 파티클과 오픈 폰트 `학교안심 둥근미소`를 결합해 시각적 완성도를 높였습니다.

---

## 7. 문제 해결 및 트러블슈팅 사례 (`#troubleshooting`)

### 사례 1. 잔존 세이브 데이터 충돌 및 운반 알바 방향(`flipX`)·해상도 버그 수정
- **발생 문제 (`증빙자료 개발일지 08.26~08.31`)**:
  1. 게임을 재시작하거나 초기화할 때 이전 세션의 잔존 세이브 데이터가 남아 해금 상태나 미션 진행도가 꼬이는 이슈가 발생했습니다.
  2. 운반 생명체(알바)가 건물 사이를 왕복 이동할 때 이동 방향과 스프라이트 시선 방향이 반대로 뒤집히거나 스케일이 깨지는 현상이 나타났습니다.
  3. 모니터 환경에 따라 화면 비율이 무너지거나 창 모드 전환 시 UI가 잘리는 문제가 있었습니다.
- **해결 과정**:
  1. 세이브 데이터 로드/초기화 시점에 잔존 데이터를 검증·정리하는 방어 로직과 미션 보상 중복 수령 방지 플래그를 추가했습니다.
  2. 알바의 이동 목표 벡터에 따라 `SpriteRenderer.flipX`와 로컬 스케일을 일관되게 보정하도록 이동 컨트롤러를 수정했습니다.
  3. 해상도 비율 유지 로직과 윈도우 모드 전환, `VSync` 토글 옵션, `ESC` 종료(`Quit`) 확인 패널을 추가해 PC 빌드 안정성을 확보했습니다.

### 사례 2. `GameAIfy` 통짜 UI 생성 한계와 `Open Pose` 부재를 후가공 워크플로우로 해결
- **발생 문제 (`증빙자료 AI 한계 극복 사례`)**:
  1. **UI 모듈화 불가**: `GameAIfy`에 UI를 요청하면 텍스트와 버튼이 하나로 합쳐진 완성형 통짜 이미지로만 생성되어, Unity에서 버튼 크기를 늘리거나 레이아웃을 재구성할 수 없었습니다.
  2. **캐릭터 모션 생성 한계**: 기존에 기대했던 `Open Pose` 모드가 제공되지 않아, 정지된 캐릭터 일러스트를 자연스러운 인게임 작업 애니메이션으로 만들기 어려웠습니다.
- **해결 과정**:
  1. **굵은 외곽선 프롬프트 + 클립 스튜디오 분할**: 프롬프트에 '굵은 선(Bold outline)' 조건을 부여해 형태가 뚜렷한 UI 에셋을 뽑은 뒤, **클립 스튜디오 페인터(Clip Studio Paint)**에서 아웃라인을 추출하고 프레임·배경·버튼 단위로 슬라이스(분할)하여 Unity UGUI에서 재조합 가능한 모듈형 UI로 탈바꿈시켰습니다.
  2. **`Creative Reference` 기반 모션 파생 + 이펙트 결합**: 원본 캐릭터 이미지를 `GameAIfy`의 **`Creative Reference`**에 입력한 뒤, '눈을 감은 모습' 프롬프트로 숨쉬기(Idle) 프레임을, '기를 모으거나 쏘는 모습' 프롬프트로 작업(Work) 프레임을 파생 생성하여 스프라이트 애니메이션으로 연결하고, 여기에 `Cartoon FX Remaster Free` 이펙트를 얹어 생동감 있는 생산 연출을 완성했습니다.

### 사례 3. 데이터 변경 시 수동 `Load` 호출로 인한 UI 결합도 성찰
- **발생 문제 및 회고**: 방치형 게임 특성상 재화, 건물 레벨, 대기열 상태가 매 순간 변했으나, 당시에는 반응형 구독 구조(`UniRx` 등)를 쓰지 못해 데이터 변경 지점마다 UI 갱신용 `Load` 함수를 수동으로 호출했습니다.
- **후속 프로젝트로의 발전**: 이 경험을 통해 데이터와 UI의 느슨한 결합(Decoupling)이 왜 필수적인지 체감했으며, 이후 3학년 프로젝트(`내 약국에는 정상이 없다`, `RootMarket`)에서 C# `event`/`Action` 브로드캐스팅과 `R3` 기반 MVVM 아키텍처를 도입하는 직접적인 밑거름이 되었습니다.

---

## 8. 핵심 결과물 및 시연 자료 목록 (`#showcase`)

- **완성된 Unity 6.0 기반 2D 방치형 게임 '누리살이' PC 빌드**: 7단계 정제 건물, `BuildingQueue` 운반 파이프라인, `Forge UI` 강화소, 도감, 선형 미션/대화, 오프라인 보상이 모두 구현된 실행 빌드
- **공모전 수상**: `GameAIfy AI 기반 게임제작 공모전 2025` **AI 기술상** 수상 (2025.09.15, 앵커노드)
- **Google Drive 원본 파일 직링크 목록**:
  - **공모전 전체 폴더**: [https://drive.google.com/drive/folders/1rjeZ_7pTQD0LA6gi8YFiXn-aO8zhfR0r?usp=drive_link](https://drive.google.com/drive/folders/1rjeZ_7pTQD0LA6gi8YFiXn-aO8zhfR0r?usp=drive_link)
  - **기획서 (`현명한 청년들_기획서.pdf`)**: [https://drive.google.com/file/d/1HTh0tr88M5W5NuMBjVj4bVfie03aJ72s/view?usp=drive_link](https://drive.google.com/file/d/1HTh0tr88M5W5NuMBjVj4bVfie03aJ72s/view?usp=drive_link)
  - **개발 일지 & AI 한계 극복 증빙 (`현명한 청년들_증빙자료.pdf`)**: [https://drive.google.com/file/d/1teIQwFexBMw1RThzQ0LEyH3dkeSaUohz/view?usp=drive_link](https://drive.google.com/file/d/1teIQwFexBMw1RThzQ0LEyH3dkeSaUohz/view?usp=drive_link)
  - **에셋 리스트 (`현명한 청년들_에셋리스트.pdf`)**: [https://drive.google.com/file/d/1hKJnkVEsGxN1v3w64d5fy-Gag632CgYo/view?usp=drive_link](https://drive.google.com/file/d/1hKJnkVEsGxN1v3w64d5fy-Gag632CgYo/view?usp=drive_link)
  - **인게임 플레이 영상 (`현명한 청년들_플레이 영상.mp4`)**: [https://drive.google.com/file/d/1d7AEnCYodCg1QVBBF5FjoElMdFnXo1Tx/view?usp=drive_link](https://drive.google.com/file/d/1d7AEnCYodCg1QVBBF5FjoElMdFnXo1Tx/view?usp=drive_link)
  - **게임 실행 빌드 (`현명한 청년들_게임빌드.zip`)**: [https://drive.google.com/file/d/1i7GT-XDToGwggMsS2VX0tp0ZpJReJHr-/view?usp=drive_link](https://drive.google.com/file/d/1i7GT-XDToGwggMsS2VX0tp0ZpJReJHr-/view?usp=drive_link)

---

## 9. 배운 점과 아쉬운 점 / 회고 (`#takeaways`)

- **배운 점 (Learned)**:
  - **풀 사이클 개발 완주와 수상**: 기획부터 `ScriptableObject` 데이터 설계, `BuildingQueue` 물류 자동화 구현, 빌드 폴리싱, 공모전 입상(`AI 기술상`)까지 전 과정을 PM이자 메인 프로그래머로 완주하며 큰 자신감을 얻었습니다.
  - **도구의 한계를 엔지니어링·워크플로우로 보완하는 자세**: AI 도구(`GameAIfy`, `Udio`)가 만능이 아니라는 점을 직시하고, 프롬프트 제어·클립 스튜디오 슬라이싱·`Creative Reference` 파생 모션 등 실무에 쓸 수 있는 형태로 가공해 파이프라인에 녹여내는 방법을 체득했습니다.
- **아쉬운 점 (Lacked)**:
  - **반응형 UI 아키텍처의 부재**: 데이터 변경 시마다 수동으로 UI의 `Load` 함수를 호출했던 강한 결합 구조가 가장 큰 기술적 아쉬움으로 남았으며, 이는 후속 프로젝트에서 이벤트 기반 아키텍처와 MVVM 패턴을 도입하는 결정적 계기가 되었습니다.
  - **콘텐츠 볼륨 조절**: 방학 일정 내에 7단계 곡물 정제 루프의 완성도를 높이기 위해 초기에 구상했던 '벌목', '채광' 등 타 생활 콘텐츠까지 확장하지 못한 점이 아쉬움으로 남습니다.
