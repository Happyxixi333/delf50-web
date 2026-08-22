const FILES=['base/data-a.js','base/data-b1.js','base/data-b2.js','base/app-a1.js','base/app-a2.js','base/app-a3.js','base/app-b.js','v13-p1.js','v13-p2.js','v13-p3.js','v13-p4.js','v13-p5.js','v15-patch.js'];
const COMMIT='c687c5a651fba1a9d8d80aa102198388fd5718f9';
module.exports=async function handler(req,res){
  const i=Number(req.query.i);
  if(!Number.isInteger(i)||i<0||i>=FILES.length){res.status(400).send("throw new Error('invalid source index')");return;}
  const file=FILES[i];
  try{
    const url=`https://raw.githubusercontent.com/Happyxixi333/delf50-web/${COMMIT}/${file}`;
    const r=await fetch(url,{headers:{'User-Agent':'DELF50-Vercel'}});
    if(!r.ok)throw new Error(`${file} upstream ${r.status}`);
    const text=await r.text();
    new Function(text);
    res.setHeader('Content-Type','application/javascript; charset=utf-8');
    res.setHeader('Cache-Control','public, max-age=300, s-maxage=3600');
    res.status(200).send(text);
  }catch(e){
    res.setHeader('Content-Type','application/javascript; charset=utf-8');
    res.status(500).send(`throw new Error(${JSON.stringify('DELF50 source load failed: '+(e&&e.message||e))})`);
  }
};
