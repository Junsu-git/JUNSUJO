const {serve,chromium}=require('./verify-portfolio.cjs');
const assert=require('node:assert/strict');
const output='C:/Users/wnstn/.codex/visualizations/2026/10/15/01a13e7f-c40c-72f3-9ada-60dc2d0453a5';
(async()=>{
  const server=await serve();
  const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
  try{
    const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
    await context.route(/https?:\/\/(?!127\.0\.0\.1)/,route=>route.abort());
    const page=await context.newPage();const origin=`http://127.0.0.1:${server.address().port}`;
    await page.goto(origin+'/index.html');
    assert.equal(await page.locator('#featured-projects .featured-project-card').count(),4,'four grid cards');
    assert.equal(await page.locator('#other-projects .horizontal-project-slot').count(),5,'other projects remain horizontal');
    assert.equal(await page.locator('.project-gallery button:not([disabled])').count(),0,'empty galleries do not expose inactive navigation');
    assert.equal(await page.locator('.project-card-link').count(),4,'each card has an explicit detail link');
    const desktop=await page.locator('.featured-project-card').evaluateAll(nodes=>nodes.map(n=>({x:n.getBoundingClientRect().x,y:n.getBoundingClientRect().y})));
    assert.equal(desktop[0].y,desktop[1].y);assert(desktop[1].x>desktop[0].x);assert(desktop[2].y>desktop[0].y);
    for(const width of [320,390,850,1440])for(const theme of ['light','dark']){
      await page.setViewportSize({width,height:1000});await page.evaluate(t=>window.portfolioTheme.setTheme(t),theme);
      assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'cards fit viewport');
      await page.evaluate(()=>document.querySelector('#featured-projects').scrollIntoView({block:'start',behavior:'instant'}));
      if(width===1440||width===390)await page.screenshot({path:`${output}/project-cards-${width}-${theme}.png`});
      if(width===1440)await page.locator('.featured-project-grid').screenshot({path:`${output}/project-cards-grid-${theme}.png`});
      if(width===390){
        const boxes=await page.locator('.featured-project-card').evaluateAll(nodes=>nodes.map(n=>n.getBoundingClientRect().x));
        assert(boxes.every(x=>x===boxes[0]),'mobile cards form one column');
      }
    }
    // Fixture-only images exercise real image navigation without inventing portfolio screenshots.
    const fixture=await context.newPage();
    await fixture.route('**/index.html',async route=>{
      const response=await route.fetch();let html=await response.text();
      const image=(color,label)=>`<figure class="gallery-slide"><img src="data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='640' height='360'><rect width='640' height='360' fill='${color}'/></svg>`)}" alt="${label}"><figcaption>${label}</figcaption></figure>`;
      html=html.replace('<div class="gallery-slides">',`<div class="gallery-slides">${image('#314968','검증 이미지 A')}${image('#506944','검증 이미지 B')}`);
      html=html.replace('<div class="gallery-slides"></div>',`<div class="gallery-slides">${image('#665533','검증 이미지 C')}</div>`);
      await route.fulfill({response,body:html});
    });
    await fixture.goto(origin+'/index.html');
    const gallery=fixture.locator('.project-gallery').first();
    assert.equal(await gallery.locator('.gallery-slide:not([hidden]) img').getAttribute('alt'),'검증 이미지 A');
    await gallery.locator('[data-gallery-next]').click();
    assert.equal(await gallery.locator('.gallery-slide:not([hidden]) img').getAttribute('alt'),'검증 이미지 B');
    await gallery.locator('[data-gallery-next]').click();
    assert.equal(await gallery.locator('.gallery-slide:not([hidden]) img').getAttribute('alt'),'검증 이미지 A','next wraps');
    await gallery.locator('[data-gallery-prev]').click();
    assert.equal(await gallery.locator('.gallery-slide:not([hidden]) img').getAttribute('alt'),'검증 이미지 B','previous wraps');
    await gallery.locator('.gallery-dot').first().click();
    await gallery.locator('.gallery-viewport').focus();await fixture.keyboard.press('ArrowRight');
    assert.equal(await gallery.locator('.gallery-slide:not([hidden]) img').getAttribute('alt'),'검증 이미지 B','keyboard navigation');
    assert.equal(await fixture.locator('.project-gallery').nth(1).locator('.gallery-status').textContent(),'1 / 1','single image gallery independent');
    assert.equal(await fixture.locator('.project-gallery').nth(1).locator('button:not([disabled])').count(),0,'single image does not expose redundant navigation');
    assert.equal(await fixture.locator('.project-gallery').nth(2).locator('.gallery-status').textContent(),'이미지 준비 중','empty gallery independent');
    assert.equal(await gallery.locator('.gallery-dot[aria-pressed="true"]').count(),1);
    console.log('PASS: 2x2 featured cards, mobile stack, real-image fixture navigation/wrapping/dots/keyboard, independent empty galleries.');
  }finally{await browser.close();server.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
