/* app.js — K2 CamperBox (premium, fast, no build tools)
   ✅ DE/UA/RU i18n
   ✅ Telegram request (prefilled via share link) + clipboard fallback
   ✅ PWA install UX: hide button in standalone + after appinstalled
   ✅ Revolut QR modal
   ✅ Premium micro-animations: ripple + subtle shine (fast)
   ✅ Local gallery lightbox (works offline with /assets/gallery-*.jpg)
   ✅ Fix: prevent invalid "data:;base64," requests (guard empty URLs)
*/

(() => {
  'use strict';

  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));

  const cfg = {
    telegramChat: "https://t.me/k2camperbox",
    telegramShareBase: "https://t.me/share/url",
    telegramUsername: "@k2camperbox",
    phone: "+4916096527272",
    email: "k2camperbox@gmail.com",
    projectName: "K2 CamperBox",
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
      gallery_title:"Galerie", gallery_sub:"Tippe auf ein Foto für die Vollansicht.",
      gallery_note:"Fotos liegen lokal: /assets/gallery-1.jpg … /assets/gallery-6.jpg (offline-ready).",
      faq_title:"FAQ", faq_sub:"Kurz & ehrlich — für Einsteiger.",
      faq_q1:"Wie schnell kann ich bestellen?", faq_a1:"Schreib in Telegram, wir klären Auto + Optionen. Danach bekommst du Preis & Termin.",
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
      installed_hint:"Installiert ✅"
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
      gallery_title:"Галерея", gallery_sub:"Натисни на фото для збільшення.",
      gallery_note:"Фото локально: /assets/gallery-1.jpg … /assets/gallery-6.jpg (працює офлайн).",
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
      installed_hint:"Встановлено ✅"
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
      gallery_title:"Галерея", gallery_sub:"Нажми на фото для увеличения.",
      gallery_note:"Фото локально: /assets/gallery-1.jpg … /assets/gallery-6.jpg (работает офлайн).",
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
      nav_cfg:"Конфигуратор", nav_cab:"Кабинет",
      mob_request:"Заявка", mob_pay:"QR", mob_cfg:"LEGO", mob_cab:"Кабинет",
      installed_hint:"Установлено ✅"
    }
  };

  // ---------- Styles injection (ripple + lightbox) ----------
  const injectStyle = () => {
    if ($("#k2-premium-style")) return;
    const style = document.createElement("style");
    style.id = "k2-premium-style";
    style.textContent = `
      .btn{ position:relative; overflow:hidden; }
      .btn .ico{ display:inline-flex; width:18px; height:18px; margin-right:10px; vertical-align:-3px; }
      .btn .lbl{ display:inline-block; }
      .btn .ripple{
        position:absolute; border-radius:999px; transform:translate(-50%,-50%) scale(0);
        pointer-events:none; opacity:.35;
        width:10px; height:10px;
        background: radial-gradient(circle, rgba(255,255,255,.95) 0%, rgba(255,255,255,.35) 40%, rgba(255,255,255,0) 70%);
        animation: k2r .6s ease-out;
      }
      @keyframes k2r { to { transform:translate(-50%,-50%) scale(28); opacity:0; } }
      .btn.k2-shine::after{
        content:""; position:absolute; inset:-2px;
        background: radial-gradient(120px 80px at var(--mx,20%) var(--my,30%), rgba(255,255,255,.22), rgba(255,255,255,0) 60%);
        opacity:.9; transition: opacity .15s ease;
        pointer-events:none;
      }
      .btn.k2-shine:hover::after{ opacity:1; }
      .btn.k2-shine:active::after{ opacity:.6; }

      /* Lightbox */
      .k2-lightbox{ position:fixed; inset:0; display:none; z-index:9999; }
      .k2-lightbox.show{ display:block; }
      .k2-lb-back{ position:absolute; inset:0; background:rgba(0,0,0,.68); backdrop-filter: blur(8px); }
      .k2-lb-card{
        position:absolute; left:50%; top:50%; transform:translate(-50%,-50%);
        width:min(92vw,980px); max-height:min(86vh,720px);
        border-radius:18px; overflow:hidden;
        background:rgba(12,16,30,.72); border:1px solid rgba(255,255,255,.10);
        box-shadow: 0 22px 70px rgba(0,0,0,.55);
      }
      .k2-lb-top{
        display:flex; align-items:center; justify-content:space-between;
        padding:10px 12px; font-weight:800;
        border-bottom:1px solid rgba(255,255,255,.10);
      }
      .k2-lb-x{
        width:36px; height:36px; border-radius:12px; border:1px solid rgba(255,255,255,.12);
        background:rgba(255,255,255,.06); color:#fff; cursor:pointer;
      }
      .k2-lb-imgwrap{ background:#0b0f22; display:flex; align-items:center; justify-content:center; }
      .k2-lb-img{ width:100%; height:auto; max-height:calc(min(86vh,720px) - 56px); object-fit:contain; display:block; }
      @media (prefers-reduced-motion: reduce){
        .btn .ripple{ display:none; }
        .btn.k2-shine::after{ display:none; }
      }
    `;
    document.head.appendChild(style);
  };

  // ---------- Toast ----------
  const toast = (msg) => {
    let t = $("#toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "toast";
      t.style.cssText = [
        "position:fixed",
        "left:50%",
        "bottom:22px",
        "transform:translateX(-50%)",
        "padding:10px 12px",
        "border-radius:12px",
        "border:1px solid rgba(36,48,95,.8)",
        "background:rgba(11,18,48,.92)",
        "backdrop-filter: blur(10px)",
        "font-weight:800",
        "z-index:120",
        "opacity:0",
        "transition:opacity .15s ease",
        "color:#fff",
      ].join(";");
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity = "1";
    clearTimeout(toast._tm);
    toast._tm = setTimeout(() => (t.style.opacity = "0"), 1400);
  };

  // ---------- Helpers ----------
  const currentLang = () => localStorage.getItem("k2_lang") || "de";

  const isStandalone = () => {
    // iOS: navigator.standalone, other: display-mode
    return (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
           (window.navigator && window.navigator.standalone === true);
  };

  const safeUrl = (u) => {
    // Prevent "data:;base64," and empty strings from being used
    if (!u || typeof u !== "string") return "";
    const s = u.trim();
    if (!s) return "";
    if (s === "data:;base64," || s === "data:,") return "";
    return s;
  };

  const svgIcon = {
    telegram: `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M21.9 4.6c.4-1.6-1.4-2.9-2.8-2.3L3.3 8.6c-2 0-2.5 2.8-.6 3.6l4.3 1.8 1.6 5.1c.5 1.5 2.4 1.8 3.3.5l2.4-3.2 4.7 3.4c1.3.9 3 .2 3.4-1.3l-.1.8 2-15.7z" fill="currentColor" opacity=".9"/>
        <path d="M9.2 14.6l9.6-8.4c.4-.3.1-.9-.4-.6l-11.6 7 2.4 2z" fill="currentColor"/>
      </svg>`,
    qr: `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 4h6v6H4V4zm2 2v2h2V6H6zm8-2h6v6h-6V4zm2 2v2h2V6h-2zM4 14h6v6H4v-6zm2 2v2h2v-2H6zm8 0h2v2h-2v-2zm0 4h6v-6h-2v4h-4v2z" fill="currentColor"/>
      </svg>`,
    install: `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3v10.2l3.3-3.3 1.4 1.4L12 17.9 7.3 11.3l1.4-1.4 3.3 3.3V3h0z" fill="currentColor"/>
        <path d="M5 19h14v2H5v-2z" fill="currentColor" opacity=".9"/>
      </svg>`
  };

  const setBtnContent = (btn, iconSvg, labelText) => {
    if (!btn) return;
    // Keep icon + label, and avoid i18n overwriting later by tagging
    btn.dataset.i18nRich = "1";
    btn.innerHTML = `<span class="ico">${iconSvg}</span><span class="lbl"></span>`;
    const lbl = btn.querySelector(".lbl");
    if (lbl) lbl.textContent = labelText || "";
  };

  const applyRichButtons = (lang) => {
    const t = i18n[lang] || i18n.de;

    // top CTA
    setBtnContent($("#btnRequest"), svgIcon.telegram, t.cta_request);
    setBtnContent($("#btnPay"), svgIcon.qr, t.cta_pay);
    setBtnContent($("#btnInstall"), svgIcon.install, t.cta_install);

    // contact pay card is button but not .btn — leave it
    // mobile bar
    // (if you want icons there too later — скажи, добавлю)
  };

  const setLang = (lang) => {
    document.documentElement.lang = (lang === "ua") ? "uk" : lang;

    $$(".chip").forEach((b) => {
      const on = b.dataset.lang === lang;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });

    // Apply plain i18n for normal nodes
    $$("[data-i18n]").forEach((el) => {
      // If it's a button we've turned into rich (icon+label), skip textContent overwrite
      if (el.dataset.i18nRich === "1") return;

      const key = el.getAttribute("data-i18n");
      const v = i18n[lang]?.[key];
      if (typeof v === "string") el.textContent = v;
    });

    // Re-apply rich buttons so labels stay correct
    applyRichButtons(lang);

    localStorage.setItem("k2_lang", lang);
  };

  // ---------- Telegram message ----------
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
      `Bitte Preis/Termin + was braucht ihr für die Bestellung?`
    ].filter(Boolean);

    return lines.join("\n");
  };

  const openTelegramShare = (text) => {
    const url = new URL(cfg.telegramShareBase);
    // "url" param can be your site; keep minimal
    url.searchParams.set("url", location.origin + "/");
    url.searchParams.set("text", text);
    window.open(url.toString(), "_blank", "noopener");
  };

  const openTelegram = async (text) => {
    try { await navigator.clipboard?.writeText(text); } catch(e) {}
    // Use share link to prefill message. If blocked — open chat.
    try {
      openTelegramShare(text);
    } catch (e) {
      window.open(cfg.telegramChat, "_blank", "noopener");
    }
  };

  // ---------- Modal (Pay) ----------
  const modal = $("#payModal");
  const openPay = () => {
    if (!modal) return;
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
  };
  const closePay = () => {
    if (!modal) return;
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  };

  // ---------- PWA install ----------
  let deferredPrompt = null;

  const refreshInstallUI = () => {
    const btn = $("#btnInstall");
    if (!btn) return;

    // Hide if already standalone
    if (isStandalone()) {
      btn.style.display = "none";
      btn.disabled = true;
      return;
    }

    // Show only if prompt available; otherwise keep visible but hint on click
    btn.style.display = "";
    btn.disabled = false;
  };

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    refreshInstallUI();
  });

  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    // Immediately hide the button after successful install
    refreshInstallUI();
    toast((i18n[currentLang()] || i18n.de).installed_hint || "Installed ✅");
  });

  const installApp = async () => {
    const t = i18n[currentLang()] || i18n.de;
    if (isStandalone()) {
      toast(t.installed_hint || "Installed ✅");
      refreshInstallUI();
      return;
    }
    if (!deferredPrompt) {
      toast("Chrome → Menü → App installieren");
      return;
    }
    deferredPrompt.prompt();
    await deferredPrompt.userChoice.catch(() => {});
    // appinstalled event will handle UI
  };

  // ---------- Ripple / Shine (fast & subtle) ----------
  const enableMicro = () => {
    const buttons = $$(".btn");
    buttons.forEach((btn) => {
      btn.classList.add("k2-shine");

      // ripple
      btn.addEventListener("pointerdown", (e) => {
        if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left);
        const y = (e.clientY - rect.top);

        const r = document.createElement("span");
        r.className = "ripple";
        r.style.left = `${x}px`;
        r.style.top = `${y}px`;
        btn.appendChild(r);
        r.addEventListener("animationend", () => r.remove(), { once: true });
      }, { passive: true });

      // shine position
      const move = (e) => {
        const rect = btn.getBoundingClientRect();
        const mx = ((e.clientX - rect.left) / rect.width) * 100;
        const my = ((e.clientY - rect.top) / rect.height) * 100;
        btn.style.setProperty("--mx", `${mx}%`);
        btn.style.setProperty("--my", `${my}%`);
      };

      btn.addEventListener("mousemove", move, { passive: true });
      btn.addEventListener("touchmove", (e) => {
        const t = e.touches && e.touches[0];
        if (!t) return;
        move({ clientX: t.clientX, clientY: t.clientY });
      }, { passive: true });
    });
  };

  // ---------- Local Gallery Lightbox ----------
  const ensureLightbox = () => {
    let lb = $(".k2-lightbox");
    if (lb) return lb;

    lb = document.createElement("div");
    lb.className = "k2-lightbox";
    lb.innerHTML = `
      <div class="k2-lb-back" data-close></div>
      <div class="k2-lb-card" role="dialog" aria-modal="true">
        <div class="k2-lb-top">
          <div class="k2-lb-title">Photo</div>
          <button class="k2-lb-x" data-close aria-label="Close">✕</button>
        </div>
        <div class="k2-lb-imgwrap">
          <img class="k2-lb-img" alt="Gallery photo" />
        </div>
      </div>
    `;
    document.body.appendChild(lb);

    lb.addEventListener("click", (e) => {
      const t = e.target;
      if (t && (t.matches("[data-close]") || t.closest("[data-close]"))) {
        lb.classList.remove("show");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") lb.classList.remove("show");
    });

    return lb;
  };

  const openLightbox = (src, title) => {
    const url = safeUrl(src);
    if (!url) return; // prevent invalid URL errors
    const lb = ensureLightbox();
    const img = $(".k2-lb-img", lb);
    const ttl = $(".k2-lb-title", lb);
    if (ttl) ttl.textContent = title || "Photo";
    if (img) {
      img.removeAttribute("src");
      img.src = url;
    }
    lb.classList.add("show");
  };

  const wireGallery = () => {
    // Supports:
    // 1) <img class="gimg" src="/assets/gallery-1.jpg" data-title="...">
    // 2) <div class="shot" style="background-image:url(...)">
    // 3) <div class="shot" data-src="/assets/gallery-1.jpg">
    const galleryRoot = $(".gallery");
    if (!galleryRoot) return;

    const items = $$(".shot, img", galleryRoot);
    if (!items.length) return;

    items.forEach((el, idx) => {
      el.style.cursor = "zoom-in";
      el.addEventListener("click", () => {
        let src = "";
        let title = "";

        if (el.tagName === "IMG") {
          src = el.getAttribute("src") || "";
          title = el.getAttribute("alt") || el.dataset.title || `Gallery ${idx + 1}`;
        } else {
          src = el.dataset.src || "";
          title = el.dataset.title || `Gallery ${idx + 1}`;

          // fallback to background-image
          if (!src) {
            const bg = getComputedStyle(el).backgroundImage || "";
            // bg like: url("...") or none
            const m = bg.match(/url\(["']?(.*?)["']?\)/i);
            if (m && m[1]) src = m[1];
          }
        }

        openLightbox(src, title);
      }, { passive: true });
    });
  };

  // ---------- Init ----------
  injectStyle();

  const saved = currentLang();
  setLang(saved);

  // Footer year
  const y = $("#y");
  if (y) y.textContent = String(new Date().getFullYear());

  // Micro animations
  enableMicro();

  // Gallery
  wireGallery();

  // Events
  $("#btnRequest")?.addEventListener("click", () => openTelegram(buildMessage(null)));
  $("#btnSend")?.addEventListener("click", () => openTelegram(buildMessage(null)));

  $("#btnCopy")?.addEventListener("click", async () => {
    const text = buildMessage(null);
    try {
      await navigator.clipboard.writeText(text);
      toast((i18n[currentLang()] || i18n.de).toast_copied);
    } catch {
      toast("Copy failed");
    }
  });

  $$(".priceCard .btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const pkg = btn.getAttribute("data-pkg") || null;
      openTelegram(buildMessage(pkg));
    });
  });

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

  $("#btnInstall")?.addEventListener("click", installApp);

  $$(".chip").forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang)));

  // Ensure install button state is correct on load (important!)
  refreshInstallUI();

  // Also re-check display-mode changes
  if (window.matchMedia) {
    const mq = window.matchMedia("(display-mode: standalone)");
    mq.addEventListener?.("change", refreshInstallUI);
  }

  // Service Worker
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    });
  }
})();




/* Lead form -> Apps Script (submitLead) */
(() => {
  'use strict';

  const cfg = window.K2_CRM || {};
  const scriptUrl = (cfg.SCRIPT_URL || "").replace(/\/$/, "");

  const form = document.getElementById("leadForm");
  const btn = document.getElementById("btnSubmitLead");
  const sendTg = document.getElementById("btnSendTg2");

  const toast = (msg) => {
    let t = document.getElementById("toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "toast";
      t.style.cssText = "position:fixed;left:50%;bottom:22px;transform:translateX(-50%);padding:10px 12px;border-radius:12px;border:1px solid rgba(36,48,95,.8);background:rgba(11,18,48,.92);backdrop-filter: blur(10px);font-weight:800;z-index:120;opacity:0;transition:opacity .15s ease;color:#fff";
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity = "1";
    clearTimeout(toast._tm);
    toast._tm = setTimeout(() => (t.style.opacity = "0"), 1400);
  };

  const lang = () => (localStorage.getItem("k2_lang") || "de");

  const buildMsgFromForm = () => {
    if (!form) return "";
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
      try { await navigator.clipboard?.writeText(msg); } catch(e) {}
      try {
        const url = new URL("https://t.me/share/url");
        url.searchParams.set("url", location.origin + "/");
        url.searchParams.set("text", msg);
        window.open(url.toString(), "_blank", "noopener");
      } catch (e) {
        window.open("https://t.me/k2camperbox", "_blank", "noopener");
      }
    });
  }

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!scriptUrl || scriptUrl.indexOf("PASTE_") === 0) {
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
    } catch (err) {
      toast("Ошибка сети/скрипта");
    } finally {
      if (btn) btn.disabled = false;
    }
  });
})();
