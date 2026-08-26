const FILES=[
  'base/data-a.js','base/data-b1.js','base/data-b2.js',
  'base/app-a1.js','base/app-a2.js','base/app-a3.js','base/app-b.js',
  'v13-p1.js','v13-p2.js','v13-p3.js','v13-p4.js','v13-p5.js','v15-patch.js'
];
const BASE_COMMIT='285776d5cc34a0f0f7bb7617425b9b878e2c1889';
const V17_COMMIT='3fa5017b5e8e1acdc053259ebc04c1b7dd5e6c30';
const V171_COMMIT='25ee5748b7b2ea95b063b43778ad9a7ecea26607';
const V172_COMMIT='3486c9cae6de93c3c3787caddfe4f88844564bb7';
const V173_COMMIT='895d2813d9b5067e2100eb00bae6a02466d79535';
const V174_NAV_COMMIT='03acc2dd00a44f38c97b7380b068ff00d9194f96';
const V174_GUIDE_COMMIT='3cb40191ea1bb3f8cd718cb0c7450a62e11f84d2';
const V175_ROUTING_COMMIT='692c398bb6243730b651b1bc420390ff03c719f6';
const V176_COMMIT='4111eb1858a5c968664b790d4b817208141b234a';
const V176_REPAIR_COMMIT='e738409c7337314ed8443eea598a3f58f3ec226e';
const V177_COMMIT='25b16845975c6d4fd7b14d5496ef590755c2c957';
const V178_COMMIT='386456579ad345dec9c3eb503ff47edc80add3ad';
const V180_COMMIT='2c3cedcf1146317b02b0f92a0b0f0dd8360b8b03';
const V180_FINAL_COMMIT='d06c81152e32edc1f39bc05b02bdb8c70e147d99';
const V181_COMMIT='8174cbfd9687b2705e9ac385cd842843177ad6f6';
async function loadAt(commit,file){
  const url=`https://raw.githubusercontent.com/Happyxixi333/delf50-web/${commit}/${file}`;
  const r=await fetch(url,{headers:{'User-Agent':'DELF50-Vercel'}});
  if(!r.ok)throw new Error(`${file} upstream ${r.status}`);
  return await r.text();
}
async function loadSeeds181(){
  const dir=`https://api.github.com/repos/Happyxixi333/delf50-web/contents/content/seeds-v181?ref=${V181_COMMIT}`;
  const r=await fetch(dir,{headers:{'User-Agent':'DELF50-Vercel','Accept':'application/vnd.github+json'}});
  if(!r.ok)throw new Error(`seed directory upstream ${r.status}`);
  const entries=await r.json();
  const files=(Array.isArray(entries)?entries:[]).filter(x=>x&&x.type==='file'&&/\.json$/i.test(x.name)).sort((a,b)=>a.name.localeCompare(b.name));
  if(files.length!==18)throw new Error(`V1.8.1 seed family count ${files.length}, expected 18`);
  const families=await Promise.all(files.map(async x=>{
    const raw=await loadAt(V181_COMMIT,x.path);
    let f;try{f=JSON.parse(raw)}catch(e){throw new Error(`${x.path} invalid JSON`)}
    if(!f||!f.familyId||!f.authority||!f.url||!f.licence||!f.verifiedAt||!Array.isArray(f.items)||f.items.length!==10)throw new Error(`${x.path} invalid seed family schema`);
    return f;
  }));
  const familyIds=new Set(),seedIds=new Set(),facts=new Set(),seeds=[];
  for(const f of families){
    if(familyIds.has(f.familyId))throw new Error(`duplicate family ${f.familyId}`);familyIds.add(f.familyId);
    for(const it of f.items){
      if(!it||!it.sourceSeedId||!it.angle||!it.factFr||!Array.isArray(it.functions)||!Array.isArray(it.lexicon))throw new Error(`invalid seed in ${f.familyId}`);
      if(seedIds.has(it.sourceSeedId))throw new Error(`duplicate seed ${it.sourceSeedId}`);seedIds.add(it.sourceSeedId);
      const fact=String(it.factFr).toLowerCase().replace(/\s+/g,' ').trim();if(facts.has(fact))throw new Error(`duplicate seed fact ${it.sourceSeedId}`);facts.add(fact);
      seeds.push({...it,familyId:f.familyId,authority:f.authority,url:f.url,licence:f.licence,verifiedAt:f.verifiedAt,theme:f.theme});
    }
  }
  if(seeds.length!==180)throw new Error(`V1.8.1 seed count ${seeds.length}, expected 180`);
  return{seeds,families:families.length};
}
module.exports=async function handler(req,res){
  const i=Number(req.query.i);
  if(!Number.isInteger(i)||i<0||i>=FILES.length){res.status(400).send("throw new Error('invalid source index')");return;}
  const file=FILES[i];
  try{
    let text=await loadAt(BASE_COMMIT,file);
    text=text.replace(/\btop(?=\s*\()/g,'pageTop').replace(/\btop\s*=\s*function/g,'pageTop=function');
    let seedInfo=null;
    if(file==='v15-patch.js'){
      text=text.replace("const V15_VERSION='1.5.2';","const V15_VERSION='1.5.3';");
      const [depth,pedagogy,manual,architecture,archive,grammarGuides,navigation,dayRouting,v176,repair,v177,v180,v178,v180final,v181,seeds181]=await Promise.all([
        loadAt(BASE_COMMIT,'v16-depth.js'),loadAt(V17_COMMIT,'v17-pedagogy.js'),loadAt(V171_COMMIT,'v171-user-manual.js'),loadAt(V172_COMMIT,'v172-compat-architecture.js'),loadAt(V173_COMMIT,'v173-learning-archive.js'),loadAt(V174_GUIDE_COMMIT,'content/grammar-guides-v174.js'),loadAt(V174_NAV_COMMIT,'v174-navigation.js'),loadAt(V175_ROUTING_COMMIT,'v175-day-content-routing.js'),loadAt(V176_COMMIT,'v176-day2-lifecycle-ui.js'),loadAt(V176_REPAIR_COMMIT,'v176-day2-reading-repair.js'),loadAt(V177_COMMIT,'v177-global-unique-routing.js'),loadAt(V180_COMMIT,'v180-authoritative-volume.js'),loadAt(V178_COMMIT,'v178-full-question-audit.js'),loadAt(V180_FINAL_COMMIT,'v180-finalize.js'),loadAt(V181_COMMIT,'v181-source-driven-content.js'),loadSeeds181()
      ]);
      seedInfo=seeds181;
      const seedBootstrap=`globalThis.__DELF50_SOURCE_SEEDS_V181=${JSON.stringify(seeds181.seeds)};`;
      const uiVersionBootstrap="if(typeof S!=='undefined'){S.version='1.8.1';}if(typeof render==='function'){render();}";
      text = "/* DELF50_BUNDLE App=1.8.1 Schema=2 Content=1.8.1 | curriculum=50 provenance=100% autosave=verified compatibility=locked archive=read-only pagination=separate-cursor grammar-guides=18 day-routing=source-driven-v1 lifecycle=completion-lock-v1 grammar-ui=lean-v1 day2-reading-repair=precise-v1 day3-correction=source-driven-upgrade no-repeat-audit=full-question-audit-v1 volume=8h-50d-core-v1 source-seeds=180 source-families=18 */\n" + text + '\n;\n' + depth + '\n;\n' + pedagogy + '\n;\n' + manual + '\n;\n' + architecture + '\n;\n' + archive + '\n;\n' + grammarGuides + '\n;\n' + navigation + '\n;\n' + dayRouting + '\n;\n' + v176 + '\n;\n' + repair + '\n;\n' + v177 + '\n;\n' + v180 + '\n;\n' + v178 + '\n;\n' + v180final + '\n;\n' + seedBootstrap + '\n;\n' + v181 + '\n;\n' + uiVersionBootstrap;
    }
    new Function(text);
    res.setHeader('Content-Type','application/javascript; charset=utf-8');
    res.setHeader('Cache-Control','public, max-age=300, s-maxage=3600');
    res.setHeader('X-DELF50-App','1.8.1');
    res.setHeader('X-DELF50-Schema','2');
    res.setHeader('X-DELF50-Content','1.8.1');
    res.setHeader('X-DELF50-Archive','read-only');
    res.setHeader('X-DELF50-Navigation','separate-cursor');
    res.setHeader('X-DELF50-Grammar-Guides','18');
    res.setHeader('X-DELF50-Day-Routing','source-driven-v1');
    res.setHeader('X-DELF50-Lifecycle','completion-lock-v1');
    res.setHeader('X-DELF50-Grammar-UI','lean-v1');
    res.setHeader('X-DELF50-Day2-Reading-Repair','precise-v1');
    res.setHeader('X-DELF50-Day3-Correction','source-driven-upgrade');
    res.setHeader('X-DELF50-No-Repeat-Audit','full-question-audit-v1');
    res.setHeader('X-DELF50-Volume','8h-50d-core-v1');
    if(seedInfo){res.setHeader('X-DELF50-Source-Seeds',String(seedInfo.seeds.length));res.setHeader('X-DELF50-Source-Families',String(seedInfo.families));}
    res.status(200).send(text);
  }catch(e){
    res.setHeader('Content-Type','application/javascript; charset=utf-8');
    res.status(500).send(`throw new Error(${JSON.stringify('DELF50 source load failed: '+(e&&e.message||e))})`);
  }
};