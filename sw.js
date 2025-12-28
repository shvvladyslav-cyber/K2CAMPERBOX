// Simple offline-first Service Worker for K2 CamperBox
const CACHE = "k2camperbox-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/styles.css",
  "/app.js",
  "/manifest.json",
  "/assets/revolut-qr.png",
  "/icons/icon-192.png",
  "/icons/icon-512.png"

  "/crm.html",
  "/crm.js",
  "/crm-config.js",
  "/impressum.html",
  "/datenschutz.html",
  "/agb.html"
  "/cabinet.html",
  "/cabinet.js",
  "/configurator.html",
  "/configurator.js",
  "/assets/logo.png",
];


// Install
self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(ASSETS);
    self.skipWaiting();
  })());
});

// Activate
self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => (k !== CACHE ? caches.delete(k) : Promise.resolve())));
    self.clients.claim();
  })());
});

// Fetch
self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Only handle same-origin GET
  if (req.method !== "GET" || url.origin !== location.origin) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(req);
    if (cached) return cached;

    try {
      const fresh = await fetch(req);
      // Cache static files
      if (fresh.ok && (url.pathname.endsWith(".css") || url.pathname.endsWith(".js") || url.pathname.endsWith(".png") || url.pathname.endsWith(".json") || url.pathname === "/")) {
        cache.put(req, fresh.clone());
      }
      return fresh;
    } catch (e) {
      // Fallback to cached index for navigation
      if (req.mode === "navigate") {
        const fallback = await cache.match("/index.html");
        if (fallback) return fallback;
      }
      throw e;
    }
  })());
});
