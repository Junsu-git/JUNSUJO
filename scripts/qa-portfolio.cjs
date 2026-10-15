const { serve, root, chromium } = require('./verify-portfolio.cjs');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const output = 'C:/Users/wnstn/.codex/visualizations/2026/10/15/01a13e7f-c40c-72f3-9ada-60dc2d0453a5';
(async()=>{
  const server = await serve();
  const browser = await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
  const failures = [], errors = [], summary = [], textContrast = [];
  try {
    const context = await browser.newContext({viewport:{width:1440,height:960},colorScheme:'light',reducedMotion:'reduce'});
    await context.route(/https?:\/\/(?!127\.0\.0\.1)/,route=>route.abort());
    const page = await context.newPage();
    page.on('pageerror',error=>errors.push(error.message));
    const origin = `http://127.0.0.1:${server.address().port}`;
    const files = ['index.html',...['projects','assignments'].flatMap(dir=>fs.readdirSync(path.join(root,dir)).filter(x=>x.endsWith('.html')).map(x=>`${dir}/${x}`))];
    for(const width of [320,390,800,1440]) for(const theme of ['light','dark']) {
      await page.setViewportSize({width,height:960});
      for(const file of files) {
        await page.goto(origin+'/'+file);
        await page.evaluate(theme=>window.portfolioTheme.setTheme(theme),theme);
        await page.evaluate(async()=>{
          const images=[...document.images];
          images.forEach(image=>image.loading='eager');
          await Promise.all(images.map(image=>image.decode().catch(()=>{})));
        });
        const result = await page.evaluate(()=>{
          const problems=[];
          const width=innerWidth;
          if(document.documentElement.scrollWidth>width+1)problems.push('overflow '+document.documentElement.scrollWidth);
          const visibleText=document.body.innerText;
          if(/\p{Extended_Pictographic}/u.test(visibleText))problems.push('visible emoji');
          const main=document.querySelector('main');
          for(const section of main.querySelectorAll(':scope>section')) {
            const box=section.getBoundingClientRect();
            if(getComputedStyle(section).display!=='none' && box.width>0 && (box.left<main.getBoundingClientRect().left-1 || box.right>main.getBoundingClientRect().right+1))problems.push('section outside main '+section.id);
          }
          const fab=document.querySelector('.floating-theme-fab').getBoundingClientRect();
          if(Math.abs(fab.width-fab.height)>1 || fab.right>width || fab.bottom>innerHeight)problems.push('FAB position');
          const broken=[...document.images].filter(image=>!image.complete||image.naturalWidth===0).map(x=>x.getAttribute('src'));
          if(broken.length)problems.push('broken images '+broken.join(','));
          for(const script of document.querySelectorAll('script[src]'))if(!script.src.startsWith(location.origin))problems.push('remote script');
          const root=getComputedStyle(document.documentElement);
          const rgb=hex=>hex.match(/[a-f\d]{2}/gi).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);
          const luminance=hex=>rgb(hex).reduce((sum,x,i)=>sum+x*[.2126,.7152,.0722][i],0);
          const ratio=(a,b)=>{a=luminance(a);b=luminance(b);return (Math.max(a,b)+.05)/(Math.min(a,b)+.05);};
          const contrast={};
          for(const color of ['--text','--text-sub','--muted','--blue-text','--green-text','--gold-text'])for(const bg of ['--bg-page','--panel','--panel-strong']) {
            const value=ratio(root.getPropertyValue(color).trim(),root.getPropertyValue(bg).trim());contrast[color+'/'+bg]=Number(value.toFixed(2));
            if(value<7)problems.push('contrast '+color+'/'+bg+' '+value.toFixed(2));
          }
          const actualContrast=[];
          const components=value=>value.match(/[\d.]+/g)?.map(Number);
          const lum=rgb=>rgb.map(x=>x/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4).reduce((sum,x,i)=>sum+x*[.2126,.7152,.0722][i],0);
          const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
          while(walker.nextNode()){
            const node=walker.currentNode,el=node.parentElement;
            if(!node.textContent.trim()||el.closest('script,style,svg,[disabled],[aria-hidden="true"]')||!el.checkVisibility({checkVisibilityCSS:true,checkOpacity:true}))continue;
            const ancestry=[];for(let parent=el;parent;parent=parent.parentElement)ancestry.push(parent);
            let bg=[255,255,255];
            for(const parent of ancestry.reverse()){
              const color=components(getComputedStyle(parent).backgroundColor);if(!color)continue;
              const alpha=color[3]??1;bg=bg.map((channel,i)=>color[i]*alpha+channel*(1-alpha));
            }
            const fg=components(getComputedStyle(el).color);if(!fg)continue;
            const a=lum(fg),b=lum(bg),ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);
            if(ratio<7)actualContrast.push({class:el.className,text:node.textContent.trim().slice(0,50),ratio:Number(ratio.toFixed(2))});
          }
          return {problems,contrast,actualContrast,fab:{x:fab.x,y:fab.y}};
        });
        if(result.problems.length)failures.push({width,theme,file,problems:result.problems});
        if(width===1440&&result.actualContrast.length)textContrast.push({theme,file,items:result.actualContrast});
        if(width===1440&&file==='index.html')summary.push({theme,contrast:result.contrast});
        if(width===1440&&theme==='light'&&file==='index.html')await page.screenshot({path:output+'/portfolio-main-light.png'});
        if(width===390&&theme==='dark'&&file==='index.html')await page.screenshot({path:output+'/portfolio-main-mobile-dark.png'});
        if(width===1440&&theme==='dark'&&file==='projects/project-01-pharmacy.html')await page.screenshot({path:output+'/portfolio-detail-dark.png'});
      }
    }
    await page.goto(origin+'/assignments/assignment-05.html');
    await page.locator('.toc-item-link[href="#tab-community"]').click();
    assert(await page.locator('#tab-community').isVisible(),'TOC reveals hidden tab');
    await page.goto(origin+'/assignments/assignment-02.html');
    await page.locator('.toc-item-link').filter({hasText:'보유 게임 플레이 이력'}).click();
    assert(await page.locator('#view-history').isVisible(),'TOC reveals legacy archive tab');
    await page.locator('#tab-btn-rank').click();
    await page.locator('.accordion-filter-btn[data-filter="completed"]').click();
    const filterColors=await page.locator('.accordion-filter-btn').evaluateAll(buttons=>buttons.map(button=>({active:button.classList.contains('is-active'),bg:getComputedStyle(button).backgroundColor})));
    assert.notEqual(filterColors.find(button=>button.active).bg,filterColors.find(button=>!button.active).bg,'selected archive filter visually distinct');
    await page.goto(origin+'/index.html');
    await page.evaluate(()=>localStorage.setItem('junsu_portfolio_theme','garbage'));
    await page.reload();
    assert.equal(await page.locator('html').getAttribute('data-theme'),'light','invalid preference falls back to system');
    await page.emulateMedia({colorScheme:'dark'});
    await page.waitForFunction(()=>document.documentElement.dataset.theme==='dark');
    await page.evaluate(()=>window.portfolioTheme.setTheme('light'));
    await page.emulateMedia({colorScheme:'light'});await page.emulateMedia({colorScheme:'dark'});
    assert.equal(await page.locator('html').getAttribute('data-theme'),'light','explicit preference ignores system change');
    const blocked=await browser.newContext({colorScheme:'dark'});
    await blocked.route(/https?:\/\/(?!127\.0\.0\.1)/,route=>route.abort());
    await blocked.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Blocked','SecurityError');}});});
    const blockedPage=await blocked.newPage();await blockedPage.goto(origin+'/index.html');
    assert.equal(await blockedPage.locator('html').getAttribute('data-theme'),'dark','storage blocked initial mode');
    await blockedPage.locator('.theme-fab-trigger').click();await blockedPage.locator('[data-theme-set="light"]').click();
    assert.equal(await blockedPage.locator('html').getAttribute('data-theme'),'light','storage blocked selection still works');
    const links=[];
    for(const file of files) {
      await page.goto(origin+'/'+file);
      const targets=await page.locator('a[href],img[src],link[href],script[src]').evaluateAll(nodes=>nodes.map(node=>node.href||node.src).filter(url=>url.startsWith(location.origin)));
      for(const url of targets) {
        const resolved=new URL(url);const filename=decodeURIComponent(resolved.pathname).replace(/^\//,'');
        if(!fs.existsSync(path.join(root,filename)))links.push({file,target:resolved.pathname});
      }
    }
    assert.deepEqual(links,[],'local links exist');
    const report={views:80,failures,errors,contrast:summary,textContrast,additional:['hidden-tab TOC','legacy archive TOC','selected filter styling','invalid preference','system theme change','explicit mode priority','blocked storage','local links']};
    fs.writeFileSync(path.join(root,'docs/verification.json'),JSON.stringify(report,null,2)+'\n');
    console.log(JSON.stringify({views:report.views,failures:report.failures,errors:report.errors,additional:report.additional},null,2));
    assert.deepEqual(failures,[]);assert.deepEqual(errors,[]);assert.deepEqual(textContrast,[],'visible text contrast at least 7:1');
    await context.close();await blocked.close();
  }finally{await browser.close();server.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
