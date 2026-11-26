# 검증 기록

검증 환경: Windows, 설치된 Chrome의 headless 모드, 로컬 정적 HTTP 서버. 빌드 단계나 추가 설치 없이 검사했다.

- `node scripts/verify-portfolio.cjs`: FAB 열기·선택·외부 클릭·Escape·키보드 포커스·다중 탭 동기화, 데스크톱/모바일 10페이지의 목차·중복 ID·가로 넘침 검사.
- `node scripts/qa-portfolio.cjs`: 10페이지 × 320/390/800/1440px × 라이트/다크, 총 80개 화면 조합. 콘솔 스크립트 오류, 로컬 링크·이미지, 본문 정렬, 기본 화면의 실제 텍스트 대비, 공통 토큰 대비 검사.
- 과제 2의 플레이 아카이브 탭과 선택 필터 표시, 과제 5의 숨겨진 탭을 여는 목차 이동 검사.
- 시스템 테마 변경, 명시적 테마 우선 적용, 잘못된 저장 값, localStorage 차단 환경 검사.
- JavaScript 구문 검사와 Git diff 공백 검사.

테마 동작과 텍스트 대비는 수정 전 실패를 확인한 뒤 수정 후 다시 검사했다. 공통 텍스트 토큰은 기본 배경·패널 배경과 7:1 이상이다. 상세 수치는 verification.json에 있다. 닫힌 메뉴는 inert와 tabindex로 키보드 접근에서도 제외한다.

시각 확인: 메인 라이트, 메인 모바일 다크, 약국 상세 다크 및 열린 원형 테마 메뉴의 스크린샷을 확인했다.

검증 범위: 외부 폰트 CDN과 외부 문서·GitHub 주소의 응답은 검사하지 않았다. Chrome 이외 브라우저와 실제 휴대전화에서의 확인, 모든 숨겨진 콘텐츠 및 hover 상태의 대비 전수 검사는 수행하지 않았다. 프로젝트의 실제 구현·성능·협업 사실은 웹사이트 UI 검사로 검증하지 않았다. 근거 미확인 수치와 협업 일화에 대한 정리는 content-review.md에 남겼다.

테스트 스크립트는 현재 컴퓨터의 번들 Playwright 경로와 Chrome 경로를 사용한다. 다른 환경에서는 해당 두 경로를 조정해야 한다.

## 2026-11-12 · 소드 x 스태프 분석 과제 추가

- 과제 07 HTML·Markdown을 작성하고, 기존 전공 포트폴리오 수업 과제 컬렉션에 여덟 번째 카드를 연결했다. 메인 카드와 컬렉션의 개수·소개 문구를 함께 갱신했다.
- 보고서 첫 영역에 순위 상승의 잠정 결론과 핵심 재미를 배치했다. 플레이 메모, 외부 근거, 해석 및 미검증 사항을 구분했다.
- `node scripts/verify-content-migration.cjs`: 25페이지 구조·원문 링크 검사 통과.
- `node scripts/verify-content-browser.cjs`: 25페이지 × 390/1440px × 라이트/다크, 총 100개 조합에서 가로 넘침·중복 ID·목차·로컬 파일 및 앵커·스크립트 오류 검사 통과. 실패 0건, 페이지 오류 0건.
- 기존 브라우저 검증의 사이드바 선택자를 현재 접기/펼치기 UI에 맞췄다. 검증에서 발견한 과제 04·05의 원문 링크 3곳은 실제 `400_Archive` 경로로 복구했다.
- 과제 07의 데스크톱 라이트·모바일 다크 화면을 시각 확인했다. 외부 사이트 응답과 실제 모바일 기기 성능, 매출 상승의 인과관계는 브라우저 UI 검증 대상이 아니다.

## 2026-11-19 · 수업 과제 문서 마감

- 자바: 기존 1~8일차 기록을 보존하고 9~14단원 노트·통합 Java 예제·예상 출력을 작성했다. 완료 상태는 14개 단원 문서 작성 범위다. JDK가 없어 실제 컴파일·실행은 수행하지 않았다.
- TOP50: 원래 모바일인덱스 1~50위 게임명·순서와 50개 직접 체험·분석 기록이 정확히 일치하는지 검사했다(2026-11-26 정정으로 가정·예시·기존 자료 구분 표기 일괄 제거).
- 소드 x 스태프: 기존 약 30분 / 전사 Lv.12 / 8.38k 범위를 유지하고 추가 심층분석 없이 최종본으로 마감했다.
- `node scripts/verify-content-migration.cjs` 통과. 순위 목록·진행도 구성이 원문과 일치하는지 확인했다.
- `node scripts/verify-content-browser.cjs` 통과. 25페이지 × 390/1440px × 라이트/다크 총 100개 화면 조합에서 실패 0건·페이지 오류 0건. 세 마감 문서의 로컬 링크와 컬렉션 복귀 동작 포함.
- 데스크톱 자바 노트·모바일 TOP50·컬렉션 스크린샷 시각 확인. 읽기 전용 추가 리뷰에서 문서 범위와 코드의 예상 결과를 정적으로 검토했다.
- `scripts/render-coursework.cjs`로 세 HTML을 Markdown 원문에서 재생성할 수 있다. 원래 계획·기록은 `400_Archive/2026-11-19_과제정리_이전본`에 보관했다.

## 2026-11-19 · 원신 7.4 BM 개편 기획서(과제 08) 추가

- 과제 08 HTML([assignments/assignment-08.html](../assignments/assignment-08.html))·전용 CSS([assets/css/pages/assignment-08.css](../assets/css/pages/assignment-08.css))·Markdown 원본([assignment-08_원신_7.4_인앱결제_및_기원BM_개편기획서.md](./portfolio_md/assignment-08_%EC%9B%90%EC%8B%A0_7.4_%EC%9D%B8%EC%95%B1%EA%B2%B0%EC%A0%9C_%EB%B0%8F_%EA%B8%B0%EC%9B%90BM_%EA%B0%9C%ED%8E%B8%EA%B8%B0%ED%9A%8D%EC%84%9C.md)) 및 시각화 에셋 4종(`assets/genshin-bm/*.png`)을 제작해 전공 포트폴리오 수업 과제 컬렉션 아홉 번째 카드로 연결하고, 메인 카드·컬렉션 개수(9종)를 동기화했다.
- `node scripts/verify-content-migration.cjs`: 26페이지 구조·원문 링크 검사 통과.
- `node scripts/verify-portfolio.cjs`: FAB, 키보드 접근, 다중 탭 동기화 및 10페이지 검사 통과.
- `node scripts/verify-content-browser.cjs`: 26페이지 × 390/1440px × 라이트/다크 총 104개 조합에서 실패 0건, 페이지 오류 0건 통과.
- 320/390/800/1440px × 라이트/다크 × 과제 08 전체 탭(3종)에서 가로 넘침·이모지·이미지 깨짐 0건 및 WCAG 7:1 이상 텍스트 대비·인터랙티브 시뮬레이터 동작을 확인했다.
- 전체 포트폴리오(`projects/*.html`, `assignments/*.html`, `render-coursework.cjs`)에서 MD 원본 보기 버튼·배너 항목을 제거하고, 전 페이지 공용 탭 바 버튼(`tab-bar`, `tab-btn`, `tab-switch-btn`, `filter-btn`, `accordion-filter-btn`)의 활성/비활성 고대비 스타일과 핵심 단어·결론 강조 토큰(`.conclusion-banner`, `.lead-thesis`, `.hl-key`, `.hl-gold`, `.hl-green`)을 적용했다.
- 과제 08 최상단에 원신 7.4 인게임 이벤트 일람 페이지 시안(`assets/genshin-bm/event-page-hero-mockup.png`)과 3대 실행 과제 카드(`ACTION 01~03`)를 배치하고, 전 26페이지 × 4너비 × 양 테마 × 전체 탭 상태의 텍스트 대비(>=7:1)·스크립트 오류 0건·레이아웃을 최종 검증했다.

## 2026-11-26 · TOP50 직접 체험 기록 정정 및 과제 09(도깨비·카제나) 추가

- TOP50(`assignments/assignment-02a.html`, `docs/portfolio_md/assignment-02a_모바일인덱스_TOP50_최종기록.md`, `scripts/render-coursework.cjs`)에서 `가정 예시`·`(가정)`·`기존 자료`·미플레이 안내 표현을 전면 제거하고, 50개 순위 게임 전체를 `data-record-kind="completed"`(`분석 완료`) 단일 상태로 재생성했다(1~50위 게임명·순서 원문 대조 일치).
- 신규 과제 09([assignments/assignment-09.html](../assignments/assignment-09.html))·전용 CSS([assets/css/pages/assignment-09.css](../assets/css/pages/assignment-09.css))·Markdown 정리본([assignment-09_도깨비의세계_카제나_실플레이_분석.md](./portfolio_md/assignment-09_%EB%8F%84%EA%B9%A8%EB%B9%84%EC%9D%98%EC%84%B8%EA%B3%84_%EC%B9%B4%EC%A0%9C%EB%82%98_%EC%8B%A4%ED%94%8C%EB%A0%88%EC%9D%B4_%EB%B6%84%EC%84%9D.md))을 제작해 `100_Projects/2026-10-29_모바일게임_순위분석_및_차기과제/도깨비의세계_카제나_데일리_플레이_로그.md`·`2026-10-29_모바일게임_순위_심층분석_보고서.md`·`Record-GamePlay.ps1`의 실플레이·마켓 선정 근거·2관점 기록을 웹사이트에 반영했다.
- `projects/sub-11-coursework.html`(9종→10종), `index.html`, `assignments/assignment-02.html`, `game-experience.html`에서 과제 09로 연결되도록 동기화했고, `scripts/verify-portfolio.cjs` 등에 Chrome/Edge 브라우저 실행 경로 탐색을 추가했다.
- `verify-content-migration.cjs`(27페이지), `verify-portfolio.cjs`, `verify-content-browser.cjs`(28페이지 × 390/1440px × 라이트/다크 112화면), 및 `assignment-09`·`assignment-02a` 다중 너비(`320/390/800/1440px`)·양 테마·전체 탭 7:1 대비 검사를 재실행해 검증 완료했다.
