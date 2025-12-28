# K2 CamperBox — сайт + PWA + Revolut QR + Mini‑CRM (Sheets)

## Что добавлено (этот шаг)
✅ **Impressum / Datenschutz / AGB**  
✅ **Форма заявки → Google Sheets (Apps Script)**  
✅ **Статусы заявок NEW / IN_WORK / DONE**  
✅ **Mini‑CRM**: кнопки “Открыть CRM / Leads / NEW”, переключатель статусов, последние 10 заявок  
✅ **“+1 статус”** прямо из таблицы (NEW→IN_WORK→DONE)

---

# 1) Файлы проекта (на GitHub)
Загрузи **всё** из архива в корень репозитория.

Главные файлы:
- `index.html` — сайт
- `crm.html` — мини‑CRM
- `impressum.html`, `datenschutz.html`, `agb.html`
- `app.js` — логика + i18n
- `crm.js` — логика CRM
- `crm-config.js` — **сюда вставляешь ссылки**
- `sw.js`, `manifest.json`, `icons/` — PWA
- `assets/revolut-qr.png` — QR (заменить на твой реальный)

---

# 2) Настройка Google Sheets + Apps Script (для чайника)

## Шаг A — создать таблицу
1) Google Drive → New → Google Sheets  
2) Назови: **K2 CamperBox CRM**  
3) Создай вкладку: **Leads** (именно так)

## Шаг B — добавить Apps Script
1) В таблице: Extensions → **Apps Script**  
2) Удали всё, вставь код из файла `AppsScript_Code_gs.txt` (это Code.gs)  
3) Вверху кода найди и вставь **SHEET_ID**:
   - Открой таблицу, в URL есть `/d/<SHEET_ID>/edit` → копируешь `<SHEET_ID>`
4) Save

## Шаг C — Deploy Web App
1) Deploy → **New deployment**  
2) Select type: **Web app**  
3) Execute as: **Me**  
4) Who has access: **Anyone**  
5) Deploy → Authorize → Continue  
6) Скопируй Web App URL вида:
   `https://script.google.com/macros/s/XXXX/exec`

## Шаг D — вставить URL в сайт
Открой файл `crm-config.js` и вставь:
- `SCRIPT_URL` — Web App URL (из шага C)
- `SHEET_URL` — ссылка на таблицу
- `LEADS_GID` — gid вкладки Leads (в URL после `#gid=...`)

Готово ✅  
Теперь форма на сайте будет писать в Sheets, а `/crm.html` покажет последние заявки.

---

# 3) Кнопки “Открыть CRM / Leads / NEW”
- “Открыть CRM” — открывает всю таблицу (`SHEET_URL`)
- “Открыть Leads” — открывает вкладку Leads (`SHEET_URL#gid=LEADS_GID`)
- “Открыть NEW” — если хочешь именно фильтр‑вью:
  1) В Sheets создай Filter view “NEW”
  2) Скопируй ссылку Filter view
  3) Вставь в `FILTER_NEW_URL`

---

# 4) “+1 статус” (NEW→IN_WORK→DONE)
На странице `/crm.html` в таблице есть кнопка “+1”.
Она делает POST в Apps Script и обновляет статус в Sheets.

---

# 5) Оплата Revolut QR
Заменить файл: `assets/revolut-qr.png` на твой реальный QR из Revolut.

---

# 6) Что будет следующим шагом (“как UHU.digital один‑в‑один”)
Я могу собрать “кабинет” как у UHU:
- быстрые кнопки в меню
- мини‑таблица 10 заявок прямо в кабинете
- переключатель NEW/IN_WORK/DONE (без авторизации)  
- плюс: ссылки “Открыть CRM / Leads / NEW” (уже есть)

Скажи — сделаю **следующий архив** с “кабинетом” в стиле UHU.digital.


---

# 7) “Как UHU.digital один-в-один” (этот шаг)
Добавлены страницы:
- `/cabinet.html` — кабинет (быстрые кнопки + мини‑таблица 10 заявок + переключатель NEW/IN_WORK/DONE + “+1 статус”)
- `/configurator.html` — конфигуратор «LEGO»

Ссылки:
- Кабинет: `.../cabinet.html`
- LEGO: `.../configurator.html`

---

# 8) Замена логотипа (иконка + в шапке)
Теперь используется твой логотип `assets/logo.png`.

## Быстро (рекомендую):
1) Положи свой логотип в `assets/logo.svg` (SVG) — **перезапиши файл**
2) Если логотип PNG — сохрани как `assets/logo.png` и скажи мне, я подправлю код под PNG.

## Иконки PWA:
Заменить:
- `icons/icon-192.png`
- `icons/icon-512.png`

(это иконки приложения на телефоне)

---

# 9) Идея для улучшения LEGO‑конфигуратора (следующее улучшение)
Можно сделать:
- зоны авто (багажник/лево/право/верх), drag&drop модулей по зонам
- цены/опции как справочник (JSON), расчет суммы
- генерация красивой PDF‑спеки (и отправка в Sheets)
