'use strict';
// V1.4 readability fix: progressPage already includes the error queue, so render it only once.
render=function(){
  try{
    const root=document.getElementById('root');
    const body=view==='today'?today():view==='grammar'?grammar():view==='input'?inputPage():view==='output'?outputPage():view==='delf'?delfPage():progressPage();
    root.innerHTML=`<div class="app">${body}${nav()}</div>`;
    bind();
    if(view==='output'&&UI.outputTab==='speaking')loadLatestAudio();
  }catch(err){
    document.body.innerHTML=`<div class="errorpage"><b>DELF50 页面加载失败</b><p>不会保持空白。请重新加载。</p><pre>${esc(err.message||err)}</pre><button onclick="location.reload()">重新加载</button></div>`;
  }
};
render();
