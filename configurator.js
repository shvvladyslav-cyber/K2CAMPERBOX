/* K2 Configurator 2.0: standalone static frontend; no changes to CRM or payments. */
(()=>{"use strict";
const $=id=>document.getElementById(id);
const dict={
de:{heading:"K2 Konfigurator 2.0",subtitle:"Modulare Ausstattung mit unverbindlicher Preisindikation",vehicle:"Fahrzeug",year:"Baujahr",version:"Karosserie / Version",pack:"Paket",modules:"Optionen hinzufügen / entfernen",build:"Deine Konfiguration",count:"Module",price:"Preisindikation",notes:"Bemerkungen",fit:"Kompatibilität und Befestigung müssen für das genaue Fahrzeug geprüft werden.",note:"Unverbindliche Modellpreise, kein verbindliches Angebot. Ausstattung und Einbau nach Prüfung.",saved:"Konfiguration lokal gespeichert",copied:"Konfiguration kopiert",error:"Kopieren nicht möglich",send:"Telegram öffnen",copy:"Kopieren",save:"Speichern"},
ua:{heading:"K2 Конфігуратор 2.0",subtitle:"Модульна комплектація з попереднім розрахунком",vehicle:"Автомобіль",year:"Рік випуску",version:"Кузов / версія",pack:"Комплектація",modules:"Додати / прибрати опції",build:"Ваш комплект",count:"Модулі",price:"Орієнтовна ціна",notes:"Побажання",fit:"Сумісність та кріплення перевіряються для конкретного авто.",note:"Орієнтовні ціни, не публічна оферта. Після перевірки авто.",saved:"Збережено на пристрої",copied:"Скопійовано",error:"Не вдалося скопіювати",send:"Відкрити Telegram",copy:"Копіювати",save:"Зберегти"},
ru:{heading:"K2 Конфигуратор 2.0",subtitle:"Модульная комплектация с предварительным расчётом",vehicle:"Автомобиль",year:"Год выпуска",version:"Кузов / версия",pack:"Комплектация",modules:"Добавить / убрать опции",build:"Ваша сборка",count:"Модули",price:"Ориентировочная цена",notes:"Пожелания",fit:"Совместимость и крепление проверяются для конкретного автомобиля.",note:"Предварительные цены, не оферта. Комплектация после проверки авто.",saved:"Сохранено на устройстве",copied:"Скопировано",error:"Не удалось скопировать",send:"Открыть Telegram",copy:"Копировать",save:"Сохранить"}};
const modules=[
{id:"frame",icon:"🧱",price:299,n:{de:"Grundrahmen",ua:"Каркас",ru:"Каркас"}},
{id:"bed",icon:"🛏️",price:350,n:{de:"Faltbett",ua:"Ліжко",ru:"Кровать"}},
{id:"storage",icon:"📦",price:150,n:{de:"Stauraum",ua:"Зберігання",ru:"Хранение"}},
{id:"kitchen",icon:"🍳",price:450,n:{de:"Küchenmodul",ua:"Кухня",ru:"Кухня"}},
{id:"table",icon:"🪑",price:150,n:{de:"Klapptisch",ua:"Стіл",ru:"Стол"}},
{id:"water",icon:"🚰",price:149,n:{de:"Wassersystem",ua:"Водяна система",ru:"Система воды"}},
{id:"power",icon:"🔋",price:499,n:{de:"Powerstation",ua:"Електростанція",ru:"Электростанция"}},
{id:"light",icon:"💡",price:89,n:{de:"Beleuchtung",ua:"Освітлення",ru:"Освещение"}},
{id:"fridge",icon:"🧊",price:349,n:{de:"Kühlbox",ua:"Холодильник",ru:"Холодильник"}}];
const bundles={basic:["frame","bed","storage"],comfort:["frame","bed","storage","kitchen","table"],premium:["frame","bed","storage","kitchen","table","water","light"]};
const prices={basic:799,comfort:1399,premium:2199};
let lang=localStorage.getItem("k2_lang")||"de",pkg="basic",extras=[];
const money=n=>new Intl.NumberFormat("de-DE",{style:"currency",currency:"EUR"}).format(n);
const label=m=>m.n[lang]||m.n.de;
const all=()=>[...new Set([...bundles[pkg],...extras])];
function render(){
const t=dict[lang]||dict.de;
for(const [key,id] of Object.entries({heading:"heading",subtitle:"subtitle",vehicle:"lblVehicle",year:"lblYear",version:"lblVersion",pack:"lblPackage",modules:"lblModules",build:"lblBuild",count:"lblCount",price:"lblPrice",notes:"lblNotes",fit:"fitWarning",note:"priceNote",send:"btnSendTelegram",copy:"btnCopy",save:"btnSave"}))$(id).textContent=t[key];
$("moduleList").replaceChildren();
modules.forEach(m=>{const fixed=bundles[pkg].includes(m.id),active=fixed||extras.includes(m.id);const b=document.createElement("button");b.type="button";b.className="lego";b.setAttribute("aria-pressed",String(active));b.disabled=fixed;b.textContent=`${m.icon} ${label(m)} ${fixed?"✓":money(m.price)} ${active&&!fixed?"✓":""}`;b.onclick=()=>{extras=active?extras.filter(x=>x!==m.id):[...extras,m.id];render()};$("moduleList").append(b)});
$("build").replaceChildren();all().forEach(id=>{const m=modules.find(x=>x.id===id);const chip=document.createElement("span");chip.className="buildItem";chip.textContent=`${m.icon} ${label(m)}`;$("build").append(chip)});
$("count").textContent=all().length;$("est").textContent=money(prices[pkg]+extras.reduce((a,id)=>a+modules.find(x=>x.id===id).price,0));
document.querySelectorAll("[data-lang]").forEach(b=>{b.classList.toggle("active",b.dataset.lang===lang);b.setAttribute("aria-pressed",String(b.dataset.lang===lang))});
}
function snapshot(){return {vehicle:$("vehicle").value,year:$("year").value,version:$("version").value,package:pkg,extras:[...extras],notes:$("notes").value,total:prices[pkg]+extras.reduce((a,id)=>a+modules.find(x=>x.id===id).price,0)}}
function message(){const s=snapshot();return `K2 CamperBox 2.0\nAuto: ${s.vehicle||"—"}\nYear: ${s.year||"—"}\nVersion: ${s.version||"—"}\nPackage: ${s.package}\nModules: ${all().map(id=>modules.find(m=>m.id===id).n.de).join(", ")}\nEstimate: ${money(s.total)}\nNotes: ${s.notes}\nCompatibility: pending confirmation.`}
$("package").onchange=e=>{pkg=e.target.value;extras=extras.filter(id=>!bundles[pkg].includes(id));render()};
document.querySelectorAll("[data-lang]").forEach(b=>b.onclick=()=>{lang=b.dataset.lang;localStorage.setItem("k2_lang",lang);render()});
$("btnCopy").onclick=async()=>{try{await navigator.clipboard.writeText(message());$("status").textContent=dict[lang].copied}catch{$("status").textContent=dict[lang].error}};
$("btnSendTelegram").onclick=()=>{window.open("https://t.me/k2camperbox","_blank","noopener,noreferrer")};
$("btnSave").onclick=()=>{localStorage.setItem("k2_config_v2",JSON.stringify(snapshot()));$("status").textContent=dict[lang].saved};
try{const s=JSON.parse(localStorage.getItem("k2_config_v2")||"null");if(s&&prices[s.package]){pkg=s.package;extras=(s.extras||[]).filter(id=>modules.some(m=>m.id===id)&&!bundles[pkg].includes(id));$("package").value=pkg;for(const k of ["vehicle","year","version","notes"])if(typeof s[k]==="string")$(k).value=s[k]}}catch{}
const style=document.createElement("style");style.textContent=".legoGrid{display:grid;gap:8px;margin-top:12px}.lego{padding:12px;text-align:left;border-radius:12px;background:#15203a;color:#fff;border:1px solid #34435f;cursor:pointer}.lego[aria-pressed=true]{border-color:#45b9bf}.lego:disabled{opacity:.7;cursor:default}.build{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}.buildItem{padding:8px;border:1px solid #46506a;border-radius:18px;font-size:13px}.card .label{display:block;margin:12px 0 6px}";document.head.append(style);render();
})();