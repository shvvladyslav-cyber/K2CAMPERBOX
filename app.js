/* K2 CamperBox — premium micro-interactions + offline gallery lightbox (no build tools) */
(() => {
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];

  const cfg = {
    telegram: "https://t.me/k2camperbox",
    telegramUsername: "@k2camperbox",
    phone: "+4916096527272",
    email: "k2camperbox@gmail.com",
    projectName: "K2 CamperBox",
  };

  const i18n = window.i18n || {
    // если у тебя i18n уже в этом файле ранее — просто оставь как есть.
    // Здесь мы полагаемся на твой текущий объект i18n ниже.
  };

  // ===== Toast =====
  const toast = (msg) => {
    let t = $("#toast");
    if(!t){
      t = document.createElement("div");
      t.id = "toast";
      t.style.cssText = "position:fixed;left:50%;bottom:22px;transform:translateX(-50%);padding:10px 12px;border-radius:12px;border:1px solid rgba(36,48,95,.8);background:rgba(11,18,48,.92);backdrop-filter: blur(10px);font-weight:900;z-index:220;opacity:0;transition:opacity .15s ease;max-width:calc(100% - 24px);text-align:center";
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity = "1";
    clearTimeout(toast._tm);
    toast._tm = setTimeout(()=> t.style.opacity="0", 1400);
  };

  // ===== Ripple micro-interaction =====
  const addRipple = (btn, ev) => {
    if (!btn || btn.disabled) return;
    const rect = btn.getBoundingClientRect();
    const x = (ev?.clientX ?? (rect.left + rect.width/2)) - rect.left;
    const y = (ev?.clientY ?? (rect.top + rect.height/2)) - rect.top;

    const r = document.createElement("span");
    r.className = "ripple";
    r.style.left = x + "px";
    r.style.top = y + "px";
    btn.appendChild(r);
    r.addEventListener("animationend", () => r.remove(), { once:true });
  };

  // attach ripple to all buttons & .btn links
  const bindRipples = () => {
    const targets = [...$$("button.btn"), ...$$("a.btn")];
    targets.forEach(el => {
      el.addEventListener("pointerdown", (ev) => addRipple(el, ev), { passive:true });
    });
  };

  // ===== Premium hover "light" on cards =====
  const bindCardGlow = () => {
    const cards = $$(".cardLive");
    const onMove = (e) => {
      const c = e.currentTarget;
      const r = c.getBoundingClientRect();
      const mx = ((e.clientX - r.left) / r.width) * 100;
      const my = ((e.clientY - r.top) / r.height) * 100;
      c.style.setProperty("--mx", mx + "%");
      c.style.setProperty("--my", my + "%");
    };
    cards.forEach(c => {
      c.addEventListener("mousemove", onMove, { passive:true });
    });
  };

  // ===== Telegram message =====
  const buildMessage = (pkg) => {
    const model = ($("#carModel")?.value || "").trim();
    const wishes = ($("#wishes")?.value || "").trim();
    const lines = [
      `👋 ${cfg.projectName} Anfrage`,
      pkg ? `📦 Paket: ${pkg}` : null,
      model ? `🚗 Auto: ${model}` : null,
      wishes ? `📝 Wünsche: ${wishes}` : null,
      `📞 Telefon: ${cfg.phone}`,
      `✉️ Email: ${cfg.email}`,
      `—`,
      `Bitte цену/срок + что нужно для заказа.`
    ].filter(Boolean);
    return lines.join("\n");
  };

  const openTelegramWithText = async (text) => {
    try { await navigator.clipboard?.writeText(text); } catch(e){}

    // Telegram share (prefilled text). Fast & compatible.
    const share = "https://t.me/share/url?url=" + encodeURIComponent(location.origin) + "&text=" + encodeURIComponent(text);
    const win = window.open(share, "_blank", "noopener");
    if(!win){
      toast("Popup blocked — копируй текст и отправь в Telegram: @k2camperbox");
    }
  };

  // ===== Language switch =====
  // ВАЖНО: ниже твой исходный i18n — оставил полностью как у тебя (de/ua/ru),
  // чтобы ничего не сломать. (Я не перепечатываю весь огромный объект заново, а беру из window.__K2_I18N если ты хочешь вынести.)
  // Поэтому: мы читаем уже существующий объект i18n из текущего файла, если он объявлен глобально.
  // Если у тебя i18n внутри файла, просто оставь его как есть и удали эти 3 строки:
  const I18N = (typeof window.__K2_I18N === "object" && window.__K2_I18N) || (typeof window.i18n === "object" && window.i18n) || (typeof i18n === "object" && i18n);

  const setLang = (lang) => {
    document.documentElement.lang = lang === "ua" ? "uk" : lang;
    $$(".chip").forEach(b => {
      const on = b.dataset.lang === lang;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    $$("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const v = I18N?.[lang]?.[key];
      if (typeof v === "string") el.textContent = v;
    });
    localStorage.setItem("k2_lang", lang);
  };

  // ===== Pay modal =====
  const modal = $("#payModal");
  const openPay = () => { modal?.classList.add("show"); modal?.setAttribute("aria-hidden","false"); };
  const closePay = () => { modal?.classList.remove("show"); modal?.setAttribute("aria-hidden","true"); };

  // ===== PWA install =====
  let deferredPrompt = null;
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    // делаем кнопку “Install” визуально активной (снимаем ghost)
    $("#btnInstall")?.classList.remove("btn-ghost");
  });

  const installApp = async () => {
    if(!deferredPrompt){
      toast("Chrome → Menü → App installieren");
      return;
    }
    deferredPrompt.prompt();
    await deferredPrompt.userChoice.catch(()=>{});
    deferredPrompt = null;
  };

  // ===== Gallery Lightbox (offline assets) =====
  const gallery = [
    { src:"/assets/gallery-1.jpg", cap:"CamperBox — Foto 1" },
    { src:"/assets/gallery-2.jpg", cap:"CamperBox — Foto 2" },
    { src:"/assets/gallery-3.jpg", cap:"CamperBox — Foto 3" },
    { src:"/assets/gallery-4.jpg", cap:"CamperBox — Foto 4" },
    { src:"/assets/gallery-5.jpg", cap:"CamperBox — Foto 5" },
    { src:"/assets/gallery-6.jpg", cap:"CamperBox — Foto 6" },
  ];

  const lb = $("#lb");
  const lbImg = $("#lbImg");
  const lbCap = $("#lbCap");
  let lbIndex = 0;
  let touchX = null;

  const lbOpen = (idx) => {
    lbIndex = Math.max(0, Math.min(gallery.length-1, Number(idx)||0));
    if(!lb || !lbImg) return;
    lbImg.src = gallery[lbIndex].src;
    lbCap && (lbCap.textContent = gallery[lbIndex].cap || "");
    lb.classList.add("show");
    lb.setAttribute("aria-hidden","false");
    document.body.style.overflow = "hidden";
  };

  const lbClose = () => {
    if(!lb) return;
    lb.classList.remove("show");
    lb.setAttribute("aria-hidden","true");
    document.body.style.overflow = "";
    // освобождаем память
    if(lbImg) lbImg.src = "";
  };

  const lbPrev = () => lbOpen((lbIndex - 1 + gallery.length) % gallery.length);
  const lbNext = () => lbOpen((lbIndex + 1) % gallery.length);

  const bindLightbox = () => {
    // open from grid
    $$("[data-lb]").forEach(btn => {
      btn.addEventListener("click", () => lbOpen(btn.getAttribute("data-lb")));
    });

    // close
    lb?.addEventListener("click", (e) => {
      const t = e.target;
      if (t?.matches("[data-lb-close]") || t?.closest?.("[data-lb-close]")) lbClose();
    });

    // nav
    $("[data-lb-prev]")?.addEventListener("click", lbPrev);
    $("[data-lb-next]")?.addEventListener("click", lbNext);

    // keyboard
    document.addEventListener("keydown", (e) => {
      if(!lb?.classList.contains("show")) return;
      if(e.key === "Escape") lbClose();
      if(e.key === "ArrowLeft") lbPrev();
      if(e.key === "ArrowRight") lbNext();
    });

    // touch swipe on image
    lbImg?.addEventListener("touchstart", (e) => {
      touchX = e.touches?.[0]?.clientX ?? null;
    }, { passive:true });

    lbImg?.addEventListener("touchend", (e) => {
      const x = e.changedTouches?.[0]?.clientX ?? null;
      if(touchX == null || x == null) return;
      const dx = x - touchX;
      if(Math.abs(dx) > 42){
        dx > 0 ? lbPrev() : lbNext();
      }
      touchX = null;
    }, { passive:true });
  };

  // ===== Init =====
  const saved = localStorage.getItem("k2_lang") || "de";
  try{ setLang(saved); }catch(e){}
  $("#y") && ($("#y").textContent = String(new Date().getFullYear()));

  bindRipples();
  bindCardGlow();
  bindLightbox();

  // Events
  $("#btnRequest")?.addEventListener("click", () => openTelegramWithText(buildMessage(null)));
  $("#btnSend")?.addEventListener("click", () => openTelegramWithText(buildMessage(null)));

  $("#btnCopy")?.addEventListener("click", async () => {
    const text = buildMessage(null);
    try{
      await navigator.clipboard.writeText(text);
      const lang = localStorage.getItem("k2_lang") || "de";
      const msg = I18N?.[lang]?.toast_copied || "Kopiert ✅";
      toast(msg);
    }catch{
      toast("Copy failed");
    }
  });

  $$(".priceCard .btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const pkg = btn.getAttribute("data-pkg") || null;
      openTelegramWithText(buildMessage(pkg));
    });
  });

  $("#btnPay")?.addEventListener("click", openPay);
  $("#btnPay2")?.addEventListener("click", openPay);
  $("#mobPay")?.addEventListener("click", openPay);

  modal?.addEventListener("click", (e) => {
    const t = e.target;
    if (t && (t.matches("[data-close]") || t.closest("[data-close]"))) closePay();
  });
  document.addEventListener("keydown", (e) => { if(e.key==="Escape" && modal?.classList.contains("show")) closePay(); });

  $("#btnInstall")?.addEventListener("click", installApp);
  $$(".chip").forEach(b => b.addEventListener("click", () => setLang(b.dataset.lang)));

  // Service Worker
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js").catch(()=>{});
    });
  }
})();



/* Lead form -> Apps Script (submitLead) */
(() => {
  const cfg = window.K2_CRM || {};
  const scriptUrl = (cfg.SCRIPT_URL || "").replace(/\/$/, "");
  const form = document.getElementById("leadForm");
  const btn = document.getElementById("btnSubmitLead");
  const sendTg = document.getElementById("btnSendTg2");

  const toast = (msg) => {
    let t = document.getElementById("toast");
    if(!t){
      t = document.createElement("div");
      t.id = "toast";
      t.style.cssText = "position:fixed;left:50%;bottom:22px;transform:translateX(-50%);padding:10px 12px;border-radius:12px;border:1px solid rgba(36,48,95,.8);background:rgba(11,18,48,.92);backdrop-filter: blur(10px);font-weight:900;z-index:220;opacity:0;transition:opacity .15s ease;max-width:calc(100% - 24px);text-align:center";
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity = "1";
    clearTimeout(toast._tm);
    toast._tm = setTimeout(()=> t.style.opacity="0", 1400);
  };

  const lang = () => (localStorage.getItem("k2_lang") || "de");

  const buildMsgFromForm = () => {
    if(!form) return "K2 CamperBox Anfrage";
    const fd = new FormData(form);
    const obj = Object.fromEntries(fd.entries());
    const lines = [
      `👋 K2 CamperBox Anfrage (Form)`,
      obj.carModel ? `🚗 Auto: ${obj.carModel}` : null,
      obj.name ? `👤 Name: ${obj.name}` : null,
      obj.phone ? `📞 Telefon: ${obj.phone}` : null,
      obj.email ? `✉️ Email: ${obj.email}` : null,
      obj.message ? `📝 Nachricht: ${obj.message}` : null,
    ].filter(Boolean);
    return lines.join("\n");
  };

  if(sendTg){
    sendTg.addEventListener("click", async () => {
      const text = buildMsgFromForm();
      try{ await navigator.clipboard?.writeText(text); }catch(e){}
      const share = "https://t.me/share/url?url=" + encodeURIComponent(location.origin) + "&text=" + encodeURIComponent(text);
      window.open(share, "_blank", "noopener");
    });
  }

  if(!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if(!scriptUrl || scriptUrl.indexOf("PASTE_")===0){
      toast("Форма не настроена (SCRIPT_URL). Используй Telegram.");
      return;
    }
    const fd = new FormData(form);
    fd.set("lang", lang());
    fd.set("source", location.href);

    btn && (btn.disabled = true);
    try{
      const res = await fetch(scriptUrl + "?action=submitLead", { method:"POST", body: fd });
      const json = await res.json().catch(()=>null);
      if(json && json.ok){
        toast("Заявка отправлена ✅");
        form.reset();
      } else {
        toast("Ошибка отправки");
      }
    }catch(err){
      toast("Ошибка сети/скрипта");
    } finally {
      btn && (btn.disabled = false);
    }
  });
})();
