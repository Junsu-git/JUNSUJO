const {serve,chromium}=require('./verify-portfolio.cjs');
const assert=require('node:assert/strict');
const output='C:/Users/wnstn/.codex/visualizations/2026/10/15/01a13e7f-c40c-72f3-9ada-60dc2d0453a5';
(async()=>{
  const server=await serve();
  const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
  try{
    const context=await browser.newContext({viewport:{width:1440,height:1100},reducedMotion:'reduce'});
    await context.route(/https?:\/\/(?!127\.0\.0\.1)/,r=>r.abort());
    const page=await context.newPage();await page.goto(`http://127.0.0.1:${server.address().port}/index.html`);
    assert.deepEqual(await page.locator('.background-event h4').allTextContents(),['유한대학교','사회복무요원','CHRIST (Deemed to be University)','서울디지텍고등학교'],'newest education first');
    const text=await page.locator('#experience').innerText();
    for(const value of ['2024.03','2027.02','2019.06','2021.02','2016.03','2019.02','2018.11','BBA','중퇴'])assert(text.includes(value),value);
    assert.equal(await page.locator('[data-background-toggle]').count(),0,'single institution details remain visible without a disclosure');
    const panel=page.locator('#yuhan-details');
    assert(await panel.isVisible());
    assert.equal(await panel.locator('.background-achievement-list li').count(),5);
    const positions=await page.evaluate(()=>({timeline:document.querySelector('.background-timeline-card').getBoundingClientRect().right,panel:document.querySelector('#yuhan-details').getBoundingClientRect().left,leftHeading:document.querySelector('#background-heading').getBoundingClientRect().top,rightHeading:document.querySelector('#achievement-heading').getBoundingClientRect().top}));
    assert(positions.panel>positions.timeline,'desktop detail panel sits to the right');
    assert(Math.abs(positions.leftHeading-positions.rightHeading)<1,'card titles share a baseline');
    const before=await page.locator('.background-layout').evaluate(el=>el.getBoundingClientRect().width);
    await page.locator('.background-event h4').first().click();
    assert(await panel.isVisible());
    assert.equal(await page.locator('.background-layout').evaluate(el=>el.getBoundingClientRect().width),before,'no collapse-driven column changes');
    for(const width of [320,390,850,1440])for(const theme of ['light','dark']){
      await page.setViewportSize({width,height:1100});await page.evaluate(t=>window.portfolioTheme.setTheme(t),theme);
      assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'no overflow');
      if(width===1440){
        await page.locator('#experience').screenshot({path:`${output}/education-panel-${theme}.png`});
      }
      if(width===390&&theme==='dark'){
        await page.locator('#experience').screenshot({path:`${output}/education-panel-mobile.png`});
        const stacked=await page.evaluate(()=>document.querySelector('#yuhan-details').getBoundingClientRect().top>=document.querySelector('.background-timeline-card').getBoundingClientRect().bottom);
        assert(stacked,'mobile cards stack in reading order');
      }
    }
    console.log('PASS: reverse chronology, dates, aligned independent cards, permanent details, stable columns, responsive themes.');
  }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
