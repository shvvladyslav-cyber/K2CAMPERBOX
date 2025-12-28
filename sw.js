// sw.js
const CACHE = "k2camperbox-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/styles.css",
  "/app.js",
  "/config.js",
  "/manifest.webmanifest",
  "/offline.html",
  "/assets/logo.svg",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => (k !== CACHE ? caches.delete(k) : null))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  e.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;

      return fetch(req).then((resp) => {
        const copy = resp.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(()=>{});
        return resp;
      }).catch(() => caches.match("/offline.html"));
    })
  );
});
