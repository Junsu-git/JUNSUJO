const {serve,chromium}=require('./verify-portfolio.cjs');
const assert=require('node:assert/strict');

(async()=>{
  const server=await serve();
  const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
  try{
    const context=await browser.newContext({viewport:{width:1440,height:960},reducedMotion:'reduce'});
    await context.route(/https?:\/\/(?!127\.0\.0\.1)/,r=>r.abort());
    const origin=`http://127.0.0.1:${server.address().port}`;
    await context.grantPermissions(['clipboard-read','clipboard-write'],{origin});
    const page=await context.newPage();
    await page.goto(origin+'/index.html');
    const buttons=page.getByRole('button',{name:'이메일 주소 복사: wnstn2228@naver.com',exact:true});
    assert.equal(await buttons.count(),2,'both email actions are explicit copy buttons');
    const toast=page.locator('.copy-toast[role="status"]');
    const contactButton=page.locator('#contact [data-copy-email]');
    for(const [index,key] of [[0,null],[1,'Enter'],[1,'Space']]){
      if(key){await buttons.nth(index).focus();await buttons.nth(index).press(key);}
      else await buttons.nth(index).click();
      await page.waitForFunction(()=>document.querySelector('.copy-toast')?.classList.contains('is-visible'));
      assert.equal(await toast.textContent(),'이메일이 복사되었습니다!');
      assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),'wnstn2228@naver.com','real clipboard contains the address');
      assert.equal(page.url(),origin+'/index.html','copy action does not navigate away');
    }
    await page.waitForFunction(()=>!document.querySelector('.copy-toast').classList.contains('is-visible'));
    for(const width of [320,390,1440])for(const theme of ['light','dark']){
      await page.setViewportSize({width,height:844});
      await page.evaluate(t=>window.portfolioTheme.setTheme(t),theme);
      await contactButton.click();
      await page.waitForFunction(()=>document.querySelector('.copy-toast').classList.contains('is-visible'));
      const box=await toast.boundingBox();
      assert(box.x>=0&&box.x+box.width<=width&&box.y>=0&&box.y+box.height<=844,'toast fits viewport');
      assert(await toast.evaluate(el=>{
        const a=el.getBoundingClientRect(),b=document.querySelector('.floating-theme-fab').getBoundingClientRect();
        return a.right<=b.left||a.left>=b.right||a.bottom<=b.top||a.top>=b.bottom;
      }),'toast does not cover theme controls');
    }
    // A successful legacy copy must preserve focus, and failed copies must not claim success.
    await page.addInitScript(()=>{
      Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:()=>Promise.reject(new Error('unavailable'))}});
      window.__legacyResult=true;
      document.execCommand=command=>command==='copy'&&window.__legacyResult;
    });
    await page.goto(origin+'/index.html');
    await contactButton.click();
    await page.waitForFunction(()=>document.querySelector('.copy-toast').classList.contains('is-visible'));
    assert.equal(await toast.textContent(),'이메일이 복사되었습니다!');
    assert.equal(await page.evaluate(()=>document.activeElement.dataset.copyEmail),'wnstn2228@naver.com','fallback restores focus');
    await page.evaluate(()=>window.__legacyResult=false);
    await contactButton.click();
    await page.waitForFunction(()=>document.querySelector('.copy-toast').textContent.includes('복사하지 못했습니다'));
    assert.equal(await page.locator('textarea[data-copy-helper]').count(),0,'temporary field removed after failure');
    console.log('PASS: two copy buttons, actual clipboard, keyboard activation, timed toast, six viewport/theme combinations and explicit failure feedback.');
  }finally{await browser.close();server.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
