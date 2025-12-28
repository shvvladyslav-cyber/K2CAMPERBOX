/* sw.js — PWA cache (safe + no-fail precache) */
'use strict';

const VERSION = 'v1.0.6';
const CACHE_NAME = `k2camperbox-${VERSION}`;

// Укажи только реально существующие файлы.
// SW НЕ должен падать, даже если что-то 404 — поэтому precache "best effort".
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/styles.css',
  '/app.js',
  '/icons/icon-192.png',
  '/icons/icon-512.png',

  // assets (если есть — отлично, если нет — SW просто пропустит)
  '/assets/logo.png',
  '/assets/revolut-qr.png',
  '/assets/gallery-1.jpg',
  '/assets/gallery-2.jpg',
  '/assets/gallery-3.jpg',
  '/assets/gallery-4.jpg',
];

async function precacheBestEffort() {
  const cache = await caches.open(CACHE_NAME);
  await Promise.all(
    ASSETS.map(async (url) => {
      try {
        const res = await fetch(url, { cache: 'reload' });
        if (!res || !res.ok) return;
        await cache.put(url, res.clone());
      } catch (_) {
        // игнор
      }
    })
  );
}

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    await precacheBestEffort();
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

  // Не кешируем чужие домены
  if (url.origin !== self.location.origin) return;

  // Навигация (HTML) — сеть сначала, затем fallback на кэш
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        const cache = await caches.open(CACHE_NAME);
        cache.put('/index.html', fresh.clone()).catch(() => {});
        return fresh;
      } catch (_) {
        const cached = await caches.match('/index.html');
        return cached || new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } });
      }
    })());
    return;
  }

  // Статика — cache-first
  event.respondWith((async () => {
    const cached = await caches.match(req, { ignoreSearch: true });
    if (cached) return cached;

    try {
      const res = await fetch(req);
      if (res && res.ok) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(req, res.clone()).catch(() => {});
      }
      return res;
    } catch (_) {
      return new Response('', { status: 504 });
    }
  })());
});
