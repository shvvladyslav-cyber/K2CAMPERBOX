/* LEGO-like configurator (front-end only) */
(() => {
  const $ = (s, root=document) => root.querySelector(s);

  const modules = [
    { id:"bed",     icon:"🛏️", name:{de:"Bett-Modul", ua:"Ліжко", ru:"Кровать"},      points:3 },
    { id:"kitchen", icon:"🍳", name:{de:"Küche", ua:"Кухня", ru:"Кухня"},            points:4 },
    { id:"storage", icon:"📦", name:{de:"Stauraum", ua:"Зберігання", ru:"Хранение"}, points:2 },
    { id:"table",   icon:"🪑", name:{de:"Tisch/Auszug", ua:"Стіл", ru:"Стол"},       points:2 },
    { id:"water",   icon:"🚰", name:{de:"Wasser", ua:"Вода", ru:"Вода"},             points:2 },
    { id:"power",   icon:"🔋", name:{de:"12V/Power", ua:"Живлення", ru:"Питание"},   points:3 },
    { id:"light",   icon:"💡", name:{de:"Licht", ua:"Світло", ru:"Свет"},            points:1 },
    { id:"fridge",  icon:"🧊", name:{de:"Kühlbox", ua:"Холод", ru:"Холод"},          points:3 },
  ];

  const lang = () => (localStorage.getItem("k2_lang") || "de");
  const tName = (m) => m.name[lang()] || m.name.de;

  const state = { selected: [] };

  const renderModules = () => {
    const host = $("#moduleList");
    host.innerHTML = "";
    modules.forEach(m => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "lego";
      b.innerHTML = `<div class="legoIcon">${m.icon}</div><div class="legoName">${tName(m)}</div>`;
      b.addEventListener("click", () => add(m.id));
      host.appendChild(b);
    });
  };

  const add = (id) => {
    if(state.selected.includes(id)) return;
    state.selected.push(id);
    renderBuild();
  };

  const remove = (id) => {
    state.selected = state.selected.filter(x => x !== id);
    renderBuild();
  };

  const estimate = () => {
    const pts = state.selected.map(id => modules.find(m=>m.id===id)?.points||0).reduce((a,b)=>a+b,0);
    if(pts<=2) return "€ — (Start)";
    if(pts<=5) return "€€ — (Comfort)";
    return "€€€ — (Pro)";
  };

  const renderBuild = () => {
    const host = $("#build");
    host.innerHTML = "";
    state.selected.forEach(id => {
      const m = modules.find(x=>x.id===id);
      const chip = document.createElement("div");
      chip.className = "buildItem";
      chip.innerHTML = `<span class="biIcon">${m.icon}</span><span class="biText">${tName(m)}</span><button class="x biX" type="button">✕</button>`;
      chip.querySelector(".biX").addEventListener("click", ()=>remove(id));
      host.appendChild(chip);
    });
    $("#count").textContent = String(state.selected.length);
    $("#est").textContent = estimate();
  };

  const buildMessage = () => {
    const vehicle = $("#vehicle").value;
    const notes = ($("#notes").value||"").trim();
    const list = state.selected.map(id => tName(modules.find(m=>m.id===id))).join(", ") || "—";
    return [
      "🧩 K2 CamperBox — Конфигуратор",
      `🚗 Авто: ${vehicle}`,
      `🧱 Модули: ${list}`,
      notes ? `📝 Пожелания: ${notes}` : null,
      "—",
      "Прошу цену/срок и что нужно для заказа."
    ].filter(Boolean).join("\n");
  };

  const sendTelegram = () => {
    const msg = buildMessage();
    navigator.clipboard?.writeText(msg).catch(()=>{});
    window.open("https://t.me/k2camperbox","_blank","noopener");
  };

  $("#btnSendTelegram")?.addEventListener("click", sendTelegram);
  $("#mobSend")?.addEventListener("click", sendTelegram);
  $("#btnCopy")?.addEventListener("click", async () => {
    try{ await navigator.clipboard.writeText(buildMessage()); }catch(e){}
  });

  // extra CSS for lego
  const css = document.createElement("style");
  css.textContent = `
    .legoGrid{display:grid;grid-template-columns:1fr;gap:10px;margin-top:10px}
    @media(min-width:900px){.legoGrid{grid-template-columns:1fr}}
    .lego{display:flex;gap:10px;align-items:center;text-align:left;cursor:pointer;
      border:1px solid rgba(36,48,95,.75);background: rgba(11,18,48,.45);
      border-radius:18px;padding:12px 12px;font-weight:900;color:rgba(233,236,255,.92)}
    .lego:hover{border-color: rgba(0,212,255,.65)}
    .legoIcon{font-size:20px}
    .legoName{font-size:14px}
    .build{display:flex;flex-wrap:wrap;gap:10px;margin-top:10px}
    .buildItem{display:flex;gap:8px;align-items:center;
      border:1px solid rgba(36,48,95,.75);background: rgba(7,10,23,.35);
      padding:10px 10px;border-radius:999px}
    .biIcon{font-size:16px}
    .biText{font-weight:900;font-size:13px}
    .biX{margin-left:6px}
  `;
  document.head.appendChild(css);

  renderModules();
  renderBuild();
})();
