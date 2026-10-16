# [SUB-02] 아기 해달 뀨아

> **문서 안내**: `MDGroup/03_Resources/프로젝트 참고/아기 해달 뀨아/Notion/` 내 노션 포트폴리오 요약 및 **601줄 분량의 실제 전체 소스코드(`🔗 코드 리뷰__262ab24d893b82ab940b01e6b1297b12.md`)**에서 확인된 사실만으로 작성한 상세 문서입니다.

---

## 1. 카드 요약 정보 (메인 페이지 및 목록 노출용)

- **프로젝트명**: 아기 해달 뀨아
- **한 줄 소개**: 웹 기반 코딩 플랫폼(Redbrick)의 한계를 넘어 `smoothstep` 관성 물리 연산, 딕셔너리 기반 스테이지 스폰 테이블, 팩토리 패턴을 직접 구현해 스테이지 1~13을 완성한 '아기고래 쿠아' 모작 프로젝트
- **분류**: 웹 플랫폼 기반 2D 성장·생존 아케이드 게임 개발 (`Redbrick / JavaScript`)
- **진행 기간 및 학기**: 2학년 1학기 (`2025.05 ~ 2025.07`)
- **참여 인원 및 담당 역할**: **1인 개발 (기획 · 물리/스폰 로직 설계 · 전체 코드 구현 100%)**
- **핵심 기술 태그**: `#JavaScript` `#Redbrick` `#물리관성구현` `#FactoryPattern` `#Dictionary스폰테이블` `#객체지향설계`
- **외부 링크 및 증빙 경로**:
  - **실제 웹 플레이 링크**: [https://redbrick.space/game?pId=3f0e03b3-0d60-5675-b33b-c0f2d59586ab&search=%EB%80%A8%EC%95%84](https://redbrick.space/game?pId=3f0e03b3-0d60-5675-b33b-c0f2d59586ab&search=%EB%80%A8%EC%95%84)
  - **MDGroup 원본 근거 문서**:
    - 노션 포트폴리오 요약: `MDGroup/03_Resources/프로젝트 참고/아기 해달 뀨아/Notion/아기 해달 뀨아__363ab24d893b8021bdc9d906670b3975.md`
    - 전체 소스코드 리뷰: `MDGroup/03_Resources/프로젝트 참고/아기 해달 뀨아/Notion/🔗 코드 리뷰__262ab24d893b82ab940b01e6b1297b12.md`

---

## 2. 목차 (ON THIS PAGE)

1. [개요 및 기획 의도](#overview)
2. [핵심 게임 규칙과 스테이지 성장 구조](#mechanics)
3. [담당 역할 및 핵심 기여](#role)
4. [구현 구조 및 핵심 코드 분석 (`smoothstep` 물리 · 스폰 테이블 · 어종별 AI)](#architecture)
5. [문제 해결 및 개선 사례](#troubleshooting)
6. [핵심 결과물 및 시연 자료 목록](#showcase)
7. [배운 점과 아쉬운 점 / 회고](#takeaways)

---

## 3. 개요 및 기획 의도 (`#overview`, `#mechanics`)

### 3.1 기획 의도 (`#overview`)
- **추억의 플래시 게임 '아기고래 쿠아'의 조작감과 성장 루프 재현**: 자신보다 작은 물고기를 먹으며 몸집을 키우고 상위 포식자를 피해 살아남는 원작의 핵심 재미와 물속 유영 조작감을 웹 환경에서 완성도 높게 구현하고자 했습니다.
- **플랫폼 기본 기능을 넘는 자료구조·디자인 패턴 적용**: 초·중등 교육용으로도 쓰이는 Redbrick 플랫폼의 단순 이동 함수에만 의존하지 않고, 가속도·관성 물리 연산, 딕셔너리(`spawnTable`) 기반 데이터 분리, 팩토리 패턴(`Factory Pattern`)을 직접 코드로 설계해 확장성 있는 게임 구조를 검증했습니다.

### 3.2 핵심 게임 규칙 (`#mechanics`)
- **레벨 1~13 단계별 성장 및 포식 규칙**:
  - 플레이어는 1레벨에서 시작해 현재 레벨에서 먹을 수 있는 어종을 정해진 목표 마릿수(`global.levelObj`)만큼 섭취하면 레벨업하며, 캐릭터 크기가 `baseSize(25) * (1 + 0.5 * (level - 1))` 공식에 따라 성장하고 체력이 `+50` 회복됩니다.
  - **13레벨 달성 시** 최종 점수를 기록하며 클리어 씬(`scene4`)으로 전환됩니다.
- **6종의 등장 어종과 해금 레벨**:
  - **버터피쉬(`Butterfish`)**: 1레벨부터 섭취 가능 (`+100점`)
  - **해마(`Campus`)**: 3레벨부터 섭취 가능 (`+150점`)
  - **청새치(`Marlin`)**: 5레벨부터 섭취 가능 (5레벨 미만 충돌 시 `marlinHurt` 데미지 `-10`)
  - **가오리(`Ray`)**: 7레벨부터 섭취 가능 (`+200점`)
  - **돌고래(`Dolphin`)**: 9레벨부터 섭취 가능 (`+300점`)
  - **상어(`Shark`)**: 10레벨부터 섭취 가능 (10레벨 미만 충돌 시 `sharkHurt` 데미지 `-20`)
- **체력 감소(시간 압박) 및 피격 피드백**:
  - 매 60프레임(1초)마다 기본 체력이 `-5`씩 감소하여 끊임없이 먹이를 찾아 움직여야 하며, 상위 포식자와 충돌 시 체력 감소와 함께 카메라 흔들림(`shake()`) 연출이 발생합니다.

---

## 4. 담당 역할 및 핵심 기여 (`#role`)

1인 프로젝트로서 기획부터 물리 수식 구현, 스테이지 밸런싱, 디버깅까지 **전 과정을 100% 단독 수행**했습니다.
- **`smoothstep` 보간 기반 수중 관성·가속도 물리 시스템 직접 구현**
- **딕셔너리(`spawnTable`) 자료구조를 활용한 1~12레벨 확률형 스폰 테이블 설계**
- **팩토리 패턴(`clone` + 시그널 기반 스폰) 및 공통 데이터/개별 AI 패턴 모듈화**
- **스테이지 1~13 레벨 디자인 완주 및 학기 내 최고 완성도 달성**

---

## 5. 구현 구조 및 핵심 코드 분석 (`#architecture`)

### 5.1 `smoothstep` 곡선과 대각선 정규화를 적용한 수중 물리 이동
단순 등속 이동이 아니라 물속에서 서서히 가속되고 키를 떼면 관성으로 미끄러지는 조작감을 위해 가속/감속 프레임(`accelFrames = 120`, `decelFrames = 120`)과 3차 보간 함수 `smoothstep(t)`를 직접 구현했습니다.

```javascript
// 0~1 사이에서 부드럽게 변화하는 3차 보간 곡선
function smoothstep(t) {
    return t * t * (3 - 2 * t);
}

// 대각선 이동 시 속도가 √2배 빨라지는 현상을 막기 위한 벡터 정규화
function normalizeDiagonalSpeed() {
    if ((keyPressed.right || keyPressed.left) && (keyPressed.up || keyPressed.down)) {
        let length = Math.sqrt(xSpeed * xSpeed + ySpeed * ySpeed);
        if (length > maxSpeed) {
            let scale = maxSpeed / length;
            xSpeed *= scale;
            ySpeed *= scale;
        }
    }
}
```

### 5.2 딕셔너리(`spawnTable`) 기반 스테이지 스폰 & 팩토리 패턴
레벨별 등장 물고기 종류와 확률을 조건문 하드코딩 대신 `spawnTable` 딕셔너리 객체로 분리하고, `0.3초`(`spawnTime`)마다 `1~100` 난수 누적합(`sum += table[i].chance`)으로 스폰 시그널을 발송해 각 어종 팩토리가 인스턴스를 생성(`clone()`)하도록 설계했습니다.

```javascript
const spawnTable = {
    1: [{type: "Butterfish", chance: 80}, {type: "Campus", chance: 15}, {type: "Marlin", chance: 5}],
    2: [{type: "Butterfish", chance: 60}, {type: "Campus", chance: 30}, {type: "Marlin", chance: 10}],
    // ... 레벨 1 ~ 12 구간별 6종 어종 등장 확률 데이터 분리 ...
    12: [{type: "Butterfish", chance: 15}, {type: "Campus", chance: 15}, {type: "Marlin", chance: 15},
         {type: "Ray", chance: 15}, {type: "Dolphin", chance: 15}, {type: "Shark", chance: 25}]
};
```

### 5.3 공통 속성과 어종별 고유 이동 패턴 분리
모든 물고기가 공유하는 기본 속성(스폰 좌표, 좌우 방향 전환, 화면 경계 이탈 시 `kill()` 제거, 레벨 비교 충돌 판정)과 어종별 고유 움직임을 분리해 구현했습니다.
- **버터피쉬(`Butterfish`)**: 주기적으로 빠른 대시(`dashTime`)와 느린 유영(`swimTime`)을 번갈아 수행
- **해마(`Campus`)**: 수중 중력(`gravity = 400`)과 랜덤 점프 주기(`jumpInterval = 0.5~2초`), 점프력(`jumpStrength = 300~400`)을 결합해 물속에서 통통 튀어 오르는 포물선 이동 구현

---

## 6. 문제 해결 및 개선 사례 (`#troubleshooting`)

### 사례 1. 대각선 동시 입력 시 이동 속도 폭증 문제 해결
- **발생 문제**: 좌우 가속도(`xSpeed`)와 상하 가속도(`ySpeed`)를 독립적으로 누적 계산하자, 대각선 이동 시 합산 벡터 크기가 최대 속도(`maxSpeed = 500`)의 $\sqrt{2}$배로 빨라지는 문제가 발생했습니다.
- **해결 방법**: 매 프레임 가속도 연산 직후 `normalizeDiagonalSpeed()` 함수를 호출하여 $\sqrt{xSpeed^2 + ySpeed^2} > maxSpeed$일 때 비율(`maxSpeed / length`)만큼 양축 속도를 스케일링해 어느 방향이든 일관된 최고 속도를 유지하도록 수정했습니다.

### 사례 2. 다수 복제(`clone`) 객체 생성 시 런타임 부하 관리
- **발생 문제**: `0.3초` 주기로 물고기 객체가 계속 복제(`clone()`)되면서 화면 밖으로 나간 객체들이 누적될 경우 브라우저 프레임 저하 위험이 있었습니다.
- **해결 방법**: 각 복제 객체가 스폰 반대편 화면 경계(`±1700`)를 벗어나거나 플레이어에게 섭취되는 즉시 `clone.kill()` 및 배열 제거(`clones.splice(i, 1)`)를 수행하여 활성 객체 수를 일정하게 유지했습니다.

---

## 7. 핵심 결과물 및 시연 자료 목록 (`#showcase`)

- **웹 브라우저 즉시 플레이 가능 빌드 (스테이지 1~13 완결)**:
  - **Redbrick 플레이 링크**: [https://redbrick.space/game?pId=3f0e03b3-0d60-5675-b33b-c0f2d59586ab&search=%EB%80%A8%EC%95%84](https://redbrick.space/game?pId=3f0e03b3-0d60-5675-b33b-c0f2d59586ab&search=%EB%80%A8%EC%95%84)
- **전체 JavaScript 구현 코드 문서**: `MDGroup/03_Resources/프로젝트 참고/아기 해달 뀨아/Notion/🔗 코드 리뷰__262ab24d893b82ab940b01e6b1297b12.md`

---

## 8. 배운 점과 아쉬운 점 / 회고 (`#takeaways`)

- **배운 점 (Learned)**:
  - 교육용 웹 플랫폼 환경에서도 자료구조(`Dictionary` 스폰 테이블)와 디자인 패턴(`Factory Pattern`), 수학적 보간 함수(`smoothstep`, 벡터 정규화)를 직접 설계·적용하면 하드코딩 없이 확장성 있고 조작감이 뛰어난 게임을 만들 수 있음을 체득했습니다.
  - 객체들의 공통 데이터와 개별 행동 패턴을 분리하는 설계 고민을 통해 학기 내 최고 완성도의 결과물을 완성하며 프로그래밍에 대한 큰 자신감을 얻었습니다.
- **아쉬운 점 (Lacked)**:
  - 기본 물리 로직과 스폰 구조 구현에 집중하다 보니 6종 어종 중 일부 상위 어종에 더 다채로운 특수 공격 패턴을 추가하지 못한 점이 아쉬웠으며, 이 경험은 이후 Unity 엔진 프로젝트에서 데이터 테이블 분리와 팩토리 구조(`NPCFactory`)를 더욱 체계적으로 설계하는 밑거름이 되었습니다.
