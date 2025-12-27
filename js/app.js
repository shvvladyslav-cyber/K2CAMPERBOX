(function(){
const supported=['de','ua','ru'];
const qs=new URLSearchParams(location.search);
let lang=qs.get('lang')||localStorage.getItem('k2_lang')||'de';
if(!supported.includes(lang)) lang='de';
function t(key){return (window.K2_I18N[lang]||window.K2_I18N.de)[key]||key;}
function apply(){
document.querySelectorAll('[data-i18n]').forEach(el=>{el.textContent=t(el.getAttribute('data-i18n'));});
document.querySelectorAll('[data-i18n-href]').forEach(el=>{
const base=el.getAttribute('data-i18n-href');
el.setAttribute('href', base + (base.includes('?')?'&':'?') + 'lang='+lang);
});
document.querySelectorAll('.lang button').forEach(b=>b.classList.toggle('active', b.dataset.lang===lang));
}
function setLang(l){
lang=l; localStorage.setItem('k2_lang',lang);
const url=new URL(location.href); url.searchParams.set('lang',lang);
history.replaceState({},'',url); apply();
}
window.K2_LANG={get:()=>lang,set:setLang,t};
document.addEventListener('click',e=>{const b=e.target.closest('[data-lang]'); if(b){e.preventDefault(); setLang(b.dataset.lang);}});
document.addEventListener('DOMContentLoaded', apply);
})();
