/* app.js — K2 CamperBox (premium + bugfix)
   ✅ DE/UA/RU i18n
   ✅ Telegram: открывает SHARE с предзаполненным текстом + копирует в буфер
   ✅ PWA install: корректно прячет кнопку после установки + слушает appinstalled
   ✅ Revolut QR modal
   ✅ Premium: SVG-иконки внутри кнопок (Telegram / Revolut / Install) без ломания i18n
   ✅ Micro: аккуратный ripple на .btn (быстро, без перегруза)
   ✅ Offline lightbox: если в галерее есть локальные <img>, будет красивый просмотр
   ✅ Lead form -> Apps Script (submitLead)
*/
(() => {
  "use strict";

  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];

  // ====== CONFIG ======
  const cfg = {
    telegram: "https://t.me/k2camperbox",
    telegramUsername: "@k2camperbox",
    phone: "+4916096527272",
    email: "k2camperbox@gmail.com",
    projectName: "K2 CamperBox",
  };

  // ====== i18n ======
  const i18n = {
    de: {
      nav_models:"Modelle", nav_packages:"Pakete", nav_gallery:"Galerie", nav_faq:"FAQ", nav_contact:"Kontakt",
      nav_cfg:"Konfigurator", nav_cab:"Cabinet",
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
      gallery_title:"Galerie", gallery_sub:"Tippe auf ein Foto для fullscreen.",
      gallery_note:"Offline: Fotos liegen lokal in /assets/gallery-1.jpg …",
      faq_title:"FAQ", faq_sub:"Kurz & ehrlich — für Einsteiger.",
      faq_q1:"Wie schnell kann ich bestellen?", faq_a1:"Schreib in Telegram, wir klären Auto + Optionen. Danach bekommst du Preis & сроки.",
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
      mob_request:"Anfrage", mob_pay:"QR", mob_cfg:"LEGO", mob_cab:"Cabinet",
    },
    ua: {
      nav_models:"Авто", nav_packages:"Пакети", nav_gallery:"Галерея", nav_faq:"FAQ", nav_contact:"Контакти",
      nav_cfg:"Конфігуратор", nav_cab:"Кабінет",
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
      gallery_title:"Галерея", gallery_sub:"Торкнись фото для fullscreen.",
      gallery_note:"Офлайн: фото локально в /assets/gallery-1.jpg …",
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
      mob_request:"Заявка", mob_pay:"QR", mob_cfg:"LEGO", mob_cab:"Кабінет",
    },
    ru: {
      nav_models:"Авто", nav_packages:"Пакеты", nav_gallery:"Галерея", nav_faq:"FAQ", nav_contact:"Контакты",
      nav_cfg:"Конфигуратор", nav_cab:"Кабинет",
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
      gallery_title:"Галерея", gallery_sub:"Нажми на фото для fullscreen.",
      gallery_note:"Офлайн: фото локально в /assets/gallery-1.jpg …",
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
      form_sub:"Отправляет заявку в Google Sheets (через Apps Script).",
      f_name:"Имя", f_phone:"Телефон", f_email:"Email", f_car:"Авто/модель", f_msg:"Сообщение",
      f_send:"Отправить в Sheets", f_open_crm:"Открыть Mini-CRM", f_send_tg:"Или отправить в Telegram",
      f_hint:"Чтобы форма работала: вставь Apps Script URL в crm-config.js. Если не настроено — используй Telegram.",
      mob_request:"Заявка", mob_pay:"QR", mob_cfg:"LEGO", mob_cab:"Кабинет",
    },
  };

  // ====== Toast (single) ======
  const toast = (msg) => {
    let t = $("#toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "toast";
      t.style.cssText =
        "position:fixed;left:50%;bottom:22px;transform:translateX(-50%);padding:10px 12px;border-radius:12px;" +
        "border:1px solid rgba(36,48,95,.8);background:rgba(11,18,48,.92);backdrop-filter: blur(10px);" +
        "font-weight:800;z-index:120;opacity:0;transition:opacity .15s ease;max-width:min(92vw,520px);text-align:center";
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity = "1";
    clearTimeout(toast._tm);
    toast._tm = setTimeout(() => (t.style.opacity = "0"), 1400);
  };

  const getLang = () => localStorage.getItem("k2_lang") || "de";

  // ====== Premium icons for key buttons (keeps i18n) ======
  const ICONS = {
    telegram: `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path fill="currentColor" d="M9.7 14.6 9.4 19c.5 0 .8-.2 1.1-.5l2.6-2.5 5.4 4c1 .6 1.7.3 2-.9l3.6-16.8c.4-1.7-.6-2.4-1.6-2L1.2 9.4c-1.6.6-1.6 1.5-.3 1.9l5.7 1.8L19.7 5c.6-.4 1.2-.2.7.3"/></svg>`,
    revolut: `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path fill="currentColor" d="M7 4h8a5 5 0 0 1 0 10h-2.2l4.1 6H14l-3.8-5.6H9.5V20H7V4zm2.5 2.4v5.2H15a2.6 2.6 0 1 0 0-5.2H9.5z"/></svg>`,
    install: `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 3a1 1 0 0 1 1 1v9.6l2.3-2.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L11 13.6V4a1 1 0 0 1 1-1z"/><path fill="currentColor" d="M5 19a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1z"/></svg>`,
    copy: `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path fill="currentColor" d="M9 9a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2V9z"/><path fill="currentColor" d="M4 15V6a2 2 0 0 1 2-2h9a1 1 0 1 1 0 2H6v9a1 1 0 1 1-2 0z" opacity=".7"/></svg>`,
  };

  const ensureBtnIcon = (btn, iconSvg) => {
    if (!btn) return;
    // already enhanced
    if (btn.querySelector(".btnIcon") && btn.querySelector(".btnLabel")) return;

    const labelText = btn.textContent.trim();
    btn.textContent = "";
    const icon = document.createElement("span");
    icon.className = "btnIcon";
    icon.innerHTML = iconSvg;

    const label = document.createElement("span");
    label.className = "btnLabel";
    label.textContent = labelText;

    btn.append(icon, label);
  };

  const setI18nText = (el, value) => {
    // If element is premium-button with .btnLabel, update that only
    const lbl = el.querySelector?.(".btnLabel");
    if (lbl) lbl.textContent = value;
    else el.textContent = value;
  };

  const setLang = (lang) => {
    document.documentElement.lang = lang === "ua" ? "uk" : lang;

    $$(".chip").forEach((b) => {
      const on = b.dataset.lang === lang;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });

    $$("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const v = i18n[lang]?.[key];
      if (typeof v === "string") setI18nText(el, v);
    });

    localStorage.setItem("k2_lang", lang);
  };

  // ====== Telegram (prefilled) ======
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
      `Bitte цену/срок + что нужно для заказа.`,
    ].filter(Boolean);

    return lines.join("\n");
  };

  const openTelegram = async (text) => {
    try { await navigator.clipboard?.writeText(text); } catch {}

    // Best: Telegram share with prefilled message
    const share = `https://t.me/share/url?url=&text=${encodeURIComponent(text)}`;
    const w = window.open(share, "_blank", "noopener");
    // fallback
    if (!w) window.location.href = share;
  };

  // ====== Modal (Revolut) ======
  const modal = $("#payModal");
  const openPay = () => { if(modal){ modal.classList.add("show"); modal.setAttribute("aria-hidden","false"); } };
  const closePay = () => { if(modal){ modal.classList.remove("show"); modal.setAttribute("aria-hidden","true"); } };

  // ====== PWA install: fix "button not disappearing" ======
  let deferredPrompt = null;

  const isStandalone = () => {
    // iOS: navigator.standalone, others: display-mode
    return (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches)
      || (window.navigator && "standalone" in window.navigator && window.navigator.standalone === true);
  };

  const updateInstallVisibility = () => {
    const b = $("#btnInstall");
    if (!b) return;

    if (isStandalone()) {
      b.style.display = "none";           // hide when installed/launched as app
      b.setAttribute("aria-hidden", "true");
      return;
    }

    b.style.display = "";                // show on web
    b.removeAttribute("aria-hidden");

    // if prompt not available yet, keep it as ghost (you can still show hint)
    if (!deferredPrompt) b.classList.add("ghost");
  };

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const b = $("#btnInstall");
    if (b && !isStandalone()) b.classList.remove("ghost");
  });

  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    updateInstallVisibility();
    toast("App installiert ✅");
  });

  const installApp = async () => {
    if (isStandalone()) { updateInstallVisibility(); return; }

    if (!deferredPrompt) {
      toast("Chrome → Menü → App installieren");
      return;
    }

    deferredPrompt.prompt();
    try { await deferredPrompt.userChoice; } catch {}
    deferredPrompt = null;

    // Some browsers don't fire appinstalled instantly; still update
    setTimeout(updateInstallVisibility, 400);
  };

  // ====== Micro ripple (fast) ======
  const enableRipple = () => {
    const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    document.addEventListener("pointerdown", (e) => {
      const btn = e.target?.closest?.(".btn");
      if (!btn) return;

      // If button is disabled / hidden
      if (btn.disabled || btn.getAttribute("aria-disabled") === "true") return;

      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const s = document.createElement("span");
      s.className = "ripple";
      s.style.left = `${x}px`;
      s.style.top = `${y}px`;

      // Keep it lightweight: remove after animation
      btn.appendChild(s);
      s.addEventListener("animationend", () => s.remove(), { once: true });
    }, { passive: true });
  };

  // ====== Offline Lightbox (if gallery has local images) ======
  const initLightbox = () => {
    const imgs = $$(".gallery img, [data-gallery] img");
    if (!imgs.length) return;

    const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let idx = 0;

    const lb = document.createElement("div");
    lb.id = "lightbox";
    lb.style.cssText =
      "position:fixed;inset:0;z-index:200;display:none;align-items:center;justify-content:center;" +
      "background:rgba(4,8,20,.72);backdrop-filter: blur(10px);padding:18px";
    lb.innerHTML = `
      <div class="lbCard" style="position:relative;width:min(980px,96vw);max-height:92vh;border-radius:18px;overflow:hidden;border:1px solid rgba(255,255,255,.10);background:rgba(10,15,34,.75);box-shadow:0 20px 70px rgba(0,0,0,.55)">
        <button class="lbX" aria-label="Close" style="position:absolute;top:10px;right:10px;width:42px;height:42px;border-radius:12px;border:1px solid rgba(255,255,255,.14);background:rgba(0,0,0,.25);color:#fff;font-size:18px;cursor:pointer">✕</button>
        <button class="lbPrev" aria-label="Prev" style="position:absolute;left:10px;top:50%;transform:translateY(-50%);width:42px;height:42px;border-radius:12px;border:1px solid rgba(255,255,255,.14);background:rgba(0,0,0,.25);color:#fff;font-size:18px;cursor:pointer">‹</button>
        <button class="lbNext" aria-label="Next" style="position:absolute;right:10px;top:50%;transform:translateY(-50%);width:42px;height:42px;border-radius:12px;border:1px solid rgba(255,255,255,.14);background:rgba(0,0,0,.25);color:#fff;font-size:18px;cursor:pointer">›</button>
        <div class="lbInner" style="display:flex;flex-direction:column;max-height:92vh">
          <div class="lbMedia" style="flex:1;display:flex;align-items:center;justify-content:center;min-height:220px;background:linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.02))">
            <img class="lbImg" alt="" style="max-width:100%;max-height:72vh;object-fit:contain;${prefersReduced ? "" : "transform:translateZ(0);"}" />
          </div>
          <div class="lbCap" style="padding:12px 14px;color:rgba(255,255,255,.85);font-weight:700;display:flex;gap:10px;align-items:center;justify-content:space-between">
            <div class="lbText" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:72%"></div>
            <div class="lbCount" style="opacity:.7;font-weight:800"></div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(lb);

    const imgEl = $(".lbImg", lb);
    const capText = $(".lbText", lb);
    const capCount = $(".lbCount", lb);

    const show = (i) => {
      idx = (i + imgs.length) % imgs.length;
      const el = imgs[idx];

      const full = el.getAttribute("data-full") || el.currentSrc || el.src;
      const cap =
        el.getAttribute("data-cap") ||
        el.alt ||
        el.closest("figure")?.querySelector("figcaption")?.textContent?.trim() ||
        "";

      imgEl.src = full;
      imgEl.alt = cap || "Gallery photo";
      capText.textContent = cap;
      capCount.textContent = `${idx + 1} / ${imgs.length}`;
    };

    const open = (i) => {
      show(i);
      lb.style.display = "flex";
      document.documentElement.style.overflow = "hidden";
    };

    const close = () => {
      lb.style.display = "none";
      document.documentElement.style.overflow = "";
    };

    const prev = () => show(idx - 1);
    const next = () => show(idx + 1);

    imgs.forEach((el, i) => {
      el.style.cursor = "zoom-in";
      el.addEventListener("click", () => open(i));
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") open(i);
      });
      // accessibility
      if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "0");
    });

    $(".lbX", lb).addEventListener("click", close);
    $(".lbPrev", lb).addEventListener("click", prev);
    $(".lbNext", lb).addEventListener("click", next);

    lb.addEventListener("click", (e) => {
      if (e.target === lb) close();
    });

    document.addEventListener("keydown", (e) => {
      if (lb.style.display !== "flex") return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    });
  };

  // ====== INIT ======
  const init = () => {
    // Language
    setLang(getLang());

    // Footer year
    const y = $("#y");
    if (y) y.textContent = String(new Date().getFullYear());

    // Enhance buttons with icons (keep i18n via .btnLabel)
    ensureBtnIcon($("#btnRequest"), ICONS.telegram);
    ensureBtnIcon($("#btnSend"), ICONS.telegram);
    ensureBtnIcon($("#btnSendTg2"), ICONS.telegram);
    ensureBtnIcon($("#btnPay"), ICONS.revolut);
    ensureBtnIcon($("#btnPay2"), ICONS.revolut);
    ensureBtnIcon($("#mobPay"), ICONS.revolut);
    ensureBtnIcon($("#btnInstall"), ICONS.install);
    ensureBtnIcon($("#btnCopy"), ICONS.copy);

    // Update i18n again (so labels use correct language after wrapping)
    setLang(getLang());

    // Install button visibility
    updateInstallVisibility();

    // Events: Telegram buttons
    $("#btnRequest")?.addEventListener("click", () => openTelegram(buildMessage(null)));
    $("#btnSend")?.addEventListener("click", () => openTelegram(buildMessage(null)));

    $("#btnCopy")?.addEventListener("click", async () => {
      const text = buildMessage(null);
      try {
        await navigator.clipboard.writeText(text);
        toast(i18n[getLang()].toast_copied);
      } catch {
        toast("Copy failed");
      }
    });

    // Package buttons
    $$(".priceCard .btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const pkg = btn.getAttribute("data-pkg") || null;
        openTelegram(buildMessage(pkg));
      });
    });

    // Pay modal
    $("#btnPay")?.addEventListener("click", openPay);
    $("#btnPay2")?.addEventListener("click", openPay);
    $("#mobPay")?.addEventListener("click", openPay);

    modal?.addEventListener("click", (e) => {
      const t = e.target;
      if (t && (t.matches("[data-close]") || t.closest("[data-close]"))) closePay();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal?.classList.contains("show")) closePay();
    });

    // Install
    $("#btnInstall")?.addEventListener("click", installApp);

    // Lang chips
    $$(".chip").forEach((b) =>
      b.addEventListener("click", () => {
        setLang(b.dataset.lang);
      })
    );

    // Ripple micro
    enableRipple();

    // Lightbox (if images exist)
    initLightbox();

    // Service worker
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").catch(() => {});
      });
    }

    // Also react if user switches between browser/app view
    if (window.matchMedia) {
      const mm = window.matchMedia("(display-mode: standalone)");
      mm.addEventListener?.("change", updateInstallVisibility);
      // Safari old fallback:
      mm.addListener?.(updateInstallVisibility);
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Expose toast for other modules
  window.__K2_TOAST__ = toast;
  window.__K2_LANG__ = getLang;
})();


// ===============================
// Lead form -> Apps Script (submitLead)
// ===============================
(() => {
  "use strict";

  const toast = (msg) => (window.__K2_TOAST__ ? window.__K2_TOAST__(msg) : console.log(msg));
  const lang = () => localStorage.getItem("k2_lang") || "de";

  const cfg = window.K2_CRM || {};
  const scriptUrl = (cfg.SCRIPT_URL || "").replace(/\/$/, "");
  const form = document.getElementById("leadForm");
  const btn = document.getElementById("btnSubmitLead");
  const sendTg = document.getElementById("btnSendTg2");

  const buildMsgFromForm = () => {
    if (!form) return `👋 K2 CamperBox Anfrage (Form)`;
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

  if (sendTg) {
    sendTg.addEventListener("click", async () => {
      const msg = buildMsgFromForm();
      try { await navigator.clipboard?.writeText(msg); } catch {}
      const share = `https://t.me/share/url?url=&text=${encodeURIComponent(msg)}`;
      const w = window.open(share, "_blank", "noopener");
      if (!w) window.location.href = share;
    });
  }

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!scriptUrl || scriptUrl.includes("PASTE_")) {
      toast("Форма не настроена (SCRIPT_URL). Используй Telegram.");
      return;
    }

    const fd = new FormData(form);
    fd.set("lang", lang());
    fd.set("source", location.href);

    if (btn) btn.disabled = true;
    try {
      const res = await fetch(scriptUrl + "?action=submitLead", { method: "POST", body: fd });
      const json = await res.json().catch(() => null);

      if (json && json.ok) {
        toast("Заявка отправлена ✅");
        form.reset();
      } else {
        toast("Ошибка отправки");
      }
    } catch {
      toast("Ошибка сети/скрипта");
    } finally {
      if (btn) btn.disabled = false;
    }
  });
})();
