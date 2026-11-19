(function () {
  'use strict';
  const archive=window.CareerArchive;
  if (!archive) return;
  const $=selector=>document.querySelector(selector);
  const escape=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const icon=(name,extra='')=>`<svg class="ci ${extra}" viewBox="0 0 24 24" aria-hidden="true"><use href="#ci-${name}"/></svg>`;
  const groupFor=id=>archive.groups.find(group=>group.id===id);
  const categoryFor=id=>archive.categories.find(category=>category.id===id);
  const dateLabel=date=>date.slice(5).replace('-','.');
  function readState() {
    const params=new URLSearchParams(location.search);
    return {
      month:archive.monthly.some(month=>month.id===params.get('month'))?params.get('month'):'all',
      category:archive.categories.some(category=>category.id===params.get('category'))?params.get('category'):'all',
      query:params.get('q') || '',includePlanned:params.get('planned')!=='0',
      view:params.get('view')==='groups'?'groups':'timeline'
    };
  }
  const state=readState();
  const statusBadge=(event,showRecorded=true)=>{
    if(event.kind==='award')return '<span class="event-status award">장려상</span>';
    if(event.status==='planned')return '<span class="event-status planned">예정</span>';
    if(event.status==='connection')return '<span class="event-status connection">접속 기록</span>';
    return showRecorded?'<span class="event-status">활동 기록</span>':'<span class="row-arrow" aria-hidden="true">↗</span>';
  };

  function renderKPIs() {
    const summary=archive.summarize();
    const items=[
      {label:'일정 기록',value:summary.events,unit:'건',icon:'calendar',caption:'예정 1건 · 접속 1건 포함'},
      {label:'활동 묶음',value:summary.groups,unit:'개',icon:'layers',caption:'프로그램·프로젝트 기준'},
      {label:'수상 기록',value:summary.awards,unit:'건',icon:'award',caption:'모의 입사 경진대회 장려상',className:'award-kpi'},
      {label:'업무 진행',value:summary.assignments,unit:'건',icon:'briefcase',caption:'코멘토 1·2차 업무'}
    ];
    $('#career-kpis').innerHTML=items.map(item=>`<article class="career-kpi ${item.className || ''}"><div class="kpi-top"><span>${item.label}</span>${icon(item.icon)}</div><strong class="kpi-value">${String(item.value).padStart(2,'0')}<small>${item.unit}</small></strong><p>${item.caption}</p></article>`).join('');
  }
  function renderCharts() {
    $('#monthly-chart').innerHTML=archive.monthly.map(month=>{
      const height=month.total*14;
      const parts=['recorded','connection','planned'].filter(key=>month[key]).map(key=>`<span class="bar-segment ${key}" style="height:${month[key]/month.total*100}%"></span>`).join('');
      return `<button class="month-bar" type="button" data-chart-month="${month.id}" aria-label="${month.label} 일정 ${month.total}건" aria-pressed="${state.month===month.id}"><span class="month-total">${month.total}</span><span class="bar-track" style="height:${height}px">${parts}</span><span class="month-label">${month.label}</span></button>`;
    }).join('');
    let offset=0;
    const circumference=2*Math.PI*44;
    const slices=archive.categories.map(category=>{
      const count=archive.groups.filter(group=>group.category===category.id).length;
      const length=count/archive.groups.length*circumference;
      const slice=`<circle class="donut-segment" cx="60" cy="60" r="44" style="stroke:var(--chart-${category.id})" stroke-dasharray="${length-2} ${circumference-length+2}" stroke-dashoffset="${-offset}"/>`;
      offset+=length;
      return slice;
    }).join('');
    $('#category-donut').innerHTML=`<svg viewBox="0 0 120 120" role="img" aria-label="프로젝트 1, 경진·수상 2, 진로·교육 4, 지원·박람회 2, 직무 탐색 2, 생활 역량 1"><circle class="donut-track" cx="60" cy="60" r="44"/>${slices}</svg><div class="donut-center"><strong>12</strong><span>활동 묶음</span></div>`;
    $('#category-legend').innerHTML=archive.categories.map(category=>`<button type="button" data-chart-category="${category.id}" aria-pressed="${state.category===category.id}"><i style="background:var(--chart-${category.id})" aria-hidden="true"></i><span>${category.label}</span><b>${archive.groups.filter(group=>group.category===category.id).length}</b></button>`).join('');
  }
  function renderFilters() {
    $('#category-filters').innerHTML=[{id:'all',label:'전체'},...archive.categories].map(category=>`<button type="button" data-category="${category.id}" aria-pressed="${state.category===category.id}">${category.icon?icon(category.icon):''}${category.label}</button>`).join('');
    $('#month-filters').innerHTML=[{id:'all',label:'모든 달'},...archive.monthly].map(month=>`<button type="button" data-month="${month.id}" aria-pressed="${state.month===month.id}">${month.label}</button>`).join('');
    $('#activity-search').value=state.query;
    $('#include-planned').checked=state.includePlanned;
    document.querySelectorAll('[data-record-view]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.recordView===state.view)));
  }
  function timelineHTML(records) {
    return archive.monthly.slice().reverse().map(month=>{
      const entries=records.filter(event=>event.date.startsWith(month.id)).slice().reverse();
      if(!entries.length)return '';
      return `<section class="log-month" aria-label="${month.label} 기록"><div class="log-month-header"><h3>${month.label}</h3><span>${entries.length} RECORDS</span></div><div class="log-list">${entries.map(event=>{
        const group=groupFor(event.group),category=categoryFor(group.category);
        return `<button class="log-row ${event.status==='planned'?'planned-row':''}" type="button" data-open-group="${group.id}" aria-label="${escape(group.name)} ${dateLabel(event.date)} ${escape(event.title)}"><time datetime="${event.date}">${dateLabel(event.date)}</time><span class="activity-icon ${group.category}">${icon(category.icon)}</span><span class="log-copy"><strong>${escape(group.name)}</strong><small>${escape(event.title)}${event.approximate?' · 날짜 추정':''}</small></span>${statusBadge(event,false)}</button>`;
      }).join('')}</div></section>`;
    }).join('');
  }
  function groupsHTML(records) {
    const groups=archive.groups.filter(group=>records.some(event=>event.group===group.id)).slice().sort((left,right)=>{
      const last=id=>records.filter(event=>event.group===id).at(-1).date;
      return last(right.id).localeCompare(last(left.id));
    });
    return `<div class="group-results">${groups.map(group=>{
      const entries=records.filter(event=>event.group===group.id);
      const category=categoryFor(group.category);
      return `<button type="button" class="group-card" data-open-group="${group.id}"><span class="group-card-top"><span class="activity-icon ${group.category}">${icon(category.icon)}</span><span>${category.label}</span></span><strong>${escape(group.name)}</strong><p>${escape(group.note)}</p><span class="group-card-bottom"><span>${dateLabel(entries[0].date)}${entries.length>1?' — '+dateLabel(entries.at(-1).date):''}</span><span>${entries.length}건 ↗</span></span></button>`;
    }).join('')}</div>`;
  }
  function updateURL() {
    const next=new URL(location.href);
    for(const key of ['month','category','q','planned','view'])next.searchParams.delete(key);
    if(state.month!=='all')next.searchParams.set('month',state.month);
    if(state.category!=='all')next.searchParams.set('category',state.category);
    if(state.query)next.searchParams.set('q',state.query);
    if(!state.includePlanned)next.searchParams.set('planned','0');
    if(state.view!=='timeline')next.searchParams.set('view',state.view);
    try{history.replaceState(null,'',next.href);}catch{/* File previews can limit history writes. */}
  }
  function renderResults() {
    const records=archive.getRecords(state);
    const count=new Set(records.map(event=>event.group)).size;
    $('#result-count').textContent=`일정 ${records.length}건 · 활동 ${count}개`;
    $('#activity-results').innerHTML=records.length?(state.view==='groups'?groupsHTML(records):timelineHTML(records)):'';
    $('#archive-empty').hidden=records.length>0;
    $('#download-records').disabled=!records.length;
    document.querySelectorAll('[data-category],[data-chart-category]').forEach(button=>button.setAttribute('aria-pressed',String((button.dataset.category || button.dataset.chartCategory)===state.category)));
    document.querySelectorAll('[data-month],[data-chart-month]').forEach(button=>button.setAttribute('aria-pressed',String((button.dataset.month || button.dataset.chartMonth)===state.month)));
    document.querySelectorAll('[data-record-view]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.recordView===state.view)));
    updateURL();
  }
  let lastOpener=null;
  function showDialog(dialog,opener) {
    lastOpener=opener;
    dialog.returnValue='';
    document.body.style.overflow='hidden';
    dialog.showModal();
  }
  function openGroup(id,opener) {
    const group=groupFor(id);
    if(!group)return;
    const category=categoryFor(group.category);
    const entries=archive.events.filter(event=>event.group===id);
    $('#activity-dialog-content').innerHTML=`<div class="dialog-kicker"><span class="activity-icon ${group.category}">${icon(category.icon)}</span><span>${category.label} · 전체 일정 ${entries.length}건</span></div><h2 id="activity-dialog-title">${escape(group.name)}</h2><p class="dialog-note">${escape(group.note)}</p>${group.context?`<p class="dialog-context">${escape(group.context)}</p>`:''}<ol class="dialog-events">${entries.map(event=>`<li class="dialog-event ${event.status}"><span class="event-point" aria-hidden="true"></span><div><time datetime="${event.date}">${event.date.replaceAll('-','.')}${event.approximate?' 무렵':''}</time><h3>${escape(event.title)}</h3>${statusBadge(event)}${event.note?`<p>${escape(event.note)}</p>`:''}${event.durationMinutes?'<p>제공된 시간 · 2시간 30분</p>':''}</div></li>`).join('')}</ol>${group.image?`<img class="evidence-preview" src="${group.image}" alt="Game Insight Night 인터뷰 접속 화면"><p class="evidence-caption">보관된 접속 화면 · 학습 성과 미집계</p>`:''}<div class="dialog-actions">${group.link?`<a class="career-button" href="${group.link}">${group.linkLabel} ↗</a>`:''}<button class="career-button secondary" type="button" data-filter-group="${group.id}">관련 기록 모아보기</button></div>`;
    showDialog($('#activity-dialog'),opener);
  }
  function jumpToRecords() {
    const next=new URL(location.href);next.hash='records';
    try{history.replaceState(null,'',next.href);}catch{/* Preserve file preview support. */}
    $('#records').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
  }
  function reset() {
    Object.assign(state,{month:'all',category:'all',query:'',includePlanned:true});
    renderFilters();renderResults();
  }
  document.addEventListener('click',event=>{
    const button=event.target.closest('button');
    if(!button)return;
    if(button.dataset.openGroup){openGroup(button.dataset.openGroup,button);return;}
    if(button.hasAttribute('data-close-dialog')){button.closest('dialog').close();return;}
    if(button.dataset.filterGroup){
      const group=groupFor(button.dataset.filterGroup);
      $('#activity-dialog').close('related-records');
      Object.assign(state,{month:'all',category:'all',query:group.name,includePlanned:true});
      renderFilters();renderResults();jumpToRecords();return;
    }
    if(button.dataset.category){state.category=button.dataset.category;renderResults();return;}
    if(button.dataset.month){state.month=button.dataset.month;renderResults();return;}
    if(button.dataset.chartMonth){state.month=button.dataset.chartMonth;renderResults();jumpToRecords();return;}
    if(button.dataset.chartCategory){state.category=button.dataset.chartCategory;renderResults();jumpToRecords();return;}
    if(button.dataset.recordView){state.view=button.dataset.recordView;renderResults();}
  });
  for(const dialog of document.querySelectorAll('.career-dialog')) {
    dialog.addEventListener('close',()=>{
      document.body.style.overflow='';
      const target=dialog.returnValue==='related-records'?$('#records-title'):lastOpener;
      if(target?.isConnected){if(dialog.returnValue==='related-records')target.tabIndex=-1;target.focus({preventScroll:true});}
    });
    dialog.addEventListener('click',event=>{
      if(event.target!==dialog)return;
      const box=dialog.getBoundingClientRect();
      if(event.clientX<box.left || event.clientX>box.right || event.clientY<box.top || event.clientY>box.bottom)dialog.close();
    });
  }
  $('#criteria-button').addEventListener('click',event=>showDialog($('#criteria-dialog'),event.currentTarget));
  $('#activity-search').addEventListener('input',event=>{state.query=event.target.value;renderResults();});
  $('#include-planned').addEventListener('change',event=>{state.includePlanned=event.target.checked;renderResults();});
  $('#reset-filters').addEventListener('click',reset);
  $('#empty-reset').addEventListener('click',reset);
  $('#download-records').title='현재 선택한 기록을 내려받습니다.';
  $('#download-records').addEventListener('click',()=>{
    const blob=new Blob(['\ufeff'+archive.toCSV(archive.getRecords(state))],{type:'text/csv;charset=utf-8'});
    const url=URL.createObjectURL(blob);
    const link=document.createElement('a');link.href=url;link.download='2026-11-19-career-activities.csv';
    document.body.append(link);link.click();link.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
  window.addEventListener('popstate',()=>{Object.assign(state,readState());renderFilters();renderResults();});
  renderKPIs();renderCharts();renderFilters();renderResults();
})();
