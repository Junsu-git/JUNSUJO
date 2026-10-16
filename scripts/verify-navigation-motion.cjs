const {serve, chromium} = require('./verify-portfolio.cjs');
const assert = require('node:assert/strict');

(async () => {
  const server = await serve();
  const browser = await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
  try {
    const context = await browser.newContext({viewport:{width:1440,height:960},reducedMotion:'reduce'});
    await context.route(/https?:\/\/(?!127\.0\.0\.1)/,route=>route.abort());
    const page = await context.newPage();
    const origin = `http://127.0.0.1:${server.address().port}`;
    for (const file of ['index.html','projects/project-01-pharmacy.html','projects/sub-11-coursework.html','game-experience.html']) {
      for (const width of [1440,390]) {
        await page.setViewportSize({width,height:960});
        for (const input of ['mouse','keyboard']) {
          await page.goto(`${origin}/${file}`);
          await page.evaluate(()=>window.scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'}));
          const top = page.getByRole('button',{name:'페이지 최상단으로 이동'});
          await top.waitFor({state:'visible'});
          if (input === 'mouse') await top.click();
          else {await top.focus();await top.press('Enter');}
          await page.waitForFunction(()=>scrollY===0);
          assert.equal(await page.evaluate(()=>document.activeElement.id),'main-content',`${file}/${width}/${input}: top button focuses content, not the skip link`);
          assert(await page.locator('.skip-link').evaluate(el=>el.getBoundingClientRect().bottom<0),'skip link stays off screen after returning to top');
        }
      }
    }
    await page.goto(`${origin}/index.html`);
    await page.keyboard.press('Tab');
    assert(await page.locator('.skip-link').evaluate(el=>el===document.activeElement&&el.getBoundingClientRect().top>=0),'keyboard users can still discover the skip link');
    await page.keyboard.press('Enter');
    await page.waitForFunction(()=>document.activeElement.id==='main-content');
    assert(await page.locator('.skip-link').evaluate(el=>el.getBoundingClientRect().bottom<0),'skip link hides after activation');

    await page.setViewportSize({width:1440,height:960});
    await page.emulateMedia({reducedMotion:'no-preference'});
    for (const theme of ['light','dark']) {
      await page.evaluate(value=>window.portfolioTheme.setTheme(value),theme);
      for (const selector of ['.featured-project-card','.sub-project-card','.contact-card']) {
        const card = page.locator(selector).first();
        await card.scrollIntoViewIfNeeded();
        await page.mouse.move(0,0);
        await page.waitForFunction(sel=>getComputedStyle(document.querySelector(sel)).transform==='none',selector);
        const before = await card.boundingBox();
        const documentHeight = await page.evaluate(()=>document.documentElement.scrollHeight);
        await card.hover();
        await page.waitForFunction(({sel,y})=>document.querySelector(sel).getBoundingClientRect().y<y-2.9,{sel:selector,y:before.y});
        assert.equal(await page.evaluate(()=>document.documentElement.scrollHeight),documentHeight,'card feedback does not reflow the page');
        assert.equal((await card.boundingBox()).width,before.width,'card width stays stable');
      }
      const passive = page.locator('.background-timeline-card');
      await passive.hover();
      assert.equal(await passive.evaluate(el=>getComputedStyle(el).transform),'none','information cards remain stationary');
      await page.locator('#skills').scrollIntoViewIfNeeded();
      await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
      await page.locator('.floating-back-to-top.visible').waitFor({state:'hidden'});
      await page.locator('#featured-projects').scrollIntoViewIfNeeded();
      await page.getByRole('button',{name:'페이지 최상단으로 이동'}).click();
      await page.waitForFunction(()=>scrollY===0);
      assert(await page.locator('.skip-link').evaluate(el=>el.getBoundingClientRect().bottom<0),'smooth scroll also leaves skip link hidden');
    }
    await page.emulateMedia({reducedMotion:'reduce'});
    for (const selector of ['.featured-project-card','.sub-project-card','.contact-card']) {
      const card=page.locator(selector).first();
      await card.hover();
      assert.equal(await card.evaluate(el=>getComputedStyle(el).transform),'none','motion reduction removes hover travel');
      assert.equal(await card.evaluate(el=>getComputedStyle(el).transitionDuration),'0s','motion reduction removes transitions');
      assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'no horizontal overflow');
    }
    const touch = await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
    await touch.route(/https?:\/\/(?!127\.0\.0\.1)/,route=>route.abort());
    const phone = await touch.newPage();
    await phone.goto(`${origin}/index.html`);
    const card=phone.locator('.sub-project-card').first();
    await card.tap();
    assert.equal(await card.evaluate(el=>getComputedStyle(el).transform),'none','touch does not leave a hover lift stuck on cards');
    assert(await phone.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'touch layout stays within viewport');
    await touch.close();
    console.log('PASS: back-to-top across 4 page types and 2 widths, keyboard skip link, light/dark card motion without reflow, smooth scrolling, reduced motion and touch.');
  } finally {await browser.close();server.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
