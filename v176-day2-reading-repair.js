'use strict';
/**
 * Day-2 duplicate-reading audit.
 *
 * An earlier release routed day 2 to some of the same reading documents as day 1,
 * so a learner could be credited twice for one text. The original repair deleted the
 * duplicated answers and decremented daily.reading, reading.attempts, reading.correct
 * and reading.index. That destroys evidence a learner really produced, which this
 * project must never do, so the layer now only records what it observes. Browsers
 * where the destructive repair already ran keep their existing record untouched:
 * the guard key is unchanged, so the audit never runs twice.
 */
(function(){
const REPAIR_ID_176='day2-duplicate-reading-evidence-v1';
function bank176r(){return typeof V13_READINGS!=='undefined'?V13_READINGS:READINGS}
function byId176r(id){return bank176r().find(x=>String(x.id)===String(id))||null}
function assignmentIds176r(day){return S.assignments172&&S.assignments172[String(day)]&&Array.isArray(S.assignments172[String(day)].reading)?S.assignments172[String(day)].reading.slice():[]}
function done176r(day){return Number(S.daily&&S.daily[String(day)]&&S.daily[String(day)].reading||0)}
function fullyAnswered176r(day,id){const item=byId176r(id);return!!(item&&Array.isArray(item.qs)&&item.qs.length&&item.qs.every((_,qi)=>S.reading.answers&&S.reading.answers[`${day}:${id}:${qi}`]!==undefined))}
function actualCompletedIds176r(day){const list=assignmentIds176r(day),count=done176r(day),out=[];for(let i=0;i<Math.min(count,list.length);i++)out.push(String(list[i]));for(const id of list)if(fullyAnswered176r(day,id)&&!out.includes(String(id)))out.push(String(id));return out}
function persist176r(){try{if(typeof KEY!=='undefined')localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function audit176r(){
  S.repairs176=S.repairs176||{};
  if(S.repairs176[REPAIR_ID_176])return S.repairs176[REPAIR_ID_176];
  const day1=new Set(actualCompletedIds176r(1));
  const duplicates=actualCompletedIds176r(2).filter(id=>day1.has(id)&&!String(id).startsWith('r176-d2-'));
  const rec={at:new Date().toISOString(),
    status:duplicates.length?'noted-non-destructive':'no-duplicate-evidence-found',
    ids:duplicates,removedAttempts:0,removedCorrect:0,removedCompleted:0,
    policy:'evidence-preserved-v2',
    note:duplicates.length?'Day 1 and day 2 shared these reading documents in an older release. The record is kept as the learner produced it; no counter or answer was changed.':''};
  S.repairs176[REPAIR_ID_176]=rec;
  persist176r();
  return rec
}
const result176r=audit176r();
window.DELF50_DAY2_REPAIR={id:REPAIR_ID_176,policy:'evidence-preserved-v2',result:result176r};
})();
