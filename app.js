/* app.js — K2 CamperBox premium landing logic (no build tools)
   Features:
   - i18n DE/UA/RU
   - Premium buttons: icons + ripple + shine (lightweight)
   - Cards micro animations (subtle)
   - Local offline gallery with lightbox (assets/gallery-1..6.jpg)
   - PWA install button hides when installed + appinstalled handling
   - Revolut QR modal
   - Telegram request (copy + open)
   - Lead form submit to Apps Script
*/
(() => {
  "use strict";

  // =========================
  // Helpers
  // =========================
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];

  const isStandalone = () => {
    // Android/desktop PWA
    if (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) return true;
    // iOS PWA
    if ("standalone" in navigator && navigator.standalone) return true;
    return false;
  };

  const injectPremiumCSS = () => {
    if ($("#k2PremiumCSS")) return;
    const st = document.createElement("style");
    st.id = "k2PremiumCSS";
    st.textContent = `
      /* ===== Premium micro styles (injected) ===== */

      /* icons inside buttons */
      .btn .ico{
        width: 18px; height: 18px; flex: 0 0 18px;
        display:inline-block; vertical-align:-3px;
        margin-right: 10px;
        filter: drop-shadow(0 6px 14px rgba(0,0,0,.35));
        opacity: .95;
      }
      .btn.small .ico{ width: 16px; height: 16px; margin-right: 8px; }

      /* ripple */
      .btn{ position: relative; overflow: hidden; transform: translateZ(0); }
      .btn .ripple{
        position:absolute; border-radius:999px;
        transform: translate(-50%,-50%) scale(0);
        pointer-events:none;
        opacity:.35;
        background: radial-gradient(circle, rgba(255,255,255,.95) 0%, rgba(255,255,255,.12) 45%, rgba(255,255,255,0) 70%);
        animation: k2Ripple .65s ease-out;
        mix-blend-mode: overlay;
      }
      @keyframes k2Ripple{
        to{ transform: translate(-50%,-50%) scale(3.2); opacity:0; }
      }

      /* shine hover */
      .btn::after{
        content:"";
        position:absolute; top:-60%; left:-60%;
        width:120%; height:120%;
        background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.16) 45%, rgba(255,255,255,0) 70%);
        transform: rotate(18deg) translateX(-120%);
        transition: transform .55s ease;
        pointer-events:none;
      }
      .btn:hover::after{ transform: rotate(18deg) translateX(120%); }

      /* premium hover: slight lift */
      .btn{ transition: transform .16s ease, filter .16s ease; }
      .btn:hover{ transform: translateY(-1px); filter: brightness(1.02); }
      .btn:active{ transform: translateY(0px); }

      /* subtle cards hover */
      .card, .priceCard, .tile, .contactCard{
        transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease, filter .18s ease;
        will-change: transform;
      }
      .card:hover, .priceCard:hover, .tile:hover, .contactCard:hover{
        transform: translateY(-2px);
        filter: brightness(1.02);
      }

      /* lightbox */
      .k2Lightbox{
        position: fixed; inset: 0;
        display:none;
        align-items:center; justify-content:center;
        z-index: 9999;
      }
      .k2Lightbox.show{ display:flex; }
      .k2LightboxBack{
        position:absolute; inset:0;
        background: rgba(7,10,24,.72);
        backdrop-filter: blur(10px);
      }
      .k2LightboxCard{
        position: relative;
        width: min(980px, 92vw);
        max-height: 86vh;
        border-radius: 18px;
        overflow:hidden;
        border: 1px solid rgba(255,255,255,.10);
        box-shadow: 0 30px 80px rgba(0,0,0,.55);
        background: rgba(10,15,34,.85);
      }
      .k2LbTop{
        display:flex; align-items:center; justify-content:space-between;
        padding: 10px 12px;
        border-bottom: 1px solid rgba(255,255,255,.08);
        background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,0));
      }
      .k2LbTitle{
        font-weight: 800;
        font-size: 14px;
        opacity: .92;
      }
      .k2LbBtn{
        border:0;
        background: rgba(255,255,255,.08);
        color: #fff;
        border-radius: 12px;
        padding: 8px 10px;
        cursor:pointer;
        font-weight: 800;
        transition: transform .15s ease, background .15s ease;
      }
      .k2LbBtn:hover{ transform: translateY(-1px); background: rgba(255,255,255,.12); }
      .k2LbBody{
        position:relative;
        display:flex;
        align-items:center;
        justify-content:center;
        background: rgba(0,0,0,.12);
      }
      .k2LbImg{
        width:100%;
        height: calc(86vh - 52px);
        object-fit: contain;
        display:block;
        background: radial-gradient(800px 420px at 60% 30%, rgba(255,255,255,.08), rgba(255,255,255,0));
      }
      .k2LbNav{
        position:absolute;
        inset: 52px 0 0 0;
        display:flex;
        align-items:center;
        justify-content:space-between;
        pointer-events:none;
      }
      .k2LbArrow{
        pointer-events:auto;
        margin: 0 10px;
        width: 46px; height: 46px;
        border-radius: 14px;
        border: 1px solid rgba(255,255,255,.10);
        background: rgba(255,255,255,.08);
        color: #fff;
        font-weight: 900;
        cursor: pointer;
        display:flex; align-items:center; justify-content:center;
        transition: transform .15s ease, background .15s ease;
      }
      .k2LbArrow:hover{ transform: translateY(-1px); background: rgba(255,255,255,.12); }
      .k2LbHint{
        position:absolute;
        bottom: 10px; left: 12px; right: 12px;
        font-size: 12px;
        opacity: .78;
        display:flex; justify-content:space-between; gap:10px;
        pointer-events:none;
      }

      /* hide install when not available or installed */
      .k2Hidden{ display:none !important; }
    `;
    document.head.appendChild(st);
  };

  const toast = (msg) => {
    let t = $("#toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "toast";
      t.style.cssText =
        "position:fixed;left:50%;bottom:22px;transform:translateX(-50%);padding:10px 12px;border-radius:12px;border:1px solid rgba(36,48,95,.8);background:rgba(11,18,48,.92);backdrop-filter: blur(10px);font-weight:800;z-index:120;opacity:0;transition:opacity .15s ease";
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity = "1";
    clearTimeout(toast._tm);
    toast._tm = setTimeout(() => (t.style.opacity = "0"), 1400);
  };

  // Ripple on buttons
  const bindRipple = () => {
    const allBtns = $$(".btn, .k2LbBtn, .k2LbArrow");
    allBtns.forEach((btn) => {
      if (btn.dataset.rippleBound) return;
      btn.dataset.rippleBound = "1";
      btn.addEventListener("click", (e) => {
        // allow normal click behavior, just visual ripple
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX || rect.left + rect.width / 2) - rect.left;
        const y = (e.clientY || rect.top + rect.height / 2) - rect.top;
        const r = document.createElement("span");
        r.className = "ripple";
        const size = Math.max(rect.width, rect.height) * 1.2;
        r.style.width = r.style.height = `${size}px`;
        r.style.left = `${x}px`;
        r.style.top = `${y}px`;
        btn.appendChild(r);
        setTimeout(() => r.remove(), 700);
      }, { passive: true });
    });
  };

  // SVG icons
  const ICONS = {
    telegram: `<svg class="ico" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M21.8 4.7c.3-1.2-.8-2.1-1.9-1.7L3.7 9.1c-1.2.4-1.2 2.1.1 2.5l3.9 1.2 1.5 4.9c.3 1 1.6 1.3 2.3.5l2.3-2.5 4.6 3.4c.9.7 2.2.2 2.4-1l.9-13.4Z" fill="currentColor" opacity=".92"/>
      <path d="M9.4 13.1 18.9 6.8c.5-.3.9.3.5.7l-8 7.3c-.3.3-.5.7-.5 1.1l-.2 2.2c0 .7-1 .8-1.2.1l-1.3-4.2c-.2-.6.1-1.2.7-1.5Z" fill="currentColor" opacity=".55"/>
    </svg>`,
    revolut: `<svg class="ico" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6.4 18.8V5.2h7.7c3.2 0 5.1 1.8 5.1 4.5 0 2.1-1.1 3.6-3.1 4.2l3.1 4.9h-3.1l-2.8-4.4H9.2v4.4H6.4Zm2.8-6.9h4.6c1.5 0 2.4-.8 2.4-2.1 0-1.3-.9-2.1-2.4-2.1H9.2v4.2Z" fill="currentColor"/>
    </svg>`,
    install: `<svg class="ico" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3a1 1 0 0 1 1 1v8.2l2.3-2.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L11 12.2V4a1 1 0 0 1 1-1Z" fill="currentColor"/>
      <path d="M5 14a1 1 0 0 1 1 1v3h12v-3a1 1 0 1 1 2 0v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1Z" fill="currentColor" opacity=".7"/>
    </svg>`,
  };

  const setBtnIcon = (btn, iconKey) => {
    if (!btn || btn.dataset.iconized) return;
    btn.dataset.iconized = "1";
    const icon = ICONS[iconKey];
    if (!icon) return;

    // keep text for i18n updates: wrap text into span
    const txt = document.createElement("span");
    txt.className = "btnText";
    txt.textContent = btn.textContent.trim();
    btn.textContent = "";
    btn.insertAdjacentHTML("afterbegin", icon);
    btn.appendChild(txt);
  };

  // =========================
  // Config
  // =========================
  const cfg = {
    telegram: "https://t.me/k2camperbox",
    telegramUsername: "@k2camperbox",
    phone: "+4916096527272",
    email: "k2camperbox@gmail.com",
    projectName: "K2 CamperBox",
  };

  // =========================
  // i18n
  // =========================
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
      gallery_title:"Galerie", gallery_sub:"Lokale Fotos (offline) — tippe zum Vergrößern.",
      gallery_note:"Foto-Dateien: /assets/gallery-1.jpg … /assets/gallery-6.jpg (du kannst deine hochladen).",
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
      nav_cfg:"Konfigurator",
      nav_cab:"Cabinet",
      mob_request:"Anfrage",
      mob_pay:"QR",
      mob_cfg:"LEGO",
      mob_cab:"Cabinet",
      lb_open:"Galerie",
      lb_close:"Schließen",
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
      gallery_title:"Галерея", gallery_sub:"Локальні фото (офлайн) — натисни для перегляду.",
      gallery_note:"Файли фото: /assets/gallery-1.jpg … /assets/gallery-6.jpg (можеш залити свої).",
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
      nav_cfg:"Конфігуратор",
      nav_cab:"Кабінет",
      mob_request:"Заявка",
      mob_pay:"QR",
      mob_cfg:"LEGO",
      mob_cab:"Кабінет",
      lb_open:"Галерея",
      lb_close:"Закрити",
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
      gallery_title:"Галерея", gallery_sub:"Локальные фото (офлайн) — нажми для просмотра.",
      gallery_note:"Файлы фото: /assets/gallery-1.jpg … /assets/gallery-6.jpg (можешь загрузить свои).",
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
      ,
      form_title:"Форма заявки",
      form_sub:"Отправка заявки в Google Sheets (через Apps Script).",
      f_name:"Имя", f_phone:"Телефон", f_email:"Email", f_car:"Авто/модель", f_msg:"Сообщение",
      f_send:"Отправить в Sheets", f_open_crm:"Открыть Mini-CRM", f_send_tg:"Или отправить в Telegram",
      f_hint:"Чтобы форма работала: вставь Apps Script URL в crm-config.js. Если не настроено — используй Telegram.",
      nav_cfg:"Конфигуратор",
      nav_cab:"Кабинет",
      mob_request:"Заявка",
      mob_pay:"QR",
      mob_cfg:"LEGO",
      mob_cab:"Кабинет",
      lb_open:"Галерея",
      lb_close:"Закрыть",
    },
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
      if (typeof v === "string") {
        // if button has .btnText, update that, not replacing icons
        const bt = el.classList.contains("btn") ? el.querySelector(".btnText") : null;
        if (bt) bt.textContent = v;
        else el.textContent = v;
      }
    });

    localStorage.setItem("k2_lang", lang);

    // update lightbox texts if open
    updateLightboxTexts();
  };

  // =========================
  // Telegram
  // =========================
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
    // Copy + open chat (most compatible)
    try { await navigator.clipboard?.writeText(text); } catch (_) {}
    // optional toast for clarity
    const lang = localStorage.getItem("k2_lang") || "de";
    toast(i18n[lang]?.toast_copied || "Copied ✅");
    window.open(cfg.telegram, "_blank", "noopener");
  };

  // =========================
  // Pay modal (existing #payModal)
  // =========================
  const modal = $("#payModal");
  const openPay = () => { if (!modal) return; modal.classList.add("show"); modal.setAttribute("aria-hidden", "false"); };
  const closePay = () => { if (!modal) return; modal.classList.remove("show"); modal.setAttribute("aria-hidden", "true"); };

  // =========================
  // PWA install (hide when installed)
  // =========================
  let deferredPrompt = null;

  const updateInstallVisibility = () => {
    const btn = $("#btnInstall");
    if (!btn) return;
    // if installed -> hide
    if (isStandalone()) {
      btn.classList.add("k2Hidden");
      return;
    }
    // if not installed but no prompt -> keep subtle (ghost) or hide; choose hide to avoid confusion
    if (!deferredPrompt) {
      btn.classList.add("k2Hidden");
      return;
    }
    // available
    btn.classList.remove("k2Hidden");
  };

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    // show button only when prompt is available and not installed
    updateInstallVisibility();
  });

  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    updateInstallVisibility();
    toast("Installed ✅");
  });

  const installApp = async () => {
    if (isStandalone()) { updateInstallVisibility(); return; }
    if (!deferredPrompt) {
      toast("Chrome → Menü → App installieren");
      return;
    }
    deferredPrompt.prompt();
    try { await deferredPrompt.userChoice; } catch (_) {}
    deferredPrompt = null;
    updateInstallVisibility();
  };

  // =========================
  // Local Gallery + Lightbox
  // =========================
  let lb = null;
  let lbIdx = 0;
  const galleryImages = [
    { src: "/assets/gallery-1.jpg", title: "K2 CamperBox — Foto 1" },
    { src: "/assets/gallery-2.jpg", title: "K2 CamperBox — Foto 2" },
    { src: "/assets/gallery-3.jpg", title: "K2 CamperBox — Foto 3" },
    { src: "/assets/gallery-4.jpg", title: "K2 CamperBox — Foto 4" },
    { src: "/assets/gallery-5.jpg", title: "K2 CamperBox — Foto 5" },
    { src: "/assets/gallery-6.jpg", title: "K2 CamperBox — Foto 6" },
  ];

  const ensureLightbox = () => {
    if (lb) return lb;
    lb = document.createElement("div");
    lb.className = "k2Lightbox";
    lb.innerHTML = `
      <div class="k2LightboxBack" data-close></div>
      <div class="k2LightboxCard" role="dialog" aria-modal="true" aria-labelledby="k2LbTitle">
        <div class="k2LbTop">
          <div class="k2LbTitle" id="k2LbTitle">Gallery</div>
          <button class="k2LbBtn" type="button" data-close>✕</button>
        </div>
        <div class="k2LbBody">
          <img class="k2LbImg" alt="Gallery image" />
          <div class="k2LbNav" aria-hidden="true">
            <button class="k2LbArrow" type="button" data-prev>‹</button>
            <button class="k2LbArrow" type="button" data-next>›</button>
          </div>
          <div class="k2LbHint">
            <span data-hint-left>← / →</span>
            <span data-hint-right>Esc</span>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(lb);

    lb.addEventListener("click", (e) => {
      const t = e.target;
      if (!t) return;
      if (t.matches("[data-close]") || t.closest("[data-close]")) closeLightbox();
    });

    $("[data-prev]", lb)?.addEventListener("click", () => showLightbox(lbIdx - 1));
    $("[data-next]", lb)?.addEventListener("click", () => showLightbox(lbIdx + 1));

    document.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("show")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showLightbox(lbIdx - 1);
      if (e.key === "ArrowRight") showLightbox(lbIdx + 1);
    });

    return lb;
  };

  const updateLightboxTexts = () => {
    if (!lb) return;
    const lang = localStorage.getItem("k2_lang") || "de";
    const titleEl = $("#k2LbTitle", lb);
    if (titleEl) titleEl.textContent = i18n[lang]?.lb_open || "Gallery";
    const closeBtn = $("[data-close].k2LbBtn", lb);
    if (closeBtn) closeBtn.setAttribute("aria-label", i18n[lang]?.lb_close || "Close");
  };

  const showLightbox = (index) => {
    ensureLightbox();
    const total = galleryImages.length;
    lbIdx = (index + total) % total;
    const img = $(".k2LbImg", lb);
    const title = $("#k2LbTitle", lb);
    const current = galleryImages[lbIdx];
    if (img) img.src = current.src;
    if (img) img.alt = current.title || "Gallery";
    if (title) title.textContent = current.title || (i18n[localStorage.getItem("k2_lang") || "de"]?.lb_open || "Gallery");

    lb.classList.add("show");
    // bind ripple inside lightbox buttons too
    bindRipple();
  };

  const closeLightbox = () => {
    if (!lb) return;
    lb.classList.remove("show");
  };

  const initGallery = () => {
    const gallery = $(".gallery");
    if (!gallery) return;

    // Ensure 6 shots (create missing)
    let shots = $$(".gallery .shot");
    const need = 6 - shots.length;
    for (let i = 0; i < need; i++) {
      const d = document.createElement("div");
      d.className = "shot";
      gallery.appendChild(d);
    }
    shots = $$(".gallery .shot");

    // Map local assets and make clickable (as button-like)
    shots.slice(0, 6).forEach((el, idx) => {
      el.style.backgroundImage = `url("${galleryImages[idx].src}")`;
      el.style.backgroundSize = "cover";
      el.style.backgroundPosition = "center";
      el.style.cursor = "pointer";
      el.setAttribute("role", "button");
      el.setAttribute("tabindex", "0");
      el.setAttribute("aria-label", `Open photo ${idx + 1}`);

      // subtle overlay for premium feel (no heavy CSS)
      el.style.border = "1px solid rgba(255,255,255,.10)";
      el.style.borderRadius = "18px";
      el.style.boxShadow = "0 18px 50px rgba(0,0,0,.35)";

      if (!el.dataset.lbBound) {
        el.dataset.lbBound = "1";
        el.addEventListener("click", () => showLightbox(idx));
        el.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") showLightbox(idx);
        });
      }
    });

    // Bind ripple for any new buttons
    bindRipple();
  };

  // =========================
  // Lead form -> Apps Script
  // =========================
  const initLeadForm = () => {
    const cfgCRM = window.K2_CRM || {};
    const scriptUrl = (cfgCRM.SCRIPT_URL || "").replace(/\/$/, "");
    const form = $("#leadForm");
    const btn = $("#btnSubmitLead");
    const sendTg = $("#btnSendTg2");

    const lang = () => localStorage.getItem("k2_lang") || "de";

    const buildMsgFromForm = () => {
      if (!form) return `👋 ${cfg.projectName} Anfrage (Form)`;
      const fd = new FormData(form);
      const obj = Object.fromEntries(fd.entries());
      const lines = [
        `👋 ${cfg.projectName} Anfrage (Form)`,
        obj.carModel ? `🚗 Auto: ${obj.carModel}` : null,
        obj.name ? `👤 Name: ${obj.name}` : null,
        obj.phone ? `📞 Telefon: ${obj.phone}` : null,
        obj.email ? `✉️ Email: ${obj.email}` : null,
        obj.message ? `📝 Nachricht: ${obj.message}` : null,
      ].filter(Boolean);
      return lines.join("\n");
    };

    if (sendTg && !sendTg.dataset.bound) {
      sendTg.dataset.bound = "1";
      sendTg.addEventListener("click", async () => {
        const msg = buildMsgFromForm();
        try { await navigator.clipboard?.writeText(msg); } catch (_) {}
        toast(i18n[lang()]?.toast_copied || "Copied ✅");
        window.open(cfg.telegram, "_blank", "noopener");
      });
    }

    if (!form || form.dataset.bound) return;
    form.dataset.bound = "1";

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
      } catch (_) {
        toast("Ошибка сети/скрипта");
      } finally {
        if (btn) btn.disabled = false;
      }
    });
  };

  // =========================
  // Init
  // =========================
  const init = () => {
    injectPremiumCSS();

    // footer year
    const y = $("#y");
    if (y) y.textContent = String(new Date().getFullYear());

    // i18n saved
    const saved = localStorage.getItem("k2_lang") || "de";
    setLang(saved);

    // Bind language chips
    $$(".chip").forEach((b) => {
      if (b.dataset.bound) return;
      b.dataset.bound = "1";
      b.addEventListener("click", () => setLang(b.dataset.lang));
    });

    // Icons inside buttons (no HTML edits)
    setBtnIcon($("#btnRequest"), "telegram");
    setBtnIcon($("#btnSend"), "telegram");
    setBtnIcon($("#btnSendTg2"), "telegram");
    setBtnIcon($("#btnPay"), "revolut");
    setBtnIcon($("#btnPay2"), "revolut");
    setBtnIcon($("#mobPay"), "revolut");
    setBtnIcon($("#btnInstall"), "install");

    // bind ripple to existing buttons
    bindRipple();

    // Telegram actions
    $("#btnRequest")?.addEventListener("click", () => openTelegram(buildMessage(null)));
    $("#btnSend")?.addEventListener("click", () => openTelegram(buildMessage(null)));

    $("#btnCopy")?.addEventListener("click", async () => {
      const text = buildMessage(null);
      try {
        await navigator.clipboard.writeText(text);
        const lang = localStorage.getItem("k2_lang") || "de";
        toast(i18n[lang]?.toast_copied || "Copied ✅");
      } catch (_) {
        toast("Copy failed");
      }
    });

    $$(".priceCard .btn").forEach((btn) => {
      if (btn.dataset.bound) return;
      btn.dataset.bound = "1";
      btn.addEventListener("click", () => {
        const pkg = btn.getAttribute("data-pkg") || null;
        openTelegram(buildMessage(pkg));
      });
    });

    // Pay modal
    $("#btnPay")?.addEventListener("click", openPay);
    $("#btnPay2")?.addEventListener("click", openPay);
    $("#mobPay")?.addEventListener("click", openPay);

    if (modal && !modal.dataset.bound) {
      modal.dataset.bound = "1";
      modal.addEventListener("click", (e) => {
        const t = e.target;
        if (t && (t.matches("[data-close]") || t.closest("[data-close]"))) closePay();
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("show")) closePay();
      });
    }

    // Install button behavior
    $("#btnInstall")?.addEventListener("click", installApp);
    // First check visibility on load (important!)
    updateInstallVisibility();

    // Local gallery + lightbox
    initGallery();

    // Lead form
    initLeadForm();

    // Service Worker register
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").catch(() => {});
      });
    }
  };

  // Run
  init();
})();
