const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const root = path.resolve(__dirname, '..');

const reports = [
  {
    source: 'docs/portfolio_md/assignment-01_자바람다_최종학습노트.md',
    target: 'assignments/assignment-01.html', number: '01',
    title: '자바 람다 · 14개 단원 최종 학습 노트',
    subtitle: '기존 학습 기록과 후반 단원 보완 노트 · 약 1시간 복습 단위',
    ids: ['growth', 'overview', 'basics', 'notes', 'example', 'takeaways', 'sources'],
    labels: ['정리 결과', '단원별 현황', '1~8단원', '9~14단원', '통합 예제', '최종 회고', '참고 자료']
  },
  {
    source: 'docs/portfolio_md/assignment-02a_모바일인덱스_TOP50_최종기록.md',
    target: 'assignments/assignment-02a.html', number: '02-A',
    title: '모바일인덱스 TOP50 · 1~50일차 분석 기록',
    subtitle: '모바일인덱스 1~50위 타이틀 1~50일차 직접 체험·분석 최종 기록',
    ids: ['growth', 'overview', 'records', 'takeaways', 'sources'],
    labels: ['분석 요약과 기준', '진행도 한눈에 보기', '1~50일차 기록', '종합 결론', '참고 및 연계 기록'],
    accordion: 2,
    css: '../assets/css/pages/assignment-02.css'
  },
  {
    source: 'docs/portfolio_md/assignment-07_소드x스태프_순위상승_및_핵심재미_분석보고서.md',
    target: 'assignments/assignment-07.html', number: '07',
    title: '소드 x 스태프 · 순위 상승과 핵심 재미 분석',
    subtitle: '전사 Lv.12 · 전투력 8.38k · 약 30분 초반 체험 분석 최종본',
    ids: ['growth', 'overview', 'liveops', 'mechanics', 'experience', 'developer', 'design', 'takeaways', 'sources'],
    labels: ['결론과 핵심 재미', '게임 개요와 순위', '출시·콜라보 요인', '코어 메커닉스', '30분 플레이와 UX', '개발자 관점', '기획자 관점', '최종 평가와 마감', '참고 자료']
  }
];

async function main() {
  let modulePath;
  try { modulePath = require.resolve('marked'); }
  catch { modulePath = 'C:/Users/wnstn/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/marked/lib/marked.esm.js'; }
  const { marked } = await import(pathToFileURL(modulePath).href);
  const hub = fs.readFileSync(path.join(root, 'projects/sub-11-coursework.html'), 'utf8');
  const theme = hub.slice(hub.indexOf('<div class="floating-theme-fab"'), hub.indexOf('<script src="../assets/js/portfolio-system.js"'));
  for (const report of reports) {
    const md = fs.readFileSync(path.join(root, report.source), 'utf8');
    const parts = md.replace(/^# .+\r?\n/, '').trim().split(/^## /m).filter(Boolean);
    if (parts.length !== report.ids.length) throw new Error(`${report.source}: expected ${report.ids.length} sections, got ${parts.length}`);
    const sections = parts.map((part, i) => {
      let html = marked.parse('## ' + part);
      html = html.replace(/href="([^"]+)"/g, (match, href) => {
        if (/^(?:https?:|#|mailto:)/.test(href)) return match;
        const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(report.source), href));
        return 'href="' + path.posix.relative(path.posix.dirname(report.target), resolved) + '"';
      });
      html = html.replace(/<table>/g, `<div class="table-scroll" tabindex="0" role="region" aria-label="${report.labels[i]} 표"><table>`).replace(/<\/table>/g, '</table></div>');
      if (i === report.accordion) {
        html = html.replace(/<h3>(.*?)<\/h3>([\s\S]*?)(?=<h3>|$)/g, (_, title, body) => {
          return `<details class="rank-accordion-item is-completed" data-record-kind="completed"><summary class="rank-accordion-summary"><span class="rank-game-name">${title}</span><span class="rank-status-tag completed">분석 완료</span></summary><div class="rank-detail-body editorial-body">${body}</div></details>`;
        });
      }
      return `<section class="${i ? 'content-section' : 'learning-growth-card'} editorial-body" id="${report.ids[i]}">\n${html}</section>`;
    }).join('\n');
    const html = `<!doctype html>
<html lang="ko" data-theme="light"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${report.title} | 조준수 포트폴리오</title><meta name="description" content="${report.subtitle}">
<script src="../assets/js/theme-init.js"></script>
<link rel="stylesheet" href="../assets/css/portfolio-system.css">
${report.css ? `<link rel="stylesheet" href="${report.css}">` : ''}
<link rel="stylesheet" href="../assets/css/project-detail.css"></head><body>
<a class="skip-link" href="#main-content">본문 바로가기</a>
<header class="mobile-header"><a class="back-link-btn" href="../projects/sub-11-coursework.html#overview">← 과제 컬렉션</a><span class="header-caption">JUNSU JO / PORTFOLIO</span></header>
<div class="detail-layout-container"><aside class="toc-rail-container" aria-label="페이지 목차"><div class="toc-rail-title">ON THIS PAGE</div><nav class="toc-track-line" aria-label="상세 목차">${report.ids.map((id, i) => `<a class="toc-item-link" href="#${id}">${report.labels[i]}</a>`).join('')}</nav></aside>
<main class="detail-main-content" id="main-content"><div class="detail-page-heading"><span class="eyebrow">ASSIGNMENT ${report.number} / FINAL DOCUMENT · 2026.11.19</span><h1>${report.title}</h1><p class="detail-sub-title">${report.subtitle}</p></div>
${sections}
<footer class="detail-footer-nav"><a class="detail-nav-btn" href="../projects/sub-11-coursework.html#overview">과제 컬렉션으로</a></footer>
</main></div>${theme}<script src="../assets/js/portfolio-system.js"></script></body></html>\n`;
    fs.writeFileSync(path.join(root, report.target), html);
    console.log('Rendered ' + report.target);
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
