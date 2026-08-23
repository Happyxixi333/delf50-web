const FILES=[
  'base/data-a.js','base/data-b1.js','base/data-b2.js',
  'base/app-a1.js','base/app-a2.js','base/app-a3.js','base/app-b.js',
  'v13-p1.js','v13-p2.js','v13-p3.js','v13-p4.js','v13-p5.js','v15-patch.js'
];
const COMMIT='285776d5cc34a0f0f7bb7617425b9b878e2c1889';
async function loadFile(file){
  const url=`https://raw.githubusercontent.com/Happyxixi333/delf50-web/${COMMIT}/${file}`;
  const r=await fetch(url,{headers:{'User-Agent':'DELF50-Vercel'}});
  if(!r.ok)throw new Error(`${file} upstream ${r.status}`);
  return await r.text();
}
module.exports=async function handler(req,res){
  const i=Number(req.query.i);
  if(!Number.isInteger(i)||i<0||i>=FILES.length){res.status(400).send("throw new Error('invalid source index')");return;}
  const file=FILES[i];
  try{
    let text=await loadFile(file);
    text=text.replace(/\btop(?=\s*\()/g,'pageTop').replace(/\btop\s*=\s*function/g,'pageTop=function');
    if(file==='v15-patch.js'){
      text=text.replace("const V15_VERSION='1.5.2';","const V15_VERSION='1.5.3';");
      const depth=await loadFile('v16-depth.js');
      text = "/* DELF50_COMBINED V1.6.0 | reading=24 listening=24 writing=24 speaking=24 application=24 */\n" + text + '\n;\n' + depth;
    }
    new Function(text);
    res.setHeader('Content-Type','application/javascript; charset=utf-8');
    res.setHeader('Cache-Control','public, max-age=300, s-maxage=3600');
    res.status(200).send(text);
  }catch(e){
    res.setHeader('Content-Type','application/javascript; charset=utf-8');
    res.status(500).send(`throw new Error(${JSON.stringify('DELF50 source load failed: '+(e&&e.message||e))})`);
  }
};