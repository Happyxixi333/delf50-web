'use strict';
/* DELF50 · corpus-v200 · Day 4 (compléments) + Day 8–9
 *
 * Même contrat que content/corpus-v200.js : chaque document est rédigé
 * individuellement, sans squelette partagé ; les distracteurs sont tirés du texte
 * lui-même avec une condition, un sujet ou un moment modifié ; la bonne réponse
 * n'est jamais la copie littérale d'une phrase du texte.
 *
 * `src` renvoie vers une source publique réelle que l'apprenant peut consulter :
 * le texte du cours en reprend le genre, le registre et les faits, il n'en est pas
 * la reproduction. Les sources publiques françaises (service-public.fr, ameli.fr,
 * ADEME, INSEE, Météo-France) sont diffusées sous Licence Ouverte / Etalab 2.0.
 */
(function(){
var C = globalThis.__DELF50_CORPUS_V200 = globalThis.__DELF50_CORPUS_V200 || [];
var SP  = {label:'Service-Public.fr · DILA (Licence Ouverte 2.0)', url:'https://www.service-public.fr'};
var AME = {label:'Assurance Maladie · ameli.fr (Licence Ouverte 2.0)', url:'https://www.ameli.fr'};
var SNCF= {label:'SNCF Voyageurs · information trafic', url:'https://www.sncf-connect.com/aide/info-trafic'};
var MF  = {label:'Météo-France · vigilance', url:'https://vigilance.meteofrance.fr'};
var ADE = {label:'ADEME · Agence de la transition écologique (Licence Ouverte 2.0)', url:'https://www.ademe.fr'};
var FT  = {label:'France Travail (Licence Ouverte 2.0)', url:'https://www.francetravail.fr'};
var CUL = {label:'Ministère de la Culture (Licence Ouverte 2.0)', url:'https://www.culture.gouv.fr'};
var IDFM= {label:'Île-de-France Mobilités · info trafic', url:'https://www.iledefrance-mobilites.fr'};
var RFI = {label:'RFI · Journal en français facile (écoute authentique)', url:'https://francaisfacile.rfi.fr/fr/'};
var TV5 = {label:'TV5MONDE · Apprendre le français, exercices A2–B1', url:'https://apprendre.tv5monde.com/fr/exercices'};

C.push(

/* ======================= Day 4 · prépositions, depuis/pendant, fréquence ======================= */
{t:'r',d:4,s:1,genre:'règlement d’équipement municipal',domain:'piscine municipale',level:'A2',src:SP,
 title:'Piscine des Charmilles : horaires de la rentrée',
 text:"<b>PISCINE DES CHARMILLES — HORAIRES À PARTIR DU 15 SEPTEMBRE</b><br><br>Le bassin sportif est ouvert du lundi au vendredi de 7 h à 9 h et de 17 h à 20 h. Le mercredi, il ferme à 19 h pour laisser la place aux clubs.<br><br>Le bassin de loisirs, lui, n'ouvre que l'après-midi, sauf le samedi : ce jour-là, il accueille les familles dès 10 h.<br><br>Les cours d'aquagym ont lieu deux fois par semaine, le mardi et le jeudi soir. L'inscription se fait à l'accueil, pendant les heures d'ouverture, et non par téléphone.<br><br>La piscine reste fermée le dimanche depuis les travaux d'économie d'énergie.",
 qs:[
  ["Un nageur veut faire des longueurs le mercredi à 19 h 30. Est-ce possible ?",
   ["Non, le bassin sportif ferme plus tôt ce jour-là.","Oui, le bassin sportif ferme à 20 h tous les soirs.","Oui, mais seulement s'il est inscrit dans un club."],0,
   "周三 bassin sportif 提前到 19 h 关闭（« le mercredi, il ferme à 19 h »）。20 h 是其他工作日的时间；把泳池让给俱乐部说明的是提前关闭的原因，不是个人可以入场的条件。"],
  ["Quand une famille peut-elle utiliser le bassin de loisirs le matin ?",
   ["Le samedi uniquement.","Tous les jours à partir de 10 h.","Du lundi au vendredi avant 9 h."],0,
   "« n'ouvre que l'après-midi, sauf le samedi » —— sauf 引出唯一例外。7 h–9 h 是 bassin sportif 的时段，不是休闲池。"],
  ["Comment s'inscrit-on à l'aquagym ?",
   ["En se présentant à l'accueil aux heures d'ouverture.","En téléphonant le mardi ou le jeudi soir.","En s'inscrivant auprès d'un club le mercredi."],0,
   "文末明确 « et non par téléphone »。mardi/jeudi soir 是上课时间，不是报名方式。"]]},

{t:'r',d:4,s:2,genre:'annonce de colocation + message',domain:'colocation',level:'A2',src:SP,
 title:'Une chambre libre depuis juillet',
 text:"<b>Annonce</b> — Chambre de 12 m² dans un appartement partagé, rue Émile-Zola, au troisième étage sans ascenseur. Libre depuis le 1er juillet. 380 € par mois, charges comprises.<br><br><b>Message de la colocataire</b><br><br>« Bonjour, merci pour votre message. L'appartement est à dix minutes à pied de l'université et à cinq minutes du tramway. Nous faisons le ménage des parties communes une fois par semaine, le samedi matin, et nous nous partageons les courses.<br><br>Je peux vous faire visiter jeudi entre 18 h et 20 h. Si vous préférez le week-end, je ne suis là que le dimanche : je travaille tous les samedis pendant les vacances. »",
 qs:[
  ["Depuis combien de temps la chambre est-elle disponible, si on lit l'annonce en septembre ?",
   ["Environ deux mois.","Une semaine.","Depuis le début des vacances universitaires."],0,
   "libre depuis le 1er juillet → 到九月约两个月。depuis 表示起点，需要自己算时长。"],
  ["Quelle est la distance entre l'appartement et le tramway ?",
   ["Cinq minutes à pied.","Dix minutes à pied.","Trois étages."],0,
   "十分钟是到大学的距离；三层是楼层，属于同一段文字里的其他数字。"],
  ["Pourquoi la colocataire ne propose-t-elle pas de visite le samedi ?",
   ["Parce qu'elle travaille ce jour-là en période de vacances.","Parce que le ménage des parties communes occupe toute la journée.","Parce qu'elle n'est disponible qu'entre 18 h et 20 h."],0,
   "« je travaille tous les samedis pendant les vacances »。周六上午的大扫除是合租规则，不是她拒绝的理由；18–20 h 是周四的时段。"]]},

{t:'r',d:4,s:3,genre:'bulletin municipal',domain:'marché alimentaire',level:'A2',src:SP,
 title:'Le marché déplacé pendant les travaux de la place',
 text:"<b>VIE DE LA COMMUNE</b><br><br>La place du Général-Leclerc est en travaux depuis la fin du mois d'août. Pendant toute la durée du chantier, le marché du mercredi et du samedi s'installe sur le parking de la salle des fêtes, à trois cents mètres de là.<br><br>Les horaires ne changent pas : les commerçants s'installent à partir de 7 h et remballent à 13 h 30.<br><br>Le stationnement reste gratuit sur le parking les jours de marché, mais il est limité à deux heures le reste de la semaine.<br><br>Le marché reviendra sur la place au printemps, à la fin des travaux.",
 qs:[
  ["Où se tient le marché en ce moment ?",
   ["Sur le parking de la salle des fêtes.","Sur la place du Général-Leclerc.","À trois cents mètres de la salle des fêtes."],0,
   "第三项把距离的方向弄反了：三百米是从广场到停车场的距离。广场正在施工。"],
  ["Combien de fois par semaine le marché a-t-il lieu ?",
   ["Deux fois.","Une fois.","Tous les jours sauf le dimanche."],0,
   "« le marché du mercredi et du samedi » —— 两天。"],
  ["Un habitant se gare sur ce parking un mardi. Combien de temps peut-il rester ?",
   ["Deux heures au maximum.","Toute la journée, le stationnement y est gratuit.","Jusqu'à 13 h 30."],0,
   "周二不是集市日，因此适用 « limité à deux heures le reste de la semaine »。免费无限时只在集市日；13 h 30 是收摊时间。"]]},

{t:'r',d:4,s:4,genre:'fiche d’inscription à une formation',domain:'formation pour adultes',level:'A2',src:FT,
 title:'Cours du soir : ce qu’il faut savoir avant de s’inscrire',
 text:"<b>ATELIERS DU SOIR — INFORMATIONS PRATIQUES</b><br><br>Les ateliers d'informatique ont lieu deux soirs par semaine, le lundi et le jeudi, de 18 h 30 à 20 h. Chaque session dure pendant dix semaines.<br><br>L'inscription est ouverte depuis le 1er septembre et se termine quinze jours avant le début des cours. Les dossiers arrivés après cette date sont placés sur liste d'attente.<br><br>Une réunion d'information a lieu au centre social, salle 2, le premier mardi de chaque mois à 17 h.<br><br>En cas d'absence, prévenir le secrétariat par courriel au moins la veille. Trois absences non signalées entraînent la fin de l'inscription.",
 qs:[
  ["Combien de temps dure une session complète ?",
   ["Dix semaines.","Quinze jours.","Deux soirs."],0,
   "pendant dix semaines 才是整期时长。十五天是报名截止的提前量，两晚是每周的频率。"],
  ["Quand a lieu la réunion d'information ?",
   ["Le premier mardi du mois, à 17 h.","Le lundi et le jeudi, à 18 h 30.","Quinze jours avant le début des cours."],0,
   "周一和周四是上课时间；十五天前指的是报名截止。"],
  ["Que se passe-t-il si un participant manque un cours sans prévenir, pour la troisième fois ?",
   ["Son inscription prend fin.","Il est placé sur liste d'attente.","Il doit envoyer un courriel au secrétariat la veille."],0,
   "文末规定第三次未告知缺席即终止注册。liste d'attente 是报名过晚的后果；提前一天发邮件是应该做而没做的事。"]]},

{t:'l',d:4,s:1,genre:'message sur répondeur · cabinet médical',domain:'santé et rendez-vous',level:'A2',src:AME,
 title:'Report d’un rendez-vous chez le médecin',
 script:"Bonjour, ici le secrétariat du cabinet médical du docteur Berger. Je vous appelle au sujet de votre rendez-vous de mardi prochain, à 11 heures. Le docteur sera absent toute la semaine, nous devons donc le déplacer. Nous pouvons vous proposer le jeudi 12 à 9 h 15, ou bien le vendredi 13 en fin d'après-midi, vers 17 h 30. Merci de rappeler le secrétariat avant vendredi midi pour confirmer. Le cabinet est ouvert du lundi au vendredi, de 8 heures à 19 heures, et le samedi matin uniquement. N'oubliez pas votre carte Vitale. Bonne journée.",
 qs:[
  ["Pourquoi le secrétariat appelle-t-il ?",
   ["Parce que le médecin ne pourra pas assurer le rendez-vous prévu.","Parce que le patient a oublié sa carte Vitale.","Parce que le cabinet change ses horaires d'ouverture."],0,
   "原因是医生整周缺席。carte Vitale 只是结尾的提醒；开放时间是补充信息，不是打电话的原因。"],
  ["Quelles solutions sont proposées au patient ?",
   ["Deux nouvelles dates, l'une le matin, l'autre en fin de journée.","Un seul créneau, le jeudi 12 à 9 h 15.","Un rendez-vous le samedi matin."],0,
   "提供了周四上午和周五傍晚两个时段。周六上午只是开放时间说明，并未作为改约选项。"],
  ["Jusqu'à quand faut-il rappeler ?",
   ["Avant le milieu de la journée de vendredi.","Avant mardi 11 heures.","Avant 19 heures tous les jours."],0,
   "avant vendredi midi。周二 11 点是被取消的原约；19 点是诊所关门时间。"]]},

/* ======================= Day 8 · passé composé vs imparfait (récit) ======================= */
{t:'r',d:8,s:1,genre:'message sur un forum de copropriété',domain:'immeuble et ascenseur',level:'A2+',src:SP,
 title:'La panne du 6 janvier',
 text:"Je raconte, parce que plusieurs voisins m'ont posé la question.<br><br>Mardi dernier, il faisait très froid et il y avait déjà du monde dans le hall quand je suis descendue vers 8 heures. L'ascenseur ne bougeait plus. Personne ne comprenait ce qui se passait : la veille encore, il fonctionnait normalement.<br><br>J'ai appelé le numéro d'urgence affiché près des boîtes aux lettres. Le technicien est arrivé une heure et demie plus tard. Pendant qu'il travaillait, Mme Roux, qui habite au sixième et marche difficilement, attendait assise sur une chaise que quelqu'un lui avait apportée.<br><br>La panne venait d'une carte électronique. Le technicien l'a remplacée dans l'après-midi. Depuis, tout fonctionne, mais je propose qu'on affiche le numéro d'urgence à chaque étage.",
 qs:[
  ["Qu'est-ce qui montre que la panne n'était pas prévisible ?",
   ["L'ascenseur marchait encore normalement la veille.","Il faisait très froid ce matin-là.","Le technicien a mis une heure et demie à venir."],0,
   "imparfait « il fonctionnait normalement » 描述前一天的持续状态，说明故障突然。天气和维修人员到达用时都不是可预见性的证据。"],
  ["Que faisait Mme Roux pendant l'intervention ?",
   ["Elle patientait, assise, au rez-de-chaussée.","Elle descendait les six étages à pied.","Elle appelait le numéro d'urgence."],0,
   "« attendait assise sur une chaise »——imparfait 表示与维修同时进行的背景动作。打电话的是叙述者。"],
  ["Que demande l'auteure du message à la fin ?",
   ["Rendre le numéro d'urgence visible partout dans l'immeuble.","Remplacer la carte électronique une deuxième fois.","Installer une chaise à chaque étage."],0,
   "结尾提议把急修电话贴到每层。电路板已经换好；椅子是当天的临时办法，不是她的提议。"]]},

{t:'r',d:8,s:2,genre:'témoignage publié par une association de voyageurs',domain:'aéroport',level:'A2+',src:SP,
 title:'Douze heures d’attente à Roissy',
 text:"Nous devions partir à 6 h 40. À l'enregistrement, tout allait bien : l'avion était à l'heure et les passagers montaient déjà dans la navette.<br><br>Puis le pilote a annoncé un problème technique. Nous sommes redescendus et nous avons attendu dans la salle d'embarquement. Au début, la compagnie parlait d'une heure de retard. À midi, elle a distribué des bons pour le déjeuner. À 15 heures, elle a annoncé un départ le lendemain matin.<br><br>Ce qui m'a le plus surprise, ce n'est pas le retard lui-même : c'est que personne ne savait quoi nous dire. Les agents n'avaient pas d'information et répétaient qu'ils attendaient, eux aussi.<br><br>Nous sommes finalement partis le lendemain à 7 h 10. J'ai demandé une indemnisation le soir même.",
 qs:[
  ["Comment la situation a-t-elle évolué au cours de la journée ?",
   ["D'un retard annoncé court à un report au lendemain.","D'une annulation immédiate à un départ le soir même.","D'un problème de bagages à un problème technique."],0,
   "先说晚点一小时，中午发餐券，15 点宣布次日出发——逐步恶化。文中没有取消，也没有行李问题。"],
  ["Selon la voyageuse, quel a été le pire aspect de la journée ?",
   ["L'absence d'information de la part du personnel.","La longueur totale de l'attente.","La qualité du déjeuner offert."],0,
   "« Ce qui m'a le plus surprise, ce n'est pas le retard lui-même : c'est que personne ne savait quoi nous dire. » 明确排除了等待时长本身。"],
  ["Combien de temps s'est-il écoulé entre l'heure de départ prévue et le départ réel ?",
   ["Un peu plus de vingt-quatre heures.","Environ neuf heures.","Un peu moins de douze heures."],0,
   "原定 6 h 40，实际次日 7 h 10，相差 24 小时半。标题里的十二小时指的是在机场的等待，不是总延误。"]]},

{t:'r',d:8,s:3,genre:'fait divers de presse locale',domain:'circulation et vélo',level:'A2+',src:MF,
 title:'Une chute évitée rue des Tanneurs',
 text:"Jeudi matin, la pluie tombait depuis l'aube et la chaussée était glissante rue des Tanneurs. Vers 8 h 15, une cycliste qui descendait la rue a freiné brusquement : une camionnette sortait d'une cour sans visibilité.<br><br>La cycliste est tombée sur le côté, mais elle portait un casque et n'a pas été blessée. Le conducteur, qui ne l'avait pas vue, s'est arrêté immédiatement.<br><br>Des riverains signalent depuis plusieurs mois que la sortie de cette cour est dangereuse quand des voitures stationnent devant. La mairie a annoncé qu'elle installerait un miroir avant la fin du mois.<br><br>Les services techniques rappellent qu'un vélo a besoin d'une distance de freinage deux fois plus longue sur sol mouillé.",
 qs:[
  ["Pourquoi la cycliste a-t-elle freiné ?",
   ["Un véhicule débouchait d'une cour peu visible.","La chaussée était glissante depuis l'aube.","Des voitures stationnaient devant la sortie."],0,
   "刹车的直接原因是货车驶出。路滑是背景条件（imparfait），停放的车辆是居民反映的长期问题。"],
  ["Qu'est-ce qui a protégé la cycliste ?",
   ["Son casque.","Le miroir installé par la mairie.","L'arrêt immédiat du conducteur."],0,
   "« elle portait un casque et n'a pas été blessée »。镜子尚未安装；司机停车发生在摔倒之后。"],
  ["Quelle information technique le texte donne-t-il en conclusion ?",
   ["Il faut deux fois plus de distance pour s'arrêter sur une route mouillée.","Un miroir réduit de moitié le risque d'accident.","La vitesse des vélos double quand la rue descend."],0,
   "结尾只讲湿滑路面刹车距离加倍。另外两项把「加倍」这个数字挪到了文中没有提及的对象上。"]]},

{t:'r',d:8,s:4,genre:'compte rendu de réunion de quartier',domain:'coupure d’électricité',level:'A2+',src:ADE,
 title:'Retour sur la coupure de la semaine dernière',
 text:"<b>COMPTE RENDU — RÉUNION DU 14 NOVEMBRE</b><br><br>Une quinzaine d'habitants étaient présents.<br><br>Rappel des faits : l'électricité s'est coupée mercredi à 19 h 20 dans quatre rues du quartier. Beaucoup d'habitants préparaient le repas ou rentraient du travail à ce moment-là. Le courant est revenu à 22 h 40.<br><br>L'incident venait d'un câble endommagé pendant des travaux de voirie. Le distributeur a confirmé que la réparation avait été faite la nuit même.<br><br>Deux demandes sont ressorties de la réunion : que les habitants soient prévenus par message quand une coupure dure plus d'une heure, et que la liste des personnes fragiles du quartier soit tenue à jour avec la mairie.<br><br>Prochaine réunion : le 12 décembre.",
 qs:[
  ["Combien de temps la coupure a-t-elle duré ?",
   ["Un peu plus de trois heures.","Une heure environ.","Toute la nuit."],0,
   "19 h 20 到 22 h 40，约三小时二十分。一小时是他们希望触发通知的门槛；修复在当夜完成，但停电并未持续整夜。"],
  ["Quelle était l'origine de la panne ?",
   ["Un câble abîmé lors de travaux dans la rue.","Une consommation trop forte à l'heure du repas.","Un problème chez le distributeur d'électricité."],0,
   "文中说 câble endommagé pendant des travaux de voirie。做饭是停电时居民正在做的事，不是原因。"],
  ["Que demandent les habitants pour l'avenir ?",
   ["Être informés par message au-delà d'une certaine durée de coupure.","Que les travaux de voirie soient faits la nuit.","Que la réunion de quartier ait lieu chaque mois."],0,
   "两点诉求之一是超过一小时即短信通知。夜间施工是本次修复的做法，不是诉求。"]]},

{t:'l',d:8,s:1,genre:'message vocal à un collègue',domain:'travail et retard',level:'A2+',src:FT,
 title:'Je serai en retard à la réunion',
 script:"Salut Karim, c'est Lucie. Écoute, je suis désolée, je vais arriver en retard. J'étais déjà dans le bus quand le chauffeur nous a demandé de descendre : il y avait un accident un peu plus loin et la rue était bloquée. J'ai essayé de prendre le métro, mais la station la plus proche était fermée. Du coup, je marche. Je pense arriver vers 10 h 15, donc avec une bonne demi-heure de retard. Est-ce que tu peux commencer sans moi et garder la partie budget pour la fin ? J'avais préparé les chiffres hier soir, je les ai avec moi. Merci, à tout à l'heure.",
 qs:[
  ["Pour quelle raison Lucie a-t-elle dû descendre du bus ?",
   ["La circulation était interrompue à cause d'un accident.","Le bus est tombé en panne.","Elle voulait prendre le métro à la place."],0,
   "司机因前方事故封路请乘客下车。地铁是之后的替代方案，不是下车原因。"],
  ["Que demande-t-elle à Karim ?",
   ["De décaler le point sur le budget à la fin de la réunion.","De reporter la réunion à 10 h 15.","De préparer les chiffres à sa place."],0,
   "她请求把预算部分留到最后。数字她昨晚已经准备好并随身带着。"],
  ["Quelle est l'ampleur de son retard ?",
   ["Un peu plus de trente minutes.","Un quart d'heure.","Une heure et quart."],0,
   "« une bonne demi-heure de retard »。10 h 15 是她预计到达的时刻，不是迟到时长。"]]},

{t:'l',d:8,s:2,genre:'dialogue au bureau des objets trouvés',domain:'objets trouvés',level:'A2+',src:IDFM,
 title:'Un sac oublié dans le tramway',
 script:"— Bonjour, j'ai oublié un sac dans le tramway hier soir.\n— Bonjour. Sur quelle ligne, et vers quelle heure ?\n— La ligne B, vers 19 heures. Je descendais à Jean-Jaurès. Je lisais et je ne l'ai pas repris en sortant.\n— D'accord. Comment est-il ?\n— Un sac à dos gris, avec une étiquette rouge. Il y avait un ordinateur portable et un parapluie à l'intérieur.\n— Nous avons bien reçu un sac gris hier soir, mais sans ordinateur. Vous pouvez venir vérifier demain matin ? Le bureau ouvre à 9 heures, et il faudra une pièce d'identité.\n— Très bien, je viendrai. Merci beaucoup.",
 qs:[
  ["Dans quelles circonstances la personne a-t-elle oublié son sac ?",
   ["Elle était absorbée par sa lecture au moment de descendre.","Elle courait pour ne pas rater sa correspondance.","Elle avait posé le sac près de la porte."],0,
   "« Je lisais et je ne l'ai pas repris en sortant » —— imparfait 说明当时的状态。另外两项文中没有出现。"],
  ["Que dit l'employé au sujet du sac retrouvé ?",
   ["Il correspond à la description, sauf pour l'ordinateur.","Il a été retrouvé sur une autre ligne.","Il contient un parapluie et un ordinateur."],0,
   "« un sac gris hier soir, mais sans ordinateur » —— 关键在于 sauf。"],
  ["Que faut-il apporter pour récupérer le sac ?",
   ["Un document d'identité.","L'étiquette rouge du sac.","Un justificatif de trajet sur la ligne B."],0,
   "只提到 une pièce d'identité。红色标签是识别特征，不是要带的东西。"]]},

{t:'l',d:8,s:3,genre:'flash d’information radio',domain:'météo et réseau routier',level:'A2+',src:RFI,
 title:'Flash info : la neige perturbe les transports',
 script:"Il est 7 heures, voici les informations. La neige, qui tombait depuis la nuit dernière sur l'est du pays, a fortement perturbé les transports ce matin. Sur l'autoroute A36, les poids lourds ont été immobilisés pendant trois heures avant que la circulation ne reprenne, vers 6 heures. Dans les Vosges, une trentaine d'écoles resteront fermées aujourd'hui : les cars scolaires ne pouvaient pas assurer les ramassages. Météo-France maintient la vigilance orange jusqu'à midi, puis la lèvera dans l'après-midi. Les températures, qui étaient descendues à moins six degrés cette nuit, remonteront doucement demain.",
 qs:[
  ["Quelle est la situation sur l'autoroute A36 au moment du flash ?",
   ["La circulation a repris après plusieurs heures de blocage.","Les poids lourds sont encore immobilisés.","L'autoroute est fermée jusqu'à midi."],0,
   "« immobilisés pendant trois heures avant que la circulation ne reprenne, vers 6 heures » —— 播报时已恢复。中午是橙色预警的结束时间。"],
  ["Pourquoi des écoles sont-elles fermées ?",
   ["Le transport scolaire ne pouvait pas circuler.","Les bâtiments ne sont plus chauffés.","La vigilance orange interdit les cours."],0,
   "原因是校车无法接送。橙色预警本身并不强制停课。"],
  ["Que dit le bulletin sur les températures ?",
   ["Elles vont se relever à partir de demain.","Elles descendront à moins six degrés cet après-midi.","Elles resteront stables jusqu'à midi."],0,
   "零下六度是昨夜已经发生的最低值（plus-que-parfait « étaient descendues »），回升是明天的事。"]]},

{t:'l',d:8,s:4,genre:'conversation entre voisins',domain:'orage et jardin',level:'A2+',src:MF,
 title:'Après l’orage de dimanche',
 script:"— Vous avez vu le jardin, dimanche soir ?\n— Oui, j'étais sur le balcon quand l'orage a commencé. Le vent était déjà fort vers 18 heures, mais tout est arrivé d'un coup vers 19 h 30.\n— Chez moi, une branche est tombée sur la clôture. Heureusement, la voiture n'était pas là : je l'avais garée dans la rue le matin.\n— Nous, on n'a rien eu, mais le portail ne ferme plus très bien. Vous avez prévenu l'assurance ?\n— J'ai envoyé les photos lundi matin. L'expert doit passer jeudi. Et vous, vous attendez quoi pour appeler ?\n— Rien, je le fais aujourd'hui.",
 qs:[
  ["Pourquoi la voiture n'a-t-elle pas été endommagée ?",
   ["Elle avait été garée ailleurs le matin même.","Elle était protégée par la clôture.","Le vent est resté faible jusqu'à 19 h 30."],0,
   "plus-que-parfait « je l'avais garée dans la rue le matin » 说明车提前被停到别处。18 点风已经很大。"],
  ["Où en est le premier voisin dans ses démarches ?",
   ["Il a déjà transmis des photos et attend la visite d'un expert.","Il doit encore prévenir son assurance.","Il attend que le portail soit réparé."],0,
   "他周一发了照片，专家周四来。还没联系保险的是第二位邻居。"],
  ["Quel dégât le second voisin signale-t-il ?",
   ["Un portail qui ferme mal.","Une branche tombée sur sa clôture.","Un balcon abîmé par le vent."],0,
   "树枝砸到围栏是第一位邻居家的。第二位说 « on n'a rien eu, mais le portail ne ferme plus très bien »。"]]},

/* ======================= Day 9 · futur proche / futur simple ======================= */
{t:'r',d:9,s:1,genre:'programme culturel',domain:'festival de quartier',level:'A2+',src:CUL,
 title:'Ce que vous verrez aux Nuits de la Halle',
 text:"<b>LES NUITS DE LA HALLE — 3e ÉDITION</b><br><br>Le festival se tiendra du 12 au 15 juin, dans et autour de l'ancienne halle aux grains.<br><br>Cette année, la programmation changera sur un point important : les concerts commenceront plus tôt, à 19 h au lieu de 21 h, pour que les familles puissent rester jusqu'à la fin. Les spectacles de rue, eux, garderont leurs horaires habituels.<br><br>Nous allons aussi ouvrir un espace de restauration tenu par cinq producteurs du département. Il sera installé côté jardin, à l'écart de la scène principale, afin que l'on puisse discuter sans crier.<br><br>L'entrée restera gratuite le jeudi. Pour les trois autres soirées, les billets seront en vente en ligne à partir du 2 mai.",
 qs:[
  ["Quel changement principal l'édition de cette année apporte-t-elle ?",
   ["Les concerts auront lieu à une heure plus accessible aux familles.","Le festival durera quatre jours au lieu de trois.","Les spectacles de rue seront déplacés côté jardin."],0,
   "« les concerts commenceront plus tôt … pour que les familles puissent rester ». 街头演出保持原时间；côté jardin 是餐饮区的位置。"],
  ["Pourquoi l'espace de restauration sera-t-il installé loin de la scène ?",
   ["Pour permettre aux visiteurs de se parler normalement.","Pour laisser plus de place aux spectacles de rue.","Parce que les producteurs arriveront après les concerts."],0,
   "« afin que l'on puisse discuter sans crier » 是明确的目的。"],
  ["Comment se procure-t-on une entrée pour la soirée du samedi ?",
   ["En achetant un billet en ligne à partir du 2 mai.","En entrant librement, comme les autres soirs.","En réservant auprès des producteurs du département."],0,
   "只有周四免费；其余三晚需要 5 月 2 日起线上购票。生产者负责餐饮，不售票。"]]},

{t:'r',d:9,s:2,genre:'lettre d’information de bailleur',domain:'rénovation de logement',level:'A2+',src:ADE,
 title:'Vos fenêtres seront changées cet automne',
 text:"Madame, Monsieur,<br><br>Nous vous informons que les fenêtres de votre immeuble vont être remplacées entre le 6 octobre et le 21 novembre.<br><br>Une entreprise interviendra appartement par appartement. Chaque logement sera concerné pendant une seule journée, de 8 h à 17 h environ. Vous recevrez la date exacte quinze jours à l'avance, par courrier.<br><br>Il faudra dégager l'espace devant chaque fenêtre et retirer les rideaux la veille. Si vous ne pouvez pas être présent, vous pourrez confier vos clés à une personne de confiance, en le signalant au gardien.<br><br>Après les travaux, vos factures de chauffage devraient baisser de façon sensible : les nouvelles fenêtres isolent nettement mieux que celles installées en 1978.",
 qs:[
  ["Combien de temps les travaux dureront-ils dans un appartement donné ?",
   ["Une journée.","Environ six semaines.","Quinze jours, le temps du préavis."],0,
   "六周多是整栋楼的工期；十五天是提前通知的时间；单套住宅只需一天。"],
  ["Que doit faire un locataire absent le jour de l'intervention ?",
   ["Laisser ses clés à quelqu'un et en informer le gardien.","Reporter l'intervention à une autre date.","Retirer les rideaux le jour même."],0,
   "文中给出的唯一办法是委托可信的人并告知门房。窗帘要在前一天取下。"],
  ["Quel effet le bailleur annonce-t-il après les travaux ?",
   ["Une baisse notable du coût du chauffage.","Une hausse du loyer à partir de novembre.","Un meilleur éclairage des logements."],0,
   "信里只提到取暖费用下降，因为新窗保温更好。租金和采光都没有提到。"]]},

{t:'r',d:9,s:3,genre:'article d’information sur un projet de transport',domain:'nouvelle ligne de bus',level:'A2+',src:IDFM,
 title:'La ligne 9 desservira enfin l’hôpital',
 text:"À partir du 1er septembre prochain, la ligne de bus 9 sera prolongée jusqu'à l'hôpital nord. Aujourd'hui, les usagers qui vont à l'hôpital doivent descendre au terminus actuel puis marcher une quinzaine de minutes, ou changer pour la ligne 14.<br><br>Avec le prolongement, un bus passera toutes les douze minutes en semaine, et toutes les vingt minutes le week-end. La fréquence actuelle, elle, ne changera pas sur le reste du parcours.<br><br>Trois nouveaux arrêts seront créés : rue des Peupliers, place de la Fontaine et hôpital nord.<br><br>Le prolongement s'accompagnera d'une révision des horaires du soir : le dernier départ aura lieu à 23 h 10, soit quarante minutes plus tard qu'aujourd'hui.",
 qs:[
  ["Que doivent faire aujourd'hui les usagers qui se rendent à l'hôpital ?",
   ["Terminer à pied ou prendre une correspondance.","Attendre un bus toutes les douze minutes.","Descendre place de la Fontaine."],0,
   "现状是步行十五分钟或换乘 14 路。十二分钟一班是延长后的班次；Fontaine 站尚未建成。"],
  ["Qu'est-ce qui restera identique après le prolongement ?",
   ["La fréquence sur la partie existante de la ligne.","L'heure du dernier départ.","Le nombre d'arrêts de la ligne."],0,
   "« La fréquence actuelle, elle, ne changera pas sur le reste du parcours »。末班车推迟四十分钟，站点增加三个。"],
  ["À quelle heure part actuellement le dernier bus ?",
   ["À 22 h 30.","À 23 h 10.","À 23 h 50."],0,
   "延长后为 23 h 10，比现在晚四十分钟，因此现在是 22 h 30。这一题需要做减法。"]]},

{t:'r',d:9,s:4,genre:'fiche d’orientation professionnelle',domain:'projet de formation',level:'A2+',src:FT,
 title:'Reprendre des études après trente ans : par où commencer',
 text:"<b>PRÉPARER SON PROJET — ÉTAPE PAR ÉTAPE</b><br><br>Vous envisagez une formation longue ? Ne commencez pas par choisir une école : commencez par le métier visé.<br><br><b>1.</b> Vous ferez d'abord le point sur vos acquis. Un conseiller vous recevra pour un entretien d'une heure ; il examinera votre expérience et vos diplômes.<br><br><b>2.</b> Vous rencontrerez ensuite deux ou trois professionnels du métier. Cette étape, souvent négligée, évite bien des erreurs : beaucoup de candidats découvrent à ce moment-là que le métier ne correspond pas à l'idée qu'ils s'en faisaient.<br><br><b>3.</b> Vous étudierez enfin le financement. Selon votre situation, la formation pourra être prise en charge en totalité ou en partie.<br><br>Comptez trois à six mois entre le premier entretien et l'entrée en formation.",
 qs:[
  ["Par quoi la fiche conseille-t-elle de commencer ?",
   ["Par une réflexion sur le métier plutôt que sur l'établissement.","Par la recherche d'un financement.","Par la rencontre de professionnels du secteur."],0,
   "开头明确：« Ne commencez pas par choisir une école : commencez par le métier visé. » 资金是第三步，见面是第二步。"],
  ["Pourquoi la deuxième étape est-elle présentée comme importante ?",
   ["Parce qu'elle confronte l'image du métier à la réalité.","Parce qu'elle permet de trouver un employeur.","Parce qu'elle raccourcit la durée de la formation."],0,
   "文中说很多人正是在这一步发现职业与自己的想象不同。找雇主和缩短学时都没有提到。"],
  ["Combien de temps faut-il prévoir avant d'entrer en formation ?",
   ["De trois à six mois.","Une heure d'entretien.","Deux à trois rencontres."],0,
   "一小时是访谈时长，两三次是见面次数。整体准备期是三到六个月。"]]},

{t:'l',d:9,s:1,genre:'appel téléphonique associatif',domain:'organisation d’un événement',level:'A2+',src:CUL,
 title:'On va manquer de bénévoles samedi',
 script:"— Allô, Sonia ? C'est Marc, pour la brocante de samedi.\n— Oui, je t'écoute.\n— On a un problème : deux bénévoles se sont désistés. On ne sera que six pour installer les tables.\n— À quelle heure vous commencez ?\n— À 6 heures. Normalement, on aura fini vers 8 heures, mais à six personnes ça prendra plus longtemps.\n— Je vais demander à mon frère, il est libre samedi matin. Et je passerai vers 6 h 30, je ne peux pas plus tôt.\n— Parfait. Si ton frère vient, on tiendra les horaires. Je t'enverrai le plan des emplacements ce soir, comme ça vous saurez où poser quoi.\n— D'accord, à samedi.",
 qs:[
  ["Quel est le problème que Marc signale ?",
   ["L'équipe d'installation est réduite de deux personnes.","La brocante commence plus tôt que prévu.","Le plan des emplacements n'est pas prêt."],0,
   "两名志愿者退出，只剩六人。摆摊图当晚会发出，不是问题所在。"],
  ["Que propose Sonia ?",
   ["Recruter une personne de sa famille et venir un peu plus tard.","Venir dès 6 heures avec son frère.","Reporter l'installation à 8 heures."],0,
   "她说找弟弟／哥哥来，自己 6 h 30 到——« je ne peux pas plus tôt »。8 点是预计完成时间。"],
  ["À quelle condition l'installation sera-t-elle terminée à l'heure ?",
   ["Si une personne supplémentaire vient aider.","Si Marc envoie le plan avant samedi.","Si tout le monde arrive à 6 h 30."],0,
   "« Si ton frère vient, on tiendra les horaires » —— 条件是多来一个人。"]]},

{t:'l',d:9,s:2,genre:'annonce de chantier diffusée aux habitants',domain:'travaux de voirie',level:'A2+',src:SP,
 title:'Trois semaines de travaux rue Pasteur',
 script:"Bonjour à tous. Nous vous informons du calendrier des travaux rue Pasteur. Le chantier commencera lundi prochain et durera environ trois semaines. Pendant la première semaine, la rue restera ouverte à la circulation dans un seul sens, vers le centre. À partir de la deuxième semaine, elle sera complètement fermée aux voitures ; les piétons pourront toujours passer sur le trottoir de droite. La collecte des poubelles ne changera pas de jour, mais les bacs devront être sortis au coin de la rue, et non devant les immeubles. Nous ferons le point avec vous lors d'une réunion publique, le jeudi de la deuxième semaine, à 18 h 30, à la mairie.",
 qs:[
  ["Quelle sera la situation de la rue pendant la deuxième semaine ?",
   ["Fermée aux voitures, mais accessible à pied.","Ouverte dans un seul sens vers le centre.","Fermée à la circulation et aux piétons."],0,
   "第二周起对机动车全封闭，行人仍可走右侧人行道。单向通行是第一周的安排。"],
  ["Qu'est-ce qui change pour les ordures ménagères ?",
   ["L'endroit où déposer les bacs.","Le jour de la collecte.","La fréquence du ramassage."],0,
   "« La collecte ne changera pas de jour, mais les bacs devront être sortis au coin de la rue »——变的是地点。"],
  ["Quand aura lieu la réunion publique ?",
   ["Le jeudi de la deuxième semaine du chantier.","Lundi prochain, avant le début des travaux.","À la fin des trois semaines."],0,
   "公告给出的是第二周的周四 18 h 30。"]]},

{t:'l',d:9,s:3,genre:'interview radio d’un responsable sportif',domain:'club sportif',level:'A2+',src:TV5,
 title:'Un nouveau gymnase pour la saison prochaine',
 script:"— Vous ouvrirez donc un second gymnase en septembre ?\n— Oui. Aujourd'hui, nous refusons chaque année une centaine d'inscriptions, faute de créneaux. Avec la nouvelle salle, nous pourrons accueillir environ deux cents adhérents de plus.\n— Cela va-t-il changer les tarifs ?\n— Non, la cotisation restera au même niveau la première année. Nous verrons ensuite.\n— Et pour les entraîneurs ?\n— Nous allons recruter deux éducateurs à temps plein. C'est le point le plus délicat : les profils que nous cherchons sont rares dans la région.\n— Vous êtes donc confiant ?\n— Prudent, plutôt. Le bâtiment sera prêt, j'en suis sûr. C'est l'équipe encadrante qui décidera de la réussite du projet.",
 qs:[
  ["Quel problème le nouveau gymnase doit-il résoudre ?",
   ["Le club ne peut pas accepter tous les candidats.","Les cotisations sont devenues trop élevées.","Le bâtiment actuel ne sera pas prêt à temps."],0,
   "每年因场地时段不足拒绝约一百人。会费不变，建筑他有把握。"],
  ["Quelle est la principale inquiétude du responsable ?",
   ["Trouver les encadrants qualifiés dont le club a besoin.","Terminer la construction avant septembre.","Maintenir le niveau des cotisations."],0,
   "« C'est le point le plus délicat : les profils que nous cherchons sont rares. » 他对建筑有信心。"],
  ["Comment décrit-il son état d'esprit ?",
   ["Prudent plutôt que confiant.","Confiant et sans réserve.","Inquiet pour le financement."],0,
   "记者说 confiant，他纠正为 « Prudent, plutôt »。资金问题没有提到。"]]},

{t:'l',d:9,s:4,genre:'message familial',domain:'organisation familiale',level:'A2+',src:RFI,
 title:'Le programme du week-end prolongé',
 script:"Coucou, c'est maman. Alors, pour le week-end de mai : on partira vendredi en fin d'après-midi, dès que ton frère aura fini ses cours, donc vers 17 heures. On dormira chez ta tante samedi et dimanche, et on rentrera lundi dans la journée. Ton père voulait partir jeudi soir, mais il travaille finalement jeudi jusqu'à 20 heures, donc ce ne sera pas possible. Pense à réserver ton billet de train pour nous rejoindre : plus tu attendras, plus ce sera cher. Ah, et ta tante demande si tu manges du poisson, elle prévoit le repas de samedi. Rappelle-moi ce soir si tu peux. Bisous.",
 qs:[
  ["Pourquoi le départ n'aura-t-il pas lieu jeudi soir ?",
   ["Le père travaille tard ce soir-là.","Le frère a cours jeudi jusqu'à 17 heures.","La tante n'est disponible qu'à partir de samedi."],0,
   "父亲周四工作到 20 点。弟弟／哥哥的课是周五 17 点结束。"],
  ["Quel conseil la mère donne-t-elle au sujet du train ?",
   ["Réserver rapidement, car le prix augmente avec le temps.","Prendre un billet pour lundi dans la journée.","Voyager avec son frère vendredi."],0,
   "« plus tu attendras, plus ce sera cher »。周一是全家返程的时间。"],
  ["Quelle question la tante pose-t-elle ?",
   ["Elle veut savoir s'il y a un aliment à éviter pour samedi.","Elle demande à quelle heure la famille arrivera.","Elle propose de préparer tous les repas du week-end."],0,
   "她只问是否吃鱼，用于安排周六那一餐。"]]}

);
})();
