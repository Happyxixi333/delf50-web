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
async function loadAt(commit,file){
  const url=`https://raw.githubusercontent.com/Happyxixi333/delf50-web/${commit}/${file}`;
  const r=await fetch(url,{headers:{'User-Agent':'DELF50-Vercel'}});
  if(!r.ok)throw new Error(`${file} upstream ${r.status}`);
  return await r.text();
}
module.exports=async function handler(req,res){
  const i=Number(req.query.i);
  if(!Number.isInteger(i)||i<0||i>=FILES.length){res.status(400).send("throw new Error('invalid source index')");return;}
  const file=FILES[i];
  try{
    let text=await loadAt(BASE_COMMIT,file);
    text=text.replace(/\btop(?=\s*\()/g,'pageTop').replace(/\btop\s*=\s*function/g,'pageTop=function');
    if(file==='v15-patch.js'){
      text=text.replace("const V15_VERSION='1.5.2';","const V15_VERSION='1.5.3';");
      const depth=await loadAt(BASE_COMMIT,'v16-depth.js');
      const pedagogy=await loadAt(V17_COMMIT,'v17-pedagogy.js');
      const manual=await loadAt(V171_COMMIT,'v171-user-manual.js');
      const architecture=await loadAt(V172_COMMIT,'v172-compat-architecture.js');
      const archive=await loadAt(V173_COMMIT,'v173-learning-archive.js');
      text = "/* DELF50_BUNDLE App=1.7.3 Schema=2 Content=1.7.0 | curriculum=50 provenance=100% autosave=verified compatibility=locked archive=read-only */\n" + text + '\n;\n' + depth + '\n;\n' + pedagogy + '\n;\n' + manual + '\n;\n' + architecture + '\n;\n' + archive;
    }
    new Function(text);
    res.setHeader('Content-Type','application/javascript; charset=utf-8');
    res.setHeader('Cache-Control','public, max-age=300, s-maxage=3600');
    res.setHeader('X-DELF50-App','1.7.3');
    res.setHeader('X-DELF50-Schema','2');
    res.setHeader('X-DELF50-Content','1.7.0');
    res.setHeader('X-DELF50-Archive','read-only');
    res.status(200).send(text);
  }catch(e){
    res.setHeader('Content-Type','application/javascript; charset=utf-8');
    res.status(500).send(`throw new Error(${JSON.stringify('DELF50 source load failed: '+(e&&e.message||e))})`);
  }
};