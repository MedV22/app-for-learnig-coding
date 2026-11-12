const CACHE_NAME = 'learnhub-v6';
const ASSETS = [
  './',
  './index.html',
  './web.html',
  './html-practice.html',
  './python.html',
  './kali.html',
  './css/style.css',
  './js/main.js',
  './js/html-practice.js',
  './js/app.js',
  './js/data.js',
  './js/i18n.js',
  './js/modal.js',
  './js/quiz.js',
  './js/terminal.js',
  './js/pypod.js',
  './favicon.svg',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))));
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;

  const isNavigation = event.request.mode === 'navigate';
  if (isNavigation) {
    event.respondWith(
      fetch(event.request).then((response) => {
        if (response.ok) {
          const update = caches.open(CACHE_NAME).then((cache) => cache.put(event.request, response.clone()));
          event.waitUntil(update);
        }
        return response;
      }).catch(() => caches.match(event.request, { ignoreSearch: true }).then((cached) => {
        if (cached) return cached;
        return caches.match('./index.html').then((fallback) => fallback || Response.error());
      }))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (!response.ok) return response;
        const update = caches.open(CACHE_NAME).then((cache) => cache.put(event.request, response.clone()));
        event.waitUntil(update);
        return response;
      }).catch(() => Response.error());
    })
  );
});
