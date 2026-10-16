# [SUB-04] 림버스 컴퍼니 도감 앱 UX/UI 설계

> **문서 안내**: `MDGroup/03_Resources/프로젝트 참고/림버스 도감 앱/Notion/`에서 확인된 실제 Figma 디자인 시스템 설계 및 프로토타이핑 내역을 바탕으로 작성한 서브 프로젝트 상세 문서입니다.

---

## 1. 카드 요약 정보 (메인 페이지 및 목록 노출용)

- **프로젝트명**: 림버스 컴퍼니 도감 앱 UX/UI 설계
- **한 줄 소개**: Figma의 디자인 시스템(Color Variables·Text Styles) 기반 다크/라이트 테마 매핑과 인터랙티브 컴포넌트를 활용해 구축한 팬 메이드 도감 앱 UX/UI 프로토타입
- **분류**: 모바일 앱 UX/UI 디자인 시스템 구축 및 인터랙티브 프로토타이핑 (`Figma`)
- **진행 기간 및 학기**: 2학년 2학기 (`2025.09 ~ 2025.11`)
- **참여 인원 및 담당 역할**: **1인 프로젝트 (디자인 시스템 구축 · 화면 설계 · 인터랙티브 프로토타이핑 100%)**
- **핵심 기술 태그**: `#Figma` `#디자인시스템` `#ColorVariables` `#다크모드/라이트모드` `#UX/UI프로토타이핑`
- **외부 링크 및 증빙 경로**:
  - **Figma 디자인 가이드 및 프레임 링크**: [https://www.figma.com/design/JgMkFI5NHLHANS3aYwS0mt/2025_UX-UI_ESE?node-id=32-358&t=VtuRvZKp4iAvOc7s-1](https://www.figma.com/design/JgMkFI5NHLHANS3aYwS0mt/2025_UX-UI_ESE?node-id=32-358&t=VtuRvZKp4iAvOc7s-1)
  - **Figma 인터랙티브 프로토타입 실행 링크**: [https://www.figma.com/proto/JgMkFI5NHLHANS3aYwS0mt/2025_UX-UI_ESE?node-id=32-361&t=EeKy2zJknoWSslBb-0&scaling=min-zoom&content-scaling=fixed&page-id=32%3A358&starting-point-node-id=32%3A361](https://www.figma.com/proto/JgMkFI5NHLHANS3aYwS0mt/2025_UX-UI_ESE?node-id=32-361&t=EeKy2zJknoWSslBb-0&scaling=min-zoom&content-scaling=fixed&page-id=32%3A358&starting-point-node-id=32%3A361)
  - **MDGroup 원본 근거 문서**:
    - `MDGroup/03_Resources/프로젝트 참고/림버스 도감 앱/Notion/림버스 컴퍼니 도감 앱 UX_UI 설계__363ab24d893b80bca7a9fd9abb04b03c.md`

---

## 2. 목차 (ON THIS PAGE)

1. [개요 및 기획 의도](#overview)
2. [디자인 시스템(Variables & Styles) 및 핵심 화면 설계](#mechanics)
3. [담당 역할 및 핵심 기여](#role)
4. [구현 구조 및 프로토타이핑 과정](#process)
5. [핵심 결과물 및 시연 자료 목록](#showcase)
6. [배운 점과 아쉬운 점 / 회고](#takeaways)

---

## 3. 개요 및 기획 의도 (`#overview`, `#mechanics`)

### 3.1 기획 의도 (`#overview`)
- **유저 맞춤형 도감 열람 경험 기획**: '림버스 컴퍼니' 유저들이 수많은 수감자(캐릭터)와 인격 투영 정보를 모바일 환경에서 빠르게 필터링하고, 선호하는 인격과 동기화 단계를 직관적으로 열람·관리할 수 있는 팬 메이드 도감 앱을 기획했습니다.
- **개발 친화적인 디자인 시스템(Design System) 구축**: 개별 화면을 주먹구구식으로 그리는 방식에서 벗어나, 실제 프론트엔드/클라이언트 개발자와의 협업을 가정하고 **컬러 토큰(Variables), 타이포그래피 스타일(Text Styles), 다크/라이트 모드 테마 전환 규칙**이 체계적으로 정의된 디자인 가이드라인을 구축하고자 했습니다.

### 3.2 핵심 설계 요소 (`#mechanics`)
1. **Color Variables(토큰) 기반 다크/라이트 모드 테마 매핑**:
   - 배경, 카드 표면, 강조 텍스트, 보조 아이콘 등의 색상을 하드코딩하지 않고 시맨틱 Color Variable 토큰으로 정의하여, 테마 스위치 조작 시 다크 모드와 라이트 모드가 일관성 있게 전환되도록 설계했습니다.
2. **Text Styles 규격화**:
   - 제목, 서브 타이틀, 본문, 버튼, 캡션 등 각 UI 계층에 들어갈 폰트 크기, 굵기, 행간을 Text Style로 등록해 전체 화면의 시각적 위계와 통일성을 확보했습니다.
3. **핵심 도감 인터랙션 컴포넌트**:
   - **수감자(캐릭터) 필터링 버튼**: 원하는 캐릭터별 인격을 즉시 분류해 볼 수 있는 필터 UI
   - **선호 인격 투영 목록 및 상세 정보 레이아웃**: 카드형 목록 뷰와 상세 스펙/스킬 열람 화면
   - **동기화 단계 전환 및 다크/라이트 모드 스위치**: 사용자 입력에 따라 컴포넌트 상태가 즉시 변화하는 인터랙티브 프로토타입

---

## 4. 담당 역할 및 핵심 기여 (`#role`)

1인 프로젝트로서 **디자인 시스템 설계부터 컴포넌트 모듈화, 인터랙티브 프로토타입 연결까지 100% 단독 수행**했습니다.
- Figma `Variables`를 활용한 라이트/다크 모드 컬러 토큰 정의 및 매핑
- Figma `Text Styles`를 활용한 타이포그래피 계층 규격화
- 재사용 가능한 모듈형 UI 컴포넌트 라이브러리 제작 (필터 버튼, 인격 카드, 동기화 토글, 테마 스위치)
- 실제 클릭 및 상태 전환이 동작하는 고해상도 프로토타입 연결

---

## 5. 구현 구조 및 프로토타이핑 과정 (`#process`)

```text
[1. 디자인 시스템 파운데이션 정의]
  Color Variables (Light / Dark 테마 토큰 분리) + Text Styles (타이포그래피 위계 설정)
      ↓
[2. 모듈형 UI 컴포넌트 설계]
  수감자 필터 버튼 · 인격 투영 카드 · 동기화 단계 버튼 · 모드 전환 스위치 컴포넌트화
      ↓
[3. 핵심 화면 레이아웃 조합]
  메인 도감 목록 화면 + 캐릭터별 필터링 뷰 + 인격 상세 정보 및 동기화 비교 화면
      ↓
[4. 인터랙티브 프로토타입 연결]
  클릭 이벤트에 따른 필터 전환, 동기화 상태 변경, 다크/라이트 테마 전환 플로우 완성
```

---

## 6. 핵심 결과물 및 시연 자료 목록 (`#showcase`)

- **UI/UX 디자인 가이드라인 및 컴포넌트 라이브러리 (`Figma`)**:
  - [Figma 디자인 가이드 및 전체 프레임 보기](https://www.figma.com/design/JgMkFI5NHLHANS3aYwS0mt/2025_UX-UI_ESE?node-id=32-358&t=VtuRvZKp4iAvOc7s-1)
- **클릭 가능한 인터랙티브 프로토타입 (`Figma Prototype`)**:
  - [Figma 프로토타입 직접 실행하기](https://www.figma.com/proto/JgMkFI5NHLHANS3aYwS0mt/2025_UX-UI_ESE?node-id=32-361&t=EeKy2zJknoWSslBb-0&scaling=min-zoom&content-scaling=fixed&page-id=32%3A358&starting-point-node-id=32%3A361)

---

## 7. 배운 점과 아쉬운 점 / 회고 (`#takeaways`)

- **배운 점 (Learned)**:
  - Figma의 `Variables`와 `Styles`를 체계적으로 활용하면서, 프로그래밍에서 상수를 변수와 데이터 테이블로 분리하듯 UI 디자인에서도 **토큰 기반의 확장 가능하고 일관된 시스템**을 구축하는 원리를 깊이 이해했습니다.
  - 정적인 시안이 아니라 사용자의 클릭에 반응해 상태(필터, 동기화, 테마)가 바뀌는 동적 컴포넌트를 설계하며, 이후 Unity UGUI 및 웹 포트폴리오의 다크/라이트 테마 구조를 설계할 때에도 큰 도움을 받았습니다.
- **아쉬운 점 (Lacked)**:
  - 개인 UX/UI 설계 과제로 진행되다 보니 실제 클라이언트 코드로 연결해 실사용자 대상 사용성 테스트(UT)나 A/B 테스트까지 진행해보지 못한 점이 아쉬움으로 남습니다.
