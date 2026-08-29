'use strict';
/* DELF50 · corpus-v200 · 逐篇独立编写的学习材料
 *
 * 设计约束（与生成式题库的根本区别）：
 *   1. 每一篇都是独立撰写的完整文本，不存在共享骨架、不存在字段替换。
 *   2. 同一天的阅读与听力主题域互不重叠。
 *   3. 干扰项全部取自本文可见信息，但条件、主体或时间被改动；不使用全局共用干扰项。
 *   4. 题型按篇轮换：主旨/目的、细节定位、因果、推断、态度、数值比较。
 *   5. 语法负载与 curriculum-v17 当日 focus 对齐（Day4 介词与时间；Day5 PC avoir；
 *      Day6 PC être + accord；Day7 imparfait）。
 *   6. 来源如实标注：kind='original'，calibration 说明按什么校准，不挂靠任何具体文章 URL。
 *
 * 覆盖范围（本批）：Day 4 听力 s02–s04；Day 5–7 阅读 s01–s04、听力 s01–s04。
 * 未覆盖的日期与模块由既有内容层保留，不受本文件影响。
 *
 * 字段：t = r|l（阅读/听力），d = 日，s = 槽位（1 起，与 content id 中的 sNN 一致）
 * qs = [题干, [选项], 正确项下标, 中文解析]
 */
globalThis.__DELF50_CORPUS_V200 = [

/* ============================ Day 4 · 介词、时间、行程 ============================ */
{t:'l',d:4,s:2,genre:'annonce en gare',domain:'transport',level:'A2',
 title:'Retard du TER et changement de voie',
 script:"Mesdames et messieurs, votre attention s'il vous plaît. Le TER numéro 8412 à destination de Rennes, prévu à 14 h 20, partira avec un retard d'environ vingt minutes. Ce train partira exceptionnellement voie 3, et non voie 1. Les voyageurs qui doivent prendre une correspondance à Saint-Brieuc sont invités à se présenter au guichet d'information, situé près de la sortie principale. Le guichet reste ouvert jusqu'à 19 heures. Nous vous remercions de votre compréhension.",
 qs:[
  ["Quel changement l'annonce indique-t-elle, en plus du retard ?",
   ["Le train partira voie 3 au lieu de la voie 1.","Le train est supprimé jusqu'à 19 heures.","La destination du train devient Saint-Brieuc."],0,
   "公告先说明晚点，再说明站台变更。Saint-Brieuc 是换乘站而非终点。"],
  ["De combien de temps le train est-il retardé ?",
   ["D'environ vingt minutes.","De quarante minutes exactement.","Il partira à l'heure prévue, 14 h 20."],0,
   "environ vingt minutes 是唯一给出的时长；14 h 20 是原定发车时间。"],
  ["Que doivent faire les voyageurs qui ont une correspondance ?",
   ["Aller au guichet d'information près de la sortie principale.","Attendre sur la voie 1 jusqu'à 19 heures.","Prendre un autre train vers Rennes."],0,
   "19 heures 是柜台关闭时间，不是等待要求。"]]},

{t:'l',d:4,s:3,genre:'message vocal · service public',domain:'médiathèque',level:'A2',
 title:'Horaires d\'été et réservation',
 script:"Bonjour, ici la médiathèque des Trois-Ponts. Nous vous appelons au sujet de votre carte, valable depuis le 3 mars. Pendant tout le mois d'août, la médiathèque ouvre seulement l'après-midi, de 14 heures à 18 heures, sauf le dimanche. Le livre que vous avez réservé est arrivé ; nous le gardons pendant dix jours. Si vous ne pouvez pas passer avant le 20 août, rappelez-nous et nous prolongerons la réservation. Bonne journée.",
 qs:[
  ["Quand la médiathèque est-elle ouverte au mois d'août ?",
   ["L'après-midi seulement, sauf le dimanche.","Tous les jours de 14 h à 18 h, dimanche compris.","Le matin et l'après-midi jusqu'au 20 août."],0,
   "sauf le dimanche 是关键限定；20 août 指的是取书期限，不是开放期限。"],
  ["Pendant combien de temps le livre est-il gardé ?",
   ["Dix jours.","Depuis le 3 mars.","Jusqu'à la fin du mois d'août."],0,
   "注意 depuis（起点）与 pendant（时长）的区别：3 mars 是借书证生效日。"],
  ["Que faut-il faire pour garder la réservation plus longtemps ?",
   ["Rappeler la médiathèque.","Venir un dimanche après-midi.","Réserver un second livre avant le 20 août."],0,
   "留言明确给出唯一办法：rappelez-nous。"]]},

{t:'l',d:4,s:4,genre:'dialogue au guichet',domain:'abonnement transport',level:'A2',
 title:'Abonnement de tramway et zones',
 script:"— Bonjour, je voudrais un abonnement pour le tramway.\n— Bien sûr. Vous habitez dans quelle zone ?\n— À Villeneuve, zone 2. J'y habite depuis septembre.\n— Alors l'abonnement mensuel coûte 38 euros pour les zones 1 et 2. Il est valable pendant trente jours à partir de la première utilisation, pas à partir de l'achat.\n— Et si je voyage une fois en zone 3 ?\n— Vous prenez un complément à 1,80 euro au distributeur, avant de monter.",
 qs:[
  ["À partir de quel moment l'abonnement devient-il valable ?",
   ["À partir de la première utilisation.","À partir du jour de l'achat.","À partir du mois de septembre."],0,
   "工作人员特意区分了 première utilisation 与 achat；septembre 是住址起始时间。"],
  ["Que doit faire le voyageur pour aller en zone 3 ?",
   ["Acheter un complément avant de monter.","Payer 38 euros supplémentaires.","Changer d'abonnement tous les trente jours."],0,
   "complément 1,80 € 是唯一提到的解决办法。"],
  ["Depuis quand cette personne habite-t-elle à Villeneuve ?",
   ["Depuis septembre.","Pendant trente jours.","Depuis la première utilisation de son abonnement."],0,
   "本题直接考 depuis + 时间点；trente jours 属于 pendant 结构。"]]},

/* ============================ Day 5 · Passé composé avec avoir ============================ */
{t:'r',d:5,s:1,genre:'courriel amical',domain:'déménagement',level:'A2',
 title:'Enfin installée',
 text:"<b>Objet : enfin installée !</b><br><br>Salut Théo,<br><br>Je n'ai pas répondu plus tôt : samedi, j'ai déménagé. Nous avons commencé à huit heures et nous avons fini beaucoup plus tard que prévu. Le camion a eu un problème de portière, alors nous avons perdu presque deux heures. Heureusement, Sarah a apporté à manger et son frère a porté les meubles lourds avec moi.<br><br>J'ai déjà rangé la cuisine, mais je n'ai pas encore ouvert la moitié des cartons. J'ai gardé ton livre, ne t'inquiète pas.<br><br>Tu passes dimanche ?<br>Léna",
 qs:[
  ["Pourquoi Léna écrit-elle ce message ?",
   ["Pour expliquer son silence et raconter son déménagement.","Pour demander à Théo de venir porter les meubles.","Pour s'excuser d'avoir perdu son livre."],0,
   "开头 « Je n'ai pas répondu plus tôt » 说明写信目的；书是保管着的，不是弄丢了。"],
  ["Pourquoi le déménagement a-t-il duré plus longtemps que prévu ?",
   ["À cause d'un problème sur le camion.","Parce que Sarah est arrivée en retard.","Parce qu'ils ont commencé trop tard le matin."],0,
   "文中原因唯一：problème de portière；八点开始并不晚。"],
  ["Qu'est-ce que Léna n'a pas encore terminé ?",
   ["Le rangement d'une partie des cartons.","Le rangement de la cuisine.","La lecture du livre de Théo."],0,
   "对比 « J'ai déjà rangé la cuisine » 与 « je n'ai pas encore ouvert la moitié des cartons »。"]]},

{t:'r',d:5,s:2,genre:'brève de presse locale',domain:'vie de quartier',level:'A2',
 title:'Braderie : une fréquentation en hausse',
 text:"<b>Braderie : une fréquentation en hausse</b><br><br>La braderie du quartier Saint-Martin a fermé ses portes dimanche soir. Les organisateurs ont compté environ 4 000 visiteurs, contre 3 200 l'an dernier. Les quatre-vingts exposants ont surtout vendu des vêtements et des livres d'occasion.<br><br>La pluie du matin a ralenti le début de la journée, mais l'après-midi a été très animé. Le comité de quartier a annoncé que les bénéfices financeront deux ateliers de réparation de vélos. La prochaine édition aura lieu le premier dimanche de septembre.",
 qs:[
  ["Quelle information montre que l'édition a mieux marché que la précédente ?",
   ["Le nombre de visiteurs a augmenté.","Le nombre d'exposants a doublé.","La braderie a duré une journée de plus."],0,
   "4 000 对 3 200 是唯一的同比数据；exposants 数量没有比较对象。"],
  ["À quoi servira l'argent récolté ?",
   ["À financer deux ateliers de réparation de vélos.","À payer les quatre-vingts exposants.","À organiser une édition supplémentaire en septembre."],0,
   "septembre 是下一届日期，不是资金用途。"],
  ["Quel a été l'effet de la pluie ?",
   ["Elle a ralenti le début de la journée.","Elle a fait annuler l'après-midi.","Elle a fait baisser la fréquentation totale."],0,
   "文中说 l'après-midi a été très animé，且总人数上升。"]]},

{t:'r',d:5,s:3,genre:'avis en ligne',domain:'loisirs',level:'A2',
 title:'Atelier « pâtes fraîches » — avis de Camille B.',
 text:"<b>★★★★☆ Atelier « pâtes fraîches » — Camille B.</b><br><br>J'ai offert cet atelier à ma sœur pour son anniversaire et nous l'avons suivi ensemble samedi matin. Nous avons préparé trois sortes de pâtes et nous avons tout emporté à la maison. Le chef a expliqué chaque étape lentement, ce que j'ai beaucoup apprécié : je n'avais jamais cuisiné de pâtes fraîches.<br><br>Un seul point négatif : nous avons attendu vingt minutes au début, parce que le groupe précédent a fini en retard. Pour le reste, j'ai trouvé le prix correct et j'ai déjà réservé l'atelier « sauces ».",
 qs:[
  ["Quelle est l'opinion générale de Camille ?",
   ["Positive, malgré un problème d'organisation.","Négative, surtout à cause du prix.","Neutre : elle ne se prononce pas."],0,
   "四星、prix correct、已订下一场，均指向正面评价；负面只涉及等待。"],
  ["Pourquoi l'atelier a-t-il commencé en retard ?",
   ["Parce que le groupe précédent a terminé tard.","Parce que Camille et sa sœur sont arrivées en retard.","Parce que le chef parlait trop lentement."],0,
   "lentement 是被表扬的优点，不是延误原因。"],
  ["Qu'a fait Camille après l'atelier ?",
   ["Elle a réservé un autre atelier.","Elle a offert un second atelier à sa sœur.","Elle a demandé un remboursement partiel."],0,
   "réservé l'atelier « sauces » 是为自己预订，文中未提再次赠送。"]]},

{t:'r',d:5,s:4,genre:'compte rendu associatif',domain:'vie associative',level:'A2',
 title:'Compte rendu — assemblée du club de randonnée',
 text:"<b>Compte rendu — assemblée du club de randonnée</b><br><br><b>Bilan de la saison.</b> Nous avons organisé 22 sorties, soit trois de plus que l'an passé. Nous avons accueilli 41 nouveaux membres, surtout des débutants. Deux sorties n'ont pas eu lieu : nous avons préféré reporter à cause du vent.<br><br><b>Matériel.</b> Nous avons acheté six paires de bâtons et nous avons réparé la remorque.<br><br><b>Difficultés.</b> Nous n'avons pas trouvé assez de volontaires pour encadrer les sorties du dimanche matin. Le bureau a donc décidé de proposer une formation courte en octobre.",
 qs:[
  ["Combien de sorties le club avait-il organisées l'an passé ?",
   ["Dix-neuf.","Vingt-deux.","Quarante et une."],0,
   "22 减去 « trois de plus » 得 19；22 是本季数字，41 是新会员数。"],
  ["Pourquoi deux sorties n'ont-elles pas eu lieu ?",
   ["À cause du vent.","Parce qu'il manquait des encadrants.","Parce que la remorque était cassée."],0,
   "缺志愿者是周日早晨的问题，与这两次取消无关；拖车已修好。"],
  ["Quelle solution le bureau propose-t-il au manque d'encadrants ?",
   ["Organiser une formation courte.","Supprimer les sorties du dimanche.","Acheter davantage de matériel."],0,
   "文中唯一决定是 une formation courte en octobre。"]]},

{t:'l',d:5,s:1,genre:'message vocal',domain:'musique',level:'A2',
 title:'Le concert d\'hier soir',
 script:"Salut, c'est Malik. Alors, hier soir, j'ai enfin vu le groupe dont je t'ai parlé. J'ai attendu presque une heure devant la salle, mais ça valait le coup. Ils ont joué pendant deux heures et ils ont fait trois rappels. J'ai pris des photos, mais je les ai toutes ratées. Ah, et j'ai croisé Inès à l'entrée : elle a acheté deux places pour le concert de novembre. Si tu veux venir, préviens-la vite, parce qu'elle a déjà proposé la deuxième place à quelqu'un d'autre.",
 qs:[
  ["Pourquoi Malik laisse-t-il ce message ?",
   ["Pour raconter le concert et transmettre une information sur des places.","Pour demander à son ami de lui envoyer des photos.","Pour proposer d'attendre ensemble devant la salle."],0,
   "留言含两个功能：叙述 + 传递 Inès 的信息。"],
  ["Que faut-il faire pour obtenir la place de novembre ?",
   ["Contacter Inès rapidement.","Acheter deux places avant novembre.","Demander un rappel à la salle de concert."],0,
   "« préviens-la vite » 是明确指令；rappels 在此指返场，不是回电。"],
  ["Qu'est-ce qui n'a pas réussi à Malik ?",
   ["Ses photos.","Le nombre de rappels du groupe.","La durée du concert."],0,
   "他明确说 « je les ai toutes ratées »。"]]},

{t:'l',d:5,s:2,genre:'interview radio',domain:'commerce de proximité',level:'A2',
 title:'Un boulanger a changé ses horaires',
 script:"— Ce matin, nous recevons Karim Belaïd, boulanger à Nevers. Karim, vous avez changé vos horaires cette année.\n— Oui. En février, j'ai décidé d'ouvrir à six heures trente au lieu de cinq heures.\n— Pourquoi ?\n— J'ai perdu deux employés en janvier et je n'ai trouvé aucun remplaçant. J'ai préféré réduire les horaires plutôt que baisser la qualité.\n— Et les clients ?\n— Ils ont mieux réagi que je ne l'avais imaginé. J'ai expliqué la situation sur une affiche et presque personne n'a protesté.",
 qs:[
  ["Quelle décision Karim a-t-il prise ?",
   ["Ouvrir plus tard qu'avant.","Fermer sa boulangerie pendant l'hiver.","Réduire la qualité pour garder ses horaires."],0,
   "他明确拒绝了第三个选项：« plutôt que baisser la qualité »。"],
  ["Quelle est la cause de ce changement ?",
   ["Il n'a pas pu remplacer deux employés.","Les clients ont demandé une ouverture plus tardive.","Il a ouvert une deuxième boutique."],0,
   "客人是结果而非原因，且反应是事后才知道的。"],
  ["Comment les clients ont-ils réagi ?",
   ["Mieux qu'il ne l'attendait.","Ils ont protesté auprès de la mairie.","Ils n'ont pas compris l'affiche."],0,
   "« mieux que je ne l'avais imaginé » 是明确表态。"]]},

{t:'l',d:5,s:3,genre:'dialogue professionnel',domain:'travail',level:'A2',
 title:'Préparer la réunion de demain',
 script:"— Tu as préparé les documents pour demain ?\n— J'ai imprimé le budget et j'ai relu le compte rendu. Mais je n'ai pas reçu les chiffres du service technique.\n— Ah. J'ai envoyé un rappel hier soir.\n— Alors on attend. Si on n'a rien à midi, j'ai proposé qu'on présente seulement la première partie.\n— D'accord. J'ai réservé la salle 2 pour deux heures, ça suffira.\n— Et le café ? La dernière fois, on a oublié.\n— Cette fois, j'ai commandé les thermos.",
 qs:[
  ["Qu'est-ce qui manque encore pour la réunion ?",
   ["Les chiffres du service technique.","Le compte rendu de la dernière réunion.","La réservation de la salle."],0,
   "compte rendu 已重读，salle 2 已预订。"],
  ["Que feront-ils si l'information n'arrive pas à midi ?",
   ["Ils ne présenteront qu'une partie.","Ils annuleront la réunion.","Ils changeront de salle."],0,
   "« seulement la première partie » 是提出的应急方案。"],
  ["Quel oubli de la dernière fois a été corrigé ?",
   ["Le café.","La durée de réservation de la salle.","L'impression du budget."],0,
   "« La dernière fois, on a oublié » 直接指向咖啡。"]]},

{t:'l',d:5,s:4,genre:'podcast · témoignage',domain:'logement étudiant',level:'A2',
 title:'Comment j\'ai trouvé mon studio',
 script:"Quand j'ai commencé mes études à Lille, j'ai cherché un logement pendant six semaines. J'ai visité onze appartements. J'ai envoyé une trentaine de dossiers et je n'ai reçu presque aucune réponse. Un jour, j'ai parlé de mon problème à la boulangère du quartier. Elle a téléphoné à sa cousine, qui a loué son studio deux jours plus tard — à moi. Depuis, je conseille toujours la même chose : les annonces, oui, mais parlez-en aussi autour de vous. J'ai trouvé mon logement grâce à une conversation, pas grâce à un site.",
 qs:[
  ["Quel est le message principal de ce témoignage ?",
   ["Parler autour de soi peut être plus efficace que les annonces.","Il faut envoyer le plus grand nombre possible de dossiers.","Six semaines suffisent pour trouver un logement à Lille."],0,
   "结尾句是明确的主旨陈述；发三十份材料恰恰是失败的做法。"],
  ["Comment a-t-elle finalement trouvé son studio ?",
   ["Grâce à une commerçante du quartier.","Grâce à un site d'annonces.","Grâce au service logement de l'université."],0,
   "boulangère → sa cousine，链条清楚。"],
  ["Combien d'appartements a-t-elle visités ?",
   ["Onze.","Une trentaine.","Six."],0,
   "une trentaine 指投出的材料份数，six 指周数。"]]},

/* ============================ Day 6 · Passé composé avec être + accord ============================ */
{t:'r',d:6,s:1,genre:'carte postale',domain:'voyage en famille',level:'A2',
 title:'Coucou de Bordeaux',
 text:"<b>Coucou de Bordeaux !</b><br><br>Nous sommes partis vendredi soir et nous sommes arrivés très tard : le train est resté une heure à l'arrêt à cause d'un problème sur la voie.<br><br>Samedi, nous sommes allés au marché, puis nous sommes montés en haut de la tour Pey-Berland. Léa est redescendue tout de suite : elle n'aime pas la hauteur.<br><br>Dimanche, mes parents sont venus nous rejoindre et nous sommes retournés au bord du fleuve. Nous rentrons mardi. Je suis passée devant une librairie qui te plairait beaucoup.<br><br>Bises, Anaïs",
 qs:[
  ["Pourquoi le groupe est-il arrivé très tard vendredi ?",
   ["Le train est resté immobilisé à cause de la voie.","Ils sont partis en retard de chez eux.","Ils sont d'abord allés au marché."],0,
   "marché 是周六的活动；出发时间本身没有问题。"],
  ["Qui n'est pas restée en haut de la tour ?",
   ["Léa.","Anaïs.","Les parents d'Anaïs."],0,
   "« Léa est redescendue tout de suite »；父母周日才到。"],
  ["Quand les parents ont-ils rejoint le groupe ?",
   ["Dimanche.","Vendredi soir.","Mardi."],0,
   "mardi 是返程日，vendredi 是出发日。"]]},

{t:'r',d:6,s:2,genre:'message de forum',domain:'transport ferroviaire',level:'A2',
 title:'Je suis descendu à la mauvaise gare',
 text:"<b>Forum voyageurs — « Je suis descendu à la mauvaise gare »</b><br><br>Bonjour, je raconte ma mésaventure de mardi, ça servira peut-être à quelqu'un.<br><br>Je suis monté dans le TER à Tours. Je suis descendu à Saint-Pierre-des-Corps parce que j'ai entendu le nom de la ville, mais mon billet allait jusqu'à Amboise. Le contrôleur n'était pas encore passé.<br><br>Je suis allé au guichet. L'agent est resté très calme et m'a mis sur le train suivant, sans supplément. Je suis arrivé avec cinquante minutes de retard, c'est tout.<br><br>Conclusion : ne descendez pas au premier nom connu, vérifiez l'écran.",
 qs:[
  ["Quelle erreur l'auteur a-t-il commise ?",
   ["Il est descendu avant sa gare de destination.","Il est monté dans un train qui n'allait pas à Amboise.","Il a acheté un billet pour la mauvaise ville."],0,
   "车票到 Amboise，列车方向没错，错的是下车站。"],
  ["Comment la situation a-t-elle été réglée ?",
   ["Un agent l'a placé sur le train suivant sans frais.","Le contrôleur lui a vendu un nouveau billet.","Il est reparti à Tours pour recommencer son trajet."],0,
   "« sans supplément » 排除了补票；检票员当时还没来。"],
  ["Quel conseil l'auteur donne-t-il ?",
   ["Vérifier l'écran plutôt que se fier au nom entendu.","Voyager uniquement avec un billet contrôlé.","Descendre à la première gare connue."],0,
   "结论句与第三个选项正相反。"]]},

{t:'r',d:6,s:3,genre:'article scolaire',domain:'sortie nature',level:'A2',
 title:'Sortie nature : 54 élèves sur les hauteurs de Saint-Just',
 text:"<b>Sortie nature : 54 élèves sur les hauteurs de Saint-Just</b><br><br>Les élèves de deux classes de quatrième sont partis jeudi matin du collège Jean-Moulin. Ils sont arrivés au pied du plateau vers neuf heures et sont montés pendant une heure et demie. Trois élèves sont restés en bas avec un accompagnateur, en raison d'une entorse survenue la semaine précédente.<br><br>Le groupe est redescendu par un autre chemin, plus long mais moins raide. Tout le monde est rentré au collège à seize heures dix, avec vingt minutes d'avance sur l'horaire annoncé aux familles.",
 qs:[
  ["Pourquoi trois élèves ne sont-ils pas montés ?",
   ["À cause d'une blessure.","Parce que le chemin était trop long.","Parce qu'ils devaient rentrer plus tôt."],0,
   "entorse 是唯一原因；« plus long » 描述的是下山路。"],
  ["Qu'est-ce qui caractérise le chemin du retour ?",
   ["Il est plus long, mais moins difficile.","Il est plus court et plus raide.","C'est le même qu'à l'aller."],0,
   "« un autre chemin, plus long mais moins raide » 是明确对比。"],
  ["Que s'est-il passé avec l'horaire ?",
   ["Le groupe est rentré en avance.","Le groupe est rentré avec vingt minutes de retard.","Aucun horaire n'avait été communiqué."],0,
   "« vingt minutes d'avance sur l'horaire annoncé » —— 注意 avance 与 retard 的区分。"]]},

{t:'r',d:6,s:4,genre:'page de journal intime',domain:'vie de quartier',level:'A2',
 title:'Jeudi soir',
 text:"<b>Jeudi soir.</b><br><br>Je suis rentrée à pied. Je suis passée par le parc, ce que je ne fais jamais le jeudi, et je suis tombée sur Madame Ferrand, mon ancienne voisine. Nous ne nous étions pas vues depuis quatre ans.<br><br>Elle est partie de l'immeuble en 2022, elle est allée vivre chez sa fille, puis elle est revenue dans le quartier au printemps. Elle m'a proposé un café. Je suis restée une heure. Je suis sortie de chez elle avec l'impression d'avoir retrouvé quelque chose.<br><br>Demain, je repasserai par le parc.",
 qs:[
  ["Pourquoi cette rencontre est-elle inattendue ?",
   ["L'auteure ne passe habituellement pas par le parc le jeudi.","Madame Ferrand avait quitté la région définitivement.","Les deux femmes se croisent chaque semaine."],0,
   "« ce que je ne fais jamais le jeudi » 是关键插入语；Mme Ferrand 春天已搬回。"],
  ["Où Madame Ferrand est-elle allée après avoir quitté l'immeuble ?",
   ["Chez sa fille.","Dans un autre quartier, au printemps.","Dans la maison en face du parc."],0,
   "au printemps 指的是搬回来的时间，不是搬走后的去向。"],
  ["Quel sentiment l'auteure exprime-t-elle à la fin ?",
   ["Une impression agréable de retrouvailles.","De la gêne d'être restée trop longtemps.","De la déception de ne pas avoir été reconnue."],0,
   "« l'impression d'avoir retrouvé quelque chose » + 打算再走同一条路。"]]},

{t:'l',d:6,s:1,genre:'dialogue entre voisins',domain:'retour de vacances',level:'A2',
 title:'Vous êtes rentrés !',
 script:"— Ah, vous êtes rentrés ! Vous êtes partis longtemps ?\n— Trois semaines. Nous sommes allés en Ardèche, puis nous sommes descendus jusqu'à Nîmes.\n— Et les enfants ?\n— Ils sont restés chez leurs grands-parents la première semaine, ils nous ont rejoints après.\n— Vous êtes revenus par la route ?\n— Non, en train. La voiture est tombée en panne le premier jour ; elle est restée au garage tout le mois.\n— Ah quand même. Et elle est réparée ?\n— Nous devons y retourner samedi.",
 qs:[
  ["Comment la famille est-elle rentrée ?",
   ["En train.","En voiture, une fois celle-ci réparée.","Avec les grands-parents."],0,
   "« Non, en train » 是直接回答；车还在修理厂。"],
  ["Que s'est-il passé avec la voiture ?",
   ["Elle est tombée en panne dès le premier jour.","Elle est restée chez les grands-parents.","Elle a été réparée avant le retour."],0,
   "周六还要再去，说明尚未取回。"],
  ["Quand les enfants ont-ils rejoint leurs parents ?",
   ["Après la première semaine.","Dès le départ.","Le jour du retour."],0,
   "« la première semaine ... ils nous ont rejoints après »。"]]},

{t:'l',d:6,s:2,genre:'message vocal administratif',domain:'démarches',level:'A2',
 title:'Un document manque à votre dossier',
 script:"Bonjour Madame Roux, c'est Julien, du service des inscriptions. Je suis passé à votre bureau ce matin, mais vous étiez en réunion. Votre dossier est arrivé chez nous lundi. Il est complet, sauf l'attestation d'assurance. Je suis allé vérifier auprès de ma collègue : elle est partie en congé vendredi et n'a rien reçu de votre part. Vous pouvez déposer le document jusqu'à jeudi seize heures. Après, le dossier repart au service central et le délai sera plus long. Merci, bonne journée.",
 qs:[
  ["Pourquoi Julien laisse-t-il ce message ?",
   ["Parce qu'un document manque au dossier.","Parce que le dossier n'est jamais arrivé.","Parce que la réunion a été annulée."],0,
   "« Il est complet, sauf l'attestation d'assurance » 是核心信息。"],
  ["Que se passera-t-il après jeudi seize heures ?",
   ["Le dossier partira ailleurs et le traitement sera plus long.","Le dossier sera définitivement refusé.","La collègue reviendra de congé."],0,
   "文中说 délai plus long，没有说被拒绝。"],
  ["Pourquoi Julien n'a-t-il pas pu parler à Madame Roux ce matin ?",
   ["Elle était en réunion.","Elle était en congé.","Il n'est pas venu au bureau."],0,
   "请假的是他的同事，不是 Mme Roux。"]]},

{t:'l',d:6,s:3,genre:'reportage radio',domain:'événement solidaire',level:'A2',
 title:'La marche solidaire a doublé sa participation',
 script:"Ils sont partis à huit heures de la place de la Mairie : quatre cent dix marcheurs, selon les organisateurs. Le groupe est monté jusqu'au belvédère, puis il est redescendu par le sentier des Vignes. Une trentaine de participants sont restés au village pour préparer le repas.\nCette année, la marche est devenue payante : cinq euros par personne, entièrement reversés à une association qui accompagne les familles à l'hôpital. L'an dernier, l'événement était gratuit et avait réuni deux cents personnes. Les organisateurs ne s'attendaient pas à ce que le nombre double.",
 qs:[
  ["Qu'est-ce qui surprend les organisateurs ?",
   ["La participation a augmenté alors que la marche est devenue payante.","Les marcheurs sont partis plus tôt que prévu.","Le sentier des Vignes a dû être fermé."],0,
   "对比 410（收费）与 200（免费），末句点明意外之处。"],
  ["À quoi sert l'argent de l'inscription ?",
   ["À soutenir une association qui accompagne des familles.","À payer le repas préparé au village.","À entretenir le sentier des Vignes."],0,
   "« entièrement reversés » 排除了其他用途。"],
  ["Que fait une trentaine de participants ?",
   ["Ils restent au village pour préparer le repas.","Ils montent les premiers jusqu'au belvédère.","Ils redescendent par un autre chemin."],0,
   "这三十人恰恰没有参加行走。"]]},

{t:'l',d:6,s:4,genre:'entretien',domain:'arrivée en France',level:'A2',
 title:'Les premiers jours d\'Amina',
 script:"— Amina, vous êtes arrivée en France il y a deux ans.\n— Oui, je suis arrivée en septembre, pour un master.\n— Comment se sont passés les premiers jours ?\n— Je suis descendue de l'avion avec deux valises et une adresse. Je suis allée directement à la résidence, mais mon dossier n'était pas encore validé. Je suis restée trois nuits chez une amie d'amie.\n— Et ensuite ?\n— Tout est allé vite. Je suis retournée au bureau du logement le lundi, une chambre s'est libérée le mardi, et je suis entrée dans mes affaires le mercredi soir.",
 qs:[
  ["Quel problème Amina a-t-elle rencontré en arrivant ?",
   ["Son dossier de logement n'était pas validé.","Elle a perdu ses valises à l'aéroport.","Elle n'avait aucune adresse."],0,
   "她有地址也有行李，问题出在材料审核。"],
  ["Où a-t-elle dormi les premières nuits ?",
   ["Chez une connaissance.","À la résidence universitaire.","À l'aéroport."],0,
   "« une amie d'amie » 是间接熟人。"],
  ["Combien de temps la solution provisoire a-t-elle duré ?",
   ["Trois nuits.","Deux ans.","Jusqu'au mercredi de la semaine suivante."],0,
   "deux ans 是她来法国的时长。"]]},

/* ============================ Day 7 · Imparfait ============================ */
{t:'r',d:7,s:1,genre:'récit de souvenir',domain:'enfance',level:'A2',
 title:'Les mercredis de la rue des Lilas',
 text:"<b>Les mercredis de la rue des Lilas</b><br><br>Quand j'avais dix ans, le mercredi n'était pas un jour d'école. Ma mère travaillait, alors je passais l'après-midi à la bibliothèque du quartier. C'était un bâtiment sombre qui sentait le papier et la poussière.<br><br>La bibliothécaire s'appelait Madame Estève. Elle ne souriait pas beaucoup, mais elle gardait toujours un livre de côté pour moi. Je lisais assis par terre, entre deux rayons, jusqu'à ce qu'elle éteigne les lumières du fond.<br><br>Je ne savais pas, à l'époque, que ces après-midi décideraient de mon métier.",
 qs:[
  ["Pourquoi l'auteur passait-il ses mercredis à la bibliothèque ?",
   ["Il n'y avait pas école et sa mère travaillait.","Madame Estève lui donnait des cours particuliers.","C'était le seul bâtiment chauffé du quartier."],0,
   "两个原因并列出现在第一段。"],
  ["Comment l'auteur décrit-il Madame Estève ?",
   ["Peu souriante, mais attentionnée.","Souriante et bavarde.","Sévère et indifférente."],0,
   "« ne souriait pas beaucoup, mais elle gardait toujours un livre » 是典型的让步结构。"],
  ["Que suggère la dernière phrase ?",
   ["Ces après-midi ont influencé son choix professionnel.","Il regrette d'avoir passé ses mercredis ainsi.","Il a fini par oublier cette période."],0,
   "« décideraient de mon métier » 指向职业选择。"]]},

{t:'r',d:7,s:2,genre:'reportage · avant / maintenant',domain:'urbanisme',level:'A2+',
 title:'Le quartier de la Gare, trente ans après',
 text:"<b>Le quartier de la Gare, trente ans après</b><br><br>Dans les années quatre-vingt-dix, il y avait ici quatre cafés, deux cinémas et un marché le vendredi. Les trains s'arrêtaient toutes les vingt minutes et les employés déjeunaient dehors dès qu'il faisait beau.<br><br>Aujourd'hui, il reste un café, le marché a déménagé et des bureaux ont remplacé l'un des cinémas. « Ce n'était pas mieux avant, tempère Jean Ravel, commerçant depuis 1988. C'était simplement plus bruyant et plus jeune. Maintenant, les gens arrivent le matin et repartent le soir. »<br><br>La mairie annonce un réaménagement de la place pour 2028.",
 qs:[
  ["Quelle est la position de Jean Ravel sur le passé du quartier ?",
   ["Il refuse de dire que c'était mieux, il constate que c'était différent.","Il pense que tout était préférable autrefois.","Il estime que le quartier n'a pas réellement changé."],0,
   "« Ce n'était pas mieux avant ... C'était simplement plus bruyant » 是明确的否定加限定。"],
  ["Qu'est-ce qui a remplacé l'un des cinémas ?",
   ["Des bureaux.","Le marché du vendredi.","Un café."],0,
   "市场是搬走了，咖啡馆是减少到一家。"],
  ["Quelle habitude existait dans les années quatre-vingt-dix ?",
   ["Les employés déjeunaient dehors quand il faisait beau.","Les gens arrivaient le matin et repartaient le soir.","La place venait d'être réaménagée."],0,
   "第二项是今天的状况，第三项是 2028 年的计划。"]]},

{t:'r',d:7,s:3,genre:'lettre',domain:'école et mémoire',level:'A2+',
 title:'Lettre à un ancien professeur',
 text:"<b>Monsieur,</b><br><br>Vous ne vous souvenez sûrement pas de moi. J'étais au fond de la classe, à gauche, et je ne parlais presque jamais.<br><br>À cette époque, je détestais lire à voix haute. Chaque fois que c'était mon tour, mes mains tremblaient. Vous ne m'avez jamais forcé : vous me demandiez seulement une phrase, puis vous continuiez vous-même.<br><br>Je suis aujourd'hui professeur de collège. Quand un élève ne veut pas lire, je pense à vous et je demande une phrase. Une seule.<br><br>Avec ma reconnaissance,<br>R. Diallo",
 qs:[
  ["Que faisait le professeur quand venait le tour de l'auteur ?",
   ["Il ne lui demandait qu'une phrase, puis prenait le relais.","Il l'obligeait à lire le texte entier.","Il le dispensait complètement de lecture."],0,
   "« seulement une phrase, puis vous continuiez vous-même » —— 既不是全免，也不是强制。"],
  ["Pourquoi l'auteur écrit-il cette lettre ?",
   ["Pour remercier son ancien professeur.","Pour s'excuser de son silence en classe.","Pour demander un conseil pédagogique."],0,
   "落款 « Avec ma reconnaissance » 与全文语气一致。"],
  ["Que reproduit l'auteur dans son propre métier ?",
   ["La même manière de ne pas forcer un élève.","L'habitude de placer les timides au fond.","La lecture à voix haute à chaque cours."],0,
   "最后一段直接说明他沿用了那一句的做法。"]]},

{t:'r',d:7,s:4,genre:'entretien de presse locale',domain:'mémoire rurale',level:'A2+',
 title:'« On ne fermait pas à clé » — rencontre avec Odette Vasseur',
 text:"<b>« On ne fermait pas à clé » — rencontre avec Odette Vasseur, 91 ans</b><br><br><b>Vous êtes née dans ce village ?</b><br>Oui, en 1935. Nous étions sept enfants. Il n'y avait pas d'eau courante ; nous allions à la fontaine deux fois par jour.<br><br><b>Vous regrettez cette époque ?</b><br>Non. Les gens disent qu'on ne fermait pas à clé, c'est vrai. Mais on avait froid, et quand quelqu'un tombait malade, le médecin mettait deux heures à venir.<br><br><b>Qu'est-ce qui vous manque ?</b><br>Le bruit. Il y avait des enfants partout. Maintenant, le silence commence à quatre heures.",
 qs:[
  ["Quel est le point de vue d'Odette sur le passé ?",
   ["Nuancé : elle reconnaît des avantages, mais aussi des difficultés réelles.","Entièrement nostalgique.","Entièrement négatif."],0,
   "« c'est vrai. Mais on avait froid » 是典型的让步—反驳结构。"],
  ["Quelle difficulté matérielle mentionne-t-elle ?",
   ["L'absence d'eau courante.","L'absence totale de médecin dans la région.","Le bruit permanent des enfants."],0,
   "医生是来得慢，不是没有；孩子的吵闹是她怀念的东西。"],
  ["Que regrette-t-elle aujourd'hui ?",
   ["L'animation du village.","Les portes que l'on ne fermait pas.","Les visites du médecin."],0,
   "回答 « Qu'est-ce qui vous manque ? » 的是 « Le bruit »。"]]},

{t:'l',d:7,s:1,genre:'podcast · souvenir',domain:'école primaire',level:'A2',
 title:'L\'odeur du couloir en hiver',
 script:"Je me souviens surtout de l'odeur du couloir en hiver. On entrait, les manteaux mouillés séchaient sur le radiateur, et il y avait cette odeur de laine chaude. La maîtresse s'appelait Madame Ory. Elle écrivait au tableau en nous tournant le dos et elle savait exactement qui parlait. On croyait qu'elle avait des yeux derrière la tête. En réalité, elle regardait le reflet dans la vitre. Je l'ai compris trente ans plus tard, un jour où j'écrivais moi-même au tableau.",
 qs:[
  ["Comment la maîtresse savait-elle qui parlait ?",
   ["Elle voyait le reflet dans la vitre.","Elle se retournait très vite.","Un élève le lui signalait."],0,
   "« En réalité » 引出真实解释，推翻了孩子们的想象。"],
  ["Quand le narrateur a-t-il compris ce procédé ?",
   ["Bien plus tard, en enseignant lui-même.","Le jour même, en classe.","Quand Madame Ory le lui a expliqué."],0,
   "« trente ans plus tard » 是明确的时间标记。"],
  ["Par quel détail le souvenir commence-t-il ?",
   ["Une odeur.","Un bruit dans le couloir.","La vue du tableau."],0,
   "开篇即 « l'odeur du couloir »，是全段的感官入口。"]]},

{t:'l',d:7,s:2,genre:'micro-trottoir',domain:'vacances d\'été',level:'A2+',
 title:'Les étés de votre enfance',
 script:"— Nous, on ne partait pas. On restait dans la cour de l'immeuble et on jouait jusqu'à la nuit.\n— Moi, chaque été, mes parents m'envoyaient chez ma tante en Bretagne. Il pleuvait la moitié du temps et j'adorais ça.\n— Franchement, je m'ennuyais. Il n'y avait rien dans mon village : pas de piscine, pas de cinéma. On attendait la rentrée.\n— Ce qui a changé, c'est qu'on ne prévenait pas. On sortait, on rentrait pour manger. Personne ne téléphonait.",
 qs:[
  ["Qu'est-ce qui relie ces quatre témoignages ?",
   ["Ils décrivent des étés d'enfance très différents les uns des autres.","Ils regrettent tous la même chose.","Ils partaient tous au bord de la mer."],0,
   "四人的经历互不相同：留在院子、去布列塔尼、无聊、自由外出。"],
  ["Quel intervenant garde un souvenir négatif ?",
   ["Celui qui s'ennuyait dans son village.","Celui qui allait en Bretagne.","Celui qui jouait dans la cour."],0,
   "布列塔尼那位虽然常下雨，却说 « j'adorais ça »。"],
  ["Selon le dernier intervenant, quel est le principal changement ?",
   ["On n'avait pas besoin de prévenir ses parents.","Le nombre de piscines a augmenté.","Les vacances étaient plus longues."],0,
   "« on ne prévenait pas ... Personne ne téléphonait » 是他强调的对比点。"]]},

{t:'l',d:7,s:3,genre:'dialogue familial',domain:'photos anciennes',level:'A2',
 title:'Devant les vieilles photos',
 script:"— Regarde, c'est la maison de Chantilly.\n— Il y avait un mur, là ?\n— Oui, on ne voyait pas la rue. Et le jardin descendait jusqu'au fond.\n— Papi portait toujours cette veste ?\n— Toujours. Même en juillet. Il disait qu'il avait froid.\n— Et là, c'est qui, la dame ?\n— C'est madame Perrin, la voisine. Elle venait tous les dimanches et elle apportait une tarte. Elle ne restait jamais plus d'une heure.",
 qs:[
  ["Que peut-on dire de la voisine ?",
   ["Elle venait régulièrement, mais brièvement.","Elle habitait dans la maison.","Elle ne venait qu'au mois de juillet."],0,
   "« tous les dimanches » + « jamais plus d'une heure » 构成频率与时长的对比。"],
  ["Pourquoi le grand-père gardait-il sa veste même en été ?",
   ["Il disait avoir froid.","Le jardin était toujours à l'ombre.","Il n'en possédait pas d'autre."],0,
   "« Il disait qu'il avait froid » 是文中唯一解释。"],
  ["Qu'est-ce qui a disparu depuis cette photo ?",
   ["Le mur qui cachait la rue.","Le jardin du fond.","Les visites du dimanche."],0,
   "« Il y avait un mur, là ? » 的提问方式说明如今已不在。"]]},

{t:'l',d:7,s:4,genre:'chronique radio · portrait',domain:'marché et métiers',level:'A2+',
 title:'Un ancien marchand de fruits se souvient',
 script:"Notre invité tenait un stand de fruits sur le marché de Cahors.\n— Le mardi, j'arrivais à quatre heures. Il faisait encore nuit et il n'y avait que nous et les boulangers. On installait les tréteaux, on se parlait d'un stand à l'autre.\n— C'était dur ?\n— L'hiver, oui. Mais on savait à qui on vendait. Je connaissais les prénoms, les régimes, les enfants. Aujourd'hui, on me dit que les clients veulent aller vite. Je ne suis pas sûr. Je crois qu'on ne leur laisse plus le temps de parler.",
 qs:[
  ["Quelle nuance apporte l'invité au sujet des clients d'aujourd'hui ?",
   ["Il doute qu'ils veuillent réellement aller vite.","Il confirme qu'ils sont devenus plus pressés.","Il pense qu'ils achètent moins de fruits."],0,
   "« Je ne suis pas sûr » 明确表示他不认同这个流行说法。"],
  ["Que faisait-il en arrivant à quatre heures du matin ?",
   ["Il installait son stand avec les autres commerçants.","Il vendait déjà aux premiers clients.","Il livrait le pain avec les boulangers."],0,
   "面包师只是当时同样在场的人。"],
  ["Qu'est-ce qui rendait ce travail difficile ?",
   ["Le froid de l'hiver.","Le manque de clients le mardi.","Les horaires imposés par les boulangers."],0,
   "回答 « C'était dur ? » 的是 « L'hiver, oui »。"]]}

];
