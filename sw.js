const CACHE_NAME = 'life-rpg-v4';
const ASSETS = ['/', '/index.html', '/app.jsx'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  // Only handle GET. POST/PUT/etc (e.g. the /api/claude proxy) pass straight
  // through to the network — the Cache API rejects non-GET requests.
  if (e.request.method !== 'GET') return;

  // Network-first: latest when online, fall back to cache for offline.
  e.respondWith(
    fetch(e.request).then(res => {
      if (res.status === 200) {
        const clone = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
      }
      return res;
    }).catch(() => caches.match(e.request))
  );
});
