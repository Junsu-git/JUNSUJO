const {serve,chromium}=require('./verify-portfolio.cjs');
const assert=require('node:assert/strict');

(async()=>{
  const server=await serve();
  const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
  try{
    const context=await browser.newContext({viewport:{width:1440,height:960},reducedMotion:'reduce'});
    await context.route(/https?:\/\/(?!127\.0\.0\.1)/,route=>route.abort());
    const page=await context.newPage();
    const origin=`http://127.0.0.1:${server.address().port}`;
    for(const theme of ['light','dark']){
      for(const file of ['index.html#main-content','index.html#hero','index.html#skills','projects/project-01-pharmacy.html#growth','game-experience.html#overview']){
        await page.goto(`${origin}/${file}`);
        await page.evaluate(value=>window.portfolioTheme.setTheme(value),theme);
        await page.reload();
        await page.waitForFunction(()=>document.activeElement.id===decodeURIComponent(location.hash.slice(1)));
        assert(await page.evaluate(()=>{
          const target=document.activeElement;
          return getComputedStyle(target).outlineStyle==='none'||getComputedStyle(target).outlineWidth==='0px';
        }),`${theme}/${file}: reloaded content does not gain a full-container outline`);
      }
    }
    await page.goto(`${origin}/index.html`);
    await page.keyboard.press('Tab');
    assert(await page.locator('.skip-link').evaluate(el=>el===document.activeElement&&el.getBoundingClientRect().top>=0),'skip link still appears for keyboard access');
    await page.keyboard.press('Enter');
    await page.waitForFunction(()=>document.activeElement.id==='main-content');
    assert.equal(await page.locator('main').evaluate(el=>getComputedStyle(el).outlineStyle),'none');
    const control=page.locator('.home-nav-link').first();
    await control.focus();
    assert(await control.evaluate(el=>el.matches(':focus-visible')&&getComputedStyle(el).outlineStyle!=='none'),'keyboard navigation links retain their focus indicator');
    await page.locator('.home-nav-link[href="#skills"]').click();
    await page.waitForFunction(()=>document.activeElement.id==='skills');
    assert.equal(await page.locator('#skills').evaluate(el=>getComputedStyle(el).outlineStyle),'none','section navigation does not add a box');
    console.log('PASS: reload/hash content focus in both themes, skip-link access and preserved control focus outlines.');
  }finally{await browser.close();server.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
