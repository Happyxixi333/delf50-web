'use strict';
(function(){
const APP='1.8.5',CONTENT='1.8.2',ROUTE='pedagogical-content-clean-v1';
const TYPES=['reading','listening','writing','speaking','application'];
const PREFIX={reading:'r181',listening:'l181',writing:'w181',speaking:'s181',application:'a181'};
const SEEDS=Array.isArray(globalThis.__DELF50_SOURCE_SEEDS_V181)?globalThis.__DELF50_SOURCE_SEEDS_V181:[];
const SEEDMAP=new Map(SEEDS.map(x=>[String(x.sourceSeedId),x]));
const GENRES={
 reading:['avis pratique','courriel explicatif','article de service','questions-réponses','comparatif pratique'],
 listening:['message téléphonique','dialogue de service','chronique pratique','annonce publique','réunion courte'],
 writing:['courriel formel','message argumenté','réclamation structurée','avis au forum','compte rendu pratique'],
 speaking:['interaction guidée','présentation structurée','négociation','point de vue','médiation orale'],
 application:['demande précise','refus expliqué','réclamation','comparaison-conseil','négociation']
};
const NEXT=[
 'vérifier les conditions qui correspondent à sa situation avant d’envoyer sa demande',
 'rassembler les pièces utiles et contacter le service compétent',
 'conserver les justificatifs et demander une confirmation si un point reste incertain',
 'relire les informations disponibles puis préparer une question précise',
 'noter les éléments importants et vérifier la prochaine étape avec le service concerné'
];
const TIMES=['dès demain matin','avant la fin de la semaine','après avoir réuni les documents nécessaires','avant son prochain rendez-vous','dans les prochains jours'];
function bank(t){if(t==='reading')return typeof V13_READINGS!=='undefined'?V13_READINGS:READINGS;if(t==='listening')return typeof V13_LISTENINGS!=='undefined'?V13_LISTENINGS:LISTENINGS;if(t==='writing')return typeof V13_WRITINGS!=='undefined'?V13_WRITINGS:WRITINGS;if(t==='speaking')return typeof V13_SPEAKING!=='undefined'?V13_SPEAKING:SPEAKING;return typeof V13_APPLICATION!=='undefined'?V13_APPLICATION:APPLICATION}
function parse(x){const m=String(x&&x.id||'').match(/^([rlwsa]181)-d(\d{2})-s(\d{2})$/);if(!m)return null;const type=({r181:'reading',l181:'listening',w181:'writing',s181:'speaking',a181:'application'})[m[1]];return{type,day:Number(m[2]),slot:Number(m[3])-1}}
function seedOf(x,p){const sid=x&&x.provenance&&x.provenance.sourceSeedIds&&x.provenance.sourceSeedIds[0];if(sid&&SEEDMAP.has(String(sid)))return SEEDMAP.get(String(sid));if(!p||!SEEDS.length)return null;const base={reading:0,listening:4,writing:8,speaking:10,application:14}[p.type];return SEEDS[(((p.day-3)%10)*18+base+p.slot)%180]||null}
function variant(d){return Math.floor((d-3)/10)%5}
function clean(s){return String(s==null?'':s).replace(/\s+/g,' ').trim()}
function sentence(s){s=clean(s);return /[.!?]$/.test(s)?s:s+'.'}
function cap(s){s=clean(s);return s?s.charAt(0).toUpperCase()+s.slice(1):s}
function qprov(x,n){const p=x&&x.provenance?JSON.parse(JSON.stringify(x.provenance)):null;if(p)p.traceId=String(p.traceId||'').replace(/-Q\d+$/,'')+`-Q${n}`;return p}
function rotate(arr,k){const n=((k%arr.length)+arr.length)%arr.length;return arr.slice(n).concat(arr.slice(0,n))}
function mc(x,n,stem,correct,wrong1,wrong2,why,k){const opts=rotate([correct,wrong1,wrong2],k+n);return[stem,opts,opts.indexOf(correct),why,qprov(x,n)]}
function nextFor(p){return NEXT[(p.day+p.slot)%NEXT.length]}
function timeFor(p){return TIMES[(p.day*2+p.slot)%TIMES.length]}
function readingText(v,seed,p){const angle=seed.angle,fact=sentence(seed.factFr),next=nextFor(p),when=timeFor(p);return [
 `Vous cherchez des informations fiables au sujet de « ${angle} ». ${fact} Avant toute démarche, il est conseillé de ${next}. La personne concernée prévoit de le faire ${when}. Si sa situation présente une particularité, elle demandera une précision au service compétent avant de prendre une décision.`,
 `Objet : renseignements sur ${angle}\n\nBonjour,\nVous m’avez demandé de vérifier un point concernant ${angle}. ${fact} Pour éviter une erreur, je vous conseille de ${next}. Je compte faire cette vérification ${when} et je vous transmettrai ensuite les informations utiles.\n\nBien cordialement,\nCamille`,
 `Bien comprendre ${angle}\n\nAvant d’agir, il faut distinguer l’information générale de la situation personnelle. ${fact} Une démarche prudente consiste à ${next}. Cette vérification sera faite ${when}. En cas de doute, mieux vaut demander une précision claire plutôt que de supposer que la même règle s’applique à tous les cas.`,
 `Question : Que faut-il savoir à propos de ${angle} ?\nRéponse : ${fact} Il est donc utile de ${next}. La personne concernée prévoit cette vérification ${when}. Si un élément de sa situation n’est pas clair, elle peut demander une confirmation avant de poursuivre.`,
 `Avant de prendre une décision sur ${angle}, deux réflexes sont utiles : comprendre la règle générale et vérifier son application au cas concret. ${fact} La solution la plus sûre est de ${next}. Cette étape est prévue ${when}; elle permettra d’éviter une décision fondée sur une information incomplète.`
 ][v]}
function rewriteReading(x,p,seed){const v=variant(p.day),g=GENRES.reading[v],text=readingText(v,seed,p),next=nextFor(p),when=timeFor(p);x.title=`${g} · ${seed.angle}`;x.text=text;x.qs=[
 mc(x,1,`Quelle information essentielle faut-il retenir à propos de « ${seed.angle} » ?`,sentence(seed.factFr),'La même règle s’applique automatiquement à toutes les situations.','Aucune vérification n’est nécessaire avant d’agir.','Le texte présente cette information comme le point principal à retenir.',p.day+p.slot),
 mc(x,2,'Quelle démarche est recommandée avant de poursuivre ?',cap(next)+'.','Décider immédiatement sans vérifier les conditions.','Ignorer les documents et les informations déjà disponibles.','Le texte recommande explicitement cette démarche.',p.day+p.slot+3),
 mc(x,3,'Quand la personne prévoit-elle de faire cette vérification ?',cap(when)+'.','Dans plusieurs mois, sans urgence.','Seulement après avoir pris une décision définitive.','Le moment prévu est indiqué dans le texte.',p.day+p.slot+6)
 ];return x}
function listeningScript(v,seed,p){const angle=seed.angle,fact=sentence(seed.factFr),next=nextFor(p),when=timeFor(p);return [
 `Bonjour, j’ai une question. Elle concerne « ${angle} ». J’ai trouvé plusieurs informations et je voudrais être sûr de bien comprendre. — Bien sûr. ${fact} — D’accord. Je vais donc ${next} ${when}. Merci, c’est plus clair maintenant.`,
 `— Bonjour, j’aurais une question. Elle concerne « ${angle} ». — Je vous écoute. — Je voudrais savoir quelle règle je dois retenir. — ${fact} — Très bien. Dans ce cas, je vais ${next} ${when}. — Oui, et vous pourrez nous recontacter si un détail reste incertain.`,
 `Aujourd’hui, notre chronique pratique porte sur « ${angle} ». Voici le point essentiel : ${fact} Avant de prendre une décision, pensez à ${next}. Une auditrice nous indique qu’elle fera cette vérification ${when}, afin de disposer d’informations suffisamment précises.`,
 `Information pratique : « ${angle} ». ${fact} Les personnes concernées sont invitées à ${next}. Si vous avez un doute sur votre situation, vérifiez ce point ${when} et demandez une précision avant d’engager une démarche définitive.`,
 `— Avant de décider, il faut clarifier la question « ${angle} ». — Quel est le point principal ? — ${fact} — Alors, notre prochaine étape sera de ${next}. — Très bien. Nous ferons cette vérification ${when} et nous déciderons ensuite avec toutes les informations nécessaires.`
 ][v]}
function rewriteListening(x,p,seed){const v=variant(p.day),g=GENRES.listening[v],next=nextFor(p);x.title=`${g} · ${seed.angle}`;x.script=listeningScript(v,seed,p);x.qs=[
 mc(x,1,'Pourquoi la personne écoute-t-elle ou contacte-t-elle le service ?',`Pour obtenir des précisions concernant « ${seed.angle} ».`,'Pour confirmer une commande déjà reçue.','Pour raconter un événement sans demander d’information.','Le motif est annoncé au début de l’enregistrement.',p.day+p.slot+1),
 mc(x,2,`Quelle information importante est donnée à propos de « ${seed.angle} » ?`,sentence(seed.factFr),'La situation ne nécessite jamais aucune vérification.','Il suffit de prendre une décision sans tenir compte des conditions applicables.','Cette information constitue le point essentiel du message.',p.day+p.slot+4),
 mc(x,3,'Que va faire la personne ensuite ?',cap(next)+'.','Abandonner immédiatement toute démarche.','Attendre plusieurs mois sans vérifier aucune information.','La prochaine étape est annoncée à la fin de l’enregistrement.',p.day+p.slot+7)
 ];return x}
function rewriteWriting(x,p,seed){const v=variant(p.day),g=GENRES.writing[v],min=p.day>=31?160:Math.min(150,70+Math.floor(p.day/4)*10),fact=sentence(seed.factFr);x.title=`${g} · ${seed.angle}`;x.min=min;x.prompt=[
 `Vous écrivez à un service pour obtenir des précisions sur « ${seed.angle} ». Vous savez que : ${fact} Expliquez brièvement votre situation, posez trois questions précises et demandez quelle démarche vous devez effectuer ensuite.`,
 `Une difficulté liée à « ${seed.angle} » a perturbé votre organisation. ${fact} Écrivez un message pour raconter ce qui s’est passé, expliquer les conséquences et proposer deux solutions réalistes.`,
 `Vous souhaitez contester ou clarifier une situation concernant « ${seed.angle} ». Tenez compte de cette information : ${fact} Présentez les faits, demandez une explication et proposez une solution raisonnable.`,
 `Sur un forum, donnez votre avis à propos de « ${seed.angle} ». Prenez en compte l’information suivante : ${fact} Développez deux arguments, donnez un exemple, nuancez votre position et concluez clairement.`,
 `Rédigez un court compte rendu pratique sur « ${seed.angle} ». ${fact} Présentez l’idée essentielle, expliquez pourquoi elle est utile dans une situation concrète et recommandez une démarche à un autre usager.`
 ][v];x.check=['tâche complète','organisation claire','idées développées','connecteurs',`≥${min} mots`];return x}
function rewriteSpeaking(x,p,seed){const v=variant(p.day),g=GENRES.speaking[v],fact=sentence(seed.factFr);x.title=`${g} · ${seed.angle}`;x.prompt=[
 `Vous contactez un service au sujet de « ${seed.angle} ». Vous disposez de cette information : ${fact} Expliquez votre situation, posez des questions, vérifiez votre compréhension et reformulez la réponse obtenue.`,
 `Présentez clairement le sujet « ${seed.angle} » à un petit groupe. Partez de cette information : ${fact} Expliquez le point essentiel, son utilité et donnez un exemple concret.`,
 `Une personne n’est pas d’accord avec votre solution concernant « ${seed.angle} ». Tenez compte de cette information : ${fact} Expliquez votre position, écoutez une objection et cherchez un compromis acceptable.`,
 `Donnez votre point de vue sur « ${seed.angle} ». Prenez comme point de départ : ${fact} Développez deux arguments, donnez un exemple, présentez une limite et concluez.`,
 `Un proche vous demande de lui expliquer simplement « ${seed.angle} ». Vous savez que : ${fact} Reformulez l’information avec vos propres mots, vérifiez qu’il a compris et proposez une prochaine étape.`
 ][v];x.part=p.day>=31?'DELF B1':'Entraînement guidé';x.target=p.day>=31?180:Math.min(150,75+p.day*3);x.check=['consigne complète','reformulation claire','phrases développées','réaction ou exemple'];return x}
function rewriteApplication(x,p,seed){const v=variant(p.day),g=GENRES.application[v],fact=sentence(seed.factFr);x.topic=seed.theme;x.title=`${g} · ${seed.angle}`;x.task=[
 `Vous avez besoin d’une information précise sur « ${seed.angle} ». Vous savez que : ${fact} Demandez ce qui s’applique à votre situation, vérifiez un détail important et confirmez la prochaine étape.`,
 `Vous devez refuser une proposition liée à « ${seed.angle} ». Tenez compte de cette information : ${fact} Expliquez votre limite, refusez poliment et proposez une autre solution.`,
 `Vous signalez un problème concernant « ${seed.angle} ». Appuyez-vous sur cette information : ${fact} Exposez les faits, demandez une justification et négociez une solution.`,
 `Deux options sont possibles autour de « ${seed.angle} ». Tenez compte de cette information : ${fact} Comparez les options selon trois critères, conseillez-en une et reconnaissez un avantage de l’autre.`,
 `Vous devez trouver un compromis à propos de « ${seed.angle} ». Gardez à l’esprit cette information : ${fact} Reformulez le désaccord, proposez deux solutions et concluez par un accord précis.`
 ][v];x.keys=['reformulation','raison','solution'];x.chunks=['Je voudrais vérifier…','Si je comprends bien…','Je vous propose plutôt…'];return x}
function rewriteAll(){let changed=0;for(const t of TYPES){for(const x of bank(t)){const p=parse(x);if(!p||p.type!==t)continue;const seed=seedOf(x,p);if(!seed)continue;if(t==='reading')rewriteReading(x,p,seed);else if(t==='listening')rewriteListening(x,p,seed);else if(t==='writing')rewriteWriting(x,p,seed);else if(t==='speaking')rewriteSpeaking(x,p,seed);else rewriteApplication(x,p,seed);changed++;}}return changed}
function visibleStrings(t,x){const out=[x&&x.title];if(t==='reading'){out.push(x.text);(x.qs||[]).forEach(q=>out.push(q[0],...(q[1]||[]),q[3]));}else if(t==='listening'){out.push(x.script);(x.qs||[]).forEach(q=>out.push(q[0],...(q[1]||[]),q[3]));}else if(t==='writing'||t==='speaking')out.push(x.prompt,...(x.check||[]));else out.push(x.task,...(x.keys||[]),...(x.chunks||[]));return out.filter(Boolean).map(String)}
const FORBIDDEN=[/\b(?:Dossier|Audio|message|Annonce|Réunion)\s+[RLSWA]\d{2}-\d+\b/i,/\b[RLSWA]\d{2}-\d+\b/,/reformulation pédagogique/i,/source publique/i,/source officielle/i,/mots?-clés? du dossier/i,/DELF50\s*原创/i,/FEI-B1|CEFR-DESC/i];
function audit(){const hits=[];for(const t of TYPES){for(const x of bank(t)){for(const s of visibleStrings(t,x)){for(const re of FORBIDDEN){if(re.test(s)){hits.push({type:t,id:x.id,pattern:String(re),sample:s.slice(0,180)});break}}}}}return{checked:TYPES.reduce((n,t)=>n+bank(t).length,0),hits,count:hits.length}}
function stripAuditHtml(html){try{const t=document.createElement('template');t.innerHTML=String(html||'');t.content.querySelectorAll('.prov,.qsource,.gsource176,.tracepill').forEach(el=>el.remove());return t.innerHTML}catch(e){return String(html||'')}}
const changed=rewriteAll();
const readingViewBase185=readingView;readingView=function(r){return stripAuditHtml(readingViewBase185(r))};
const listeningViewBase185=listeningView;listeningView=function(l){return stripAuditHtml(listeningViewBase185(l))};
const writingViewBase185=writingView;writingView=function(){return stripAuditHtml(writingViewBase185())};
const speakingViewBase185=speakingView;speakingView=function(){return stripAuditHtml(speakingViewBase185())};
const applicationViewBase185=applicationView;applicationView=function(){return stripAuditHtml(applicationViewBase185())};
const grammarBase185=grammar;grammar=function(){return stripAuditHtml(grammarBase185())};
const report=audit();
S.contentAudit185={route:ROUTE,at:new Date().toISOString(),rewritten:changed,visibleForbiddenCount:report.count,checkedItems:report.checked};
S.version=APP;
if(S.meta172){S.meta172.appVersion=APP;S.meta172.contentVersion=CONTENT;S.meta172.studentContent=ROUTE;}
try{if(typeof KEY!=='undefined')localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}
globalThis.__DELF50_V185={appVersion:APP,contentVersion:CONTENT,route:ROUTE,audit,report};
if(typeof render==='function')render();
})();
