'use strict';
(function(){
const APP_VERSION_175='1.7.5';
const CONTENT_VERSION_175='1.7.1';
const ROUTING_VERSION_175='day-aware-v1';
const ROUTED_TYPES_175=['reading','listening','writing','speaking','application'];

function bank175(type){
  if(type==='reading')return typeof V13_READINGS!=='undefined'?V13_READINGS:READINGS;
  if(type==='listening')return typeof V13_LISTENINGS!=='undefined'?V13_LISTENINGS:LISTENINGS;
  if(type==='writing')return typeof V13_WRITINGS!=='undefined'?V13_WRITINGS:WRITINGS;
  if(type==='speaking')return typeof V13_SPEAKING!=='undefined'?V13_SPEAKING:SPEAKING;
  if(type==='application')return typeof V13_APPLICATION!=='undefined'?V13_APPLICATION:APPLICATION;
  return [];
}
function cid175(item,type,index){return item&&item.id?String(item.id):item&&item.provenance&&item.provenance.traceId?String(item.provenance.traceId):`${type}-legacy-${index}`}
function assignmentBox175(day=S.selectedDay){S.assignments172=S.assignments172||{};const k=String(day);if(!S.assignments172[k])S.assignments172[k]={reading:[],listening:[],writing:[],speaking:[],application:[]};for(const t of ROUTED_TYPES_175)S.assignments172[k][t]=Array.isArray(S.assignments172[k][t])?S.assignments172[k][t]:[];return S.assignments172[k]}
function maxQuota175(type){return Math.max(1,...Object.values(QUOTAS||{}).map(q=>Number(q&&q[type]||0)))}
function gcd175(a,b){a=Math.abs(a);b=Math.abs(b);while(b){const t=a%b;a=b;b=t}return a||1}
function step175(len,type){if(len<=1)return 1;let s=maxQuota175(type)%len;if(s===0)s=1;let guard=0;while(gcd175(s,len)!==1&&guard++<len){s=(s+1)%len;if(s===0)s=1}return s}
function pool175(type,day=S.selectedDay){const bank=bank175(type),eligible=bank.filter(x=>(x.minDay||1)<=day);if(!eligible.length)return bank.slice(0,1);const latest=Math.max(...eligible.map(x=>x.minDay||1));const primary=eligible.filter(x=>(x.minDay||1)===latest),older=eligible.filter(x=>(x.minDay||1)<latest).sort((a,b)=>(b.minDay||1)-(a.minDay||1));const raw=primary.concat(older),delta=Math.max(0,Number(day)-latest),shift=raw.length?(delta*step175(raw.length,type))%raw.length:0;return raw.slice(shift).concat(raw.slice(0,shift))}
function routeIds175(type,day=S.selectedDay){const bank=bank175(type),ids=pool175(type,day).map(x=>cid175(x,type,bank.indexOf(x)));if(Number(day)<=1)return ids;const prev=S.assignments172&&S.assignments172[String(Number(day)-1)]&&S.assignments172[String(Number(day)-1)][type]||[],avoid=new Set(prev);return ids.filter(id=>!avoid.has(id)).concat(ids.filter(id=>avoid.has(id)))}
function findById175(type,id){const bank=bank175(type);return bank.find((x,i)=>cid175(x,type,i)===String(id))||null}
function dailyType175(day,type){return Number(S.daily&&S.daily[String(day)]&&S.daily[String(day)][type]||0)}
function hasInputAnswers175(type,day,item){if(!item)return false;const box=type==='reading'?S.reading:S.listening,answers=box&&box.answers||{},prefix=`${day}:${item.id}:`;return Object.keys(answers).some(k=>k.startsWith(prefix))}
function hasDraft175(type,day){const box=S.drafts171&&S.drafts171[type]||{},prefix=`${day}:${type}:`;return Object.entries(box).some(([k,v])=>k.startsWith(prefix)&&String(v||'').trim())}
function lockedPrefix175(type,day=S.selectedDay){const list=assignmentBox175(day)[type],done=dailyType175(day,type);let locked=Math.min(list.length,done);if(type==='reading'||type==='listening'){
    for(let i=locked;i<list.length;i++){const item=findById175(type,list[i]);if(hasInputAnswers175(type,day,item))locked=i+1;else break}
  }else if((type==='writing'||type==='application')&&hasDraft175(type,day))locked=Math.max(locked,Math.min(list.length,done+1));
  return locked;
}
function persist175(){try{if(typeof KEY!=='undefined')localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function ensureRoute175(type,day=S.selectedDay){const box=assignmentBox175(day),old=box[type].slice(),locked=lockedPrefix175(type,day),keep=old.slice(0,locked),used=new Set(keep),route=routeIds175(type,day),target=Math.max(maxQuota175(type),old.length),next=keep.slice();for(const id of route){if(next.length>=target)break;if(!used.has(id)){next.push(id);used.add(id)}}
  const changed=old.length!==next.length||old.some((x,i)=>x!==next[i]);if(changed){box[type]=next;if(S.meta172){S.meta172.contentRouting=ROUTING_VERSION_175;S.meta172.contentRoutingUpdatedAt=new Date().toISOString()}persist175()}return box[type]
}
function ensureAllRoutes175(day=S.selectedDay){for(const type of ROUTED_TYPES_175)ensureRoute175(type,day);return assignmentBox175(day)}
function resolve175(type,index,day=S.selectedDay){const bank=bank175(type),list=ensureRoute175(type,day),id=list[Math.max(0,Number(index)||0)];if(id){const found=bank.find((x,i)=>cid175(x,type,i)===id);if(found)return found}const route=pool175(type,day);return route.length?route[Math.max(0,Number(index)||0)%route.length]:bank[0]}

currentReading=function(){return resolve175('reading',typeof UI!=='undefined'&&UI.browse174?((UI.browse174.reading&&UI.browse174.reading[String(S.selectedDay)])||0):dailyType175(S.selectedDay,'reading'),S.selectedDay)};
currentListening=function(){return resolve175('listening',typeof UI!=='undefined'&&UI.browse174?((UI.browse174.listening&&UI.browse174.listening[String(S.selectedDay)])||0):dailyType175(S.selectedDay,'listening'),S.selectedDay)};
currentWriting=function(){return resolve175('writing',dailyType175(S.selectedDay,'writing'),S.selectedDay)};
currentSpeaking=function(){return resolve175('speaking',dailyType175(S.selectedDay,'speaking'),S.selectedDay)};
currentApplication=function(){return resolve175('application',dailyType175(S.selectedDay,'application'),S.selectedDay)};

if(window.DELF50_ARCH){window.DELF50_ARCH.resolveAssignedContent=(type,index,day=S.selectedDay)=>resolve175(type,index,day);window.DELF50_ARCH.getAssignments=(day=S.selectedDay)=>JSON.parse(JSON.stringify(ensureAllRoutes175(day)));window.DELF50_ARCH.version=APP_VERSION_175;window.DELF50_ARCH.contentVersion=CONTENT_VERSION_175}
const saveBase175=save;
save=function(){saveBase175();S.version=APP_VERSION_175;if(S.meta172){S.meta172.appVersion=APP_VERSION_175;S.meta172.contentVersion=CONTENT_VERSION_175;S.meta172.contentRouting=ROUTING_VERSION_175}try{if(typeof KEY!=='undefined')localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}};

ensureAllRoutes175(S.selectedDay);
S.version=APP_VERSION_175;if(S.meta172){S.meta172.appVersion=APP_VERSION_175;S.meta172.contentVersion=CONTENT_VERSION_175;S.meta172.contentRouting=ROUTING_VERSION_175}
window.DELF50_ROUTING={version:APP_VERSION_175,routingVersion:ROUTING_VERSION_175,contentVersion:CONTENT_VERSION_175,route:(type,day=S.selectedDay)=>routeIds175(type,day).slice(),assignments:(day=S.selectedDay)=>JSON.parse(JSON.stringify(ensureAllRoutes175(day))),resolve:(type,index,day=S.selectedDay)=>resolve175(type,index,day),lockedPrefix:(type,day=S.selectedDay)=>lockedPrefix175(type,day)};
save();render();
})();
