# Portfolio redesign implementation plan

**Goal:** 기존 정적 사이트 10페이지를 일관된 포트폴리오로 개편한다.
**Architecture:** 정적 HTML 콘텐츠와 URL을 보존하고 공통 CSS, 초기 테마 스크립트, 상호작용 스크립트를 사용한다.
**Tech stack:** HTML, CSS, JavaScript, Node.js 및 로컬 Chromium 검증.
**Spec:** [portfolio-redesign.md](portfolio-redesign.md)

## Constraints

- 외부 배포, 커밋, 푸시 없이 현재 작업 공간에서 적용한다.
- 사용자 지정 프로필, 프로젝트 4개와 과제 5개, 기존 자료와 링크를 보존한다.
- 흑백 stroke SVG, 1040px 본문, 같은 위치의 원형 FAB, 테마 대비율 7:1.

## Review focus

- 저장소 차단·잘못된 값·다른 탭 변경에도 테마가 동작하는지.
- 숨겨진 테마 버튼이 탭 순서에서 제외되는지.
- 과제 탭 내부 목차 이동 시 내용이 먼저 열리는지.
- 좁은 화면과 작은 높이에서 고정 영역이 본문을 가리지 않는지.
- 기존 페이지의 중복 스크립트·잘못된 앵커·테마 고정 색상이 제거되는지.

## Tasks

- [x] 테마 회귀 테스트를 작성하고 기존 코드에서 실패를 확인한다. `node scripts/verify-portfolio.cjs`.
- [x] assets/js/theme-init.js: CSS 이전에 테마를 결정한다. portfolio-system.js: FAB·동기화·TOC·키보드 처리를 통일한다.
- [x] assets/css/portfolio-system.css: 토큰, 레이아웃, 카드, 상세 본문, 테마 버튼, 반응형 규칙을 다시 구성한다. 과제별 분석용 스타일은 낮은 우선순위의 별도 파일로 분리한다.
- [x] index.html: 간결한 소개, 프로젝트와 과제 슬롯, 기술 근거, 학력·복무, 연락처를 구성한다.
- [x] projects/*.html와 assignments/*.html: 제목·성장 평가 우선 배치, 공통 목차·헤더·테마, 확인되지 않은 협업 서술 표시, 원본 자료 보존.
- [x] 브라우저로 10페이지 링크·앵커·레이아웃·테마·상호작용·대비를 검증하고 결과를 기록한다.

## Execution notes

사용자의 '적용해주세요'에 따라 현재 세션에서 직접 구현한다. 별도 승인 요청이나 커밋 없이 진행한다. 추가 라이브러리 설치 없이 번들 Playwright와 설치된 Chrome을 사용한다.

리뷰에서 발견한 기존 과제의 활성 필터 클래스 불일치와 배지·자료 버튼 대비 문제를 공통 스타일에서 수정했다. 실제 보이는 텍스트의 전경·배경 대비도 회귀 검사에 추가했다.
