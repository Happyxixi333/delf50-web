'use strict';
const V13_WRITINGS=[
 {id:'w1',minDay:1,title:'Ma journée',min:60,prompt:'Présentez une journée habituelle : horaires, activités, transport et un loisir.',check:['présent','heures','au moins 3 activités','connecteur simple','≥60 mots']},
 {id:'w2',minDay:1,title:'Demande simple',min:70,prompt:'Écrivez un message pour demander des informations sur un cours de français : horaires, prix et inscription.',check:['formule de politesse','3 questions','demande claire','fin de message','≥70 mots']},
 {id:'w3',minDay:5,title:'Mon week-end',min:80,prompt:'Racontez votre dernier week-end : où vous êtes allé, avec qui, ce que vous avez fait et votre impression.',check:['passé composé','ordre chronologique','impression','connecteurs','≥80 mots']},
 {id:'w4',minDay:8,title:'Une expérience mémorable',min:100,prompt:'Racontez une expérience mémorable. Décrivez le contexte, l’événement principal et ce que vous avez ressenti.',check:['imparfait pour le contexte','passé composé','sentiments','chronologie','≥100 mots']},
 {id:'w5',minDay:12,title:'Comparer deux logements',min:110,prompt:'Vous hésitez entre deux logements. Comparez-les et expliquez lequel vous préférez.',check:['comparatifs','au moins 2 critères','préférence','raison','≥110 mots']},
 {id:'w6',minDay:15,title:'Donner un conseil',min:120,prompt:'Un ami est très fatigué à cause de son travail. Écrivez-lui pour donner plusieurs conseils et expliquer pourquoi ils peuvent l’aider.',check:['conditionnel','conseils','causes','conséquences','≥120 mots']},
 {id:'w7',minDay:19,title:'Courriel de réclamation guidé',min:130,prompt:'Vous avez réservé un service qui ne correspond pas à ce qui était annoncé. Expliquez la situation, les conséquences et demandez une solution.',check:['faits','conséquences','demande','politesse','connecteurs','≥130 mots']},
 {id:'w8',minDay:25,title:'Opinion guidée',min:140,prompt:'Faut-il limiter l’utilisation du téléphone pendant les cours ? Donnez votre opinion, deux arguments et un exemple.',check:['opinion','2 arguments','exemple','nuance','conclusion','≥140 mots']},
 {id:'w9',minDay:31,title:'Courriel de réclamation DELF',min:160,prompt:'Vous avez loué un appartement de vacances, mais plusieurs équipements ne fonctionnent pas. Écrivez au propriétaire : décrivez les problèmes, expliquez leurs conséquences et demandez une solution.',check:['type de texte adapté','faits/problèmes','conséquences','demande claire','connecteurs','≥160 mots']},
 {id:'w10',minDay:31,title:'Opinion · transports publics',min:160,prompt:'Faut-il rendre les transports publics moins chers ? Donnez votre opinion, deux arguments et au moins un exemple précis.',check:['opinion claire','deux arguments','exemple précis','opposition/nuance','conclusion','≥160 mots']},
 {id:'w11',minDay:31,title:'Article · télétravail',min:160,prompt:'Un site demande aux lecteurs : « Le télétravail améliore-t-il la vie quotidienne ? » Écrivez un court article avec des avantages, des limites, un exemple et votre opinion.',check:['contexte','avantages','limites','exemple','opinion','≥160 mots']},
 {id:'w12',minDay:31,title:'Courriel · projet associatif',min:160,prompt:'Votre association souhaite organiser une activité pour le quartier. Écrivez aux membres pour présenter votre idée, expliquer son intérêt, proposer une organisation et demander leur avis.',check:['projet','intérêt','organisation','demande d’avis','registre','≥160 mots']}
];
const V13_SPEAKING=[
 {id:'s1',minDay:1,part:'Fondation',title:'Se présenter simplement',prompt:'Parlez environ une minute : nom, ville, études ou travail, langues et loisirs.',target:60,check:['présent','phrases complètes','au moins 4 informations']},
 {id:'s2',minDay:1,part:'Fondation',title:'Ma journée',prompt:'Décrivez votre journée habituelle et expliquez ce que vous aimez ou n’aimez pas.',target:75,check:['heures','activités','opinion simple']},
 {id:'s3',minDay:1,part:'Interaction guidée',title:'Demander une information',prompt:'Imaginez que vous êtes dans une gare : demandez l’heure, le prix et la voie de départ.',target:75,check:['3 questions','politesse','réaction courte']},
 {id:'s4',minDay:5,part:'Récit',title:'Mon dernier week-end',prompt:'Racontez votre dernier week-end pendant environ 90 secondes.',target:90,check:['passé composé','ordre chronologique','impression']},
 {id:'s5',minDay:8,part:'Récit',title:'Une expérience passée',prompt:'Racontez un problème ou une surprise pendant un voyage. Donnez le contexte, l’événement et la solution.',target:120,check:['imparfait','passé composé','solution','connecteurs']},
 {id:'s6',minDay:15,part:'Conseil',title:'Aider un ami',prompt:'Un ami manque de sommeil. Donnez-lui plusieurs conseils et justifiez-les.',target:120,check:['conditionnel','au moins 3 conseils','justifications']},
 {id:'s7',minDay:19,part:'Interaction',title:'Hôtel',prompt:'Votre chambre est trop bruyante. Expliquez le problème, réagissez aux propositions et essayez d’obtenir une solution.',target:150,check:['politesse','problème','réaction','solution']},
 {id:'s8',minDay:25,part:'Point de vue guidé',title:'Téléphone à l’école',prompt:'Faut-il limiter le téléphone à l’école ? Donnez votre opinion, deux raisons, un exemple et une nuance.',target:180,check:['opinion','2 arguments','exemple','nuance','conclusion']},
 {id:'s9',minDay:31,part:'Entretien dirigé',title:'Se présenter version DELF',prompt:'Parlez 2 à 3 minutes de vous : études/travail, famille, loisirs, habitudes, une expérience passée et vos projets.',target:150,check:['présent','passé','futur','réponses développées']},
 {id:'s10',minDay:31,part:'Interaction',title:'Remboursement',prompt:'Vous avez acheté un produit qui ne fonctionne pas. Le vendeur propose un échange, mais vous souhaitez un remboursement. Expliquez et négociez.',target:180,check:['expliquer','refuser poliment','insister','proposer']},
 {id:'s11',minDay:31,part:'Point de vue',title:'Réseaux sociaux',prompt:'Les réseaux sociaux sont-ils plutôt utiles ou dangereux pour les jeunes ? Parlez environ 3 minutes : opinion, deux arguments, exemple, nuance et conclusion.',target:180,check:['opinion','2 arguments','exemple','nuance','conclusion']}
];
function quota(){return QUOTAS[S.intensity]||QUOTAS.standard}
function daily(day=S.selectedDay){const k=String(day);if(!S.daily[k])S.daily[k]={grammar:0,application:0,listening:0,reading:0,writing:0,speaking:0};return S.daily[k]}
function available(bank,day=S.selectedDay){const a=bank.filter(x=>(x.minDay||1)<=day);return a.length?a:[bank[0]]}
function stagePool(bank,day=S.selectedDay){const a=available(bank,day),latest=Math.max(...a.map(x=>x.minDay||1)),primary=a.filter(x=>(x.minDay||1)===latest),older=a.filter(x=>(x.minDay||1)<latest).sort((x,y)=>(y.minDay||1)-(x.minDay||1));return primary.concat(older)}
function pick(bank,offset=0,day=S.selectedDay){const a=stagePool(bank,day);return a[offset%a.length]}
function currentReading(){return pick(V13_READINGS,daily().reading)}
function currentListening(){return pick(V13_LISTENINGS,daily().listening)}
function currentWriting(){return pick(V13_WRITINGS,daily().writing)}
function currentSpeaking(){return pick(V13_SPEAKING,daily().speaking)}
function currentApplication(){return pick(V13_APPLICATION,daily().application)}
function recommendedGrammarNode(day=S.selectedDay,step=daily(day).grammar){if(day<=18){const focus=Math.min(17,day-1),pool=[];for(let i=focus;i>=Math.max(0,focus-2);i--)pool.push(i);return pool[step%pool.length]}return (day-1+step)%GRAMMAR.length}
function buildTasks(day){const d=DAYS[day-1],mins=LEVELS[S.intensity].mins,q=quota(),late=day>=40;const names=late?['模拟/语法修复','情境应用/口试','词块回顾','听力计时','阅读计时','写作计时','口语录音','错题复盘']:['语法专项','应用专项','主题词块','听力训练','阅读训练','写作训练','口语训练','错题与复习'];const desc=[
 `${d[1]}：今日目标 ${q.grammar} 道客观题；每题后复述规则，并至少口头造 1 句。`,
 `${d[2]} · ${d[3]}：完成 ${q.application} 个真实情境；每个情境先写后说。`,
 `${d[3]}：完成约 ${q.vocab} 次主动回忆/复习卡；优先句块而非孤立单词。`,
 `${d[3]}：完成 ${q.listening} 组听力（约 ${q.listening*3} 道客观题）；每组至少听 2 遍并复盘。`,
 `${d[3]}：完成 ${q.reading} 篇阅读（约 ${q.reading*3} 道客观题）；做定位、主旨与细节。`,
 `${q.writing} 个写作任务；${day>=31?'正式阶段至少 1 篇按 DELF ≥160 词要求完成。':'字数随阶段逐步从 60–140 词提升。'}`,
 `${q.speaking} 轮口语；每轮录音、回听、自检，不生成虚假能力百分比。`,
 `复习约 ${q.review} 条错题/错误句或等量旧知识；至少重写/重说其中 3 条。`
 ];return names.map((n,i)=>({id:['grammar','app','vocab','listen','read','write','speak','review'][i],name:n,min:mins[i],desc:desc[i]}))}
function plannedMinutes(day=S.selectedDay){return buildTasks(day).reduce((a,b)=>a+b.min,0)}
function dayKey(day,id){return `${day}:${id}`}
function taskCount(id,day=S.selectedDay){const d=daily(day),q=quota();if(id==='grammar')return[d.grammar,q.grammar];if(id==='app')return[d.application,q.application];if(id==='listen')return[d.listening,q.listening];if(id==='read')return[d.reading,q.reading];if(id==='write')return[d.writing,q.writing];if(id==='speak')return[d.speaking,q.speaking];if(id==='vocab'||id==='review')return[S.taskDone[dayKey(day,id)]?1:0,1];return[0,1]}
function taskRatio(id,day=S.selectedDay){const [a,b]=taskCount(id,day);return b?Math.min(1,a/b):0}
function dayDoneMinutes(day=S.selectedDay){return buildTasks(day).reduce((a,t)=>a+t.min*taskRatio(t.id,day),0)}
function totalCompletedTasks(){let n=Object.values(S.taskDone).filter(Boolean).length;for(const d of Object.values(S.daily||{}))n+=(d.grammar||0)+(d.application||0)+(d.listening||0)+(d.reading||0)+(d.writing||0)+(d.speaking||0);return n}
function measured(label,stat){const p=pct(stat.correct,stat.attempts);return `<div class="metric"><span>${label}</span><b>${p===null?'未评估':p+'%'}</b><span>${p===null?'完成客观题后显示':`${stat.correct}/${stat.attempts} 正确`}</span></div>`}
function quotaCard(label,done,target,note){const p=Math.min(100,Math.round(done/target*100)||0);return `<div class="card"><div class="row wrap"><div><b>今日${label}配额</b><div class="muted">${note}</div></div><span class="pill ${done>=target?'':'blue'}">${done}/${target}${done>=target?' · 已达标':''}</span></div><div class="barrow"><div class="bar"><i style="width:${p}%"></i></div></div></div>`}
