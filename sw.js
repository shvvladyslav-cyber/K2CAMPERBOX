/* sw.js — PWA cache (ultra-safe, no-crash install) */
'use strict';

const VERSION = 'v1.0.6';
const CACHE_NAME = `k2camperbox-${VERSION}`;

// Кэшируем ТОЛЬКО то, что точно нужно и обычно существует.
// Важно: если чего-то нет (404) — SW НЕ сломается.
const CORE = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  // favicon часто бывает 404 — поэтому НЕ кладём в CORE
  // '/favicon.ico',
];

const isCacheableRequest = (req) => {
  try {
    const url = new URL(req.url);
    if (req.method !== 'GET') return false;
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return false;
    if (url.origin !== self.location.origin) return false;
    // не кэшируем всякие data:, blob: и т.п.
    return true;
  } catch {
    return false;
  }
};

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    // addAll ломается, если 1 файл 404. Поэтому делаем безопасно:
    const results = await Promise.allSettled(
      CORE.map((path) => cache.add(new Request(path, { cache: 'reload' })))
    );
    // Никаких throw — установка всегда проходит
    void results;
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

// Network-first для навигации, Stale-while-revalidate для ассетов
self.addEventListener('fetch', (event) => {
  const req = event.request;

  if (!isCacheableRequest(req)) return;

  // HTML навигации
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        const copy = fresh.clone();
        const cache = await caches.open(CACHE_NAME);
        await cache.put('/index.html', copy);
        return fresh;
      } catch {
        const cached = await caches.match('/index.html');
        return cached || new Response('Offline', { status: 200, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
      }
    })());
    return;
  }

  // Остальные ассеты: сначала кэш, параллельно обновляем
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(req);
    const fetchPromise = fetch(req)
      .then((res) => {
        // кэшируем только успешные ответы
        if (res && res.ok) cache.put(req, res.clone()).catch(() => {});
        return res;
      })
      .catch(() => null);

    // если есть кэш — отдаём сразу (быстро), а в фоне обновляем
    if (cached) {
      fetchPromise.catch(() => {});
      return cached;
    }

    // иначе пробуем сеть, если сети нет — fallback (пустой)
    const fresh = await fetchPromise;
    return fresh || new Response('', { status: 504 });
  })());
});
