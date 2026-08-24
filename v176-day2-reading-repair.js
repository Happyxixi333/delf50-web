'use strict';
(function(){
const REPAIR_ID_176='day2-duplicate-reading-evidence-v1';
function bank176r(){return typeof V13_READINGS!=='undefined'?V13_READINGS:READINGS}
function byId176r(id){return bank176r().find(x=>String(x.id)===String(id))||null}
function assignmentIds176r(day){return S.assignments172&&S.assignments172[String(day)]&&Array.isArray(S.assignments172[String(day)].reading)?S.assignments172[String(day)].reading.slice():[]}
function done176r(day){return Number(S.daily&&S.daily[String(day)]&&S.daily[String(day)].reading||0)}
function prefix176r(day,id){return `${day}:${id}:`}
function answerKeys176r(day,id){const p=prefix176r(day,id),a=S.reading&&S.reading.answers||{};return Object.keys(a).filter(k=>k.startsWith(p))}
function fullyAnswered176r(day,id){const item=byId176r(id);return!!(item&&Array.isArray(item.qs)&&item.qs.length&&item.qs.every((_,qi)=>S.reading.answers&&S.reading.answers[`${day}:${id}:${qi}`]!==undefined))}
function actualCompletedIds176r(day){const list=assignmentIds176r(day),count=done176r(day),out=[];for(let i=0;i<Math.min(count,list.length);i++)out.push(String(list[i]));for(const id of list)if(fullyAnswered176r(day,id)&&!out.includes(String(id)))out.push(String(id));return out}
function persist176r(){try{if(typeof KEY!=='undefined')localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function repair176r(){
  S.repairs176=S.repairs176||{};
  if(S.repairs176[REPAIR_ID_176])return S.repairs176[REPAIR_ID_176];
  const day1=new Set(actualCompletedIds176r(1));
  const day2List=assignmentIds176r(2),day2Completed=actualCompletedIds176r(2);
  const duplicates=day2Completed.filter(id=>day1.has(id)&&!String(id).startsWith('r176-d2-')).slice(0,2);
  if(!duplicates.length){const rec={at:new Date().toISOString(),status:'no-duplicate-evidence-found',ids:[],removedAttempts:0,removedCorrect:0,removedCompleted:0};S.repairs176[REPAIR_ID_176]=rec;persist176r();return rec}
  let removedAttempts=0,removedCorrect=0,removedCompleted=0;
  for(const id of duplicates){
    const item=byId176r(id),keys=answerKeys176r(2,id);
    for(const key of keys){const qi=Number(key.split(':').pop()),selected=S.reading.answers[key],q=item&&item.qs&&item.qs[qi];removedAttempts++;if(q&&Number(selected)===Number(q[2]))removedCorrect++;delete S.reading.answers[key]}
    if(day2List.slice(0,done176r(2)).map(String).includes(String(id))||fullyAnswered176r(2,id))removedCompleted++;
    const cp=S.contentProgress172&&S.contentProgress172.completed&&S.contentProgress172.completed.reading;
    if(cp&&cp[id]&&Number(cp[id].day)===2){if(fullyAnswered176r(1,id)){cp[id].day=1;cp[id].repair176=REPAIR_ID_176}else delete cp[id]}
  }
  S.reading.attempts=Math.max(0,Number(S.reading.attempts||0)-removedAttempts);
  S.reading.correct=Math.max(0,Number(S.reading.correct||0)-removedCorrect);
  if(S.reading.index!==undefined)S.reading.index=Math.max(0,Number(S.reading.index||0)-removedCompleted);
  S.daily=S.daily||{};S.daily['2']=S.daily['2']||{};S.daily['2'].reading=Math.max(0,Number(S.daily['2'].reading||0)-removedCompleted);
  if(S.assignments172&&S.assignments172['2'])S.assignments172['2'].reading=[];
  if(UI&&UI.browse174&&UI.browse174.reading)UI.browse174.reading['2']=0;
  const rec={at:new Date().toISOString(),status:'repaired',ids:duplicates,removedAttempts,removedCorrect,removedCompleted,day2ReadingAfter:Number(S.daily['2'].reading||0)};
  S.repairs176[REPAIR_ID_176]=rec;
  persist176r();
  if(window.DELF50_V176&&typeof window.DELF50_V176.getAssignments==='function')try{window.DELF50_V176.getAssignments(2)}catch(e){}
  persist176r();
  return rec
}
const result176r=repair176r();
window.DELF50_DAY2_REPAIR={id:REPAIR_ID_176,result:result176r};
if(result176r&&result176r.status==='repaired')render();
})();
