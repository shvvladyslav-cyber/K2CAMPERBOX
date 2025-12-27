(function(){
const cfg=window.K2_CONFIG||{};
const $=s=>document.querySelector(s);
const form=$('#orderForm'); const totalEl=$('#total'); const modelEl=$('#model');
const extrasEls=[...document.querySelectorAll('input[name="extras"]')];
function modelPrice(m){return m==='basic'?329:m==='comfort'?549:799;}
function extrasTotal(){return extrasEls.filter(x=>x.checked).reduce((s,x)=>s+Number(x.dataset.price||0),0);}
function recalc(){
const base=modelPrice(modelEl.value); const total=base+extrasTotal(); totalEl.textContent=String(Math.round(total));
$('#payBasic').href=cfg.STRIPE_LINK_BASIC||'#'; $('#payComfort').href=cfg.STRIPE_LINK_COMFORT||'#'; $('#payPro').href=cfg.STRIPE_LINK_PRO||'#';
$('#payExtraMattress').href=cfg.STRIPE_LINK_EXTRA_MATTRESS||'#'; $('#payExtraBag').href=cfg.STRIPE_LINK_EXTRA_BAG||'#'; $('#payExtraFast').href=cfg.STRIPE_LINK_EXTRA_FASTKIT||'#';
}
async function submit(e){
e.preventDefault();
const gas=cfg.GAS_WEBAPP_URL;
if(!gas||gas.includes('PASTE_')){alert('Set GAS_WEBAPP_URL in config.js first.'); return;}
const data={
ts:new Date().toISOString(),
lang:(window.K2_LANG&&window.K2_LANG.get())||'de',
name:$('#name').value.trim(), email:$('#email').value.trim(), phone:$('#phone').value.trim(),
car:$('#car').value.trim(), year:$('#year').value.trim(), city:$('#city').value.trim(),
model:modelEl.value, invoice:$('#invoice').checked?'yes':'no',
extras:extrasEls.filter(x=>x.checked).map(x=>x.value),
total:Number(totalEl.textContent||0)
};
$('#submitBtn').disabled=true;
try{
const res=await fetch(gas,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
const j=await res.json().catch(()=>({ok:false}));
if(!res.ok||!j.ok) throw new Error(j.error||('HTTP '+res.status));
const url=new URL('success.html',location.href); url.searchParams.set('order',j.order_id||''); url.searchParams.set('lang',data.lang);
location.href=url.toString();
}catch(err){alert('Submit failed: '+err.message);}finally{$('#submitBtn').disabled=false;}
}
document.addEventListener('DOMContentLoaded',()=>{
modelEl.addEventListener('change',recalc); extrasEls.forEach(x=>x.addEventListener('change',recalc));
form.addEventListener('submit',submit); recalc();
});
})();
