# 에린의 조각들 — 시각 자료 제작 기록

제작일: 2026-09-17. 제작 방식: 내장 이미지 생성 도구(image_gen). 최종 사용 이미지는 나오 배너 v2와 선택판·앨범 v1이다. 배너 v1은 교체된 초기안으로 보관한다. 모든 이미지는 비공식 학생 기획 제안용이다.

## 공식 자료 확인

- [추석맞이 매일매일 출석 공식 공지](https://mabinogimobile.nexon.com/News/Events/3545044): 브라우저에서 캐릭터·환경과 하단 파란 제목 띠를 직접 확인.
- [다함께 팽이치기 공식 공지](https://mabinogimobile.nexon.com/News/Events/3545040): 브라우저에서 밝은 초록 풍경, 셀 셰이딩 캐릭터의 행동 장면, 하단 제목 띠를 직접 확인.

웹 문서에서 본문을 확인한 후 이미지는 브라우저 화면으로 확인했다. 초기 배너와 UI는 관찰한 표현을 텍스트로 설명해 생성했다. 수정 배너 v2는 공식 나오 이미지의 브라우저 화면 캡처를 시각 참조로 사용했다. 실제 게임 모델 파일을 사용하거나 공식 이벤트 배너를 제작한 결과는 아니다.

## 산출물과 검토

- [event-banner-v2-nao.png](./event-banner-v2-nao.png): 현재 기획서에 반영한 수정 배너. 공식 [나오 이미지](https://lwi.nexon.com/m_mabinogim/brand/info/npc/nao_31526CCC2F9512B9.png)를 브라우저에서 직접 보고, 이미지 생성 도구의 시각 참조로 포함했다. 임의의 여행자 둘을 제거하고 공식 나오의 외형과 3D 게임 모델 표현으로 수정했다. 실제 모델 렌더가 아닌 생성 이미지다. 주요 제목·12개·8개 표기와 비공식 표시를 확인했다.

- [event-banner-v1.png](./event-banner-v1.png): 임의의 여행자 캐릭터가 포함된 초기안. 최종 기획서에서는 사용하지 않는다.
- [event-selection-album-v1.png](./event-selection-album-v1.png): 12개 선택 카드와 12칸 앨범, 4/12 수집 상태, 1·4·8개 보상 흐름의 화면 시안.

두 이미지 모두 주요 제목·핵심 수치·비공식 표시를 육안으로 확인했다. UI는 완료 표시 4개와 수집된 기록 4개, 미수집 8칸으로 진행도와 일치한다. 카드의 삽화는 유형을 보여주는 표현 예시이며 최종 에피소드의 소품과 1:1로 동일한 리소스 설계는 아니다. 배너의 배경 지명·장식 글씨는 생성된 표현이며 실제 게임 지리나 설정의 검증 근거가 아니다. 규칙과 완료 조건은 Markdown 본문을 기준으로 한다.

## 생성 프롬프트

최종 사용 배너 v2의 수정 프롬프트: [BANNER_V2_PROMPT.md](./BANNER_V2_PROMPT.md).

### 메인 배너 v1 — 초기안, 현재 문서에서는 교체

```text
Use case: ads-marketing. Create one polished landscape 16:9 Korean mobile fantasy RPG event campaign banner for an unofficial student proposal for Mabinogi Mobile. Official event banners visually inspected: bright blue sky and vivid green pastoral scenery, stylized anime cel-shaded 3D characters with clear flat shadow planes and low-poly game environments, eye-level scene, energetic blue ribbon title strip across the lower area with bold white Korean lettering. Match that game-publicity production quality, not generic watercolor art. This is a new original event artwork, not an actual official announcement. Scene: peaceful Tir Chonaill inspired medieval village with green rolling hills, stone path, timber houses, white sheep in distance. Two young adult original traveler characters in practical medieval fantasy clothes, one lavender/navy-clad young woman holding a small scrapbook open and a brown-haired young man collecting three fluttering illustrated paper memory cards. Floating paper cards show a signpost, a handwritten letter and a simple colored puzzle, illustrating exploration/story/play. Warm cheerful daytime. Composition: characters center/right, village depth left, tasteful scrapbook/memory motifs, no combat or weapons prominent. Precise readable Korean text only: small top label "마비노기 모바일 이벤트 제안"; large lower blue ribbon title "에린의 조각들"; subtitle above ribbon "오늘은 어떤 이야기를 고를까요?"; bottom three compact chips "탐색 · 이야기 · 놀이" / "12개 중 자유롭게 선택" / "8개 완료 시 기념 칭호"; tiny but legible bottom right "비공식 기획 시안". No fake dates, no actual publisher endorsement, no invented copyright signature. Spell Korean carefully. Keep text short and typographic hierarchy strong. No device mockup, no outer border. Full finished usable banner.
```

### 선택판·앨범 화면

```text
Use case: ui-mockup. Create one polished landscape 16:9 concept board containing TWO full fantasy mobile RPG event UI panels side by side, unofficial student proposal for Mabinogi Mobile called "에린의 조각들". This is a concept mockup, not a real game screenshot. Art direction: cel-shaded anime 3D fantasy village backdrop softly blurred, vivid pastoral greens and sky blue, cream parchment cards, dark navy typography, saturated blue headers/buttons like official Mabinogi Mobile event blue title ribbons, thin restrained gold accents. Professional game UI, spacious legible Korean type, no desktop browser/device frame. Left panel occupies 58% width: title "에린의 조각들", subtitle "오늘의 이야기를 골라보세요", tabs "전체" "탐색" "이야기" "놀이", 12 thumbnail cards in 4 columns x 3 rows. EXACTLY twelve cards. Four exploration cards illustrated as signpost, scraps of notes, breeze/sound, two paths; four story cards letter, parcel, empty bench, promise notebook; four play cards jigsaw, colored sequence, sorted parcels, musical notes. Card text ONLY category and "3~5분" to reduce text crowding. Exactly four cards completed with green check marks, other eight available, no locked cards. Bottom progress "4 / 12", explanation "8개 완료 시 핵심 보상". Right panel occupies 42% width: title "조각 앨범", cream scrapbook with EXACTLY 12 slots in 4 columns x 3 rows; exactly four illustrated collected cards and eight outline empty slots. Reward strip with three clearly spaced milestones: "1개 · 기본 표지" "4개 · 표지 꾸미기" "8개 · 기념 칭호". First two milestones checked; last pending. A blue bottom button "계속 모으기". Footer outside both panels "21일간 전체 공개 · 출석 조건 없음 · 반복 완료는 추가 조각 없음". Small visible label top right "비공식 UI 기획 시안". UI state internally consistent 4 unique completed episodes out of 12, core reward at 8, no numeric gold rewards, no FOMO or daily countdown. Crisp clean exact Korean typography. Focus is showing choice -> collection -> milestones.
```
