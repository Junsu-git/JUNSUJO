const {serve, root, chromium} = require('./verify-portfolio.cjs');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{
 const server=await serve();
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const failures=[],errors=[];
 const output=process.env.PORTFOLIO_QA_OUTPUT||path.join(root,'..');
 try{
 const context=await browser.newContext({viewport:{width:1440,height:960},reducedMotion:'reduce'});
 await context.route(/https?:\/\/(?!127\.0\.0\.1)/,r=>r.abort());
 const page=await context.newPage();page.on('pageerror',e=>errors.push({url:page.url(),error:e.message}));
 const origin='http://127.0.0.1:'+server.address().port;
 const files=['index.html','game-experience.html',...['projects','assignments'].flatMap(dir=>fs.readdirSync(path.join(root,dir)).filter(n=>n.endsWith('.html')).map(n=>dir+'/'+n))];
 for(const width of [390,1440])for(const theme of ['light','dark'])for(const file of files){
  await page.setViewportSize({width,height:960});await page.goto(origin+'/'+file);
  await page.evaluate(t=>window.portfolioTheme.setTheme(t),theme);
  const result=await page.evaluate(()=>{
   const problems=[];if(document.documentElement.scrollWidth>innerWidth+1)problems.push('horizontal overflow '+document.documentElement.scrollWidth);
   const ids=[...document.querySelectorAll('[id]')].map(n=>n.id);if(ids.length!==new Set(ids).size)problems.push('duplicate IDs');
   for(const a of document.querySelectorAll('a[href^="#"]'))if(a.hash&&!document.getElementById(decodeURIComponent(a.hash.slice(1))))problems.push('missing anchor '+a.hash);
   const broken=[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.getAttribute('src'));if(broken.length)problems.push('broken images '+broken.join(','));
   if(!document.querySelector('main'))problems.push('missing main');
   if(document.querySelector('.detail-main-content')?.parentElement.className!=='detail-layout-container'&&location.pathname.endsWith('/assignments/assignment-02.html'))problems.push('split page main detached from detail layout');
   for(const el of document.querySelectorAll('[aria-labelledby]'))for(const id of el.getAttribute('aria-labelledby').split(/\s+/))if(!document.getElementById(id))problems.push('missing ARIA label '+id);
   return{problems,links:[...document.querySelectorAll('a[href],link[href],script[src],img[src]')].map(a=>a.getAttribute('href')||a.getAttribute('src')).filter(u=>u&&!/^(?:https?:|mailto:|data:|#|javascript:)/.test(u))};
  });
  if(result.problems.length)failures.push({width,theme,file,problems:result.problems});
  if(width===1440&&theme==='light')for(const href of result.links){
   let u;try{u=new URL(href,origin+'/'+file);}catch{failures.push({file,href,error:'invalid URL'});continue;}
   const local=path.join(root,decodeURIComponent(u.pathname));
   if(!fs.existsSync(local))failures.push({file,href,error:'local target missing'});
   else if(u.hash&&local.endsWith('.html')&&!fs.readFileSync(local,'utf8').includes('id="'+decodeURIComponent(u.hash.slice(1))+'"'))failures.push({file,href,error:'target anchor missing'});
  }
  if(file==='index.html'&&(width===1440&&theme==='light'||width===390&&theme==='dark'))await page.screenshot({path:path.join(output,'portfolio-content-'+width+'-'+theme+'.png'),fullPage:false});
 }
 await page.goto(origin+'/projects/project-03-warrior.html');
 const table=page.locator('table').first();assert(await table.count(),'real comparison table exists');
 const row1=table.locator('tbody tr').nth(0),row2=table.locator('tbody tr').nth(1);
 const before=[await row1.evaluate(x=>getComputedStyle(x).backgroundColor),await row2.evaluate(x=>getComputedStyle(x).backgroundColor)];
 await row1.hover();const hovered1=await row1.evaluate(x=>getComputedStyle(x).backgroundColor);
 await row2.hover();const hovered2=await row2.evaluate(x=>getComputedStyle(x).backgroundColor);
 assert.equal(hovered1,hovered2,'odd/even hovered row colors match');assert.notEqual(before[1],hovered2,'even row changes color on hover');
 await page.goto(origin+'/index.html');await page.locator('.theme-fab-trigger').click();await page.locator('[data-theme-set="dark"]').click();assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
 await page.locator('.game-experience-link').click();assert(page.url().endsWith('/game-experience.html'),'persistent link opens real experience page');
 await page.goto(origin+'/projects/sub-11-coursework.html');assert.equal(await page.locator('.coursework-card').count(),6);
 await page.screenshot({path:path.join(output,'portfolio-coursework-hub.png'),fullPage:false});
 for(const file of files.filter(f=>f.startsWith('assignments/'))){await page.goto(origin+'/'+file);assert(await page.locator('a[href="../projects/sub-11-coursework.html#overview"]').count(),file+' returns to its hub');}
 const report={pages:files.length,viewports:[390,1440],themes:['light','dark'],pageChecks:files.length*4,failures,errors,tableHover:{odd:hovered1,even:hovered2},themeAndNavigation:true,assignmentHubReturns:true};
 fs.writeFileSync(path.join(output,'portfolio-content-browser-results.json'),JSON.stringify(report,null,2));
 console.log(JSON.stringify(report,null,2));assert.deepEqual(failures,[]);assert.deepEqual(errors,[]);
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
