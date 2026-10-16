const {serve, chromium} = require('./verify-portfolio.cjs');
const assert = require('node:assert/strict');

(async () => {
  const server = await serve();
  const browser = await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:true});
  try {
    const context = await browser.newContext({reducedMotion:'reduce'});
    await context.route(/https?:\/\/(?!127\.0\.0\.1)/, route => route.abort());
    const page = await context.newPage();
    await page.goto(`http://127.0.0.1:${server.address().port}/index.html`);
    const disclosure = page.locator('.sidebar-play-history');
    const summary = disclosure.locator('summary');
    const scroller = disclosure.locator('.play-history-scroll');
    for (const viewport of [{width:1440,height:960},{width:1024,height:600},{width:800,height:960},{width:390,height:844},{width:320,height:640}]) {
      await page.setViewportSize(viewport);
      for (const theme of ['light','dark']) {
        await page.evaluate(value => window.portfolioTheme.setTheme(value), theme);
        await page.evaluate(() => {
          window.scrollTo({top:0,behavior:'instant'});
          document.querySelector('.sticky-profile-sidebar').scrollTop = 0;
        });
        await summary.focus();
        assert.equal(await disclosure.getAttribute('open'), null);
        const before = await summary.boundingBox();
        const nav = await page.locator('.sidebar-nav').boundingBox();
        assert(before.y - (nav.y + nav.height) < 25, 'disclosure immediately follows navigation');
        await summary.press('Enter');
        await scroller.waitFor({state:'visible'});
        const after = await summary.boundingBox();
        assert(Math.abs(after.y - before.y) < 1, `opening preserves summary position: ${viewport.width}x${viewport.height} ${theme}, ${before.y} -> ${after.y}`);
        assert(await scroller.evaluate(el => el.scrollHeight > el.clientHeight && el.clientHeight <= 260), 'long list has bounded internal scrolling');
        assert.equal(await disclosure.locator('tbody tr').count(), 39);
        assert.equal(await disclosure.getByRole('row', {name:'메이플스토리 미기록',exact:true}).count(), 1);
        assert.equal(await disclosure.getByRole('row', {name:'아르카나 택틱스 170시간 28분',exact:true}).count(), 1);
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'no page overflow');
        assert(await scroller.evaluate(el => el.scrollWidth <= el.clientWidth + 1), 'no list horizontal overflow');
        assert(await disclosure.locator('tbody tr').evaluateAll(rows => rows.every(row => {
          const [name,time] = row.children;
          return name.getBoundingClientRect().right <= time.getBoundingClientRect().left + 1 && getComputedStyle(time).textAlign === 'right';
        })), 'game names on left and times aligned right');
        await scroller.focus();
        await scroller.press('End');
        await page.waitForFunction(() => {
          const el = document.querySelector('.play-history-scroll');
          return el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
        });
        await summary.focus();
        await scroller.evaluate(el => el.scrollTo({top:0,behavior:'instant'}));
        await page.waitForFunction(() => document.querySelector('.play-history-scroll').scrollTop === 0);
        if (viewport.width === 1440) {
          await page.screenshot({path:`C:/Users/wnstn/.codex/visualizations/2026/10/15/01a13e7f-c40c-72f3-9ada-60dc2d0453a5/sidebar-play-history-${theme}.png`});
        }
        await summary.focus();
        await summary.press('Space');
        await scroller.waitFor({state:'hidden'});
      }
    }
    await summary.click();
    await disclosure.locator('.play-history-more').click();
    await page.waitForURL('**/game-experience.html');
    assert.equal(await page.getByRole('heading', {name:'게임 플레이 이력',exact:true}).count(), 1);
    console.log('PASS: navigation placement, stable disclosure, keyboard scroll, 39 records, detail link and no overflow across 10 viewport/theme combinations.');
  } finally {
    await browser.close();
    server.close();
  }
})().catch(error => {console.error(error);process.exitCode = 1;});
