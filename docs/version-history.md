# 로컬 버전 보관

이번 작업 시작 시 작업 트리는 깨끗했고 현재 브랜치는 main이었다. 아래 두 보관 브랜치를 생성했다. 브랜치 생성은 현재 작업 파일이나 main의 위치를 바꾸지 않는다.

| 보관 브랜치 | 기준 커밋 | 내용 |
| --- | --- | --- |
| codex/archive/pre-redesign-2026-10-15 | 3639dbda8514c81ce7fe05e069ef70ac5da2f697 | Codex 전면 개편 이전 버전. 이전 레이아웃·색상·원본 콘텐츠 참고용 |
| codex/archive/before-career-review-2026-10-15 | f2438e6f9a7a1901528dc7d40cc03a74fe4faa2e | 이번 이력 수정 직전 버전. 대표 4개 이미지형 격자 카드 포함 |

두 브랜치는 로컬에 보관한다. 원격 푸시는 수행하지 않았다. 이후 작업 커밋을 이 보관 브랜치에 쌓지 않으면 당시 상태를 계속 확인할 수 있다. 이력 기간 보완과 소개 레이아웃 개선은 이후 사용자의 명시적 요청에 따라 main에 커밋한다. 보관 브랜치의 기준 커밋은 변경하지 않는다.

## 비교와 리소스 확인

```powershell
git branch --list 'codex/archive/*'
git show codex/archive/pre-redesign-2026-10-15:index.html
git diff codex/archive/pre-redesign-2026-10-15 codex/archive/before-career-review-2026-10-15 -- index.html assets
```

화면 캡처가 필요할 때는 해당 브랜치의 HTML뿐 아니라 같은 버전의 CSS·JS·이미지를 함께 열어야 한다. 구버전 파일 하나를 현재 폴더에 덮어쓰면 서로 다른 버전의 스타일이 섞일 수 있다. 보관 브랜치 전체를 별도 미리보기 체크아웃으로 열면 현재 수정본을 유지하면서 비교할 수 있다. 현재 작업을 버리거나 main을 되돌릴 필요는 없다.

복원할 때도 보관 브랜치 전체를 덮어쓰기보다, 필요한 카드·색상·자료만 검토하여 현재 버전에 가져오는 것을 권장한다.
