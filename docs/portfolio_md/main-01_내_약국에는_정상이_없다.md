# [MAIN-01] 내 약국에는 정상이 없다. (Project Pharmacy)

> **문서 안내**: 기존 `projects/project-01-pharmacy.html`에 들어 있던 AI 임의 창작 내용(16종 시약 비트마스크 해시 `O(1)` 룩업, `BrewingStation` 비커 믹싱 셰이더, 지하 조제실 씬 전환 데이터 유실 등)을 전량 폐기하고, **`MDGroup/01_Projects/Project Pharmacy`의 노션 포트폴리오 요약·기술 명세서·전체 코드 리뷰·개발 리포트·회의록** 및 **Google Drive 실제 빌드 폴더**에서 확인된 사실만으로 작성한 상세 문서입니다.

---

## 1. 카드 요약 정보 (메인 페이지 및 상단 히어로 노출용)

- **프로젝트명**: 내 약국에는 정상이 없다. (`Project Pharmacy`)
- **한 줄 소개**: 손님의 증상과 대사를 파악해 알맞은 약을 처방하고, 하루의 영업 흐름을 운영하는 1인칭 약국 경영 시뮬레이션
- **분류**: 3D 1인칭 약국 경영 시뮬레이션 / 캐주얼 타이쿤 (`Unity 3D`)
- **진행 기간 및 학기**: 3학년 1학기 (`2026.03 ~ 2026.06`, 넥토리얼 포트폴리오 기준 `2026.03 ~ 2026.07`)
- **참여 인원 및 담당 역할**: 4인 팀 프로젝트 — **팀장 · 리드 개발자** (핵심 플레이 루프 기획, 4계층 매니저 아키텍처 설계, 비동기 영업 시퀀스·시간·카메라·NPC 흐름 구현, 일정 관리)
  - `[확인 필요: 메인 카드에 표기할 정확한 본인 기여도 수치(%) 확정]`
- **핵심 기술 태그**: `#Unity` `#C#` `#UniTask` `#Addressables` `#Cinemachine` `#NavMesh` `#상태기반아키텍처`
- **외부 링크 및 증빙 경로**:
  - **GitHub 저장소**: [https://github.com/Junsu-git/Project-Pharmacy](https://github.com/Junsu-git/Project-Pharmacy)
  - **Google Drive 프로젝트 폴더 (실제 경로 확인 완료)**: [https://drive.google.com/drive/folders/1wyxmydYnx2T59TREeqxVTZcFlzfxh760?usp=drive_link](https://drive.google.com/drive/folders/1wyxmydYnx2T59TREeqxVTZcFlzfxh760?usp=drive_link)
    - **실행 빌드 파일 (`내 약국에는 정상이 없다.zip`, 89.4MB)**: [https://drive.google.com/file/d/1kuDcDduEBa85IN3cG91Uc1QHemjBYJhd/view?usp=drive_link](https://drive.google.com/file/d/1kuDcDduEBa85IN3cG91Uc1QHemjBYJhd/view?usp=drive_link)
    - *(※ 주의: 노션 원본 페이지에 `담다(DamDa)` 폴더 링크(`1Uul86MplhfvhWhfUq053vXwSmoJLgAEi`)가 잘못 기입되어 있었으나, Google Drive 확인을 통해 실제 약국 프로젝트 폴더로 바로잡았습니다.)*
  - **MDGroup 원본 근거 문서**:
    - 노션 포트폴리오 요약: `MDGroup/01_Projects/Project Pharmacy/포트폴리오/Notion/내 약국에는 정상이 없다__3d4ab24d893b802fbfe0d9832fd0162f.md`
    - 기술 명세 및 진척 보고서: `MDGroup/01_Projects/Project Pharmacy/Notion/Project Pharmacy - 기술 명세 및 진척 보고서 (Progress & Spec Document)__36cab24d893b80f3a8fbe4827f91a510.md`
    - 전체 코드 리뷰: `MDGroup/01_Projects/Project Pharmacy/개발 검토/프로젝트 파마시 전체 코드 리뷰.md`
    - 플레이어 상호작용 워크플로우: `MDGroup/01_Projects/Project Pharmacy/개발 검토/PLAYER_INTERACTION_MODE_WORKFLOW.md`
    - 아키텍처 및 변경점 정리: `MDGroup/01_Projects/Project Pharmacy/Notion/게임 아키텍쳐 문서__367ab24d893b804cb9f4f9d29e56960c.md`, `변경점 정리__342ab24d893b802ca21af4643ee3a9be.md`

---

## 2. 목차 (ON THIS PAGE)

1. [경험 평가와 배운 점 (BEFORE / AFTER)](#growth)
2. [프로젝트 개요 및 기획 의도](#overview)
3. [핵심 게임 규칙과 플레이 루프](#mechanics)
4. [담당 역할 및 핵심 기여](#role)
5. [C# 시스템 아키텍처 및 구현 구조](#architecture)
6. [문제 해결 및 트러블슈팅 사례](#troubleshooting)
7. [팀 협업 및 프로젝트 매니징](#collaboration)
8. [핵심 결과물 및 시연 자료 목록](#showcase)
9. [배운 점과 아쉬운 점 / 회고](#takeaways)

---

## 3. 경험 평가와 배운 점 (`#growth` — BEFORE / AFTER)

### 수행 전 (BEFORE: 직면한 문제와 한계)
- **비동기 전환 시점의 상태 충돌**: 새 게임 시작 및 다음 날 전환 시 카메라 연출, 스테이지 초기화, 시간 변화, 플레이어 입력 활성화가 서로 다른 타이밍에 동작하여 카메라 복귀가 끝나기 전에 캐릭터 이동과 시점 회전 입력이 먼저 켜지는 문제가 발생했습니다.
- **`ScriptableObject` 단일 의존의 확장성 한계**: 초기에는 손님별 외형·대사·요구 약품·난이도를 개별 `ScriptableObject` 에셋으로 묶어 관리하려 했으나, 손님 페르소나(18종)와 난이도별 대사 조합이 늘어날수록 에셋 파일 급증, 동일 외형 데이터 중복, 일괄 편집의 어려움이 발생했습니다.
- **외부 데이 사이클 에셋과 게임 시간의 분리**: 외부 오픈소스 하늘/시간 에셋(`CelestialTimeManager`)이 자체 시간 흐름으로 동작하여 게임의 24시간 영업 규칙, 일시정지, 빠른 시간 전환 연출과 맞물리지 않고 프레임 끊김이 발생했습니다.

### 수행 후 (AFTER: 달성한 구조 개선 및 역량 성장)
- **`GameManager` 중심 4계층 매니저 및 `UniTask` 비동기 시퀀스 확립**: `Booting`, `MainMenu`, `Transition`, `Playing`, `Paused`, `StageResult`, `Shopping` 상태를 명확히 분리하고, 독립 작업은 `UniTask.WhenAll`로 병렬 처리하되 선행 조건이 필요한 카메라 복귀(`SwitchCameraAsync`) 완료 후에만 `Playing` 상태로 진입하도록 실행 순서를 보장했습니다.
- **`CSVDataManager` + `NPCFactory` + `Addressables` 데이터 파이프라인 구축**: 외형 정보(`_modelDict`)와 대사·요구 약품·난이도 시나리오(`_scenarioDict`, `_scenarioByLevel`)를 CSV 테이블로 분리하고, 런타임에 `NPCFactory`가 베이스 프리팹과 `Addressables` 외형을 동적 조립하도록 개선했습니다.
- **`TimeManager` 및 `PharmacySkyboxCycleManager` 어댑터 통합**: 하루를 1,440분 단위로 관리하는 `TimeManager`의 진행률을 외부 데이 사이클 에셋의 `0~100%` 진행률로 변환하고 제어 인터페이스(`SetCycleProgress`, `SetCloudTimeScale`)를 확장해 시간·하늘·구름 연출을 일원화했습니다.

---

## 4. 개요 및 기획 의도 (`#overview`, `#mechanics`)

### 4.1 기획 의도 (`#overview`)
- **판단이 필요한 처방 경험 구현**: 단순히 정해진 정답 아이템을 기계적으로 건네는 타이쿤에서 벗어나, NPC의 독특한 증상과 대사를 확인하고 그에 맞는 약을 판단해 처방하는 플레이 경험을 구현하고자 했습니다.
- **끊김 없는 단일 공간(One-Scene) 영업 흐름 구성**: 메인 메뉴부터 영업 준비, 손님 방문, 약 처방, 컴퓨터 상점 주문, 하루 마감 정산까지 별도의 씬 로딩 화면 없이 하나의 약국 공간 안에서 자연스럽게 이어지는 심리스(Seamless) 게임 흐름을 목표로 했습니다.
- **살아 있는 약국 공간 표현**: 손님이 카운터 앞에 일렬로 줄만 서거나 약국 밖에서 기다리다 조기 퇴장하는 비현실적 구조 대신, 약국 내부로 입장해 대기·배회하다가 카운터가 비었을 때 응대가 시작되도록 구성하여 공간에 생활감을 더했습니다.

### 4.2 핵심 게임 규칙 및 플레이 루프 (`#mechanics`)
1. **하루 영업 시간 및 단계(`StagePhase`) 규칙**:
   - `Inactive` → `Preparing`(오전 08:00, 오픈 전 매장 정리 및 준비) → `Open`(오전 09:00 영업 개시, `OnShopOpened`) → `Cleanup` / `Overtime`(오후 19:00 영업 종료 가능, `OnShopClosed`) → `ForceSleep`(밤 22:00 강제 취침, `OnForceSleep`) → `Result`(하루 정산).
   - **초과근무 벌금(`CalculateOvertimePenalty`)**: 기준 시간을 넘겨 심야까지 영업을 강행할 경우 시간당 벌금(`overtimeFinePerGameHour`, 최대 상한 `maxOvertimeFine`)이 부과됩니다.
2. **가중치 및 커브 기반 손님 스폰과 응대**:
   - 스테이지별 **1~5성 증상 난이도 정수 가중치 배열**로 손님 난이도를 추첨하고, **`AnimationCurve`(`Curve.Evaluate(currentHour)`)**로 시간대별 손님 등장 강도와 스폰 예산(`spawnBudget`)을 계산합니다.
   - **오처방 부작용 및 래그돌 공황 페널티**: 잘못된 약을 처방하면 손님이 래그돌(`CustomerNpcState.Ragdolled`) 상태로 쓰러지며, 매장 안에 쓰러진 손님이 방치되어 있으면 다른 대기 손님들의 인내심 게이지(`NPCPatianceUI`)가 더 빠르게 감소합니다.
3. **원형 메뉴(`DynamicRadialMenu`) 기반 플레이어 상호작용 모드**:
   - 기본 상호작용 모드(`1: Interact` - 약 줍기, 처방, 컴퓨터 상점, 쓰레기통, 영업 개시/종료 토글) 외에, 쓰러진 NPC를 물리적으로 끌어 치우는 **래그돌 드래그 모드(`2: DragRagdoll`)**와 상점에서 구매·배송받은 오브젝트를 프리뷰로 회전·설치하는 **배치 모드(`3: PlaceObject`)**를 지원합니다.

---

## 5. 담당 역할 및 핵심 기여 (`#role`)

### 팀 구성 (4인)과 역할 구분
- **조준수 (본인 — 팀장 / 리드 개발자)**:
  - 핵심 플레이 루프 기획 및 전체 4계층 매니저 아키텍처 설계
  - `InitManager`(부팅 파이프라인), `GameManager`(상태 오케스트레이션 및 비동기 전환), `CSVDataManager`(비동기 정규식 CSV 파서) 직접 설계 및 구현
  - `TimeManager` 및 `PharmacySkyboxCycleManager`(외부 데이 사이클 에셋 어댑터 통합) 구현
  - `CameraManager`(Cinemachine 비동기 블렌딩 제어 및 타이밍 버그 수정) 구현
  - `StageManager`(난이도 가중치·`AnimationCurve` 스폰 예산·초과근무 벌금), `NPCManager`·`NPCFactory`(`Addressables` 동적 조립 및 메모리 해제) 구현
  - `PlayerController`, `PlayerInteraction`, `DynamicRadialMenu`, `PlayerRagdollDragController`, `PlayerPlacementController`, `PlayerWallet`(NUnit 단위 테스트 포함) 구현
  - Notion 마스터 대시보드 구축, 주간 스프린트/마일스톤 일정 관리, 외부 에셋 18종 라이선스 전수 검수
- **팀원 역할**:
  - **최찬우 (클라이언트 개발 & 데이터)**: System/UI(시간·정산 팝업 등) 연동 및 NPC 페르소나 시나리오 데이터 작성
  - **문선호 (기획 & 사운드 & 시나리오)**: 세계관·스토리 설정, 사운드 리서치, 18종 NPC 페르소나 및 난이도별 대사 데이터 작성
  - **조성겸 (3D 아트 & 디자인)**: 약국 인테리어, 약통·알약 프롭, NPC 모델/노드 조절, 외부 배경 에셋 구성

---

## 6. 구현 구조 및 작업 과정 (`#architecture`)

### 6.1 4계층 매니저 아키텍처 (4-Layer Manager System)
단일 클래스가 모든 기능을 직접 제어하는 강한 결합을 피하기 위해 책임을 4개 계층으로 분리했습니다.

```text
[Layer 1: Core Services]
 ├── InitManager      : 등록형 IBootStep 부팅 파이프라인, Addressables 웜업, GC 정리
 ├── CSVDataManager   : 정규식 기반 비동기 CSV 파싱 (20행 단위 Yield), 모델/시나리오 딕셔너리
 └── GameManager      : GameState 상태 머신, ITransitionCommand 기반 비동기 전환 오케스트레이션

[Layer 2: View Layer]
 ├── TimeManager               : 하루 24시간(1,440분) 관리 및 시간대별 이벤트(08/09/19/22시) 발행
 ├── PharmacySkyboxCycleManager: TimeManager 시간 → 외부 데이 사이클(0~100%) 변환 어댑터
 ├── CameraManager             : Cinemachine 가상 카메라 우선순위 및 비동기 블렌딩 완료 판정
 └── UIManager                 : GameState별 캔버스 오버레이 제어 및 스크린 페이더 연출

[Layer 3: Logic Layer]
 ├── StageManager     : StagePhase 진행, 1~5성 난이도 가중치 & AnimationCurve 스폰 예산, 초과근무 벌금
 ├── QueueManager     : 매장 내 대기석 및 카운터 대기열 분배
 └── WaypointManager  : 런타임 Find 호출 방지를 위한 주요 이동 좌표 해시 캐싱

[Layer 4: Actor Layer]
 ├── NPCManager & NPCFactory : CSV 시나리오 조회 + 베이스 프리팹 & Addressables 외형 런타임 조립/해제
 └── PlayerController / Interaction / Wallet : 상태 기반 입력 가드, 원형 메뉴 모드 전환, 골드 오버플로우 방어
```

### 6.2 비동기 영업 시작 시퀀스 (`GameManager` & `UniTask`)
새 게임을 시작하거나 다음 날로 넘어갈 때 여러 시스템이 임의의 순서로 동작하지 않도록 비동기 순서를 명시적으로 제어했습니다.
1. `Transition` 상태로 전환하여 플레이어 이동 및 카메라 입력을 잠급니다 (`_isTransitioning` 중복 진입 방지 락 적용).
2. 하늘을 바라보는 카메라 전환과 월드 내 기존 NPC/인스턴스 정리(`CleanUpWorldAsync`)는 서로 독립적이므로 **`UniTask.WhenAll`로 병렬 실행**합니다.
3. 정리가 끝난 뒤 스테이지 데이터 준비와 플레이어 위치/상태 초기화를 수행합니다.
4. 오전 8시까지 하늘과 시간이 빠르게 회전하는 연출을 대기합니다.
5. 플레이어 1인칭 카메라 복귀(`SwitchCameraAsync`)를 **`await`로 완전히 대기**한 뒤, 하루 시간을 시작하고 최종적으로 `GameState.Playing` 상태로 전환합니다.

### 6.3 비동기 CSV 파서 및 `NPCFactory` 동적 조립
- **`CSVDataManager`**: 큰따옴표 내부의 쉼표를 보존하는 정규식(`",(?=(?:[^\"]*\"[^\"]*\")*(?![^\"]*\"))"`)으로 CSV를 파싱하며, 메인 스레드 프레임 드랍을 막기 위해 `PROCESSING_LINES_LIMIT (20행)`마다 `await UniTask.Yield()`를 수행합니다. 행 단위 예외 격리(`FormatException`, `OverflowException`)를 적용해 일부 데이터 오류로 전체 로딩이 중단되지 않도록 방어했습니다.
- **`NPCFactory` & `Addressables`**: 손님 생성 시 기본 행동·UI가 담긴 베이스 프리팹을 인스턴스화한 뒤, CSV 시나리오의 모델 ID에 해당하는 외형 에셋을 `Addressables`로 비동기 로드해 자식으로 장착합니다. 스테이지 정리 시에는 `ReleaseAddressableChild`(`Addressables.ReleaseInstance`)를 호출해 참조 카운트 누수를 방지합니다.

---

## 7. 문제 해결 및 개선 사례 (`#troubleshooting`)

### 사례 1. 카메라 블렌딩 완료 전 `Playing` 전환으로 인한 조기 입력 활성화 버그
- **발생 문제**: 메뉴에서 새 게임을 시작하거나 다음 날로 전환할 때, 카메라가 아직 하늘에서 플레이어 1인칭 시점으로 내려오는 블렌딩 도중인데도 캐릭터 이동과 마우스 회전 입력이 먼저 활성화되어 시점이 틀어지는 문제가 발생했습니다.
- **원인 분석 (Git 변경 이력 및 실행 흐름 추적)**:
  1. 초기 전환 시퀀스에서 `GameState.Playing` 전환 코드가 플레이어 카메라 복귀 완료보다 앞선 시점에 호출되고 있었습니다.
  2. 카메라 전환 완료 여부를 Cinemachine의 실제 블렌딩 상태가 아니라 `0.35초` 고정 대기시간으로만 판단하고 있어, 실제 블렌드 설정 시간과 어긋났습니다.
- **해결 및 개선**:
  1. `GameManager`의 비동기 시퀀스를 재배치하여 하늘 카메라 전환 + NPC 정리(`WhenAll`) → 스테이지/플레이어 초기화 → 오전 8시 시간 연출 → **플레이어 카메라 복귀 대기(`await SwitchCameraAsync`)가 모두 끝난 뒤에만** `GameState.Playing`으로 전환하도록 수정했습니다.
  2. `CameraManager`에서 가상 카메라 우선순위 변경 후 `PlayerLoopTiming.LastPostLateUpdate`까지 대기하여 해당 프레임의 카메라 연산이 반영되게 한 뒤, **`CinemachineBrain.IsBlending == false`이면서 `ActiveVirtualCamera`가 목표 카메라인지** 함께 검증하도록 조건을 강화했습니다.
  3. `Transition` 상태에서는 이동 입력뿐 아니라 Cinemachine 마우스 축 입력도 함께 차단했습니다.
- **남은 한계 및 기술적 성찰**:
  - 정적 코드 점검 결과, 씬의 Cinemachine 기본 블렌드 시간(약 2초) 대비 현재 대기 타임아웃(`1.25초` + fallback `0.35초`)이 더 짧게 설정된 구간이 남아 있어, 타임아웃 발생 시 블렌드 도중 다음 단계로 넘어갈 수 있는 경계 조건을 추가로 확인했습니다. 이를 통해 fallback 타임아웃 수치도 실제 씬 카메라 설정과 동기화해야 함을 도출했습니다.

### 사례 2. `ScriptableObject` 중심 NPC 데이터 구조의 관리 병목 해결
- **발생 문제**: 초기에는 손님별 외형·대사·요구 약품·난이도를 단일 `ScriptableObject`에 묶어 관리했으나, 18종의 페르소나와 난이도별 대사가 추가되면서 에셋 파일 수가 급증하고 외형 데이터가 중복되며 밸런스 일괄 수정이 어려워졌습니다.
- **해결 및 개선**: 외형 정보는 모델 ID 테이블(`_modelDict`)로, 대사·요구 약품·난이도는 시나리오 CSV 테이블(`_scenarioDict`, `_scenarioByLevel`)로 분리하고 런타임 조립을 `NPCFactory`에 위임했습니다. 그 결과 C# 코드 수정이나 에셋 복제 없이 표 데이터 편집만으로 손님과 스테이지 구성을 확장할 수 있게 되었습니다.

### 사례 3. 외부 데이 사이클 에셋(`CelestialTimeManager`)과 인게임 시간 체계 통합
- **발생 문제**: 외부 하늘/구름 에셋이 자체 `Update` 루프와 글로벌 환경광 갱신으로 동작해, 인게임의 24시간 영업 규칙·일시정지·스테이지 전환 시 빠른 시간 배속 연출과 충돌하며 프레임 끊김을 유발했습니다.
- **해결 및 개선**: `TimeManager`에서 하루를 1,440분 단위로 관리하고, 어댑터 계층인 `PharmacySkyboxCycleManager`가 이를 `0~100%` 진행률로 변환해 전달하도록 구조를 개편했습니다. 외부 에셋에는 `SetCycleProgress()`와 `SetCloudTimeScale()` 제어 인터페이스를 확장하여 게임 상태에 따라 하늘과 구름 속도가 일관되게 제어되도록 통합했습니다.

### 사례 4. 상점 컴퓨터 UI 및 ESC 일시정지 상태 충돌 수정
- **발생 문제**: 인게임 컴퓨터(상점) UI를 연 상태에서 `ESC` 키를 누르면 마우스 커서 잠금 상태와 플레이어 상호작용 모드가 꼬여 조작이 먹통이 되는 이슈가 QA 트래커에 보고되었습니다.
- **해결 및 개선**: `UIManager.ForceHideAllUI()`에서 모든 오버레이 캔버스(`_menuCanvas`, `_inGameCanvas`, `_escCanvas`, `_shopCanvas`, `_preferenceCanvas`)와 `SetShopTerminalPower(false)`를 일괄 동기화하고, `GameState`에 따라 커서 및 입력 잠금을 단일 경로로 제어하도록 정리했습니다.

---

## 8. 팀 협업 및 프로젝트 매니징 (`#collaboration`)

- **스크립트 병합(Merge) 충돌 방지와 역할 재배치 (`회의록 0407`)**:
  - 프로젝트 초반 3명의 인원이 동시에 코어 C# 스크립트를 수정하면서 Git 병합 충돌 위험이 높아졌습니다.
  - 이를 해결하기 위해 팀장으로서 아키텍처·비동기 제어·데이터 파서 등 코어 프레임워크와 통합은 제가 전담해 빠르게 고정하고, 팀원들은 강점에 맞춰 UI 팝업 연동과 18종 NPC 페르소나·난이도별 대사 CSV 데이터 풀 구축에 집중하도록 작업 경계를 명확히 분리했습니다.
- **의존성 기반 마일스톤 대시보드 및 에셋 라이선스 검수**:
  - Notion에 마스터 대시보드와 `Blocked by / Blocking` 의존성이 연결된 스프린트 보드, QA 이슈 트래커를 구축해 일정을 관리했습니다.
  - 또한 프로젝트에 사용된 외부 에셋 18종의 `Single Entity` 라이선스 준수 여부를 전수 검수(`[7. 에셋 라이선스 검수 보고서]`)하고, 자체 제작한 거울 셰이더(`Mirror`) 등 고유 저작물과 외부 패키지를 명확히 분리 관리했습니다.

---

## 9. 핵심 결과물 및 시연 자료 목록 (`#showcase`)

- **완성된 단일 씬(One-Scene) 약국 운영 빌드**: 부팅 → 메인 메뉴 → 비동기 영업 준비 연출 → NPC 입장·대기·처방 → 래그돌 드래그 및 상점 오브젝트 배치 → 하루 정산으로 이어지는 코어 루프 구현 완료
- **단위 테스트 코드**: `PlayerWallet` 골드 가감 및 오버플로우(`0 ~ int.MaxValue`)·음수 지출 방어 NUnit EditMode 단위 테스트 구현
- **첨부 가능 링크 및 시각 자료**:
  - **빌드 폴더 (Google Drive)**: [https://drive.google.com/drive/folders/1wyxmydYnx2T59TREeqxVTZcFlzfxh760?usp=drive_link](https://drive.google.com/drive/folders/1wyxmydYnx2T59TREeqxVTZcFlzfxh760?usp=drive_link)
  - **실행 빌드 압축파일 (`내 약국에는 정상이 없다.zip`, 89.4MB)**: [https://drive.google.com/file/d/1kuDcDduEBa85IN3cG91Uc1QHemjBYJhd/view?usp=drive_link](https://drive.google.com/file/d/1kuDcDduEBa85IN3cG91Uc1QHemjBYJhd/view?usp=drive_link)
  - **소스 코드 저장소 (GitHub)**: [https://github.com/Junsu-git/Project-Pharmacy](https://github.com/Junsu-git/Project-Pharmacy)
  - `[확인 필요: 웹페이지 갤러리 슬롯에 삽입할 인게임 스크린샷 / 플레이 영상 파일 경로 확정]`

---

## 10. 배운 점과 아쉬운 점 / 회고 (`#takeaways`)

- **배운 점 (Learned)**:
  - 비동기 처리(`UniTask`)는 단순히 성능을 높이는 수단이 아니라, 카메라·시간·NPC·입력처럼 서로 다른 시스템의 **실행 순서와 완료 조건을 명확하게 보장하기 위한 설계 방식**이라는 점을 깊이 체득했습니다.
  - 기능별 매니저(4계층)와 게임 상태(`GameState`)를 기준으로 책임을 나누면서, 복합적인 타이밍 버그도 시간·카메라·입력 각각의 책임 단위에서 원인을 좁혀 추적할 수 있었습니다.
  - 외부 에셋을 그대로 가져다 쓰는 데 그치지 않고, 우리 게임의 시간 체계에 맞는 어댑터 계층(`PharmacySkyboxCycleManager`)과 제어 인터페이스를 설계해 통합하는 경험을 쌓았습니다.
- **아쉬운 점 및 향후 보완 과제 (Lacked)**:
  - 개발 후반에 기능과 콘텐츠 범위가 빠르게 넓어지면서 카메라 타임아웃 경계 조건이나 NPC 이동, 데이터 연결을 충분히 반복 검증하지 못했습니다.
  - 단위 테스트가 `PlayerWallet`에 머물러 있고 `GameManager`, `StageManager`, `TimeManager` 등 핵심 상태 전환에 대한 자동화된 회귀 테스트와 플레이테스트가 부족했던 점을 보완하여, 이후 캡스톤 프로젝트(`RootMarket`)에서는 초기부터 프로토콜·서버 로직의 단위/통합 테스트를 함께 구축하는 방식으로 발전시켰습니다.
