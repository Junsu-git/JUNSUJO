# 대표 프로젝트 카드

대표 4개만 데스크톱 2×2 격자로 변경했다. 본문이 좁아지는 화면에서는 한 열로 전환한다. 그 외 프로젝트의 가로 목록과 상세 페이지는 유지한다.

카드의 순서는 이미지 갤러리 → 소개와 담당·기여도 → 태그 → 상세보기 버튼이다. 카드 전체를 링크로 덮지 않아 이미지 탐색 버튼과 상세 이동이 충돌하지 않는다. 태그는 기존 순서대로 표시한다.

현재 대표 프로젝트의 실제 이미지 파일은 저장소에 없다. 준비 상태와 비활성 탐색 버튼을 표시한다. 기여율도 확인된 수치가 없어 추후 수정으로 남겼다. 담당 내용은 기존 메인·상세 기록에 있는 역할을 요약했다.

## 이미지 추가

`index.html`의 각 카드 안에 있는 빈 `.gallery-slides`에 실제 이미지의 figure를 순서대로 추가한다. 아래 경로는 작성 예시이며 실제로 파일을 저장한 경로로 교체한다.

```html
<div class="gallery-slides">
  <figure class="gallery-slide">
    <img src="assets/projects/pharmacy/play-01.webp" alt="약국의 손님 응대 화면">
    <figcaption>손님 응대</figcaption>
  </figure>
  <figure class="gallery-slide" hidden>
    <img src="assets/projects/pharmacy/play-02.webp" alt="약국의 조제 화면" loading="lazy">
    <figcaption>조제 과정</figcaption>
  </figure>
</div>
```

갤러리는 각 카드에서 독립적으로 작동한다. 이미지가 없으면 준비 상태, 1장이면 단일 이미지, 2장 이상이면 이전·다음·도트·방향키 탐색이 활성화된다. 첫 이미지에서 이전을 누르면 마지막으로 순환한다. 자동 넘김은 없다. 이미지는 잘리지 않게 원래 비율을 유지한다.

검증: `node scripts/verify-project-cards.cjs`. 실제 포트폴리오에는 테스트 이미지를 넣지 않고 테스트 응답에만 주입하여 좌우·처음/끝 순환·도트·키보드 동작과 카드 간 독립성을 검사한다. `verify-home-feedback.cjs`와 `qa-portfolio.cjs`로 기존 메인 흐름과 테마·상세 페이지 회귀도 검사한다.
