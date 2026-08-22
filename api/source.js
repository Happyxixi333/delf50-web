const FILES=[
  'base/data-a.js','base/data-b1.js','base/data-b2.js',
  'base/app-a1.js','base/app-a2.js','base/app-a3.js','base/app-b.js',
  'v13-p1.js','v13-p2.js','v13-p3.js','v13-p4.js','v13-p5.js','v15-patch.js'
];
const COMMIT='0988ca037fae684f983177a18426dd8857c84a2f';
module.exports=async function handler(req,res){
  const i=Number(req.query.i);
  if(!Number.isInteger(i)||i<0||i>=FILES.length){res.status(400).send("throw new Error('invalid source index')");return;}
  const file=FILES[i];
  try{
    const url=`https://raw.githubusercontent.com/Happyxixi333/delf50-web/${COMMIT}/${file}`;
    const r=await fetch(url,{headers:{'User-Agent':'DELF50-Vercel'}});
    if(!r.ok)throw new Error(`${file} upstream ${r.status}`);
    let text=await r.text();
    text=text.replace(/\btop(?=\s*\()/g,'pageTop').replace(/\btop\s*=\s*function/g,'pageTop=function');
    if(file==='v15-patch.js')text=text.replace("const V15_VERSION='1.5.2';","const V15_VERSION='1.5.3';");
    new Function(text);
    res.setHeader('Content-Type','application/javascript; charset=utf-8');
    res.setHeader('Cache-Control','public, max-age=300, s-maxage=3600');
    res.status(200).send(text);
  }catch(e){
    res.setHeader('Content-Type','application/javascript; charset=utf-8');
    res.status(500).send(`throw new Error(${JSON.stringify('DELF50 source load failed: '+(e&&e.message||e))})`);
  }
};