/* sw.js — PWA cache (robust + offline gallery) */
'use strict';

const VERSION = 'v1.0.6';
const CACHE_NAME = `k2camperbox-${VERSION}`;

const ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/manifest.json',
  '/favicon.ico',

  '/icons/icon-192.png',
  '/icons/icon-512.png',

  '/assets/logo.png',
  '/assets/revolut-qr.png',

  // OFFLINE GALLERY (local)
  '/assets/gallery-1.jpg',
  '/assets/gallery-2.jpg',
  '/assets/gallery-3.jpg',
  '/assets/gallery-4.jpg',
  '/assets/gallery-5.jpg',
  '/assets/gallery-6.jpg',
];

// helper: cache each asset safely (do not fail install if some 404)
async function safeCacheAll(cache, urls){
  const origin = self.location.origin;
  const tasks = urls.map(async (u) => {
    try{
      const url = new URL(u, origin).toString();
      const res = await fetch(url, { cache: 'no-cache' });
      if(res && res.ok) await cache.put(url, res);
    }catch(e){
      // ignore missing/invalid assets to prevent install crash
    }
  });
  await Promise.all(tasks);
}

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await safeCacheAll(cache, ASSETS);
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

  // Only handle same-origin
  if (url.origin !== self.location.origin) return;

  // Navigation: network-first, fallback to cached index.html
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try{
        const res = await fetch(req);
        const cache = await caches.open(CACHE_NAME);
        cache.put('/index.html', res.clone()).catch(()=>{});
        return res;
      }catch(e){
        const cached = await caches.match('/index.html');
        return cached || new Response('Offline', { status: 200, headers:{'Content-Type':'text/plain; charset=utf-8'} });
      }
    })());
    return;
  }

  // Assets: cache-first
  event.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;

    try{
      const res = await fetch(req);
      if(res && res.ok){
        const cache = await caches.open(CACHE_NAME);
        cache.put(req, res.clone()).catch(()=>{});
      }
      return res;
    }catch(e){
      // For images: return a tiny placeholder to avoid console spam
      if(req.destination === 'image'){
        return new Response('', { status: 200 });
      }
      return new Response('Offline', { status: 200, headers:{'Content-Type':'text/plain; charset=utf-8'} });
    }
  })());
});
