'use strict';
const VERSION='1.2';
const KEY='delf50_v12_state';
const AUDIO_DB='delf50_audio_v1';
const LEVELS={light:{label:'5小时',mins:[65,45,30,40,35,35,25,25]},standard:{label:'6.5小时',mins:[85,60,35,55,45,45,35,30]},high:{label:'8小时',mins:[105,70,40,70,55,55,45,40]}};
const SOURCES=[
 {n:'France Éducation international · DELF B1',u:'https://www.france-education-international.fr/diplome/delf-tout-public/niveau-b1',d:'考试结构、时长、能力描述与通过规则'},
 {n:'France Éducation international · B1 样题与评分说明',u:'https://www.france-education-international.fr/diplome/delf-tout-public/niveau-b1/exemples-sujets',d:'写作至少160词、写作与口语评分标准、官方样题结构'},
 {n:'CEFR · Council of Europe',u:'https://www.coe.int/en/web/common-european-framework-reference-languages/action-orientation-in-the-classroom',d:'行动导向与真实任务式学习框架'},
 {n:'Édito B1 2022–2024 · Didier FLE',u:'https://didierfle.com/produit/edito-b1-edition-2022-2024-livre-numerique-inclus/',d:'真实语料、语法、词汇、语音、渐进式 DELF 训练的课程参考'},
 {n:'Grammaire progressive du français A2/B1 · CLE',u:'https://progressive.cle-international.com/9782090381030/assets/list',d:'A2/B1 语法分级与系统练习参考'},
 {n:'RFI · Journal en français facile',u:'https://s.francaisfacile.rfi.fr/media/display/492a1bbe-2e52-11ef-8329-005056a90284/RFI_fran%C3%A7ais_facile_BROCHURE_210x210-HD-PourAffichageEcran.pdf',d:'新闻听力、转写与真实输入参考'}
];
const GRAMMAR=[
 {id:'present',name:'Présent',level:'A1+',use:'自我介绍、习惯、事实与观点的基础',ex:['Je travaille à Paris.','Nous sommes prêts.'],qs:[['Nous ___ prêts aujourd’hui.',['sommes','avons','êtes'],0,'être 与 nous：nous sommes。'],['Elle ___ le français tous les jours.',['étudie','étudier','étudient'],0,'第三人称单数 présent：elle étudie。'],['Je ___ souvent le métro.',['prends','prendre','prend'],0,'prendre 的 je 形式：je prends。']]},
 {id:'negation',name:'Négation',level:'A1+',use:'拒绝、投诉、说明限制',ex:['Je ne comprends pas.','Je n’ai jamais essayé.'],qs:[['Je ___ comprends ___ cette règle.',['ne / pas','pas / ne','n’ / rien'],0,'简单否定通常包围变位动词：ne + verbe + pas。'],['Il ___ travaille ___ le dimanche.',['ne / pas','pas / ne','n’ / personne'],0,'Il ne travaille pas。'],['Je ___ mange ___ de viande.',['ne / pas','pas / ne','ne / jamais de'],0,'简单否定：je ne mange pas de viande。']]},
 {id:'questions',name:'Questions',level:'A1+',use:'口试互动、获取信息',ex:['Où habitez-vous ?','Est-ce que vous pouvez répéter ?'],qs:[['___ vous habitez ?',['Où','Quel','Combien'],0,'询问地点使用 où。'],['___ coûte ce billet ?',['Combien','Pourquoi de','Quel est'],0,'询问价格常用 combien。'],['___ est-ce que vous venez demain ?',['Pourquoi','Quel','Combien de'],0,'询问原因使用 pourquoi。']]},
 {id:'modals',name:'Pouvoir / devoir / vouloir',level:'A1+',use:'请求、建议、义务与协商',ex:['Je voudrais réserver.','Vous pouvez m’aider ?'],qs:[['Je ___ réserver une chambre.',['voudrais','veux de','peux à'],0,'je voudrais + infinitif 是高频礼貌请求。'],['Vous ___ envoyer le document avant lundi.',['devez','devez de','devriez à'],0,'devoir + infinitif，不加 de。'],['Est-ce que vous ___ m’aider ?',['pouvez','pouvez de','pouvoir'],0,'vous pouvez + infinitif。']]},
 {id:'articles',name:'Articles & quantité',level:'A2',use:'购物、饮食、数量描述',ex:['du pain','beaucoup de temps'],qs:[['Je ne bois pas ___ lait.',['de','du','le'],0,'否定后的不定/部分冠词通常变为 de。'],['J’achète ___ pommes.',['des','de la','du'],0,'复数不定冠词：des pommes。'],['Il y a beaucoup ___ monde.',['de','du','des'],0,'beaucoup de + nom。']]},
 {id:'adjectives',name:'Adjectifs & accords',level:'A2',use:'描述人物、城市、体验',ex:['une ville animée','des activités intéressantes'],qs:[['Une ville très ___.',['animée','animé','animés'],0,'ville 是阴性单数，因此 animée。'],['Des activités ___.',['intéressantes','intéressant','intéressante'],0,'复数阴性：intéressantes。'],['Un quartier ___.',['calme','calmes','calmée'],0,'calme 在此为阳性单数。']]},
 {id:'prepositions',name:'Prépositions & temps',level:'A2',use:'时间、地点与行程',ex:['depuis trois ans','à Paris / en France'],qs:[['Il habite ici ___ trois ans.',['depuis','pendant','à'],0,'从过去持续到现在用 depuis。'],['Je pars ___ France demain.',['en','à','au'],0,'阴性国家通常用 en。'],['Nous restons ici ___ deux semaines.',['pendant','depuis','à'],0,'完整时长可用 pendant。']]},
 {id:'pc',name:'Passé composé',level:'A2',use:'叙述完成事件和经历',ex:['J’ai visité Lyon.','Elle est arrivée hier.'],qs:[['Hier, Marie ___ un film.',['a regardé','regardait','regarde'],0,'完成事件用 passé composé。'],['Nous ___ à huit heures.',['sommes arrivés','avons arrivé','arrivions'],0,'arriver 使用 être：nous sommes arrivés。'],['Il ___ ses devoirs.',['a fini','est fini','finissait hier'],0,'finir 使用 avoir：il a fini。']]},
 {id:'imparfait',name:'Imparfait',level:'A2',use:'过去背景、习惯与状态',ex:['Il faisait beau.','Quand j’étais petit…'],qs:[['Quand j’étais petit, j’___ souvent ici.',['allais','suis allé','vais'],0,'过去习惯用 imparfait。'],['Il ___ beau ce jour-là.',['faisait','a fait soudain','fera'],0,'背景天气用 imparfait。'],['Nous ___ fatigués.',['étions','avons été toujours','serons'],0,'过去状态常用 imparfait。']]},
 {id:'pcimp',name:'Passé composé vs imparfait',level:'A2+',use:'B1 叙事核心',ex:['Il pleuvait quand le téléphone a sonné.'],qs:[['Il ___ quand le téléphone ___.',['pleuvait / a sonné','a plu / sonnait','pleut / sonne'],0,'背景用 imparfait，突发事件用 passé composé。'],['Je ___ quand Paul ___.',['dormais / est arrivé','ai dormi / arrivait','dors / arrive'],0,'正在进行的背景 + 完成事件。'],['Quand j’étais enfant, nous ___ souvent à la mer.',['allions','sommes allés chaque été','irons'],0,'过去重复习惯用 imparfait。']]},
 {id:'future',name:'Futur proche & futur simple',level:'A2+',use:'计划、预测与项目',ex:['Je vais partir.','Je travaillerai demain.'],qs:[['Dans dix ans, les villes ___ plus vertes.',['seront','étaient','sont hier'],0,'预测未来用 futur simple。'],['Ce soir, je ___ cuisiner.',['vais','suis','ai'],0,'aller + infinitif 构成 futur proche。'],['Demain, nous ___ la réponse.',['recevrons','recevions','avons reçu hier'],0,'未来事件：futur simple。']]},
 {id:'codcoi',name:'COD / COI',level:'A2+',use:'减少重复、提高口语自然度',ex:['Je le vois.','Je lui téléphone.'],qs:[['Je téléphone à Paul → je ___ téléphone.',['lui','le','en'],0,'à + 人通常对应 COI lui/leur。'],['Je regarde ce film → je ___ regarde.',['le','lui','y'],0,'直接宾语阳性单数：le。'],['Je parle à mes amis → je ___ parle.',['leur','les','en'],0,'à + 复数人：leur。']]},
 {id:'yen',name:'Y / En',level:'B1-',use:'地点、数量和 de/à 结构',ex:['J’y vais.','J’en veux deux.'],qs:[['Tu vas à la bibliothèque ? Oui, j’___ vais.',['y','en','la'],0,'地点 à + chose → y。'],['Tu veux du café ? Oui, j’___ veux.',['en','y','le'],0,'du/de la/des → en。'],['Il parle de son travail ? Oui, il ___ parle.',['en','y','le'],0,'de + chose → en。']]},
 {id:'relatives',name:'Qui / que / où',level:'B1-',use:'连接短句、提高表达连贯性',ex:['un livre qui…','la ville où…'],qs:[['C’est un livre ___ m’intéresse.',['qui','que','où'],0,'从句中作主语用 qui。'],['Le film ___ j’ai vu était excellent.',['que','qui','où'],0,'从句中作直接宾语用 que。'],['Paris est la ville ___ j’étudie.',['où','que','qui'],0,'地点用 où。']]},
 {id:'conditionnel',name:'Conditionnel présent',level:'B1-',use:'礼貌请求、建议与假设',ex:['Je voudrais…','Vous pourriez…'],qs:[['Vous ___ me renseigner ?',['pourriez','pouvez de','pourrez de'],0,'pourriez-vous…? 是高频礼貌请求。'],['À ta place, je ___.',['ferais','faisais hier','fais'],0,'建议/假设常用 conditionnel。'],['Je ___ changer de chambre.',['voudrais','voudrai hier','voulais demain'],0,'礼貌愿望：je voudrais。']]},
 {id:'connectors',name:'Connecteurs',level:'B1-',use:'写作与口语组织结构',ex:['d’abord','cependant','donc','par exemple'],qs:[['Quel mot exprime une conséquence ?',['donc','cependant','d’abord'],0,'donc 表示结果/后果。'],['Quel mot introduit une opposition ?',['cependant','donc','par exemple'],0,'cependant 表示转折。'],['Quel mot introduit un exemple ?',['par exemple','pourtant que','ensuite de'],0,'par exemple 用于举例。']]},
 {id:'comparison',name:'Comparer',level:'B1-',use:'比较方案、优缺点与选择',ex:['plus… que','moins… que','aussi… que'],qs:[['Le train est ___ rapide que le bus.',['plus','très','beaucoup'],0,'比较级：plus + adjectif + que。'],['Ce logement est ___ cher que l’autre.',['moins','peu de','moins de très'],0,'moins + adjectif + que。'],['Ils sont ___ motivés que nous.',['aussi','autant de','plus de'],0,'aussi + adjectif + que。']]},
 {id:'opinion',name:'Opinion & argumentation',level:'B1',use:'观点表达、理由、例子和结论',ex:['À mon avis…','D’une part…','Pour conclure…'],qs:[['Pour exprimer votre opinion…',['À mon avis,…','Il y a trois ans,…','À demain,…'],0,'À mon avis 引出个人观点。'],['Pour ajouter un exemple…',['Par exemple,…','Cependant,…','En conclusion,…'],0,'Par exemple 用于举例。'],['Pour conclure…',['Pour conclure,…','D’abord,…','À cause de…'],0,'Pour conclure 用于结束观点。']]}
,
 {id:'passeRecent',name:'Passé récent',level:'B1-',use:'表达刚刚发生的动作，并与其他过去时区分',ex:['Je viens de finir.','Elle vient d’arriver.'],qs:[
  ['Je ___ finir mon travail.',['viens de','viens','ai de'],0,'Passé récent：venir au présent + de + infinitif。'],
  ['Ils ___ partir quand tu as appelé.',['venaient de','ont venu de','étaient de'],0,'在过去参照点表达“刚刚发生”可用 venir à l’imparfait + de + infinitif。'],
  ['Quelle phrase signifie « 她刚刚到 » ?',['Elle vient d’arriver.','Elle va arriver.','Elle arrivait souvent.'],0,'venir de + infinitif 表示刚刚发生。'],
  ['Nous venons ___ recevoir la confirmation.',['de','à','pour'],0,'固定结构 venir de + infinitif。'],
  ['Je viens de manger : l’action est…',['très récente et terminée','une habitude passée','un projet futur'],0,'Passé récent 强调刚刚完成。'],
  ['À 18 h, il venait de quitter le bureau quand… : « venait de quitter » situe…',['une action immédiatement antérieure','une action future','une habitude générale'],0,'Imparfait de venir + de situe une action juste avant un repère passé.']
 ]},
 {id:'plusqueparfait',name:'Plus-que-parfait',level:'B1',use:'表达“过去中的更早过去”，组织清晰时间线',ex:['J’avais déjà réservé.','Elle était partie avant mon arrivée.'],qs:[
  ['Quand je suis arrivé, le train ___.',['était déjà parti','est déjà parti demain','partait toujours demain'],0,'先发生的过去动作可用 plus-que-parfait。'],
  ['Elle ___ son billet avant de recevoir le message.',['avait acheté','a acheté après','achètera'],0,'Plus-que-parfait：avoir/être à l’imparfait + participe passé。'],
  ['Nous étions fatigués parce que nous ___ toute la nuit.',['avions travaillé','travaillons','travaillerons'],0,'原因发生在另一个过去状态之前。'],
  ['Avec être : « Elles ___ avant midi. »',['étaient arrivées','avaient arrivé','étaient arriver'],0,'Plus-que-parfait avec être，并保持基本配合。'],
  ['Quelle relation exprime « J’avais déjà réservé quand il a appelé » ?',['La réservation est antérieure à l’appel.','L’appel est antérieur à la réservation.','Les deux actions sont futures.'],0,'Plus-que-parfait 标记更早的过去。'],
  ['Forme correcte :',['vous aviez compris','vous avez comprenait','vous étiez comprendre'],0,'avoir à l’imparfait + participe passé。']
 ]},
 {id:'hypothesis',name:'Hypothèse avec si',level:'B1',use:'提出现实条件、假设、建议与结果',ex:['Si j’ai le temps, je viendrai.','Si j’avais le temps, je viendrais.'],qs:[
  ['Si j’ai le temps demain, je ___.',['viendrai','viendrais hier','venais'],0,'现实/可能条件：si + présent，主句可用 futur simple。'],
  ['Si j’___ plus de temps, je voyagerais davantage.',['avais','aurai','ai eu'],0,'假设：si + imparfait + conditionnel présent。'],
  ['Si nous habitions plus près, nous ___ à pied.',['irions','allons hier','irons toujours hier'],0,'假设结果使用 conditionnel présent。'],
  ['Après « si » dans une hypothèse, on écrit :',['Si j’étais…','Si je serais…','Si j’aurais…'],0,'标准结构中 si 从句不用 conditionnel。'],
  ['Quelle phrase propose une solution hypothétique ?',['Si on partait plus tôt, on éviterait le trafic.','Si on partira, on éviterait.','Si on partirait, on évite.'],0,'si + imparfait / conditionnel présent。'],
  ['Si vous pouvez venir, nous ___ la réunion à 15 h.',['commencerons','commencerions hier','commencions demain toujours'],0,'可能条件可连接 futur simple。']
 ]},
 {id:'subjonctif',name:'Subjonctif essentiel',level:'B1',use:'表达必要、愿望、目的；掌握高频触发结构',ex:['Il faut que vous veniez.','Je vous écris pour que vous puissiez confirmer.'],qs:[
  ['Il faut que tu ___ ce document.',['envoies','enverras','envoyais toujours'],0,'Il faut que + subjonctif。'],
  ['Je vous appelle pour que vous ___ la réservation.',['puissiez confirmer','pouvez confirmer','pourrez confirmer'],0,'pour que + subjonctif 表达目的。'],
  ['Je veux que nous ___ une solution.',['trouvions','trouverons','trouvons toujours'],0,'vouloir que + subjonctif。'],
  ['Il est important que vous ___ à l’heure.',['soyez','serez','êtes toujours'],0,'高频必要/判断结构 + subjonctif。'],
  ['Quelle phrase exprime le but ?',['Je répète pour que tout le monde comprenne.','Je répète parce que tout le monde comprend.','Je répète donc tout le monde comprend.'],0,'pour que + subjonctif 表达目的。'],
  ['Forme correcte de « avoir » au subjonctif avec nous :',['que nous ayons','que nous avons','que nous aurons'],0,'avoir：que j’aie, que nous ayons。']
 ]},
 {id:'reported',name:'Discours rapporté au présent',level:'B1',use:'转述别人说的话、问题和要求',ex:['Elle dit qu’elle arrive à 18 h.','Il demande si le service est ouvert.'],qs:[
  ['Paul dit : « Je suis prêt. » → Paul dit ___.',['qu’il est prêt','qu’il était toujours prêt hier','si il est prêt'],0,'现在时引述：dire que + proposition。'],
  ['Elle demande : « Le service est ouvert ? » → Elle demande ___.',['si le service est ouvert','que le service est ouvert ?','où le service est ouvert si'],0,'一般疑问句转述常用 demander si。'],
  ['« Où habitez-vous ? » → Il demande ___.',['où vous habitez','où habitez-vous','si où vous habitez'],0,'特殊疑问词保留，语序回到陈述句。'],
  ['Le conseiller explique : « Vous devez confirmer. » → Il explique ___.',['que vous devez confirmer','si vous devez confirmer ?','que devez-vous confirmer'],0,'expliquer que + proposition。'],
  ['Quelle phrase rapporte une information ?',['Elle dit qu’elle arrivera demain.','Elle demande arrivera-t-elle demain.','Elle dit si demain ?'],0,'dire que 用于转述陈述。'],
  ['« Est-ce que vous avez reçu mon mail ? » → Je demande ___.',['si vous avez reçu mon mail','que vous avez reçu mon mail ?','est-ce que vous avez reçu mon mail'],0,'转述是/否问题：demander si。']
 ]}];