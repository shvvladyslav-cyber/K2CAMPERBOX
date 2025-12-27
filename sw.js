const CACHE_NAME="k2cb-v1";
const ASSETS=["./","./index.html","./bestellen.html","./success.html","./impressum.html","./datenschutz.html","./admin.html","./push.html",
"./assets/css/style.css","./assets/js/i18n.js","./assets/js/app.js","./assets/js/order.js","./config.js","./push-config.js","./manifest.json",
"./icons/icon-192.png","./icons/icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener("fetch",e=>{e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(res=>{const copy=res.clone();caches.open(CACHE_NAME).then(c=>c.put(e.request,copy)).catch(()=>{});return res;}).catch(()=>cached)));});