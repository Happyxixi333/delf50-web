'use strict';
(function(){
const APP='1.8.14',CONTENT='1.8.7',ROUTE='exam-style-input-v1';
const CURR=Array.isArray(globalThis.__DELF50_CURRICULUM_50)?globalThis.__DELF50_CURRICULUM_50:[];
const PEOPLE=[['Léa','elle'],['Nicolas','il'],['Samira','elle'],['Thomas','il'],['Inès','elle'],['Karim','il'],['Camille','elle'],['Hugo','il'],['Sofia','elle'],['Mehdi','il']];
const CITIES=['Lyon','Nantes','Bordeaux','Lille','Toulouse','Rennes','Dijon','Grenoble','Tours','Strasbourg'];
const DAYS=['lundi','mardi','mercredi','jeudi','vendredi','samedi'];
const CASES={
 travel:[
  ['Un retour à réorganiser','une gare régionale','rentrer après une journée de visite','le dernier bus part plus tôt à cause de travaux','prendre un train régional puis marcher quinze minutes','le billet de train reste valable sur le départ suivant','la nouvelle solution ajoute du temps mais évite une longue attente'],
  ['Une réservation déplacée','un office de tourisme','maintenir une visite réservée','l’horaire initial a été déplacé en fin d’après-midi','échanger le créneau avec une autre visite guidée','la seconde visite se trouve à huit minutes à pied','le nouvel ordre permet de garder les deux activités'],
  ['Un week-end sous la pluie','un centre-ville','adapter un programme de week-end','la météo rend l’activité extérieure peu agréable','choisir d’abord une visite couverte puis garder la promenade si le temps s’améliore','le billet du musée est valable toute la journée','le groupe conserve une solution de repli sans annuler le reste'],
  ['Une correspondance trop courte','une gare','arriver à un rendez-vous sans courir','une correspondance de six minutes laisse peu de marge','prendre le train précédent et attendre sur place','le trajet précédent coûte le même prix','la personne préfère perdre vingt minutes plutôt que risquer de manquer le rendez-vous']
 ],
 daily:[
  ['Une activité après le travail','une maison de quartier','participer à un atelier en semaine','le premier horaire commence trop tôt par rapport à la fin du travail','choisir le créneau suivant et prévenir l’animateur','le second groupe dispose encore de quelques places','la personne peut participer sans quitter son travail plus tôt'],
  ['Des courses à organiser','un marché couvert','acheter plusieurs produits avant la fermeture','deux commerces ferment à des heures différentes','commencer par le magasin qui ferme le plus tôt','le trajet entre les deux prend moins de dix minutes','l’ordre choisi évite un déplacement inutile'],
  ['Un rendez-vous à déplacer','un centre de services','trouver un horaire compatible avec une autre obligation','le créneau proposé tombe pendant un cours','demander une place en fin de journée','une annulation vient de libérer un créneau à 18 h 30','le changement permet de garder les deux engagements'],
  ['Une inscription incomplète','une médiathèque','finaliser une inscription','un justificatif manque au dossier administratif','envoyer le document en ligne avant de se déplacer','la carte peut être préparée avant l’arrivée','la démarche sur place sera plus courte']
 ],
 work:[
  ['Une réunion hybride','une entreprise de services','réunir toute l’équipe','deux collègues travaillent à distance ce jour-là','garder la réunion et ajouter un lien vidéo','la salle réservée dispose déjà du matériel nécessaire','personne ne doit modifier son déplacement'],
  ['Une candidature à compléter','un centre de formation','envoyer un dossier complet','une attestation demandée n’a pas été jointe','transmettre le document manquant le jour même','le service accepte les pièces complémentaires jusqu’au lendemain midi','la candidature reste recevable si le document arrive à temps'],
  ['Un planning à revoir','une équipe de projet','terminer une tâche importante','une étape précédente a pris deux jours de retard','déplacer une réunion secondaire et concentrer l’équipe sur la priorité','le client accepte un point d’avancement vendredi','le nouveau calendrier limite les conséquences du retard'],
  ['Deux offres à comparer','un espace de coworking','choisir une formule de travail','l’offre la moins chère limite l’accès le soir','payer un peu plus pour un accès plus large','la seconde formule inclut aussi deux salles de réunion par mois','le choix dépend surtout des horaires réels de la personne']
 ],
 health:[
  ['Un conseil avant de consulter','une maison de santé','obtenir un avis pour un problème léger','les rendez-vous du matin sont complets','appeler la permanence de l’après-midi','un créneau sans rendez-vous existe deux jours par semaine','la personne sait quand demander une consultation si la situation continue'],
  ['Reprendre le sport progressivement','un club sportif','retrouver une activité régulière','le programme actuel est trop intense pour être suivi chaque semaine','commencer par deux séances courtes','les créneaux du mardi et du samedi sont moins chargés','un rythme plus réaliste doit permettre de tenir plusieurs semaines'],
  ['Mieux organiser le sommeil','un service de prévention','stabiliser les horaires de sommeil','les heures de coucher changent beaucoup selon les jours','fixer une heure plus régulière et réduire les écrans avant de dormir','un bilan est prévu après deux semaines','la personne pourra comparer son niveau de fatigue avant et après'],
  ['Une ordonnance à clarifier','une pharmacie','comprendre comment utiliser un produit','une indication sur la durée n’est pas claire','demander confirmation au pharmacien avant de commencer','la notice précise aussi les moments de prise','la personne évite d’interpréter seule une information ambiguë']
 ],
 housing:[
  ['Un chauffage à faire réparer','un immeuble ancien','obtenir une intervention rapidement','le chauffage fonctionne mal depuis deux jours','proposer deux créneaux au propriétaire','un technicien peut passer jeudi matin','la réparation peut être organisée sans manquer toute une journée de travail'],
  ['Un problème de bruit','une résidence étudiante','faire cesser des nuisances répétées','le bruit continue tard plusieurs soirs par semaine','écrire au responsable avec des exemples précis','une médiation entre voisins est possible avant une procédure plus formelle','la personne demande d’abord une solution concrète et proportionnée'],
  ['Un état des lieux à préparer','une location','clarifier les conditions de départ','une règle sur la remise des clés n’est pas claire','demander une confirmation écrite avant le rendez-vous','l’état des lieux est prévu le samedi matin','la réponse permettra d’éviter un déplacement supplémentaire'],
  ['Deux logements, deux priorités','un quartier résidentiel','choisir entre deux appartements','le logement moins cher est nettement plus éloigné du travail','comparer le loyer, le trajet et les services','le logement plus proche permet de gagner quarante minutes par jour','le choix final dépend du poids donné au budget et au temps']
 ],
 city:[
  ['Une carte de médiathèque','une médiathèque municipale','emprunter des documents rapidement','une pièce justificative est nécessaire pour terminer l’inscription','préparer le document avant de venir','les prêts peuvent ensuite être renouvelés en ligne','la personne gagnera du temps lors de la première visite'],
  ['Un atelier municipal','un service de quartier','trouver une activité compatible avec son emploi du temps','les horaires changent selon les jours','comparer deux lieux et deux créneaux','l’un des ateliers demande une inscription préalable','la personne choisit en fonction du temps de trajet autant que du contenu'],
  ['Un marché plus pratique','un marché couvert','faire des achats pour plusieurs repas','certains produits ne sont disponibles que le matin','préparer une liste et arriver avant midi','le marché devient plus calme vers 11 h 30','la personne évite à la fois la foule et les ruptures de stock'],
  ['Une démarche en mairie','un service municipal','obtenir un document sans revenir plusieurs fois','un justificatif doit être présenté en original','vérifier la liste avant le rendez-vous','une copie peut être faite sur place mais pas remplacée par une photo','la préparation évite un second rendez-vous']
 ],
 culture:[
  ['Une visite moins chargée','un musée municipal','profiter d’une exposition temporaire','le créneau du début d’après-midi est presque complet','réserver en fin de journée','la visite commentée dure une heure','le groupe accepte de décaler le dîner pour éviter la foule'],
  ['Deux spectacles le même soir','un festival de quartier','choisir un programme réaliste','deux spectacles commencent presque à la même heure','comparer la distance et la durée avant de décider','l’un des événements est gratuit sur réservation','la gratuité ne suffit pas si le déplacement rend le second spectacle impossible'],
  ['Un atelier avec peu de places','une association culturelle','participer à un atelier pratique','le nombre de places est limité','s’inscrire en ligne puis attendre la confirmation','le matériel principal est fourni sur place','la personne n’achète rien avant d’avoir reçu la confirmation'],
  ['Une rencontre littéraire','une bibliothèque','choisir entre deux rencontres','les deux auteurs abordent des thèmes différents','lire les présentations et choisir selon ses intérêts','une discussion avec le public est prévue à la fin','la personne privilégie l’échange plutôt que la durée la plus courte']
 ],
 technology:[
  ['Des notifications à réduire','un outil de messagerie','mieux se concentrer pendant le travail','les alertes interrompent souvent les tâches longues','désactiver les notifications non urgentes pendant deux plages horaires','les messages marqués urgents restent visibles','la personne réduit les interruptions sans couper totalement le service'],
  ['Une formation à distance','une plateforme d’apprentissage','suivre un cours malgré une connexion irrégulière','la connexion est moins stable le soir','télécharger les documents à l’avance','les exercices restent accessibles pendant une semaine','la personne peut travailler hors ligne puis envoyer ses réponses plus tard'],
  ['Un compte à sécuriser','un service en ligne','protéger ses informations personnelles','un ancien mot de passe a été réutilisé','choisir un mot de passe unique et activer une vérification supplémentaire','des codes de secours peuvent être enregistrés séparément','la sécurité augmente sans rendre chaque connexion impossible'],
  ['Limiter le temps d’écran','un groupe d’étudiants','réduire un usage devenu automatique','le temps passé en ligne augmente surtout en fin de journée','fixer une limite puis observer les effets pendant une semaine','les participants n’ont pas tous les mêmes habitudes','la comparaison porte sur les effets réels plutôt que sur une règle identique pour tous']
 ],
 environment:[
  ['Mieux trier les déchets','un quartier','appliquer de nouvelles consignes de tri','certaines règles ont changé pour les emballages','lire le nouveau guide et informer les voisins','une réunion d’information est prévue mercredi','les erreurs devraient diminuer si chacun utilise la même consigne'],
  ['Réduire la consommation','un immeuble collectif','faire baisser les dépenses d’énergie','les dépenses ont augmenté pendant l’hiver','comparer les usages avant de choisir une mesure','un suivi mensuel est prévu','le groupe pourra vérifier si la mesure produit réellement un effet'],
  ['Une journée sans voiture','une association locale','organiser un événement accessible','certains habitants craignent des difficultés de déplacement','prévoir des solutions pour les personnes concernées','les transports publics seront renforcés ce jour-là','le projet reste possible à condition de traiter les besoins particuliers'],
  ['Moins de gaspillage','un établissement scolaire','réduire la quantité de nourriture jetée','une partie des repas est régulièrement inutilisée','mesurer les quantités puis ajuster les portions','les résultats seront comparés après un mois','la décision finale sera prise à partir des données observées']
 ],
 society:[
  ['Des horaires plus flexibles','une entreprise','évaluer une nouvelle organisation du travail','les salariés n’ont pas tous les mêmes contraintes','tester deux mois avant de décider définitivement','un bilan collectif est prévu à la fin de la période','la mesure est présentée comme une expérimentation et non comme une solution parfaite'],
  ['Un nouvel aménagement','un quartier','discuter d’un projet local','le projet améliore un service mais réduit quelques places de stationnement','présenter les avantages et les limites avant de voter','une consultation publique reste ouverte une semaine','la décision doit tenir compte de plusieurs groupes d’usagers'],
  ['Le numérique en cours','une université','définir des règles d’usage','les étudiants apprécient la souplesse mais signalent aussi des difficultés de concentration','autoriser certains usages et limiter les interruptions','les avis restent partagés','une règle équilibrée doit rester compréhensible et applicable'],
  ['Une nouvelle organisation scolaire','un établissement scolaire','adapter les horaires','les élèves et les enseignants n’ont pas les mêmes priorités','recueillir plusieurs avis puis tester un changement','une période d’essai de deux mois est proposée','le bilan doit distinguer les préférences des effets réellement observés']
 ]
};
function bank(t){if(t==='reading')return typeof V13_READINGS!=='undefined'?V13_READINGS:READINGS;return typeof V13_LISTENINGS!=='undefined'?V13_LISTENINGS:LISTENINGS}
function parse(x){const m=String(x&&x.id||'').match(/^([rl])(177|181)-d(\d{2})-s(\d{2})$/i);if(!m)return null;return{type:m[1].toLowerCase()==='r'?'reading':'listening',generation:Number(m[2]),day:Number(m[3]),slot:Number(m[4])-1}}
function plan(day){return CURR.find(x=>Number(x.day)===Number(day))||{day:Number(day),topic:'vie quotidienne',grammar:'',function:'comprendre / agir',title:'Entraînement'}}
function category(p){const z=(String(p.topic||'')+' '+String(p.title||'')+' '+String(p.function||'')).toLowerCase();if(/voyage|transport|incident|trajet|week-end/.test(z))return'travel';if(/travail|emploi|étude|candid|formation|courriel/.test(z))return'work';if(/santé|sommeil|sport/.test(z))return'health';if(/logement|réclamation|voisin/.test(z))return'housing';if(/culture|musée|loisir|livre/.test(z))return'culture';if(/technolog|numérique|écran|réseau/.test(z))return'technology';if(/environnement|énergie|déchet|gaspillage/.test(z))return'environment';if(/société|opinion|débat|école|université/.test(z))return'society';if(/ville|service public|alimentation|quotidien|identité|routine/.test(z))return'city';return'daily'}
function done(day,t){return Number(S&&S.daily&&S.daily[String(day)]&&S.daily[String(day)][t]||0)}
function answers(t){return (t==='reading'?S.reading:S.listening)&&((t==='reading'?S.reading:S.listening).answers)||{}}
function hasAnswer(t,day,id){const p=String(day)+':'+String(id)+':';return Object.keys(answers(t)).some(k=>k.startsWith(p))}
function completed(t,id){return !!(S&&S.contentProgress172&&S.contentProgress172.completed&&S.contentProgress172.completed[t]&&S.contentProgress172.completed[t][id])}
function locked(t,day,slot,id){return slot<done(day,t)||hasAnswer(t,day,id)||completed(t,id)}
function evidence(){return JSON.stringify({daily:S.daily,reading:{answers:S.reading&&S.reading.answers,attempts:S.reading&&S.reading.attempts,correct:S.reading&&S.reading.correct,index:S.reading&&S.reading.index},listening:{answers:S.listening&&S.listening.answers,attempts:S.listening&&S.listening.attempts,correct:S.listening&&S.listening.correct,index:S.listening&&S.listening.index},completed:S.contentProgress172&&S.contentProgress172.completed})}
function cap(s){s=String(s||'').trim();return s?s.charAt(0).toUpperCase()+s.slice(1):s}
function pickCase(p,day,slot,generation){const a=CASES[category(p)]||CASES.daily;return a[(day+slot*3+(Number(generation)===181?1:0))%a.length]}
function person(day,slot){return PEOPLE[(day*3+slot)%PEOPLE.length]}
function city(day,slot){return CITIES[(day+slot*2)%CITIES.length]}
function dayName(day,slot){return DAYS[(day+slot)%DAYS.length]}
function time(day,slot){const h=8+((day+slot*2)%11),m=['00','15','30','45'][(day+slot)%4];return h+' h '+m}
function grammarCue(p,name,pronoun,c){const g=String(p.grammar||'').toLowerCase();if(/passé composé avec être/.test(g))return (pronoun==='elle'?name+' est arrivée':name+' est arrivé')+' plus tôt que prévu, puis '+(pronoun==='elle'?'elle est repartie':'il est reparti')+' après avoir obtenu les informations nécessaires.';if(/passé composé/.test(g)&&!/imparfait/.test(g))return name+' a vérifié les horaires, a comparé les deux possibilités et a confirmé son choix par message.';if(/imparfait/.test(g)&&!/passé composé vs|past tenses/.test(g))return 'Avant ce changement, '+name+' suivait toujours la même organisation et la situation semblait plus simple.';if(/plus-que-parfait|past tenses|passé récent/.test(g))return 'Quand la difficulté est apparue, '+name+' avait déjà préparé une première solution, mais '+pronoun+' venait de recevoir une information qui changeait la situation.';if(/futur/.test(g))return 'Si tout est confirmé, '+name+' gardera cette organisation et vérifiera une dernière fois les horaires avant de partir.';if(/conditionnel|hypoth/.test(g))return 'À sa place, on pourrait choisir la solution la plus prévisible, surtout si la marge de temps reste limitée.';if(/subjonctif/.test(g))return 'Il faut que la solution reste simple pour que les personnes concernées puissent l’appliquer sans difficulté.';if(/relati|dont/.test(g))return 'Le point dont '+name+' tient le plus compte est la marge disponible, qui devient décisive au moment de choisir.';if(/compar|superlatif/.test(g))return 'La seconde option est un peu moins directe, mais elle devient plus pratique dès qu’on compare le temps, le coût et le risque d’imprévu.';if(/pron|y \/ en|cod|coi/.test(g))return name+' en parle avec le service, lui demande une précision et y retourne seulement après avoir reçu la confirmation.';if(/cause|conséquence|opposition|connecteur|logical/.test(g))return 'La première solution paraît plus simple; cependant, la contrainte principale reste importante, c’est pourquoi '+name+' préfère vérifier avant de décider.';return 'Pour éviter une décision trop rapide, '+name+' compare les contraintes, les solutions possibles et leurs conséquences concrètes.'}
function qprov(old,n){const p=old&&old.provenance?JSON.parse(JSON.stringify(old.provenance)):{};p.qualityRoute=ROUTE;p.questionIndex=n;return p}
function mc(old,n,stem,correct,w1,w2,why,seed){let a=[correct,w1,w2],k=Math.abs(seed+n)%3;a=a.slice(k).concat(a.slice(0,k));return[stem,a,a.indexOf(correct),why,qprov(old,n)]}
function readTitle(c,cityName,slot){const suffix=['à '+cityName,'près de '+cityName,'dans le centre de '+cityName,'à '+cityName][slot%4];return c[0]+' '+suffix}
function readingBody(p,c,day,slot){const pe=person(day,slot),name=pe[0],pro=pe[1],where=c[1],goal=c[2],issue=c[3],alt=c[4],fact=c[5],result=c[6],cityName=city(day,slot),when=dayName(day,slot),at=time(day,slot),g=grammarCue(p,name,pro,c),style=slot%4;let s='';
 if(style===0)s='Objet : '+c[0]+'. '+name+' écrit après avoir consulté les informations disponibles pour '+goal+' à '+where+', près de '+cityName+'. '+cap(issue)+'. '+name+' ne veut pas annuler immédiatement et cherche une solution qui reste compatible avec son emploi du temps. '+g+' Une possibilité consiste à '+alt+'. '+cap(fact)+'. Avant de confirmer, '+name+' vérifie aussi le temps de trajet et la marge nécessaire en cas de retard. '+cap(result)+'. '+name+' décide donc de répondre au service '+when+' avant '+at+', en expliquant clairement la contrainte et la solution retenue.';
 else if(style===1)s='À '+cityName+', une information pratique concerne les personnes qui souhaitent '+goal+'. '+cap(issue)+'. Plusieurs usagers avaient prévu de garder leur organisation habituelle, mais cette solution devient moins sûre si l’on tient compte du temps disponible. '+g+' Le service conseille plutôt de '+alt+'. '+cap(fact)+'. Cette précision est importante : elle permet de comparer les possibilités sur des critères concrets au lieu de choisir uniquement l’option qui paraît la plus rapide. '+cap(result)+'. Les personnes concernées sont invitées à vérifier les dernières informations avant leur déplacement.';
 else if(style===2)s=name+' raconte une situation récente à '+cityName+'. '+cap(issue)+'. Au début, '+pro+' pensait pouvoir '+goal+' sans modifier son programme. '+g+' Après avoir demandé des renseignements, '+name+' a envisagé de '+alt+'. '+cap(fact)+'. Le choix n’était pas évident, car la solution la plus simple sur le papier n’était pas forcément la plus pratique dans la réalité. '+cap(result)+'. Finalement, '+name+' a privilégié l’option qui laissait la meilleure marge et a prévenu les autres personnes concernées.';
 else s='Deux solutions sont possibles pour '+goal+' à '+where+', près de '+cityName+'. La première permet de changer le moins possible, mais '+issue+'. La seconde consiste à '+alt+'. '+cap(fact)+'. '+g+' Pour décider, '+name+' compare le temps, le coût, la facilité et le risque d’imprévu. '+cap(result)+'. '+name+' retient finalement la solution qui répond le mieux à la contrainte principale, même si elle demande un petit effort supplémentaire.';
 if(day>=11)s+=' Avant de conclure, la personne relit les conditions utiles et vérifie que la solution choisie reste compatible avec l’ensemble de la journée.';
 if(day>=19)s+=' Le document insiste aussi sur la différence entre une préférence personnelle et une contrainte objective : le choix peut varier selon les priorités, mais les horaires, les conditions et les conséquences doivent être vérifiés de la même manière.';
 if(day>=31)s+=' Un autre point complique la décision : toutes les personnes concernées n’accordent pas la même importance au confort, au prix et au temps. Pour comprendre le document, il faut donc distinguer les faits, les avis exprimés et la conclusion réellement justifiée.';
 return s}
function makeReading(old,p,day,slot,generation){const c=pickCase(p,day,slot,generation),pe=person(day,slot+(Number(generation)===181?1:0)),name=pe[0],cityName=city(day,slot+(Number(generation)===181?1:0)),text=readingBody(p,c,day,slot),issue=cap(c[3])+'.',solution=cap(c[4])+'.',detail=cap(c[5])+'.',result=cap(c[6])+'.',style=slot%4;
 const q1=[
  ['Pourquoi '+name+' écrit-il ou écrit-elle ce message ?','Parce qu’une contrainte l’oblige à vérifier une solution avant de confirmer.','Pour obtenir une réduction qui n’est jamais évoquée.','Pour annoncer qu’il ou elle renonce définitivement à son projet.'],
  ['Quel problème pratique le document cherche-t-il surtout à résoudre ?','Une organisation prévue devient moins adaptée à cause d’une contrainte précise.','Le lieu ferme définitivement et aucune solution n’existe.','La personne cherche seulement une information historique sans devoir agir.'],
  ['Pourquoi '+name+' raconte-t-il ou raconte-t-elle cette expérience ?','Pour expliquer comment une difficulté a conduit à modifier une décision.','Pour décrire un lieu sans raconter ce qui s’est passé.','Pour montrer qu’aucune vérification n’était nécessaire.'],
  ['Que compare principalement '+name+' avant de choisir ?','Les conséquences concrètes de deux solutions possibles.','Deux opinions sans rapport avec la situation.','Uniquement le prix, sans tenir compte des autres contraintes.']
 ][style];
 const q2=[
  ['Quel élément rend l’alternative réellement possible ?',detail,'Le fait que toutes les contraintes aient disparu.','Une promesse de remboursement qui n’est pas mentionnée.'],
  ['Quelle information change la manière d’évaluer les options ?',detail,'Une fermeture définitive du service.','Le souhait de ne consulter aucune information.'],
  ['Qu’est-ce qui permet à '+name+' d’envisager une autre organisation ?',detail,'L’absence totale de contrainte.','Une décision prise au hasard avant de se renseigner.'],
  ['Quel détail rend la seconde option plus intéressante ?',detail,'Le fait qu’elle ne demande aucune adaptation.','Un avantage financier qui n’apparaît pas dans le document.']
 ][style];
 const q3=day<19?[
  ['Pourquoi la décision finale est-elle cohérente ?',result,'Parce que la personne choisit toujours l’option la plus rapide.','Parce qu’elle ignore la difficulté de départ.'],
  ['Quelle réaction correspond le mieux aux informations du document ?',solution,'Annuler immédiatement sans vérifier.','Garder le plan initial même s’il ne répond plus aux contraintes.'],
  ['Qu’a fait '+name+' après avoir compris la difficulté ?',solution,'Il ou elle a cessé toute démarche.','Il ou elle a choisi sans comparer les possibilités.'],
  ['Quelle conclusion résume le mieux la décision ?',result,'Le premier choix était parfait et ne présentait aucun risque.','La personne refuse tout compromis même si la situation change.']
 ][style]:[
  ['Quelle conclusion est la mieux justifiée par le document ?',result,'Une préférence personnelle suffit toujours pour décider.','La solution la moins chère est nécessairement la meilleure.'],
  ['Que montre surtout la décision finale ?',result,'Les faits ont moins d’importance que les impressions.','Il vaut mieux conserver le premier choix, même quand les conditions changent.'],
  ['Que peut-on déduire de la manière dont '+name+' décide ?',result,'Il ou elle ne distingue pas les faits des préférences.','Il ou elle cherche une solution sans vérifier les conséquences.'],
  ['Pourquoi le choix final n’est-il pas présenté comme évident ?',result,'Parce qu’aucune information concrète n’est disponible.','Parce que les deux solutions sont exactement identiques.']
 ][style];
 const qs=[
  mc(old,1,q1[0],q1[1],q1[2],q1[3],'La première question porte sur la situation générale et le but du document.',day+slot+(generation||0)),
  mc(old,2,q2[0],q2[1],q2[2],q2[3],'Il faut relier cette réponse au détail qui modifie réellement la comparaison.',day+slot+7+(generation||0)),
  mc(old,3,q3[0],q3[1],q3[2],q3[3],'La bonne réponse doit rester cohérente avec la contrainte, la solution et la conséquence finale.',day+slot+13+(generation||0))
 ];return{...old,title:readTitle(c,cityName,slot),text,qs,quality189:{route:ROUTE,genre:['courriel','information pratique','témoignage','comparaison'][slot%4],day}}}
function listeningScript(p,c,day,slot){const pe=person(day,slot+2),name=pe[0],pro=pe[1],cityName=city(day,slot),goal=c[2],issue=c[3],alt=c[4],fact=c[5],result=c[6],g=grammarCue(p,name,pro,c);let s='';
 if(slot%4===0)s='— Bonjour, je vous appelle parce que je dois '+goal+' à '+cityName+'. — D’accord, qu’est-ce qui pose problème ? — '+cap(issue)+'. Je préfère vérifier avant de changer tout mon programme. — Dans ce cas, vous pouvez '+alt+'. — Est-ce que cette solution est vraiment plus pratique ? — '+cap(fact)+'. '+g+' — Très bien, je vais comparer une dernière fois et je vous confirme ma décision cet après-midi. — D’accord. '+cap(result)+'.';
 else if(slot%4===1)s='— '+name+', tu as trouvé une solution pour '+goal+' ? — Pas encore. '+cap(issue)+'. — Pourquoi ne pas '+alt+' ? — J’y ai pensé. '+cap(fact)+'. — Alors, regarde surtout la marge de temps et ce qui se passe si tu as du retard. — Oui, tu as raison. '+g+' Je vais vérifier les horaires puis prévenir les personnes concernées. — C’est plus prudent. '+cap(result)+'.';
 else if(slot%4===2)s='Bonjour à toutes et à tous. Voici une information utile pour les personnes qui souhaitent '+goal+' à '+cityName+'. Attention : '+issue+'. Une solution est possible : '+alt+'. '+cap(fact)+'. '+g+' Avant de vous déplacer, comparez bien les horaires et les conditions. '+cap(result)+'. Si votre situation est différente, vérifiez l’information auprès du service concerné avant de prendre une décision.';
 else s='— Premier point : comment peut-on '+goal+' ? — Le problème principal, c’est que '+issue+'. — On pourrait '+alt+'. — Oui, mais il faut tenir compte d’un autre élément : '+fact+'. — '+g+' — Donc, on ne choisit pas seulement l’option la plus rapide. On garde celle qui répond le mieux à la contrainte et on vérifie avant de confirmer. — D’accord. '+cap(result)+'.';
 if(day>=11)s+=' Avant de conclure, le locuteur reformule la contrainte principale et vérifie que la prochaine étape reste réaliste.';
 if(day>=31)s+=' Le locuteur précise enfin que plusieurs personnes n’ont pas les mêmes priorités; il distingue donc les faits vérifiés de ce qui relève d’une préférence. Il recommande aussi de reformuler la décision finale pour vérifier qu’elle répond bien au problème de départ.';
 return s}
function makeListening(old,p,day,slot,generation){const c=pickCase(p,day,slot,generation),script=listeningScript(p,c,day,slot),issue=cap(c[3])+'.',solution=cap(c[4])+'.',detail=cap(c[5])+'.',result=cap(c[6])+'.',style=slot%4;
 const q1=[
  ['Pourquoi la personne appelle-t-elle ?','Parce qu’une difficulté l’oblige à revoir son organisation avant de confirmer.','Parce que tout est déjà réglé et qu’aucune décision n’est nécessaire.','Parce qu’elle veut parler d’un sujet sans rapport avec la situation.'],
  ['Quel est le problème au début de la conversation ?',issue,'Le service a fermé définitivement.','La personne a déjà choisi sans aucune hésitation.'],
  ['Quel est le sujet principal de cette annonce ?',issue,'Une promotion commerciale sans rapport avec la situation.','Un événement ancien qui n’a aucune conséquence aujourd’hui.'],
  ['Pourquoi ce groupe discute-t-il de la situation ?',issue,'Parce qu’il veut supprimer toutes les options possibles.','Parce qu’aucune contrainte concrète n’a été identifiée.']
 ][style];
 const q2=[
  ['Quelle possibilité est proposée ?',solution,'Abandonner la démarche sans explication.','Attendre plusieurs mois sans vérifier aucune information.'],
  ['Quelle solution l’interlocuteur suggère-t-il ?',solution,'Conserver forcément le premier plan.','Décider immédiatement sans tenir compte du détail donné ensuite.'],
  ['Que conseille-t-on aux personnes concernées ?',solution,'Ignorer les horaires et les conditions.','Se déplacer avant même de vérifier l’information.'],
  ['Quelle option est mise sur la table pendant la discussion ?',solution,'Ne rien changer même si le problème persiste.','Reporter automatiquement toute décision à l’année suivante.']
 ][style];
 const q3=day<19?[
  ['Pourquoi cette solution peut-elle fonctionner ?',detail,'Parce que toutes les contraintes ont disparu.','Parce que le locuteur ne vérifie aucun détail.'],
  ['Pourquoi la personne accepte-t-elle de comparer encore ?',detail,'Parce qu’elle veut choisir au hasard.','Parce que la discussion n’a apporté aucune information utile.'],
  ['Quel détail faut-il vérifier avant d’agir ?',detail,'Un prix promotionnel qui n’est pas mentionné.','Une fermeture définitive qui n’est jamais annoncée.'],
  ['Sur quoi repose la décision finale ?',result,'Sur le refus d’écouter les autres possibilités.','Sur une préférence sans lien avec le problème initial.']
 ][style]:[
  ['Quelle attitude adopte finalement le locuteur ?',result,'Il refuse de distinguer les faits des préférences.','Il choisit uniquement pour aller plus vite.'],
  ['Que montre la fin de l’échange ?',result,'La personne considère tous les détails comme inutiles.','La personne refuse toute solution qui demande un compromis.'],
  ['Pourquoi le conseil final est-il prudent ?',result,'Parce qu’il demande de décider avant d’avoir les informations.','Parce qu’il suppose que toutes les situations sont identiques.'],
  ['Quelle conclusion le groupe retient-il ?',result,'Il faut choisir sans vérifier les conséquences.','La première idée doit toujours être conservée.']
 ][style];
 const qs=[
  mc(old,1,q1[0],q1[1],q1[2],q1[3],'Comme au DELF B1, la première question vérifie d’abord la compréhension générale.',day+slot+3+(generation||0)),
  mc(old,2,q2[0],q2[1],q2[2],q2[3],'La solution est formulée ou reformulée au milieu du document.',day+slot+9+(generation||0)),
  mc(old,3,q3[0],q3[1],q3[2],q3[3],'La réponse dépend de la fin du document et de la relation entre contrainte, détail et décision.',day+slot+15+(generation||0))
 ];return{...old,title:[c[0],'Conseil pratique : '+c[0].toLowerCase(),'Témoignage : '+c[0].toLowerCase(),'Discussion : '+c[0].toLowerCase()][slot%4],script,qs,quality189:{route:ROUTE,genre:['appel','conversation','annonce','réunion'][slot%4],day}}}
function visibleText(x,t){return [x.title,t==='reading'?x.text:x.script,...((x.qs||[]).flatMap(q=>[q[0],...(q[1]||[])]))].join(' ')}
const before=evidence(),stats={rewritten:{reading:0,listening:0},protected:{reading:0,listening:0},issues:[]},fingerprints={reading:new Map(),listening:new Map()};
for(const t of ['reading','listening']){
 for(const x of bank(t)){
  const z=parse(x);if(!z||z.type!==t||z.day<5||z.day>50)continue;
  if(locked(t,z.day,z.slot,x.id)){stats.protected[t]++;continue}
  const p=plan(z.day),fresh=t==='reading'?makeReading(x,p,z.day,z.slot,z.generation):makeListening(x,p,z.day,z.slot,z.generation);
  Object.assign(x,fresh);stats.rewritten[t]++;
  const v=visibleText(x,t);
  if(/Information\s*·|Message\s*·|Le dossier porte la référence|référence\s+\d{3}\b|traceId|sourceSeed|contentId|slot\s*\d|r(?:177|181)-d\d{2}-s\d{2}/i.test(v))stats.issues.push({id:x.id,reason:'developer-or-synthetic-marker'});
  const plain=String(t==='reading'?x.text:x.script).replace(/<[^>]+>/g,' ').trim(),words=plain.split(/\s+/).filter(Boolean).length,min=z.day<=10?90:z.day<=30?120:150;
  if(words<min)stats.issues.push({id:x.id,reason:'too-short',words,min});
  if(!Array.isArray(x.qs)||x.qs.length!==3)stats.issues.push({id:x.id,reason:'question-count'});
  const fp=String(t==='reading'?x.text:x.script).toLowerCase().replace(/\s+/g,' ').trim();if(fingerprints[t].has(fp))stats.issues.push({id:x.id,reason:'duplicate-content',other:fingerprints[t].get(fp)});else fingerprints[t].set(fp,x.id);
 }
}
if(before!==evidence())throw new Error('V1.8.14 input quality changed learning evidence');
if(stats.issues.length)throw new Error('V1.8.14 input quality audit failed: '+JSON.stringify(stats.issues.slice(0,8)));
const readingView189=readingView;
readingView=function(r){return String(readingView189(r)).replace(/<span class="pill blue">可用阶段 Day \d+\+<\/span>/g,'<span class="pill blue">今日阅读</span>')};
const listeningView189=listeningView;
listeningView=function(l){return String(listeningView189(l)).replace(/<span class="pill blue">可用阶段 Day \d+\+<\/span>/g,'<span class="pill blue">今日听力</span>')};
S.version=APP;
if(S.meta172){S.meta172.appVersion=APP;S.meta172.contentVersion=CONTENT;S.meta172.inputQuality=ROUTE;S.meta172.studentInputMetadata='hidden-v1'}
globalThis.__DELF50_INPUT_QUALITY={version:APP,contentVersion:CONTENT,route:ROUTE,stats};
if(typeof render==='function')render();
})();