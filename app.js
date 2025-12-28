/* K2 CamperBox — premium landing logic (fast, no libs)
   - i18n (DE/UA/RU)
   - Premium buttons: ripple + hover shine
   - Telegram + copy
   - PWA install
   - Revolut QR modal
   - Premium gallery + lightbox (keyboard + swipe)
   - Reveal-on-scroll micro motion
*/

(() => {
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];

  const cfg = {
    telegram: "https://t.me/k2camperbox",
    telegramUsername: "@k2camperbox",
    phone: "+4916096527272",
    email: "k2camperbox@gmail.com",
    projectName: "K2 CamperBox"
  };

  const i18n = {
    de: {
      nav_models:"Modelle", nav_packages:"Pakete", nav_gallery:"Galerie", nav_faq:"FAQ", nav_contact:"Kontakt",
      hero_badge:"🇩🇪 Kassel • Deutschland • Lieferung/Einbau",
      hero_title:"K2 CamperBox — dein Auto in 5 Minuten zum Camper",
      hero_lead:"Modulares Camping-System für Hochdachkombis (Caddy / Berlingo / Combo / Doblo / Tourneo / …). Schnell anfragen in Telegram + bequeme Bezahlung über Revolut QR.",
      cta_request:"Anfrage in Telegram", cta_pay:"Revolut QR bezahlen", cta_install:"App installieren",
      mini_1_k:"Schnell", mini_1_v:"Aufbau 5–10 Min",
      mini_2_k:"Modular", mini_2_v:"Boxen / Bett / Küche",
      mini_3_k:"Praktisch", mini_3_v:"Für Alltag & Reise",
      hero_card_title:"Sofort-Angebot", hero_card_pill:"Heute antworten",
      hero_card_model:"Auto/Modell", hero_card_wishes:"Wünsche",
      hero_card_send:"In Telegram senden", hero_card_copy:"Text kopieren",
      hero_card_hint:"Tipp: Wenn Telegram nicht öffnet — kopiere den Text und sende ihn an @k2camperbox.",
      stat_1:"3 Sprachen", stat_2:"als App installierbar", stat_3:"Revolut Bezahlung",
      models_title:"Für welche Autos?", models_sub:"Hochdachkombis & kompakte Vans — wir passen das Modul an.",
      models_1:"Caddy / Caddy Maxi — Alltag + Reise.",
      models_2:"Berlingo / Rifter / Partner — modulare Boxen.",
      models_3:"Combo / Doblo / Tourneo / Kangoo / …",
      packages_title:"Pakete", packages_sub:"Beispiele. Endpreis hängt vom Auto und den Optionen ab.",
      pkg_1_name:"Start", pkg_1_a:"Bettplatte + Grund-Boxen", pkg_1_b:"Schneller Ein-/Ausbau", pkg_1_c:"Leicht & stabil",
      pkg_2_name:"Comfort", pkg_2_a:"Mehr Stauraum + Orga", pkg_2_b:"Matratze / Polster-Set", pkg_2_c:"Option: Auszug-Tisch",
      pkg_3_name:"Pro", pkg_3_a:"Küchen-Modul + Wasser", pkg_3_b:"12V / Power-Optionen", pkg_3_c:"Individuelle Anpassung",
      pkg_btn:"Anfragen",
      faq_title:"FAQ", faq_sub:"Kurz & ehrlich — für Einsteiger.",
      faq_q1:"Wie schnell kann ich bestellen?", faq_a1:"Schreib in Telegram, wir klären Auto + Optionen. Danach bekommst du Preis & срок.",
      faq_q2:"Kann ich mit Revolut bezahlen?", faq_a2:"Ja. Klicke „Revolut QR bezahlen“ — QR öffnet sich. In Revolut scannen und zahlen.",
      faq_q3:"App installieren?", faq_a3:"Öffne die Website in Chrome → „App installieren“. Oder klicke den Button „App installieren“.",
      contact_title:"Kontakt", contact_sub:"Alles klickbar: Telegram • Telefon • Email • Zahlung.",
      contact_phone:"Telefon", contact_pay:"Bezahlen", contact_pay_sub:"Revolut QR",
      footer_top:"Nach oben",
      pay_title:"Revolut QR bezahlen", pay_hint:"Revolut öffnen → Scan → QR scannen → bezahlen.",
      pay_to:"Empfänger:", pay_note:"Kommentar:", pay_replace:"Wichtig: Das ist ein Demo-QR. Ersetze /assets/revolut-qr.png mit deinem echten Revolut-QR.",
      pay_download:"QR herunterladen", pay_close:"Schließen",
      toast_copied:"Kopiert ✅",
      form_title:"Anfrage-Formular",
      form_sub:"Sende Anfrage direkt in Google Sheets (Apps Script).",
      f_name:"Name", f_phone:"Telefon", f_email:"Email", f_car:"Auto/Modell", f_msg:"Nachricht",
      f_send:"In Sheets senden", f_open_crm:"Mini-CRM öffnen", f_send_tg:"Oder in Telegram senden",
      f_hint:"Damit das Formular funktioniert: Apps Script URL in crm-config.js eintragen. Sonst nutze Telegram.",
      nav_cfg:"Konfigurator", nav_cab:"Cabinet",
      mob_request:"Anfrage", mob_pay:"QR", mob_cfg:"LEGO", mob_cab:"Cabinet",
      gallery_premium_title:"Reale Beispiele CamperBox",
      gallery_premium_sub:"Tippe auf ein Foto — öffnet sich красивый Lightbox.",
      gallery_note_premium:"Dateien: /assets/gallery-1.jpg … /assets/gallery-4.jpg. Du kannst sie ohne Code-Änderung ersetzen."
    },
    ua: {
      nav_models:"Авто", nav_packages:"Пакети", nav_gallery:"Галерея", nav_faq:"FAQ", nav_contact:"Контакти",
      hero_badge:"🇩🇪 Кассель • Німеччина • Доставка/монтаж",
      hero_title:"K2 CamperBox — перетвори авто на кемпер за 5 хвилин",
      hero_lead:"Модульна система для мінівенів/«каблучків» (Caddy / Berlingo / Combo / Doblo / Tourneo / …). Швидка заявка в Telegram + оплата через Revolut QR.",
      cta_request:"Заявка в Telegram", cta_pay:"Оплатити Revolut QR", cta_install:"Встановити додаток",
      mini_1_k:"Швидко", mini_1_v:"Монтаж 5–10 хв",
      mini_2_k:"Модульно", mini_2_v:"Бокси / ліжко / кухня",
      mini_3_k:"Зручно", mini_3_v:"Для міста й подорожей",
      hero_card_title:"Швидкий запит", hero_card_pill:"Відповімо сьогодні",
      hero_card_model:"Авто/модель", hero_card_wishes:"Побажання",
      hero_card_send:"Надіслати в Telegram", hero_card_copy:"Скопіювати текст",
      hero_card_hint:"Порада: якщо Telegram не відкрився — скопіюй текст і надішли @k2camperbox.",
      stat_1:"3 мови", stat_2:"можна встановити як App", stat_3:"оплата Revolut",
      models_title:"Для яких авто?", models_sub:"«Каблучки» та компактні вени — адаптуємо під твоє авто.",
      models_1:"Caddy / Caddy Maxi — місто + подорож.",
      models_2:"Berlingo / Rifter / Partner — модульні бокси.",
      models_3:"Combo / Doblo / Tourneo / Kangoo / …",
      packages_title:"Пакети", packages_sub:"Приклади. Фінальна ціна залежить від авто та опцій.",
      pkg_1_name:"Start", pkg_1_a:"Основа-ліжко + базові бокси", pkg_1_b:"Швидкий монтаж/демонтаж", pkg_1_c:"Легко та міцно",
      pkg_2_name:"Comfort", pkg_2_a:"Більше зберігання + органайзери", pkg_2_b:"Матрац / комплект подушок", pkg_2_c:"Опція: висувний столик",
      pkg_3_name:"Pro", pkg_3_a:"Кухонний модуль + вода", pkg_3_b:"12V / енергетичні опції", pkg_3_c:"Індивідуальна адаптація",
      pkg_btn:"Запитати",
      faq_title:"FAQ", faq_sub:"Коротко і по-людськи — для новачків.",
      faq_q1:"Як швидко можна замовити?", faq_a1:"Напиши в Telegram, уточнимо авто + опції. Потім ціна і строки.",
      faq_q2:"Можна оплатити через Revolut?", faq_a2:"Так. Натисни «Оплатити Revolut QR» — відкриється QR. Скануй у Revolut і плати.",
      faq_q3:"Як встановити додаток?", faq_a3:"Відкрий сайт у Chrome → «Встановити». Або натисни кнопку «Встановити додаток».",
      contact_title:"Контакти", contact_sub:"Все клікабельне: Telegram • Телефон • Email • Оплата.",
      contact_phone:"Телефон", contact_pay:"Оплата", contact_pay_sub:"Revolut QR",
      footer_top:"Вгору",
      pay_title:"Оплата Revolut QR", pay_hint:"Відкрий Revolut → Scan → наведи на QR → оплати.",
      pay_to:"Одержувач:", pay_note:"Коментар:", pay_replace:"Важливо: це демо QR. Заміни /assets/revolut-qr.png на твій реальний QR з Revolut.",
      pay_download:"Завантажити QR", pay_close:"Закрити",
      toast_copied:"Скопійовано ✅",
      form_title:"Форма заявки",
      form_sub:"Надсилає заявку в Google Sheets (через Apps Script).",
      f_name:"Імʼя", f_phone:"Телефон", f_email:"Email", f_car:"Авто/модель", f_msg:"Повідомлення",
      f_send:"Надіслати в Sheets", f_open_crm:"Відкрити Mini-CRM", f_send_tg:"Або надіслати в Telegram",
      f_hint:"Щоб форма працювала: встав Apps Script URL у crm-config.js. Якщо не налаштовано — використовуй Telegram.",
      nav_cfg:"Конфігуратор", nav_cab:"Кабінет",
      mob_request:"Заявка", mob_pay:"QR", mob_cfg:"LEGO", mob_cab:"Кабінет",
      gallery_premium_title:"Реальні приклади CamperBox",
      gallery_premium_sub:"Натисни на фото — відкриється красивий Lightbox.",
      gallery_note_premium:"Файли: /assets/gallery-1.jpg … /assets/gallery-4.jpg. Можна замінити на свої без правок коду."
    },
    ru: {
      nav_models:"Авто", nav_packages:"Пакеты", nav_gallery:"Галерея", nav_faq:"FAQ", nav_contact:"Контакты",
      hero_badge:"🇩🇪 Кассель • Германия • Доставка/установка",
      hero_title:"K2 CamperBox — превращаем авто в кемпер за 5 минут",
      hero_lead:"Модульная система для «каблучков» и компактных ванов (Caddy / Berlingo / Combo / Doblo / Tourneo / …). Быстрая заявка в Telegram + оплата через Revolut QR.",
      cta_request:"Заявка в Telegram", cta_pay:"Оплата Revolut QR", cta_install:"Установить приложение",
      mini_1_k:"Быстро", mini_1_v:"Установка 5–10 мин",
      mini_2_k:"Модульно", mini_2_v:"Боксы / кровать / кухня",
      mini_3_k:"Удобно", mini_3_v:"На каждый день и в поездку",
      hero_card_title:"Быстрый расчет", hero_card_pill:"Ответим сегодня",
      hero_card_model:"Авто/модель", hero_card_wishes:"Пожелания",
      hero_card_send:"Отправить в Telegram", hero_card_copy:"Скопировать текст",
      hero_card_hint:"Подсказка: если Telegram не открылся — скопируй текст и отправь @k2camperbox.",
      stat_1:"3 языка", stat_2:"ставится как App", stat_3:"оплата Revolut",
      models_title:"Для каких авто?", models_sub:"«Каблучки» и компактные ваны — адаптируем модуль.",
      models_1:"Caddy / Caddy Maxi — город + путешествия.",
      models_2:"Berlingo / Rifter / Partner — модульные боксы.",
      models_3:"Combo / Doblo / Tourneo / Kangoo / …",
      packages_title:"Пакеты", packages_sub:"Примеры. Итоговая цена зависит от авто и опций.",
      pkg_1_name:"Start", pkg_1_a:"Основа-кровать + базовые боксы", pkg_1_b:"Быстрая установка/снятие", pkg_1_c:"Легко и надежно",
      pkg_2_name:"Comfort", pkg_2_a:"Больше хранения + организация", pkg_2_b:"Матрас / комплект подушек", pkg_2_c:"Опция: выдвижной столик",
      pkg_3_name:"Pro", pkg_3_a:"Кухонный модуль + вода", pkg_3_b:"12V / питание", pkg_3_c:"Индивидуальная подгонка",
      pkg_btn:"Узнать цену",
      faq_title:"FAQ", faq_sub:"Коротко и по-человечески — для чайника.",
      faq_q1:"Как быстро можно заказать?", faq_a1:"Напиши в Telegram, уточним авто + опции. Потом цена и сроки.",
      faq_q2:"Можно оплатить Revolut?", faq_a2:"Да. Нажми «Оплата Revolut QR» — откроется окно с QR. Сканируешь в Revolut и оплачиваешь.",
      faq_q3:"Как установить приложение?", faq_a3:"Открой сайт в Chrome → «Установить приложение». Или нажми кнопку «Установить приложение».",
      contact_title:"Контакты", contact_sub:"Все кликабельно: Telegram • Телефон • Email • Оплата.",
      contact_phone:"Телефон", contact_pay:"Оплата", contact_pay_sub:"Revolut QR",
      footer_top:"Наверх",
      pay_title:"Оплата Revolut QR", pay_hint:"Открой Revolut → Scan → наведи на QR → оплати.",
      pay_to:"Получатель:", pay_note:"Комментарий:", pay_replace:"Важно: это демо QR. Замени /assets/revolut-qr.png на свой реальный QR из Revolut.",
      pay_download:"Скачать QR", pay_close:"Закрыть",
      toast_copied:"Скопировано ✅",
      form_title:"Форма заявки",
      form_sub:"Отправка заявки в Google Sheets (через Apps Script).",
      f_name:"Имя", f_phone:"Телефон", f_email:"Email", f_car:"Авто/модель", f_msg:"Сообщение",
      f_send:"Отправить в Sheets", f_open_crm:"Открыть Mini-CRM", f_send_tg:"Или отправить в Telegram",
      f_hint:"Чтобы форма работала: вставь Apps Script URL в crm-config.js. Если не настроено — используй Telegram.",
      nav_cfg:"Конфигуратор", nav_cab:"Кабинет",
      mob_request:"Заявка", mob_pay:"QR", mob_cfg:"LEGO", mob_cab:"Кабинет",
      gallery_premium_title:"Реальные примеры CamperBox",
      gallery_premium_sub:"Нажми на фото — откроется красивый Lightbox.",
      gallery_note_premium:"Файлы: /assets/gallery-1.jpg … /assets/gallery-4.jpg. Можно заменить на свои без правок кода."
    }
  };

  const toast = (msg) => {
    let t = $("#toast");
    if(!t){
      t = document.createElement("div");
      t.id = "toast";
      t.style.cssText = "position:fixed;left:50%;bottom:22px;transform:translateX(-50%);padding:10px 12px;border-radius:14px;border:1px solid rgba(36,48,95,.8);background:rgba(11,18,48,.92);backdrop-filter: blur(10px);font-weight:900;z-index:120;opacity:0;transition:opacity .15s ease";
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity = "1";
    clearTimeout(toast._tm);
    toast._tm = setTimeout(()=> t.style.opacity="0", 1400);
  };

  const lang = () => localStorage.getItem("k2_lang") || "de";

  const setLang = (l) => {
    document.documentElement.lang = l === "ua" ? "uk" : l;

    $$(".chip").forEach(b => {
      const on = b.dataset.lang === l;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });

    $$("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const v = i18n[l]?.[key];
      if (typeof v === "string") el.textContent = v;
    });

    localStorage.setItem("k2_lang", l);
  };

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

  const openTelegram = async (text) => {
    try { await navigator.clipboard.writeText(text); } catch (_) {}
    window.open(cfg.telegram, "_blank", "noopener");
  };

  // --- Premium micro interactions (shine + ripple)
  const enablePremiumButtons = () => {
    const buttons = $$("button.btn.premium, a.btn.premium");
    const move = (e) => {
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      el.style.setProperty("--sx", `${x}%`);
    };
    const leave = (e) => e.currentTarget.style.removeProperty("--sx");

    buttons.forEach(el => {
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);

      el.addEventListener("click", (e) => {
        // ripple only for mouse/touch clicks
        const r = el.getBoundingClientRect();
        const x = (e.clientX || (r.left + r.width/2)) - r.left;
        const y = (e.clientY || (r.top + r.height/2)) - r.top;

        const s = document.createElement("span");
        s.className = "ripple";
        s.style.left = `${x}px`;
        s.style.top = `${y}px`;
        el.appendChild(s);
        setTimeout(()=> s.remove(), 650);
      }, { passive: true });
    });
  };

  // --- Modals
  const payModal = $("#payModal");
  const openPay = () => { payModal?.classList.add("show"); payModal?.setAttribute("aria-hidden","false"); };
  const closePay = () => { payModal?.classList.remove("show"); payModal?.setAttribute("aria-hidden","true"); };

  // --- PWA install
  let deferredPrompt = null;
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
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

  // --- Reveal on scroll (fast)
  const revealInit = () => {
    const els = $$(".reveal");
    if(!("IntersectionObserver" in window)){
      els.forEach(e=>e.classList.add("show"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if(en.isIntersecting){
          en.target.classList.add("show");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(e=> io.observe(e));
  };

  // --- Premium gallery lightbox
  const lbModal = $("#lbModal");
  const lbImg = $("#lbImg");
  const lbTitle = $("#lbTitle");
  const lbPrev = $("#lbPrev");
  const lbNext = $("#lbNext");
  const galleryItems = $$("#galleryGrid .gItem");

  let lbIndex = -1;

  const openLB = (idx) => {
    if(!galleryItems.length) return;
    lbIndex = Math.max(0, Math.min(idx, galleryItems.length - 1));

    const it = galleryItems[lbIndex];
    const src = it.getAttribute("data-src");
    const alt = it.getAttribute("data-alt") || "Photo";
    const cap = it.querySelector(".gCap")?.textContent?.trim() || "CamperBox";

    lbImg.src = src;
    lbImg.alt = alt;
    lbTitle.textContent = cap;

    lbModal.classList.add("show");
    lbModal.setAttribute("aria-hidden","false");

    // prefetch neighbors (fast)
    [lbIndex-1, lbIndex+1].forEach((n) => {
      if(n>=0 && n<galleryItems.length){
        const s = galleryItems[n].getAttribute("data-src");
        const img = new Image();
        img.src = s;
      }
    });
  };

  const closeLB = () => {
    lbModal.classList.remove("show");
    lbModal.setAttribute("aria-hidden","true");
    // keep src to allow quick re-open; no need to blank
  };

  const stepLB = (dir) => {
    if(lbIndex < 0) return;
    let n = lbIndex + dir;
    if(n < 0) n = galleryItems.length - 1;
    if(n >= galleryItems.length) n = 0;
    openLB(n);
  };

  const lightboxInit = () => {
    galleryItems.forEach((it, idx) => {
      it.addEventListener("click", () => openLB(idx));
      it.setAttribute("role","button");
      it.setAttribute("tabindex","0");
      it.addEventListener("keydown", (e) => {
        if(e.key === "Enter" || e.key === " "){ e.preventDefault(); openLB(idx); }
      });
    });

    lbPrev?.addEventListener("click", () => stepLB(-1));
    lbNext?.addEventListener("click", () => stepLB(+1));

    lbModal?.addEventListener("click", (e) => {
      const t = e.target;
      if (t && (t.matches("[data-close]") || t.closest("[data-close]"))) closeLB();
    });

    // Keyboard
    document.addEventListener("keydown", (e) => {
      if(lbModal?.classList.contains("show")){
        if(e.key === "Escape") closeLB();
        if(e.key === "ArrowLeft") stepLB(-1);
        if(e.key === "ArrowRight") stepLB(+1);
      } else if(payModal?.classList.contains("show")){
        if(e.key === "Escape") closePay();
      }
    });

    // Swipe (mobile)
    let sx=0, sy=0;
    lbModal?.addEventListener("touchstart", (e) => {
      const t = e.touches?.[0];
      if(!t) return;
      sx = t.clientX; sy = t.clientY;
    }, { passive:true });

    lbModal?.addEventListener("touchend", (e) => {
      const t = e.changedTouches?.[0];
      if(!t) return;
      const dx = t.clientX - sx;
      const dy = t.clientY - sy;
      if(Math.abs(dx) > 45 && Math.abs(dy) < 40){
        stepLB(dx > 0 ? -1 : +1);
      }
    }, { passive:true });
  };

  // Init
  setLang(lang());
  $("#y").textContent = String(new Date().getFullYear());

  enablePremiumButtons();
  revealInit();
  lightboxInit();

  // Events
  $("#btnRequest")?.addEventListener("click", () => openTelegram(buildMessage(null)));
  $("#btnSend")?.addEventListener("click", () => openTelegram(buildMessage(null)));

  $("#btnCopy")?.addEventListener("click", async () => {
    const text = buildMessage(null);
    try { await navigator.clipboard.writeText(text); toast(i18n[lang()].toast_copied || "Copied"); }
    catch { toast("Copy failed"); }
  });

  $$(".priceCard .btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const pkg = btn.getAttribute("data-pkg") || null;
      openTelegram(buildMessage(pkg));
    });
  });

  $("#btnPay")?.addEventListener("click", openPay);
  $("#btnPay2")?.addEventListener("click", openPay);
  $("#mobPay")?.addEventListener("click", openPay);

  payModal?.addEventListener("click", (e) => {
    const t = e.target;
    if (t && (t.matches("[data-close]") || t.closest("[data-close]"))) closePay();
  });

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
      t.style.cssText = "position:fixed;left:50%;bottom:22px;transform:translateX(-50%);padding:10px 12px;border-radius:14px;border:1px solid rgba(36,48,95,.8);background:rgba(11,18,48,.92);backdrop-filter: blur(10px);font-weight:900;z-index:120;opacity:0;transition:opacity .15s ease";
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity = "1";
    clearTimeout(toast._tm);
    toast._tm = setTimeout(()=> t.style.opacity="0", 1400);
  };

  const lang = () => (localStorage.getItem("k2_lang") || "de");

  const buildMsgFromForm = () => {
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

  if(sendTg && form){
    sendTg.addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(buildMsgFromForm()); } catch(_){}
      window.open("https://t.me/k2camperbox","_blank","noopener");
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
    }catch(_){
      toast("Ошибка сети/скрипта");
    } finally {
      btn && (btn.disabled = false);
    }
  });
})();
