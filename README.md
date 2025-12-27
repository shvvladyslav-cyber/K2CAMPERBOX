# K2 CamperBox — Final GitHub Package (Site + PWA + Orders)

## Что это
Готовый **статический сайт** (отдельные страницы) + **PWA** + **заказы в Google Sheets** + **авто‑письмо клиенту** + **(опционально) Rechnung PDF** + **(опционально) Telegram или Push**.

---

## 0) Что тебе нужно подготовить
- GitHub аккаунт + репозиторий
- Stripe аккаунт (Payment Links)
- Google аккаунт (Sheets + Apps Script)

---

## 1) Загрузка на GitHub (самый простой способ)
1. Скачай ZIP из чата
2. Распакуй
3. Открой GitHub репозиторий → **Add file → Upload files**
4. Перетащи **все файлы из распакованной папки** (в корень)
5. Commit

---

## 2) Включить GitHub Pages
1. Репозиторий → **Settings**
2. **Pages**
3. Source: **Deploy from a branch**
4. Branch: `main` / folder: `/(root)`
5. Save
6. Готово: сайт будет `https://USERNAME.github.io/REPO/`

---

## 3) Stripe Links (Модели + Extras отдельно)
В Stripe создай **6 Payment Links** и скопируй:
- Basic 329€
- Comfort 549€
- Pro 799€
- Extra Mattress 89€
- Extra Bag 39€
- Extra FastKit 29€

---

## 4) Вставь Stripe Links в `config.js`
Открой файл `config.js` и замени строки:
- `STRIPE_LINK_BASIC` и т.д.

Commit изменения.

---

## 5) Создай CRM (Google Sheets)
1. Google Drive → New → **Google Sheets**
2. Назови `K2_CRM`
3. Открой — пока пусто

---

## 6) Установи Google Apps Script WebApp (приём заказов)
1. В таблице: **Extensions → Apps Script**
2. Удали всё и вставь код из `apps-script/Code.gs`
3. Save
4. Deploy → **New deployment**
5. Type: **Web app**
6. Execute as: **Me**
7. Access: **Anyone**
8. Deploy → **скопируй Web app URL**
9. Вставь URL в `config.js` → `GAS_WEBAPP_URL`

Commit.

---

## 7) Вставь ссылку на CRM в `admin.html`
Открой `admin.html` и замени:
`PASTE_CRM_SHEET_URL_HERE` на ссылку твоей таблицы.

Commit.

---

## 8) Автоматическая Rechnung PDF (опционально, но ты просил — включено)
1. Google Docs → New → Document
2. Название документа: **K2_Rechnung_Template**
3. Вставь текст:

RECHNUNG

Rechnung Nr.: {{RECHNUNG_NR}}
Datum: {{DATUM}}

K2 CamperBox
Deutschland

Leistung:
K2 CamperBox – Modell {{MODELL}}

Betrag: {{BETRAG}} EUR

Hinweis:
Gemäß §19 UStG wird keine MwSt. ausgewiesen.

4. В `apps-script/Code.gs` параметр `SEND_INVOICE_PDF:true` уже включён.

---

## 9) Telegram (опционально) — уведомления владельцу + “Stripe”
В `apps-script/Code.gs`:
- `TELEGRAM_ENABLED: true`
- вставь `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID`

После этого каждый заказ будет приходить в Telegram (с суммой и моделью).

---

## 10) PWA Push вместо Telegram (опционально)
Используй OneSignal:
- создай Web Push app
- возьми App ID + REST API Key
- включи в Apps Script:
  - `ONESIGNAL_ENABLED:true`
  - `ONESIGNAL_APP_ID`
  - `ONESIGNAL_REST_API_KEY`
- в `push-config.js` вставь `ONESIGNAL_APP_ID`

---

## 11) Аналитика (что покупают чаще)
В Google Sheets вкладка `Orders`:
- фильтр по `model`
- фильтр по `extras`
- или Pivot Table: количество заказов по моделям/экстрам

---

## Важно про “Stripe Auto”
Payment Links сами по себе **не возвращают статус оплаты** в этот сайт без webhooks.
Сейчас логика такая:
- заказ → CRM → письмо → клиент платит по ссылке → ты подтверждаешь оплату в Stripe и ставишь статус в CRM

Если хочешь **100% авто‑подтверждение оплаты**, следующим шагом добавляем Stripe Webhooks в Apps Script.

