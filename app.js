/* app.js — K2 CamperBox (premium + bugfix)
   ✅ Language switch: DE / UA / RU
   ✅ Telegram request: opens share with prefilled message + copy fallback
   ✅ PWA install button: hides when installed / in standalone
   ✅ Revolut QR modal
   ✅ Micro-UX: icons inside buttons + lightweight ripple
   ✅ Safe SW register (relative)
*/
(() => {
  'use strict';

  const $  = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];

  // ===== Config
  const cfg = {
    telegramChat: "https://t.me/k2camperbox",
    telegramUsername: "@k2camperbox",
    phone: "+4916096527272",
    email: "k2camperbox@gmail.com",
    projectName: "K2 CamperBox"
  };

  // ===== i18n
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
      gallery_title:"Galerie (Platzhalter)", gallery_sub:"Tausche diese Bilder gegen deine echten Fotos (siehe Anleitung unten).",
      gallery_note:"Foto-Dateien: /assets/gallery-1.jpg … /assets/gallery-4.jpg (du kannst deine hochladen).",
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
      toast_installed:"Installiert ✅",
      toast_install_hint:"Chrome → Menü → App installieren",
      form_title:"Anfrage-Formular",
      form_sub:"Sende Anfrage direkt in Google Sheets (Apps Script).",
      f_name:"Name", f_phone:"Telefon", f_email:"Email", f_car:"Auto/Modell", f_msg:"Nachricht",
      f_send:"In Sheets senden", f_open_crm:"Mini-CRM öffnen", f_send_tg:"Oder in Telegram senden",
      f_hint:"Damit das Formular funktioniert: Apps Script URL in crm-config.js eintragen. Sonst nutze Telegram.",
      mob_request:"Anfrage", mob_pay:"QR", mob_cfg:"LEGO", mob_cab:"Cabinet"
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
      gallery_title:"Галерея (плейсхолдер)", gallery_sub:"Заміни ці картинки на свої фото (див. інструкцію нижче).",
      gallery_note:"Файли фото: /assets/gallery-1.jpg … /assets/gallery-4.jpg (можеш залити свої).",
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
      toast_installed:"Встановлено ✅",
      toast_install_hint:"Chrome → Меню → Встановити додаток",
      form_title:"Форма заявки",
      form_sub:"Надсилає заявку в Google Sheets (через Apps Script).",
      f_name:"Імʼя", f_phone:"Телефон", f_email:"Email", f_car:"Авто/модель", f_msg:"Повідомлення",
      f_send:"Надіслати в Sheets", f_open_crm:"Відкрити Mini-CRM", f_send_tg:"Або надіслати в Telegram",
      f_hint:"Щоб форма працювала: встав Apps Script URL у crm-config.js. Якщо не налаштовано — використовуй Telegram.",
      mob_request:"Заявка", mob_pay:"QR", mob_cfg:"LEGO", mob_cab:"Кабінет"
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
      gallery_title:"Галерея (заглушка)", gallery_sub:"Поменяй эти картинки на свои фото (см. инструкцию ниже).",
      gallery_note:"Файлы фото: /assets/gallery-1.jpg … /assets/gallery-4.jpg (можешь загрузить свои).",
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
      toast_installed:"Установлено ✅",
      toast_install_hint:"Chrome → Меню → Установить приложение",
      form_title:"Форма заявки",
      form_sub:"Отправляет заявку в Google Sheets (через Apps Script).",
      f_name:"Имя", f_phone:"Телефон", f_email:"Email", f_car:"Авто/модель", f_msg:"Сообщение",
      f_send:"Отправить в Sheets", f_open_crm:"Открыть Mini-CRM", f_send_tg:"Или отправить в Telegram",
      f_hint:"Чтобы форма работала: вставь Apps Script URL в crm-config.js. Если не настроено — используй Telegram.",
      mob_request:"Заявка", mob_pay:"QR", mob_cfg:"LEGO", mob_cab:"Кабинет"
    }
  };

  // ===== Utils
  const getLang = () => localStorage.getItem("k2_lang") || "de";
  const t = (key) => i18n[getLang()]?.[key] ?? i18n.de[key] ?? key;

  const toast = (msg) => {
    let el = $("#toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "toast";
      el.style.cssText = [
        "position:fixed",
        "left:50%",
        "bottom:22px",
        "transform:translateX(-50%)",
        "padding:10px 12px",
        "border-radius:14px",
        "border:1px solid rgba(90,120,255,.28)",
        "background:rgba(10,15,34,.78)",
        "backdrop-filter: blur(10px)",
        "-webkit-backdrop-filter: blur(10px)",
        "box-shadow: 0 10px 30px rgba(0,0,0,.35)",
        "font-weight:800",
        "z-index:9999",
        "opacity:0",
        "transition:opacity .16s ease",
        "pointer-events:none",
        "color:#fff",
        "letter-spacing:.2px"
      ].join(";");
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.style.opacity = "1";
    clearTimeout(toast._tm);
    toast._tm = setTimeout(() => (el.style.opacity = "0"), 1400);
  };

  const isStandalone = () => {
    // Android/Chrome: display-mode standalone
    const dm = window.matchMedia && window.matchMedia('(display-mode: standalone)').matches;
    // iOS Safari installed
    const ios = (window.navigator && 'standalone' in window.navigator) ? window.navigator.standalone : false;
    return !!(dm || ios);
  };

  const hideInstallButton = () => {
    const b = $("#btnInstall");
    if (!b) return;
    b.style.display = "none";
    b.setAttribute("aria-hidden", "true");
    b.disabled = true;
  };

  const showInstallButton = () => {
    const b = $("#btnInstall");
    if (!b) return;
    b.style.display = "";
    b.removeAttribute("aria-hidden");
    b.disabled = false;
  };

  // ===== Premium icons (inline SVG, very light)
  const ICONS = {
    tg: `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path fill="currentColor" d="M9.78 15.82 9.5 19.7c.4 0 .58-.17.79-.38l1.9-1.8 3.94 2.89c.72.4 1.23.19 1.41-.66l2.56-12c.23-1.05-.38-1.46-1.08-1.2L3.1 9.5c-1.02.4-1 .98-.18 1.24l4.06 1.27 9.4-5.93c.44-.27.85-.12.52.15l-7.6 6.59.48 3z"/></svg>`,
    qr: `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path fill="currentColor" d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm10-2h2v2h-2v-2zm-2 0h2v4h-2v-4zm4 0h4v4h-4v-4zm0 6h2v2h-2v-2zm2 0h2v2h-2v-2zm-6-2h2v4h-2v-4z"/></svg>`,
    install: `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 3a1 1 0 0 1 1 1v8.59l2.3-2.3a1 1 0 1 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-4-4A1 1 0 1 1 8.7 10.3l2.3 2.3V4a1 1 0 0 1 1-1zM5 19a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1z"/></svg>`
  };

  const injectButtonIcon = (btn, svg, labelKey) => {
    if (!btn) return;
    // Keep existing text from i18n later: we wrap icon + label in spans
    btn.dataset.labelKey = btn.dataset.labelKey || labelKey || "";
    if (btn.dataset.iconInjected === "1") return;
    btn.dataset.iconInjected = "1";
    const label = btn.textContent.trim();
    btn.innerHTML = `<span class="btnIco" aria-hidden="true" style="display:inline-flex;align-items:center;justify-content:center">${svg}</span><span class="btnTxt">${label}</span>`;
    // minimal inline styling for consistent spacing (if CSS doesn’t have it yet)
    btn.style.gap = btn.style.gap || "10px";
    btn.style.display = btn.style.display || "inline-flex";
    btn.style.alignItems = btn.style.alignItems || "center";
    btn.style.justifyContent = btn.style.justifyContent || "center";
  };

  // ===== Ripple micro-animation (fast, no layout thrash)
  const enableRipple = () => {
    const buttons = $$(".btn, .contactCard.pay");
    buttons.forEach((el) => {
      if (el.dataset.ripple === "1") return;
      el.dataset.ripple = "1";
      el.style.position = el.style.position || "relative";
      el.style.overflow = el.style.overflow || "hidden";

      el.addEventListener("pointerdown", (e) => {
        // only primary click/tap
        if (e.button && e.button !== 0) return;

        const rect = el.getBoundingClientRect();
        const x = (e.clientX || (rect.left + rect.width / 2)) - rect.left;
        const y = (e.clientY || (rect.top + rect.height / 2)) - rect.top;

        const ripple = document.createElement("span");
        const size = Math.max(rect.width, rect.height) * 1.2;

        ripple.style.cssText = [
          "position:absolute",
          `left:${x - size / 2}px`,
          `top:${y - size / 2}px`,
          `width:${size}px`,
          `height:${size}px`,
          "border-radius:999px",
          "background:rgba(255,255,255,.18)",
          "transform:scale(0)",
          "opacity:1",
          "pointer-events:none",
          "transition:transform .45s ease, opacity .55s ease"
        ].join(";");

        el.appendChild(ripple);
        // trigger
        requestAnimationFrame(() => {
          ripple.style.transform = "scale(1)";
          ripple.style.opacity = "0";
        });
        setTimeout(() => ripple.remove(), 650);
      }, { passive: true });
    });
  };

  // ===== Telegram with prefilled text (best UX)
  const openTelegramShare = async (text) => {
    // Try clipboard (quiet)
    try { await navigator.clipboard.writeText(text); } catch {}

    // Telegram share endpoint (works on mobile + desktop)
    const shareUrl = "https://t.me/share/url?url=" + encodeURIComponent(location.origin) + "&text=" + encodeURIComponent(text);
    // fallback: open chat
    const fallback = cfg.telegramChat;

    // Some browsers block window.open without user gesture; this is called from click handlers
    const w = window.open(shareUrl, "_blank", "noopener");
    if (!w) window.open(fallback, "_blank", "noopener");
  };

  const buildMessage = (pkg) => {
    const model  = ($("#carModel")?.value || "").trim();
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

  const setLang = (lang) => {
    document.documentElement.lang = (lang === "ua") ? "uk" : lang;

    $$(".chip").forEach((b) => {
      const on = (b.dataset.lang === lang);
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });

    $$("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const v = i18n[lang]?.[key];
      if (typeof v === "string") el.textContent = v;
    });

    // Re-apply labels inside icon buttons (because we replaced HTML)
    // Read desired label from current text nodes via i18n keys
    const btnRequest = $("#btnRequest");
    const btnPay     = $("#btnPay");
    const btnInstall = $("#btnInstall");

    if (btnRequest) {
      const label = t("cta_request");
      const txt = btnRequest.querySelector(".btnTxt");
      if (txt) txt.textContent = label;
      else btnRequest.textContent = label;
    }
    if (btnPay) {
      const label = t("cta_pay");
      const txt = btnPay.querySelector(".btnTxt");
      if (txt) txt.textContent = label;
      else btnPay.textContent = label;
    }
    if (btnInstall) {
      const label = t("cta_install");
      const txt = btnInstall.querySelector(".btnTxt");
      if (txt) txt.textContent = label;
      else btnInstall.textContent = label;
    }

    localStorage.setItem("k2_lang", lang);
  };

  // ===== Modal
  const modal = $("#payModal");
  const openPay  = () => { if(modal){ modal.classList.add("show"); modal.setAttribute("aria-hidden","false"); } };
  const closePay = () => { if(modal){ modal.classList.remove("show"); modal.setAttribute("aria-hidden","true"); } };

  // ===== PWA install (fixed)
  let deferredPrompt = null;

  const updateInstallVisibility = () => {
    // If already installed/standalone -> hide install button
    if (isStandalone()) {
      hideInstallButton();
      return;
    }
    // Not standalone: only show if we actually have deferredPrompt (Chrome/Edge)
    if (deferredPrompt) showInstallButton();
    else {
      // keep visible as "hint" OR hide for premium look
      // premium: hide until prompt appears
      hideInstallButton();
    }
  };

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    // show button now (premium: only when available)
    showInstallButton();
    updateInstallVisibility();
  });

  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    hideInstallButton();
    toast(t("toast_installed"));
  });

  // Also react when display-mode changes (some browsers)
  if (window.matchMedia) {
    const mq = window.matchMedia("(display-mode: standalone)");
    mq.addEventListener?.("change", () => updateInstallVisibility());
  }

  const installApp = async () => {
    if (isStandalone()) { hideInstallButton(); return; }

    if (!deferredPrompt) {
      toast(t("toast_install_hint"));
      return;
    }

    try {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice.catch(() => {});
    } finally {
      deferredPrompt = null;
      // If user installed -> appinstalled event will hide button; if not -> hide (premium)
      updateInstallVisibility();
    }
  };

  // ===== Init
  const savedLang = getLang();
  setLang(savedLang);

  // Footer year (safe)
  const y = $("#y");
  if (y) y.textContent = String(new Date().getFullYear());

  // Icons inside main CTA buttons
  injectButtonIcon($("#btnRequest"), ICONS.tg, "cta_request");
  injectButtonIcon($("#btnPay"),     ICONS.qr, "cta_pay");
  injectButtonIcon($("#btnInstall"), ICONS.install, "cta_install");

  // Enable ripple across buttons/cards
  enableRipple();

  // ===== Events (hero)
  $("#btnRequest")?.addEventListener("click", () => openTelegramShare(buildMessage(null)));
  $("#btnSend")?.addEventListener("click",    () => openTelegramShare(buildMessage(null)));

  $("#btnCopy")?.addEventListener("click", async () => {
    const text = buildMessage(null);
    try {
      await navigator.clipboard.writeText(text);
      toast(t("toast_copied"));
    } catch {
      toast("Copy failed");
    }
  });

  // Package buttons
  $$(".priceCard .btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const pkg = btn.getAttribute("data-pkg") || null;
      openTelegramShare(buildMessage(pkg));
    });
  });

  // Pay modal
  $("#btnPay")?.addEventListener("click", openPay);
  $("#btnPay2")?.addEventListener("click", openPay);
  $("#mobPay")?.addEventListener("click", openPay);

  modal?.addEventListener("click", (e) => {
    const tEl = e.target;
    if (tEl && (tEl.matches("[data-close]") || tEl.closest("[data-close]"))) closePay();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal?.classList.contains("show")) closePay();
  });

  // Install
  $("#btnInstall")?.addEventListener("click", installApp);

  // Language
  $$(".chip").forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang)));

  // Initial install button state
  updateInstallVisibility();

  // ===== Service Worker (safe, relative)
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch(() => {});
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
    let el = document.getElementById("toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "toast";
      el.style.cssText = [
        "position:fixed",
        "left:50%",
        "bottom:22px",
        "transform:translateX(-50%)",
        "padding:10px 12px",
        "border-radius:14px",
        "border:1px solid rgba(90,120,255,.28)",
        "background:rgba(10,15,34,.78)",
        "backdrop-filter: blur(10px)",
        "-webkit-backdrop-filter: blur(10px)",
        "box-shadow: 0 10px 30px rgba(0,0,0,.35)",
        "font-weight:800",
        "z-index:9999",
        "opacity:0",
        "transition:opacity .16s ease",
        "pointer-events:none",
        "color:#fff",
        "letter-spacing:.2px"
      ].join(";");
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.style.opacity = "1";
    clearTimeout(toast._tm);
    toast._tm = setTimeout(() => (el.style.opacity = "0"), 1400);
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

  const openTelegramShare = async (text) => {
    try { await navigator.clipboard.writeText(text); } catch {}
    const shareUrl = "https://t.me/share/url?url=" + encodeURIComponent(location.origin) + "&text=" + encodeURIComponent(text);
    const w = window.open(shareUrl, "_blank", "noopener");
    if (!w) window.open("https://t.me/k2camperbox", "_blank", "noopener");
  };

  if (sendTg) {
    sendTg.addEventListener("click", () => {
      if (!form) return;
      openTelegramShare(buildMsgFromForm());
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
    } catch {
      toast("Ошибка сети/скрипта");
    } finally {
      if (btn) btn.disabled = false;
    }
  });
})();
