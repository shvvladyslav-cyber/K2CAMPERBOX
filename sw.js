const CACHE_NAME = "k2-camperbox-v1";

const CORE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.json"
  // НЕ добавляем иконки здесь, чтобы SW не падал, если их нет или 404
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    try {
      await cache.addAll(CORE_ASSETS);
    } catch (e) {
      // даже если что-то не закешировалось — не валим установку
    }
    self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => (k === CACHE_NAME ? null : caches.delete(k))));
    self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Только GET кэшируем
  if (req.method !== "GET") return;

  event.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;

    try {
      const fresh = await fetch(req);
      const cache = await caches.open(CACHE_NAME);
      cache.put(req, fresh.clone()).catch(()=>{});
      return fresh;
    } catch (e) {
      // fallback: если офлайн и нет кэша — отдаём главную
      return caches.match("./index.html");
    }
  })());
});
