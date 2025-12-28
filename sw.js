/* sw.js — PWA cache (robust version, won't fail on missing files) */
'use strict';

const VERSION = 'v1.0.8';
const CACHE_NAME = `k2camperbox-${VERSION}`;

/**
 * Важно:
 * 1) Если что-то 404 (favicon, картинки и т.д.) — установка НЕ должна падать.
 * 2) Поэтому мы не используем cache.addAll напрямую.
 */
const CORE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/styles.css',
  '/app.js',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  // '/favicon.ico'  // <- если у тебя реально 404, лучше не кэшировать
];

async function cacheSafe(urls) {
  const cache = await caches.open(CACHE_NAME);
  const results = await Promise.allSettled(urls.map(async (u) => {
    const req = new Request(u, { cache: 'reload' });
    const res = await fetch(req);
    if (!res.ok) throw new Error(`Skip ${u} (${res.status})`);
    await cache.put(u, res);
    return true;
  }));
  // просто чтобы не было "unhandled"
  results.forEach(() => {});
}

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    await cacheSafe(CORE);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : Promise.resolve())));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Не трогаем расширения/аналитику/прочее — только http(s)
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  // Навигация: network-first, fallback to cached index
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const res = await fetch(req);
        const cache = await caches.open(CACHE_NAME);
        cache.put('/index.html', res.clone()).catch(()=>{});
        return res;
      } catch (e) {
        const cached = await caches.match('/index.html');
        return cached || new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } });
      }
    })());
    return;
  }

  // Статика: cache-first, update in background
  event.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;

    try {
      const res = await fetch(req);
      const cache = await caches.open(CACHE_NAME);
      if (res && res.ok) cache.put(req, res.clone()).catch(()=>{});
      return res;
    } catch (e) {
      return cached || new Response('', { status: 504 });
    }
  })());
});
