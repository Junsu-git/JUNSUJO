const { chromium } = require('C:/Users/wnstn/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
function serve() {
  const server = http.createServer((req, res) => {
    const file = path.join(root, decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
    if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
    try {
      const target = fs.statSync(file).isDirectory() ? path.join(file, 'index.html') : file;
      res.setHeader('Content-Type', ({'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.png':'image/png','.webp':'image/webp'})[path.extname(target)] || 'application/octet-stream');
      res.end(fs.readFileSync(target));
    } catch { res.writeHead(404).end(); }
  });
  return new Promise(resolve => server.listen(0, '127.0.0.1', () => resolve(server)));
}
module.exports = { serve, root, chromium };
if (require.main === module) (async () => {
  const server = await serve();
  const browser = await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:true});
  try {
    const context = await browser.newContext({viewport:{width:1440,height:960}, colorScheme:'light'});
    await context.route(/https?:\/\/(?!127\.0\.0\.1)/, route => route.abort());
    const page = await context.newPage();
    const origin = `http://127.0.0.1:${server.address().port}`;
    await page.goto(origin);
    const trigger = page.locator('.theme-fab-trigger');
    await trigger.click();
    assert.equal(await trigger.getAttribute('aria-expanded'), 'true', 'FAB exposes expanded state');
    await page.waitForFunction(()=>document.activeElement.dataset.themeSet === 'light');
    assert.equal(await page.evaluate(()=>document.activeElement.dataset.themeSet), 'light', 'opened options receive keyboard focus');
    assert.equal(await page.locator('.theme-fab-spheres').getAttribute('aria-hidden'), 'false', 'options accessible when open');
    await page.locator('.theme-fab-sphere[data-theme-set="dark"]').click();
    assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
    assert.equal(await trigger.getAttribute('aria-expanded'), 'false');
    const other = await context.newPage();
    await other.goto(origin + '/projects/project-01-pharmacy.html');
    await other.locator('.theme-fab-trigger').click();
    await other.locator('.theme-fab-sphere[data-theme-set="light"]').click();
    await page.waitForFunction(() => document.documentElement.dataset.theme === 'light');
    await page.bringToFront();
    await trigger.click();
    await page.keyboard.press('Escape');
    assert.equal(await trigger.getAttribute('aria-expanded'), 'false');
    await trigger.click();
    await page.waitForFunction(()=>getComputedStyle(document.querySelector('.theme-fab-spheres')).opacity === '1');
    await page.locator('h1').first().click();
    assert.equal(await trigger.getAttribute('aria-expanded'), 'false');
    await trigger.click();
    await page.screenshot({path:'C:/Users/wnstn/.codex/visualizations/2026/10/15/01a13e7f-c40c-72f3-9ada-60dc2d0453a5/portfolio-theme-open.png'});
    const buttons = await page.locator('.theme-fab-sphere').evaluateAll(nodes=>nodes.map(node=>{
      const box=node.getBoundingClientRect();return{x:box.x,y:box.y,width:box.width,height:box.height};
    }));
    assert(buttons.every((button,index)=>button.width===button.height && Math.abs(button.x-buttons[0].x)<1 && (!index||button.y>buttons[index-1].y)),'theme options form a vertical column of circles');
    await page.keyboard.press('Escape');
    const failures = [];
    const files = ['index.html', ...['projects','assignments'].flatMap(dir => fs.readdirSync(path.join(root,dir)).filter(x=>x.endsWith('.html')).map(x=>`${dir}/${x}`))];
    for (const width of [1440,390]) {
      await page.setViewportSize({width,height:900});
      for (const file of files) {
        await page.goto(origin + '/' + file);
        const problems = await page.evaluate(() => {
          const result = [];
          if (document.documentElement.scrollWidth > innerWidth + 1) result.push('horizontal overflow');
          const ids = [...document.querySelectorAll('[id]')].map(x=>x.id);
          if (new Set(ids).size !== ids.length) result.push('duplicate IDs');
          for (const a of document.querySelectorAll('a[href^="#"]')) if(a.hash && !document.getElementById(decodeURIComponent(a.hash.slice(1)))) result.push('missing anchor '+a.hash);
          if (document.querySelectorAll('script[src$="portfolio-system.js"]').length !== 1) result.push('script duplication');
          if (!location.pathname.endsWith('/index.html') && location.pathname !== '/' && document.querySelector('main > section')?.id !== 'growth') result.push('growth not first section');
          return result;
        });
        if(problems.length) failures.push({width,file,problems});
      }
    }
    assert.deepEqual(failures, [], 'all-page layout and anchor checks');
    console.log('PASS: FAB selection, outside click, Escape, cross-tab sync; 10 pages at desktop/mobile widths.');
    await context.close();
  } finally { await browser.close(); server.close(); }
})().catch(error => {console.error(error);process.exitCode=1;});
