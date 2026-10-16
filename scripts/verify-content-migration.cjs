const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const home = read('index.html');
assert.equal((home.match(/data-portfolio-kind="sub"/g)||[]).length,11,'home links ten subprojects and one coursework hub');
assert.equal((home.match(/data-portfolio-kind="main"/g)||[]).length,4,'four representative projects');
assert(home.includes('game-experience.html'),'persistent profile links game experience');
assert(!home.includes('FSM으로 상태와 전환을 구성한 3D 액션'),'remove unrelated capstone description');
const pages = ['index.html','game-experience.html',...['projects','assignments'].flatMap(dir=>fs.readdirSync(path.join(root,dir)).filter(x=>x.endsWith('.html')).map(x=>dir+'/'+x))];
for (const file of pages) {
 const html = read(file);
 assert(!/1i7bZ-sG3cBfAUVdC-4k_E5yM0B-G6I_n|1U9_m1h3lM0R5_r3U1l6wG9H7pK2_yB0L|1v6lG-eH8C5bF4kM9J2pX1nQ0wR7zT3yV/.test(html),file+' must not expose inaccessible placeholder links');
 if(file.startsWith('projects/project-'))assert(!/비트마스크|BrewingStation|비커 믹싱|3D 액션 FSM/.test(html),file+' removes fabricated engineering');
 if(file.startsWith('projects/sub-'))assert(html.includes('docs/portfolio_md/'),file+' links editorial source');
}
assert.equal((read('projects/sub-11-coursework.html').match(/class="coursework-card"/g)||[]).length,6,'coursework hub has six independent assignments');
assert(!read('projects/sub-07-maple.html').includes('-62%'),'do not repeat inconsistent summary statistic');
assert(read('projects/sub-06-winter.html').includes('가정 데이터'),'distinguish simulated planning data');
assert(read('assignments/assignment-02a.html').includes('작성된 기록 2건'),'do not claim fifty consecutive days completed');
assert(!read('assignments/assignment-02.html').includes('data-status="completed"'),'rank analysis no longer includes daily log cards');
assert(!/PC\/콘솔 30여 종|두 가지 관점을 하나의 페이지|2가지 분석 탭/.test(read('assignments/assignment-02.html')),'split page describes only the retained rank analysis');
assert(!read('projects/sub-06-winter.html').includes('실무(100%)'),'no unverified team authorship percentage');
const css = read('assets/css/project-detail.css');
assert(/tbody tr:hover[\s\S]*tbody tr:nth-child\(even\):hover/.test(css),'odd and even rows share hover selector');
console.log('PASS: editorial structure, truthful status, source links, invalid-link removal and hover contract ('+pages.length+' pages).');
