'use strict';
// V1.4 runtime fix: never rely on a cross-script lexical `view` binding.
window.__delfView=(typeof window.__delfView==='string'&&window.__delfView)?window.__delfView:(typeof view!=='undefined'?view:'today');

nav=function(){
  const currentView=window.__delfView||'today';
  const items=[['today','⌂','今日'],['grammar','G','语法'],['input','耳','听读'],['output','说','写说'],['delf','D','DELF'],['progress','◎','进度']];
  return `<div class="nav">${items.map(x=>`<button class="${currentView===x[0]?'on':''}" data-nav="${x[0]}"><b>${x[1]}</b>${x[2]}</button>`).join('')}</div>`;
};

go=function(v){
  window.__delfView=v||'today';
  UI.gSel=null;UI.gAnswered=false;UI.appMsg='';UI.writeMsg='';UI.speakMsg='';
  render();
  try{scrollTo(0,0)}catch(e){}
};

render=function(){
  try{
    const root=document.getElementById('root');
    const currentView=window.__delfView||'today';
    const body=currentView==='today'?today():currentView==='grammar'?grammar():currentView==='input'?inputPage():currentView==='output'?outputPage():currentView==='delf'?delfPage():progressPage();
    root.innerHTML=`<div class="app">${body}${nav()}</div>`;
    bind();
    if(currentView==='output'&&UI.outputTab==='speaking')loadLatestAudio();
  }catch(err){
    const safeMessage=(typeof esc==='function'?esc(err.message||err):String(err&&err.message||err));
    document.body.innerHTML=`<div class="errorpage"><b>DELF50 页面加载失败</b><p>不会保持空白。请重新加载。</p><pre>${safeMessage}</pre><button onclick="location.reload()">重新加载</button></div>`;
  }
};
render();
