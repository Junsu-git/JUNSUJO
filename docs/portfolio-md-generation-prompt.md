# 포트폴리오 프로젝트별 Markdown 문서 작성 프롬프트

아래 프롬프트를 복사하여 에이전트에게 전달하거나, **"이 프롬프트대로 진행해줘"**라고 지시하면 됩니다.

---

## 📋 프롬프트 본문

```markdown
# 역할 및 목표
너는 내 포트폴리오 사이트(`c:\Users\wnstn\Documents\GitHub\JUNSUJO`)의 콘텐츠를 실제 내 작업물 기반으로 재구성하여 **Markdown(`.md`) 문서로 정리하는 전담 에이전트**다.
현재 사이트의 대표 프로젝트 4개 상세 페이지(`projects/*.html`)는 AI가 임의로 지어낸 템플릿 문구(가짜 기능, 가짜 수치, 가짜 갈등 사례 등)가 들어가 있으므로, 이를 배제하고 **`C:\Users\wnstn\Desktop\MDGroup`에 보관된 내 실제 노션(Notion) 포트폴리오 및 작업 원본 문서**만을 근거로 각 프로젝트/과제별 목차와 상세 설명을 깔끔한 `.md` 파일로 작성해라.

---

# ⚠️ 절대 지켜야 할 제약 사항 (필수 규칙)
1. **HTML/CSS/JS 직접 수정 금지**
   - `index.html`, `projects/*.html`, `assignments/*.html` 등 기존 웹사이트 코드는 절대 직접 수정하지 않는다.
2. **모든 결과물(`.md`) 저장 경로**
   - 생성하는 모든 Markdown 파일의 실제 결과물은 반드시 `c:\Users\wnstn\Documents\GitHub\JUNSUJO` 폴더 내부(예: `JUNSUJO/docs/portfolio-contents/` 또는 지정된 하위 폴더)에 생성해야 한다. (`MDGroup`이나 임시 폴더에 결과물을 만들지 말 것)
3. **할루시네이션(창작·과장) 절대 금지**
   - 기존 HTML 파일에 적혀 있던 AI 창작 내용(예: 약국 프로젝트의 '16종 시약 비트마스크 해시', '비커 믹싱', 검증되지 않은 성능 개선 수치, 허구 갈등 해결 사례 등)은 절대 가져오지 마라.
   - 반드시 `C:\Users\wnstn\Desktop\MDGroup` 내의 실제 문서(코드 리뷰, 회의록, 기획서, 노션 내보내기 문서 등)에서 확인되는 사실만 작성하고, 확인이 필요한 항목(기여도 수치, 배포 링크 등)은 `[확인 필요: ...]`로 명시해라.
4. **전공 수업용 과제(람다 ~ 트릭컬) 분리 원칙**
   - 현재 `그 외 프로젝트`에 있는 전공 포트폴리오 수업 과제 5개(`자바 람다 학습 기록`, `게임 플레이와 모바일 순위 분석`, `마비노기 모바일: 에린의 조각들`, `모바일인덱스 순위 분석`, `트릭컬 리바이브 재미요소 분석`)는 학점 이수를 위해 넣어둔 것이며 실제 회사 이력서 제출 시에는 제거할 항목이다.
   - 따라서 새롭게 구성할 포트폴리오 구조에서는 **노션 포트폴리오 기반의 [메인 프로젝트] / [서브 프로젝트]**를 중심으로 편성하고, 수업용 과제 5개는 별도 섹션(추후 이력서 제출 시 비노출/제거 대상)으로 명확히 분리해 관리한다.

---

# 📂 참고해야 할 원본 데이터 경로 (`MDGroup`)

작성 시 아래 노션 포트폴리오 마스터 문서와 각 프로젝트 원본 폴더를 반드시 먼저 읽고 팩트체크를 수행해라.

### 1. 노션 포트폴리오 마스터 목록 (기준점)
- `C:\Users\wnstn\Desktop\MDGroup\02_Areas\커리어\취업 준비\포트폴리오\Notion\조준수 _ JoJunsu__361ab24d893b8092a462f070db844503.md`
- `C:\Users\wnstn\Desktop\MDGroup\02_Areas\커리어\취업 준비\포트폴리오\Notion\조준수 _ JoJunsu__3d4ab24d893b80009815e2e7dcba0314.md`
- `C:\Users\wnstn\Desktop\MDGroup\02_Areas\커리어\취업 준비\넥토리얼\넥토리얼_노션_포트폴리오_첫페이지.md`
- `C:\Users\wnstn\Desktop\MDGroup\02_Areas\문서 관리\문서_분류와_연관관계.md`

### 2. 메인 프로젝트 (대표 프로젝트 4선) 원본 경로
1. **내 약국에는 정상이 없다 (Project Pharmacy)**
   - 노션 요약: `C:\Users\wnstn\Desktop\MDGroup\01_Projects\Project Pharmacy\포트폴리오\Notion\내 약국에는 정상이 없다__3d4ab24d893b802fbfe0d9832fd0162f.md`
   - 상세 기획·코드 검토·마일스톤: `C:\Users\wnstn\Desktop\MDGroup\01_Projects\Project Pharmacy\Notion\` 및 `개발 검토\`
2. **누리살이 (GameAify AI 기술상 수상작)**
   - 노션 요약 및 상세: `C:\Users\wnstn\Desktop\MDGroup\03_Resources\프로젝트 참고\누리살이\Notion\`
3. **최후의 전사 / 보드게임 - 라스트 워리어 스탠딩**
   - 노션 요약: `C:\Users\wnstn\Desktop\MDGroup\03_Resources\프로젝트 참고\라스트 워리어 스탠딩\포트폴리오\Notion\`
   - 작업·회의록(44개 항목): `C:\Users\wnstn\Desktop\MDGroup\03_Resources\프로젝트 참고\라스트 워리어 스탠딩\Notion\`
4. **2026 캡스톤 디자인 (RootMarket / ConsoleAuction)**
   - 캡스톤 및 기술 문서: `C:\Users\wnstn\Desktop\MDGroup\01_Projects\RootMarket\`

### 3. 서브 프로젝트 (노션 포트폴리오 수록 작업물) 원본 경로
- **게임 개발 / 프로토타입**
  - `P(Pawn)의 거짓`: `C:\Users\wnstn\Desktop\MDGroup\03_Resources\프로젝트 참고\Pawn의 거짓\Notion\`
  - `아기 해달 뀨아`: `C:\Users\wnstn\Desktop\MDGroup\03_Resources\프로젝트 참고\아기 해달 뀨아\Notion\`
- **게임 기획 / UX·UI 설계**
  - `앱 기획서 - 담다(DamDa)`: `C:\Users\wnstn\Desktop\MDGroup\03_Resources\프로젝트 참고\담다\Notion\`
  - `림버스 컴퍼니 도감 앱 UX/UI 설계`: `C:\Users\wnstn\Desktop\MDGroup\03_Resources\프로젝트 참고\림버스 도감 앱\Notion\`
  - `추석 이벤트 기획서(마비노기 모바일)`: `C:\Users\wnstn\Desktop\MDGroup\03_Resources\게임 기획\마비노기 모바일\추석 이벤트\Notion\`
  - `겨울 이벤트 기획서(마비노기 모바일)`: `C:\Users\wnstn\Desktop\MDGroup\03_Resources\게임 기획\마비노기 모바일\겨울 이벤트\Notion\`
- **게임 데이터 분석 / 시각 표현**
  - `메이플 키우기 데이터 분석`: `C:\Users\wnstn\Desktop\MDGroup\03_Resources\게임 분석\메이플 키우기\Notion\`
  - `림버스 컴퍼니 - 거울던전 클리어 타임 분석`: `C:\Users\wnstn\Desktop\MDGroup\03_Resources\게임 분석\림버스 컴퍼니\Notion\`
  - `WOW 레벨링 데이터 분석`: `C:\Users\wnstn\Desktop\MDGroup\03_Resources\게임 분석\WOW\Notion\`
  - `이모티콘 제작`: `C:\Users\wnstn\Desktop\MDGroup\03_Resources\아트와 디자인\이모티콘\Notion\`

---

# 📝 생성할 Markdown 파일 구성 및 양식

결과물은 `c:\Users\wnstn\Documents\GitHub\JUNSUJO\portfolio_docs\` (또는 `JUNSUJO/docs/portfolio_md/`) 아래에 다음과 같은 체계로 생성해라.

### 1. 전체 목차 및 구성 인덱스 파일 (`00_포트폴리오_전체목차_및_구성안.md`)
- **섹션 A. 메인 프로젝트 (대표 4선)** — 카드 요약 문구(한 줄 소개, 담당 역할, 핵심 태그) + 상세 페이지 연결 구조
- **섹션 B. 서브 프로젝트 (그 외 프로젝트 - 실무/이력서 제출용)** — 노션 포트폴리오 기반의 프로젝트들을 역량별 또는 학기별로 정리한 목록과 요약
- **섹션 C. 전공 수업 과제 (학교 평가용 / 이력서 제출 시 제외 대상)** — 기존 `assignment-01` ~ `05` 분리 안내

### 2. 개별 프로젝트 상세 Markdown 파일 (`main-01_...md`, `sub-01_...md` 등)
각 프로젝트의 `.md` 파일은 포트폴리오 웹사이트의 메인 카드와 상세 페이지(`ON THIS PAGE` 목차)에 그대로 옮겨 심을 수 있도록 아래 표준 목차를 갖춰 작성해라:

1. **카드 요약 정보 (메인 페이지 노출용)**
   - 프로젝트명 / 한 줄 소개 / 진행 기간 및 학기 / 인원 및 담당 역할 / 핵심 기술 태그 / 원본 자료 및 증빙 경로
2. **목차 (ON THIS PAGE)**
   - 해당 프로젝트의 성격(개발 / 기획 / 데이터 분석 / 디자인)에 맞춘 섹션 목차
3. **개요 및 기획 의도 (`#overview`, `#mechanics`)**
   - 왜 이 프로젝트를 시작했는지, 어떤 플레이 경험이나 분석 목표를 세웠는지 실제 문서 기반으로 서술
4. **담당 역할 및 핵심 기여 (`#role`)**
   - 팀 전체 작업과 내가 직접 설계·구현·판단한 영역을 명확히 구분
5. **구현 구조 및 작업 과정 (`#architecture` / `#process`)**
   - 실제 클래스/시스템 구조(예: `GameManager`, `TimeManager`, FSM 등), 기획 설계 과정, 데이터 수집·분석 방법론 등을 구체적으로 정리
6. **문제 해결 및 개선 사례 (`#troubleshooting`)**
   - 실제 개발 리포트·Git 이력·회의록·플레이테스트(예: 카메라 블렌드 타이밍 이슈, 5회 플레이테스트 밸런스 수정 등)에 기록된 진짜 문제와 해결 과정만 기술
7. **핵심 결과물 및 시연 자료 목록 (`#showcase`)**
   - 첨부 가능한 이미지, 영상, PDF, 구글 드라이브 링크, Figma 링크 정리
8. **배운 점과 아쉬운 점 / 회고 (`#takeaways`)**
   - 노션 포트폴리오의 `Learned` / `Lacked`를 기반으로 다음 프로젝트에 어떻게 이어졌는지 정리

---

# 🚀 작업 진행 순서
1. 먼저 `MDGroup`의 노션 포트폴리오 마스터 문서와 각 프로젝트 폴더의 문서를 읽고 전체 프로젝트 목록을 매핑한다.
2. `c:\Users\wnstn\Documents\GitHub\JUNSUJO` 내에 전체 목차 파일(`00_포트폴리오_전체목차_및_구성안.md`)을 먼저 생성한다.
3. 이어서 **메인 프로젝트 4개**의 상세 `.md` 파일을 실제 문서 기반으로 작성한다.
4. 그 다음 **서브 프로젝트**들의 상세 `.md` 파일을 순차적으로 작성하고, 각 파일에서 추가로 확인이 필요한 항목을 마지막에 리스트업해 보고한다.
```
