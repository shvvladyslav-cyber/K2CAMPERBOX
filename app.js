/* K2 CamperBox — single-file app logic (no build tools)
   - Language switch: DE / UA / RU
   - Telegram request: opens chat with prefilled message + copy to clipboard
   - PWA install button
   - Revolut QR modal
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
      form_title:"Anfrage-Formular",
      form_sub:"Sende Anfrage direkt in Google Sheets (Apps Script).",
      f_name:"Name",
      f_phone:"Telefon",
      f_email:"Email",
      f_car:"Auto/Modell",
      f_msg:"Nachricht",
      f_send:"In Sheets senden",
      f_open_crm:"Mini-CRM öffnen",
      f_send_tg:"Oder in Telegram senden",
      f_hint:"Damit das Formular funktioniert: Apps Script URL in crm-config.js eintragen. Sonst nutze Telegram.",
      crm_title:"Mini-CRM",
      crm_sub:"Letzte Anfragen aus Google Sheets (ohne Login).",
      crm_open:"CRM öffnen",
      crm_open_leads:"Leads öffnen",
      crm_open_new:"NEW öffnen",
      crm_reload:"Aktualisieren",
      crm_status:"Status:",
      crm_hint:"Tipp: “+1 Status” ändert NEW→IN_WORK→DONE direkt aus der Tabelle.",
      t_created:"Datum",
      t_name:"Name",
      t_phone:"Telefon",
      t_car:"Auto",
      t_msg:"Nachricht",
      t_status:"Status",
      crm_setup:"Damit es funktioniert: Apps Script URL in crm-config.js einfügen und Web App deployen.",
      nav_cfg:"Konfigurator",
      nav_cab:"Cabinet",
      mob_request:"Anfrage",
      mob_pay:"QR",
      mob_cfg:"LEGO",
      mob_cab:"Cabinet",
      cab_tag:"Cabinet",
      cab_home:"Home",
      cab_cfg:"Konfigurator",
      cab_crm:"CRM",
      cab_title:"Cabinet",
      cab_sub:"Schnellbuttons + Mini-Tabelle (wie UHU.digital).",
      cab_t1:"Anfrage erstellen",
      cab_t1s:"Form → Google Sheets",
      cab_t2:"Telegram",
      cab_t3:"Konfigurator",
      cab_t3s:"Baue wie LEGO",
      cab_open_crm:"CRM öffnen",
      cab_open_leads:"Leads öffnen",
      cab_open_new:"NEW öffnen",
      cab_open_crm_page:"CRM-Seite",
      cab_status:"Status:",
      cab_reload:"Aktualisieren",
      cab_hint:"Mini-Tabelle der letzten 10 Leads. “+1” wechselt NEW→IN_WORK→DONE.",
      cfg_tag:"LEGO Konfigurator",
      cfg_cab:"Cabinet",
      cfg_crm:"CRM",
      cfg_form:"Form",
      cfg_title:"Konfigurator (wie LEGO)",
      cfg_sub:"Wähle Fahrzeug + Module. Sende Anfrage.",
      cfg_vehicle:"Fahrzeug",
      cfg_notes:"Notizen",
      cfg_modules:"Module (klicken zum Hinzufügen)",
      cfg_your:"Dein Build",
      cfg_sum:"Module gesamt:",
      cfg_est:"Schätzung:",
      cfg_est_note:"Nur Platzhalter. Preis nach Klärung.",
      cfg_send_tg:"In Telegram senden",
      cfg_copy:"Kopieren",
      cfg_hint:"Das ist das Grundgerüst. Später 3D/Drag&Drop möglich."
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
      form_title:"Форма заявки",
      form_sub:"Надсилає заявку в Google Sheets (через Apps Script).",
      f_name:"Імʼя",
      f_phone:"Телефон",
      f_email:"Email",
      f_car:"Авто/модель",
      f_msg:"Повідомлення",
      f_send:"Надіслати в Sheets",
      f_open_crm:"Відкрити Mini-CRM",
      f_send_tg:"Або надіслати в Telegram",
      f_hint:"Щоб форма працювала: встав Apps Script URL у crm-config.js. Якщо не налаштовано — використовуй Telegram.",
      crm_title:"Mini-CRM",
      crm_sub:"Останні заявки з Google Sheets (без авторизації).",
      crm_open:"Відкрити CRM",
      crm_open_leads:"Відкрити Leads",
      crm_open_new:"Відкрити NEW",
      crm_reload:"Оновити",
      crm_status:"Статус:",
      crm_hint:"Порада: “+1 статус” змінює NEW→IN_WORK→DONE прямо з таблиці.",
      t_created:"Дата",
      t_name:"Імʼя",
      t_phone:"Телефон",
      t_car:"Авто",
      t_msg:"Повідомлення",
      t_status:"Статус",
      crm_setup:"Щоб запрацювало: встав Apps Script URL у crm-config.js та задеплой Web App.",
      nav_cfg:"Конфігуратор",
      nav_cab:"Кабінет",
      mob_request:"Заявка",
      mob_pay:"QR",
      mob_cfg:"LEGO",
      mob_cab:"Кабінет",
      cab_tag:"Кабінет",
      cab_home:"Home",
      cab_cfg:"Конфігуратор",
      cab_crm:"CRM",
      cab_title:"Кабінет",
      cab_sub:"Швидкі кнопки + міні-таблиця (як UHU.digital).",
      cab_t1:"Створити заявку",
      cab_t1s:"Форма → Google Sheets",
      cab_t2:"Telegram",
      cab_t3:"Конфігуратор",
      cab_t3s:"Збери як LEGO",
      cab_open_crm:"Відкрити CRM",
      cab_open_leads:"Відкрити Leads",
      cab_open_new:"Відкрити NEW",
      cab_open_crm_page:"Сторінка CRM",
      cab_status:"Статус:",
      cab_reload:"Оновити",
      cab_hint:"Міні-таблиця 10 заявок. “+1” змінює NEW→IN_WORK→DONE.",
      cfg_tag:"LEGO Конфігуратор",
      cfg_cab:"Кабінет",
      cfg_crm:"CRM",
      cfg_form:"Форма",
      cfg_title:"Конфігуратор (як LEGO)",
      cfg_sub:"Обери авто + модулі. Надішли заявку.",
      cfg_vehicle:"Авто",
      cfg_notes:"Побажання",
      cfg_modules:"Модулі (натисни щоб додати)",
      cfg_your:"Твоя збірка",
      cfg_sum:"Всього модулів:",
      cfg_est:"Оцінка:",
      cfg_est_note:"Лише плейсхолдер. Ціна після уточнення.",
      cfg_send_tg:"Надіслати в Telegram",
      cfg_copy:"Скопіювати",
      cfg_hint:"Це каркас. Далі можна 3D/drag&drop."
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
      toast_copied:"Скопировано ✅"
    }
  };

  const toast = (msg) => {
    let t = $("#toast");
    if(!t){
      t = document.createElement("div");
      t.id = "toast";
      t.style.cssText = "position:fixed;left:50%;bottom:22px;transform:translateX(-50%);padding:10px 12px;border-radius:12px;border:1px solid rgba(36,48,95,.8);background:rgba(11,18,48,.92);backdrop-filter: blur(10px);font-weight:800;z-index:120;opacity:0;transition:opacity .15s ease";
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity = "1";
    clearTimeout(toast._tm);
    toast._tm = setTimeout(()=> t.style.opacity="0", 1400);
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

  const openTelegram = (text) => {
    // For best compatibility: open username and keep message in clipboard too
    navigator.clipboard?.writeText(text).catch(()=>{});
    window.open(cfg.telegram, "_blank", "noopener");
  };

  const setLang = (lang) => {
    document.documentElement.lang = lang === "ua" ? "uk" : lang;
    $$(".chip").forEach(b => {
      const on = b.dataset.lang === lang;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    $$("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const v = i18n[lang]?.[key];
      if (typeof v === "string") el.textContent = v;
    });
    localStorage.setItem("k2_lang", lang);
  };

  // Modal
  const modal = $("#payModal");
  const openPay = () => { modal.classList.add("show"); modal.setAttribute("aria-hidden","false"); };
  const closePay = () => { modal.classList.remove("show"); modal.setAttribute("aria-hidden","true"); };

  // PWA install
  let deferredPrompt = null;
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    $("#btnInstall")?.classList.remove("ghost");
  });

  const installApp = async () => {
    if(!deferredPrompt){ toast("Chrome → Menü → App installieren"); return; }
    deferredPrompt.prompt();
    await deferredPrompt.userChoice.catch(()=>{});
    deferredPrompt = null;
  };

  // Init
  const saved = localStorage.getItem("k2_lang") || "de";
  setLang(saved);

  // Footer year
  $("#y").textContent = String(new Date().getFullYear());

  // Events
  $("#btnRequest")?.addEventListener("click", () => openTelegram(buildMessage(null)));
  $("#btnSend")?.addEventListener("click", () => openTelegram(buildMessage(null)));
  $("#btnCopy")?.addEventListener("click", async () => {
    const text = buildMessage(null);
    try { await navigator.clipboard.writeText(text); toast(i18n[localStorage.getItem("k2_lang")||"de"].toast_copied); }
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
  modal?.addEventListener("click", (e) => {
    const t = e.target;
    if (t && (t.matches("[data-close]") || t.closest("[data-close]"))) closePay();
  });
  document.addEventListener("keydown", (e) => { if(e.key==="Escape" && modal.classList.contains("show")) closePay(); });

  $("#btnInstall")?.addEventListener("click", installApp);

  $$(".chip").forEach(b => b.addEventListener("click", () => setLang(b.dataset.lang)));

  // Service Worker
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => navigator.serviceWorker.register("/sw.js").catch(()=>{}));
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
      t.style.cssText = "position:fixed;left:50%;bottom:22px;transform:translateX(-50%);padding:10px 12px;border-radius:12px;border:1px solid rgba(36,48,95,.8);background:rgba(11,18,48,.92);backdrop-filter: blur(10px);font-weight:800;z-index:120;opacity:0;transition:opacity .15s ease";
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

  if(sendTg){
    sendTg.addEventListener("click", () => {
      try{
        navigator.clipboard?.writeText(buildMsgFromForm()).catch(()=>{});
        window.open("https://t.me/k2camperbox","_blank","noopener");
      }catch(e){}
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
      const json = await res.json();
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
