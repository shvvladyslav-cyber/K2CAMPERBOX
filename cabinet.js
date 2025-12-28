/* Cabinet — UHU-like dashboard + mini-leads + +1 status */
(() => {
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const cfg = window.K2_CRM || {};

  const statusOrder = ["NEW","IN_WORK","DONE"];
  const nextStatus = (s) => statusOrder[(statusOrder.indexOf(s)+1) % statusOrder.length] || "NEW";
  let curStatus = "NEW";

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

  const openUrl = (u) => { if(u && u.indexOf("PASTE_") !== 0) window.open(u, "_blank","noopener"); else toast("Сначала вставь ссылки в crm-config.js"); };

  $("#openCRM")?.addEventListener("click", () => openUrl(cfg.SHEET_URL));
  $("#openLeads")?.addEventListener("click", () => {
    if(!cfg.SHEET_URL || cfg.SHEET_URL.indexOf("PASTE_")===0) return toast("Сначала вставь SHEET_URL");
    if(!cfg.LEADS_GID || cfg.LEADS_GID.indexOf("PASTE_")===0) return toast("Сначала вставь LEADS_GID");
    openUrl(cfg.SHEET_URL + "#gid=" + cfg.LEADS_GID);
  });
  $("#openNew")?.addEventListener("click", () => {
    if(cfg.FILTER_NEW_URL && cfg.FILTER_NEW_URL.indexOf("PASTE_")!==0) return openUrl(cfg.FILTER_NEW_URL);
    $("#openLeads")?.click();
  });

  const api = (path, opt={}) => {
    const url = (cfg.SCRIPT_URL || "").replace(/\/$/, "");
    if(!url || url.indexOf("PASTE_")===0) throw new Error("Set SCRIPT_URL");
    return fetch(url + path, opt).then(r => r.json());
  };

  const esc = (s) => String(s||"").replace(/[&<>"']/g, (c)=>({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));

  const setStatusChip = (s) => {
    curStatus = s;
    $$('[data-status]').forEach(b => {
      const on = b.dataset.status === s;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true":"false");
    });
  };

  $$('[data-status]').forEach(b => b.addEventListener("click", () => {
    setStatusChip(b.dataset.status);
    load();
  }));
  $("#reload")?.addEventListener("click", () => load());

  const render = (rows) => {
    const tb = $("#tbl tbody");
    tb.innerHTML = "";
    if(!rows || !rows.length){
      tb.innerHTML = `<tr><td colspan="7" class="muted">Нет заявок</td></tr>`;
      return;
    }
    rows.forEach(r => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><code>${esc(r.id)}</code></td>
        <td>${esc(r.createdAt)}</td>
        <td>${esc(r.name)}</td>
        <td><a href="tel:${esc(r.phone)}">${esc(r.phone)}</a></td>
        <td>${esc(r.carModel)}</td>
        <td><span class="pill" style="display:inline-block">${esc(r.status)}</span></td>
        <td><button class="btn small" data-plus="${esc(r.id)}">+1</button></td>
      `;
      tb.appendChild(tr);
    });

    $$("[data-plus]").forEach(btn => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-plus");
        const row = rows.find(x => String(x.id) === String(id));
        const n = nextStatus(String(row?.status||"NEW").toUpperCase());
        btn.disabled = true;
        try{
          const res = await api("?action=updateStatus", {
            method:"POST",
            headers:{ "Content-Type":"application/json" },
            body: JSON.stringify({ id, next: n })
          });
          if(res.ok){
            toast(`Статус: ${row.status} → ${n}`);
            load();
          } else {
            toast("Ошибка обновления статуса");
          }
        }catch(e){
          toast("Ошибка сети/скрипта");
        } finally {
          btn.disabled = false;
        }
      });
    });
  };

  async function load(){
    try{
      const res = await api(`?action=leads&status=${encodeURIComponent(curStatus)}&limit=10`);
      render(res.rows || []);
    }catch(e){
      render([]);
      toast("CRM не настроен (SCRIPT_URL)");
    }
  }

  // minimal table css
  const css = document.createElement("style");
  css.textContent = `
    table.table{width:100%;border-collapse:separate;border-spacing:0}
    table.table th, table.table td{border-bottom:1px solid rgba(36,48,95,.45);padding:10px 10px;text-align:left;vertical-align:top}
    table.table thead th{position:sticky;top:0;background:rgba(7,10,23,.95);backdrop-filter: blur(10px);z-index:1}
    code{color:rgba(233,236,255,.92)}
  `;
  document.head.appendChild(css);

  // Pay modal
  const modal = $("#payModal");
  const openPay = () => { modal.classList.add("show"); modal.setAttribute("aria-hidden","false"); };
  const closePay = () => { modal.classList.remove("show"); modal.setAttribute("aria-hidden","true"); };
  $("#mobPay")?.addEventListener("click", openPay);
  modal?.addEventListener("click", (e) => {
    const t = e.target;
    if (t && (t.matches("[data-close]") || t.closest("[data-close]"))) closePay();
  });
  document.addEventListener("keydown", (e) => { if(e.key==="Escape" && modal.classList.contains("show")) closePay(); });

  setStatusChip(curStatus);
  load();
})();
