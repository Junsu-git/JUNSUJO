const {serve,root,chromium}=require('./verify-portfolio.cjs');
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
(async()=>{
  const server=await serve();
  const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
  try{
    const context=await browser.newContext({viewport:{width:1440,height:960},reducedMotion:'reduce'});
    await context.route(/https?:\/\/(?!127\.0\.0\.1)/,route=>route.abort());
    const page=await context.newPage();
    await page.goto(`http://127.0.0.1:${server.address().port}/index.html`);
    assert.deepEqual(await page.locator('.home-nav-link').evaluateAll(nodes=>nodes.map(node=>node.hash)),['#hero','#skills','#featured-projects','#other-projects','#contact'],'main navigation follows requested flow');
    assert.equal(await page.locator('.sticky-profile-sidebar').getByText(/Junsu|지망/i).count(),0,'no repeated English name or awkward role');
    assert.equal(await page.locator('#hero').getByText('프로젝트 살펴보기',{exact:false}).count(),0,'redundant hero CTA removed');
    assert.equal(await page.locator('#hero #experience').count(),1,'background integrated with introduction');
    assert.equal(await page.locator('#featured-projects .featured-project-card').count(),4);
    assert.equal(await page.locator('#other-projects .horizontal-project-slot').count(),5);
    assert.equal(await page.locator('#contact .contact-card').count(),2,'two consistent contact cards');
    const output='C:/Users/wnstn/.codex/visualizations/2026/10/15/01a13e7f-c40c-72f3-9ada-60dc2d0453a5';
    for(const width of [320,390,800,1440])for(const theme of ['light','dark']){
      await page.setViewportSize({width,height:960});
      await page.evaluate(theme=>window.portfolioTheme.setTheme(theme),theme);
      assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'no horizontal overflow');
      const active=page.locator('.home-nav-link[href="#skills"]');await active.click();
      await page.waitForFunction(()=>location.hash==='#skills' && document.querySelector('#skills').getBoundingClientRect().top<innerHeight);
      await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
      assert.equal(await active.getAttribute('aria-current'),'location','selected navigation matches destination');
      if(width===1440){
        await page.evaluate(()=>window.scrollTo(0,0));
        await page.waitForFunction(()=>document.querySelector('.home-nav-link.active').hash==='#hero');
        await page.screenshot({path:output+`/home-feedback-${theme}.png`});
        await page.locator('#contact').scrollIntoViewIfNeeded();
        await page.waitForFunction(()=>document.querySelector('.home-nav-link.active').hash==='#contact');
        await page.screenshot({path:output+`/home-contact-${theme}.png`});
      }
      if(width===390&&theme==='dark'){
        await page.evaluate(()=>window.scrollTo(0,0));
        await page.screenshot({path:output+'/home-feedback-mobile.png'});
      }
    }
    console.log('PASS: main flow, profile, project groups, contact cards; 8 theme/viewport combinations.');
  }finally{await browser.close();server.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
