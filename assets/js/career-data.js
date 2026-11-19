(function (root, factory) {
  const archive = factory();
  if (typeof module === 'object' && module.exports) module.exports = archive;
  else root.CareerArchive = archive;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';
  const asOf = '2026-11-19';
  const categories = [
    {id:'project',label:'프로젝트',icon:'layers'},
    {id:'competition',label:'경진·수상',icon:'award'},
    {id:'education',label:'진로·교육',icon:'book'},
    {id:'career',label:'지원·박람회',icon:'briefcase'},
    {id:'exploration',label:'직무 탐색',icon:'compass'},
    {id:'life',label:'생활 역량',icon:'wheel'}
  ];
  const groups = [
    {id:'capstone',name:'Bid & Defence',category:'project',note:'팀장 · 클라이언트·서버 개발',context:'3월 구상 → 8월 개발 착수',link:'projects/project-04-capstone.html',linkLabel:'프로젝트 보기'},
    {id:'nexon',name:'넥토리얼 전형',category:'career',note:'지원서 제출 · AI 면접'},
    {id:'mock',name:'모의 입사 경진대회',category:'competition',note:'서류 · 면접 · 장려상'},
    {id:'portfolio',name:'포트폴리오 경진대회',category:'competition',note:'참가 신청 기록'},
    {id:'career-guide',name:'나의 진로 사용 설명서',category:'education',note:'진로 프로그램 참여'},
    {id:'interview-class',name:'실전 면접 대응 특강',category:'education',note:'면접 대응 특강 청강'},
    {id:'job-fair',name:'성남 청년인재 취업박람회',category:'career',note:'IT기술기반 취업박람회 참여',fullName:'2026 성남 IT기술기반 청년인재 취업박람회'},
    {id:'comento',name:'Comento 직무부트캠프',category:'education',aliases:'코멘토',note:'직무 업무 · 발표 · 멘토 피드백',context:'업무 자료는 추후 연결'},
    {id:'game-night',name:'Game Insight Night',category:'exploration',note:'덕코프 팀 소다 인터뷰 접속',context:'접속 기록 · 시청 성과 미집계',image:'100_Projects/2026-11-19_3학년2학기_취업활동_아카이브/assets/2026-11-15_game-insight-night_connection.png'},
    {id:'driving',name:'운전 연수',category:'life',note:'1차 연수 · 2시간 30분'},
    {id:'capstone-expo',name:'캡스톤 경진대회',category:'exploration',note:'경진대회 관람'},
    {id:'career-booster',name:'커리어 부스터',category:'education',note:'커리어 부스터 프로그램 참여'}
  ];
  const events = [
    {id:'e01',group:'capstone',date:'2026-08-24',title:'팀 선정 · 개발 착수',kind:'start',approximate:true},
    {id:'e02',group:'nexon',date:'2026-09-05',title:'지원서 제출',kind:'application'},
    {id:'e03',group:'mock',date:'2026-09-12',title:'대회 참가 신청',kind:'application'},
    {id:'e04',group:'portfolio',date:'2026-09-12',title:'대회 참가 신청',kind:'application'},
    {id:'e05',group:'nexon',date:'2026-09-12',title:'AI 면접 응시',kind:'interview'},
    {id:'e06',group:'career-guide',date:'2026-09-16',title:'진로 프로그램 참여',kind:'participation'},
    {id:'e07',group:'interview-class',date:'2026-09-28',title:'면접 대응 특강 청강',kind:'lecture'},
    {id:'e08',group:'mock',date:'2026-09-30',title:'서류 합격',kind:'pass'},
    {id:'e09',group:'job-fair',date:'2026-09-30',title:'취업박람회 참여',kind:'participation'},
    {id:'e10',group:'capstone',date:'2026-10-07',title:'캡스톤 선정 팀 선정',kind:'selection'},
    {id:'e11',group:'mock',date:'2026-10-07',title:'면접심사 참여',kind:'interview'},
    {id:'e12',group:'mock',date:'2026-10-13',title:'장려상 수상',kind:'award'},
    {id:'e13',group:'comento',date:'2026-10-28',title:'직무부트캠프 합격',kind:'pass'},
    {id:'e14',group:'comento',date:'2026-11-01',title:'직무 에센스 강의 · Q&A',kind:'lecture'},
    {id:'e15',group:'comento',date:'2026-11-06',title:'1차 업무 진행',kind:'assignment',note:'업무 주제 · 산출물 추가 예정'},
    {id:'e16',group:'comento',date:'2026-11-13',title:'2차 업무 진행',kind:'assignment',note:'업무 주제 · 산출물 추가 예정'},
    {id:'e17',group:'comento',date:'2026-11-15',title:'과제 발표 · 멘토 피드백',kind:'presentation',note:'데이터 엔지니어링 · 산업별 특성 특강'},
    {id:'e18',group:'game-night',date:'2026-11-15',title:'팀 소다 인터뷰 접속',kind:'connection',status:'connection',note:'접속 화면 보관 · 시청 완료 아님'},
    {id:'e19',group:'driving',date:'2026-11-16',title:'1차 운전 연수',kind:'training',durationMinutes:150},
    {id:'e20',group:'capstone-expo',date:'2026-11-18',title:'캡스톤 경진대회 관람',kind:'visit'},
    {id:'e21',group:'career-booster',date:'2026-11-19',title:'커리어 부스터 참여',kind:'participation'},
    {id:'e22',group:'comento',date:'2026-11-20',title:'3차 업무 일정',kind:'assignment',status:'planned',note:'11월 19일 기준 예정'}
  ].map(event=>Object.freeze({status:'recorded',...event}));
  const statusLabels={recorded:'활동 기록',connection:'접속 기록',planned:'예정'};
  function getRecords(filters = {}) {
    const query=(filters.query || '').trim().toLocaleLowerCase('ko');
    return events.filter(event=>{
      const group=groups.find(group=>group.id===event.group);
      return (!filters.month || filters.month==='all' || event.date.slice(0,7)===filters.month)
        && (!filters.category || filters.category==='all' || group.category===filters.category)
        && (filters.includePlanned!==false || event.status!=='planned')
        && (!query || [group.name,group.fullName || '',group.aliases || '',group.note,event.title,event.note || ''].join(' ').toLocaleLowerCase('ko').includes(query));
    });
  }
  function summarize() {
    return {groups:groups.length,events:events.length,
      recorded:events.filter(event=>event.status==='recorded').length,
      connection:events.filter(event=>event.status==='connection').length,
      planned:events.filter(event=>event.status==='planned').length,
      awards:events.filter(event=>event.kind==='award').length,
      assignments:events.filter(event=>event.kind==='assignment'&&event.status==='recorded').length,
      presentations:events.filter(event=>event.kind==='presentation').length};
  }
  const monthly=['2026-08','2026-09','2026-10','2026-11'].map(id=>{
    const records=getRecords({month:id});
    return {id,label:Number(id.slice(5))+'월',total:records.length,
      recorded:records.filter(event=>event.status==='recorded').length,
      connection:records.filter(event=>event.status==='connection').length,
      planned:records.filter(event=>event.status==='planned').length};
  });
  function toCSV(records) {
    const quote=value=>'"'+String(value).replace(/"/g,'""')+'"';
    const rows=[['날짜','활동','단계','상태','시간(분)'],...records.map(event=>{
      const group=groups.find(group=>group.id===event.group);
      return [event.date+(event.approximate?' 무렵':''),group.name,event.title,statusLabels[event.status],event.durationMinutes || ''];
    })];
    return rows.map(row=>row.map(quote).join(',')).join('\r\n');
  }
  return Object.freeze({asOf,categories,groups,events,statusLabels,monthly,getRecords,summarize,toCSV});
});
