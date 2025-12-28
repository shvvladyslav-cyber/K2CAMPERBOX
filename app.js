// app.js
(() => {
  const $ = (s) => document.querySelector(s);

  const cfg = window.K2 || {};
  const tgUser = cfg.telegramUsername || "k2camperbox";
  const tgText = encodeURIComponent(cfg.telegramStartText || "Здравствуйте!");
  const phone = (cfg.phoneE164 || "+4916096527272").replace(/\s+/g, "");
  const email = cfg.email || "k2camperbox@gmail.com";

  // Links
  const tgLink = `https://t.me/${tgUser}?start=${tgText}`;
  const waPhone = phone.replace(/^\+/, "");
  const waLink = `https://wa.me/${waPhone}?text=${tgText}`;

  $("#btnTelegram").href = tgLink;
  $("#btnWhatsApp").href = waLink;
  $("#btnCall").href = `tel:${phone}`;
  $("#btnEmail").href = `mailto:${email}`;
  $("#footEmail").href = `mailto:${email}`;
  $("#footEmail").textContent = email;
  $("#footPhone").href = `tel:${phone}`;
  $("#footPhone").textContent = phone;

  $("#year").textContent = new Date().getFullYear();

  // Share
  $("#btnShare").addEventListener("click", async () => {
    const data = {
      title: "K2 CamperBox",
      text: "K2 CamperBox — модульный кемпинг-бокс. Заявка в 1 клик.",
      url: location.href
    };
    try {
      if (navigator.share) await navigator.share(data);
      else {
        await navigator.clipboard.writeText(location.href);
        toast(i18n.t("copied"));
      }
    } catch (_) {}
  });

  // Admin links (optional)
  const openCrmUrl = cfg.openCrmUrl || "";
  const openLeadsNewUrl = cfg.openLeadsNewUrl || "";
  if (openCrmUrl || openLeadsNewUrl) {
    $("#adminLinks").hidden = false;
    if (openCrmUrl) $("#btnOpenCRM").href = openCrmUrl;
    if (openLeadsNewUrl) $("#btnOpenNew").href = openLeadsNewUrl;
  }

  // i18n
  const dict = {
    ru: {
      tagline: "Модульный кемпинг-бокс • быстро • красиво • под ключ",
      h1: "CamperBox в твой автомобиль — за 1 день",
      lead: "Удобная модульная система для ночёвки и путешествий: ровная кровать, хранение, кухня-модуль, быстрая установка.",
      ctaTelegram: "Написать в Telegram",
      ctaWhatsApp: "Написать в WhatsApp",
      call: "Позвонить",
      email: "Email",
      share: "Поделиться",
      install: "Установить приложение",
      b1: "✅ Быстрое изготовление",
      b2: "✅ Под размеры авто",
      b3: "✅ Красиво и практично",
      mockTitle: "K2 CamperBox — конфигуратор",
      t1: "Спальное место",
      t1d: "Ровная кровать + матрас",
      t2: "Хранение",
      t2d: "Ящики, ниши, органайзеры",
      t3: "Кухня",
      t3d: "Столик, плита, вода (опция)",
      t4: "Электрика",
      t4d: "USB/12V/LED (опция)",
      ctaForm: "Оставить заявку",
      forWho: "Для каких авто?",
      forWhoText: "VW Caddy, Berlingo, Combo, Kangoo и похожие. Сделаем под твои размеры.",
      li1: "Съёмный модуль — можно убрать за 10 минут",
      li2: "Прочные материалы + аккуратная отделка",
      li3: "Хранение вещей и организация пространства",
      howWorks: "Как это работает?",
      s1: "Пишешь нам",
      s1d: "Telegram/WhatsApp/звонок",
      s2: "Уточняем авто",
      s2d: "модель, размеры, пожелания",
      s3: "Делаем комплект",
      s3d: "быстро и аккуратно",
      s4: "Установка",
      s4d: "и ты готов к путешествиям",
      formTitle: "Заявка / Anfrage",
      formNote: "Заполни 30 секунд — мы ответим в Telegram или WhatsApp.",
      fName: "Имя",
      fCity: "Город",
      fCar: "Авто (модель/год)",
      fPhone: "Телефон (WhatsApp)",
      fWish: "Что нужно?",
      fSend: "Отправить заявку",
      privacy: "Мы используем данные только чтобы связаться с вами.",
      admin: "Админ-кнопки (если ты указал ссылки в config.js)",
      sending: "Отправляю…",
      sentOk: "✅ Готово! Мы скоро ответим.",
      sentFail: "❌ Не отправилось. Напиши в Telegram/WhatsApp — кнопки сверху.",
      needEndpoint: "⚠️ Не указан leadsEndpoint в config.js (можно и без него).",
      copied: "Ссылка скопирована ✅"
    },
    ua: {
      tagline: "Модульний кемпінг-бокс • швидко • красиво • під ключ",
      h1: "CamperBox у твоє авто — за 1 день",
      lead: "Зручна модульна система: рівне ліжко, зберігання, кухня-модуль, швидке встановлення.",
      ctaTelegram: "Написати в Telegram",
      ctaWhatsApp: "Написати в WhatsApp",
      call: "Подзвонити",
      email: "Email",
      share: "Поділитися",
      install: "Встановити застосунок",
      b1: "✅ Швидке виготовлення",
      b2: "✅ Під розміри авто",
      b3: "✅ Красиво і практично",
      mockTitle: "K2 CamperBox — конфігуратор",
      t1: "Спальне місце",
      t1d: "Рівне ліжко + матрац",
      t2: "Зберігання",
      t2d: "Ящики, ніші, органайзери",
      t3: "Кухня",
      t3d: "Столик, плита, вода (опція)",
      t4: "Електрика",
      t4d: "USB/12V/LED (опція)",
      ctaForm: "Залишити заявку",
      forWho: "Для яких авто?",
      forWhoText: "VW Caddy, Berlingo, Combo, Kangoo та схожі. Зробимо під твої розміри.",
      li1: "Знімний модуль — можна прибрати за 10 хвилин",
      li2: "Міцні матеріали + акуратна обробка",
      li3: "Зберігання речей та організація простору",
      howWorks: "Як це працює?",
      s1: "Пишеш нам",
      s1d: "Telegram/WhatsApp/дзвінок",
      s2: "Уточнюємо авто",
      s2d: "модель, розміри, побажання",
      s3: "Робимо комплект",
      s3d: "швидко й акуратно",
      s4: "Встановлення",
      s4d: "і ти готовий до подорожей",
      formTitle: "Заявка / Anfrage",
      formNote: "Заповни 30 секунд — відповімо в Telegram або WhatsApp.",
      fName: "Імʼя",
      fCity: "Місто",
      fCar: "Авто (модель/рік)",
      fPhone: "Телефон (WhatsApp)",
      fWish: "Що потрібно?",
      fSend: "Надіслати заявку",
      privacy: "Дані потрібні лише щоб звʼязатися з вами.",
      admin: "Адмін-кнопки (якщо вказав посилання в config.js)",
      sending: "Надсилаю…",
      sentOk: "✅ Готово! Скоро відповімо.",
      sentFail: "❌ Не надіслалося. Напиши в Telegram/WhatsApp — кнопки зверху.",
      needEndpoint: "⚠️ Не вказано leadsEndpoint у config.js (можна і без нього).",
      copied: "Посилання скопійовано ✅"
    },
    de: {
      tagline: "Modularer CamperBox • schnell • schön • komplett",
      h1: "CamperBox für dein Auto — in 1 Tag",
      lead: "Modulares System für Reisen: flaches Bett, Stauraum, Küchenmodul, schnelle Montage.",
      ctaTelegram: "In Telegram schreiben",
      ctaWhatsApp: "In WhatsApp schreiben",
      call: "Anrufen",
      email: "Email",
      share: "Teilen",
      install: "App installieren",
      b1: "✅ Schnelle Fertigung",
      b2: "✅ Für dein Auto",
      b3: "✅ Schön & praktisch",
      mockTitle: "K2 CamperBox — Konfigurator",
      t1: "Schlafplatz",
      t1d: "Flaches Bett + Matratze",
      t2: "Stauraum",
      t2d: "Boxen, Fächer, Organizer",
      t3: "Küche",
      t3d: "Tisch, Kocher, Wasser (optional)",
      t4: "Elektrik",
      t4d: "USB/12V/LED (optional)",
      ctaForm: "Anfrage senden",
      forWho: "Für welche Autos?",
      forWhoText: "VW Caddy, Berlingo, Combo, Kangoo usw. Wir bauen nach Maß.",
      li1: "Herausnehmbar — in 10 Minuten raus",
      li2: "Stabile Materialien + saubere Verarbeitung",
      li3: "Stauraum & Ordnung im Auto",
      howWorks: "Wie läuft’s ab?",
      s1: "Du schreibst uns",
      s1d: "Telegram/WhatsApp/Anruf",
      s2: "Auto klären",
      s2d: "Modell, Maße, Wünsche",
      s3: "Wir bauen",
      s3d: "schnell & sauber",
      s4: "Einbau",
      s4d: "und los geht’s",
      formTitle: "Anfrage / Заявка",
      formNote: "30 Sekunden — wir antworten per Telegram oder WhatsApp.",
      fName: "Name",
      fCity: "Stadt",
      fCar: "Auto (Modell/Jahr)",
      fPhone: "Telefon (WhatsApp)",
      fWish: "Wunsch",
      fSend: "Anfrage senden",
      privacy: "Daten nur zur Kontaktaufnahme.",
      admin: "Admin-Buttons (wenn Links in config.js gesetzt sind)",
      sending: "Sende…",
      sentOk: "✅ Gesendet! Wir melden uns bald.",
      sentFail: "❌ Fehler. Bitte per Telegram/WhatsApp schreiben (Buttons oben).",
      needEndpoint: "⚠️ leadsEndpoint fehlt in config.js (optional).",
      copied: "Link kopiert ✅"
    }
  };

  const i18n = {
    lang: localStorage.getItem("k2_lang") || "ru",
    t(key){ return (dict[this.lang] && dict[this.lang][key]) || (dict.ru[key] || key); },
    apply(){
      document.documentElement.lang = this.lang;
      document.querySelectorAll("[data-i18n]").forEach(el => {
        el.textContent = this.t(el.getAttribute("data-i18n"));
      });
      document.querySelectorAll(".chip").forEach(b => b.classList.toggle("active", b.dataset.lang === this.lang));
    }
  };
  window.i18n = i18n;
  i18n.apply();

  document.querySelectorAll(".chip").forEach(btn => {
    btn.addEventListener("click", () => {
      i18n.lang = btn.dataset.lang;
      localStorage.setItem("k2_lang", i18n.lang);
      i18n.apply();
    });
  });

  // Scroll to form
  $("#btnScrollForm").addEventListener("click", (e) => {
    e.preventDefault();
    $("#leadForm").scrollIntoView({behavior:"smooth", block:"start"});
  });

  // Form submit
  const form = $("#form");
  const msg = $("#formMsg");

  function setMsg(text, ok=true){
    msg.className = "msg " + (ok ? "ok" : "err");
    msg.textContent = text;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const endpoint = (cfg.leadsEndpoint || "").trim();

    if (!endpoint) {
      // Можно жить и без CRM — просто подсказка
      setMsg(i18n.t("needEndpoint"), false);
      window.open(tgLink, "_blank");
      return;
    }

    setMsg(i18n.t("sending"), true);

    const fd = new FormData(form);
    fd.append("source", "k2camperbox.de");
    fd.append("lang", i18n.lang);
    fd.append("ts", new Date().toISOString());

    try {
      const res = await fetch(endpoint, { method: "POST", body: fd });
      if (!res.ok) throw new Error("Bad status");

      // Если твой скрипт возвращает JSON — можем прочитать, но это необязательно
      setMsg(i18n.t("sentOk"), true);
      form.reset();
    } catch (err) {
      setMsg(i18n.t("sentFail"), false);
    }
  });

  // Tiny toast
  let toastTimer;
  function toast(text){
    clearTimeout(toastTimer);
    let el = document.getElementById("toast");
    if (!el){
      el = document.createElement("div");
      el.id = "toast";
      el.style.position = "fixed";
      el.style.left = "50%";
      el.style.bottom = "18px";
      el.style.transform = "translateX(-50%)";
      el.style.padding = "10px 12px";
      el.style.borderRadius = "999px";
      el.style.border = "1px solid rgba(255,255,255,.16)";
      el.style.background = "rgba(0,0,0,.45)";
      el.style.backdropFilter = "blur(10px)";
      el.style.boxShadow = "0 20px 60px rgba(0,0,0,.45)";
      el.style.zIndex = 9999;
      document.body.appendChild(el);
    }
    el.textContent = text;
    el.style.opacity = "1";
    toastTimer = setTimeout(() => { el.style.opacity = "0"; }, 2200);
  }

  // PWA install
  let deferredPrompt = null;
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    $("#btnInstall").hidden = false;
  });

  $("#btnInstall").addEventListener("click", async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    try { await deferredPrompt.userChoice; } catch(_) {}
    deferredPrompt = null;
    $("#btnInstall").hidden = true;
  });

  // SW register
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    });
  }
})();
