// Jaringan dulu, cache sebagai cadangan, supaya halaman tetap terbuka saat offline.
const CACHE = 'jadwal-berdua-v1';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  const shell = u.origin === location.origin || u.hostname === 'www.gstatic.com' || u.hostname.startsWith('fonts.');
  if (e.request.method !== 'GET' || !shell) return;
  e.respondWith(fetch(e.request).then(r => {
    const copy = r.clone();
    caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
    return r;
  }).catch(() => caches.match(e.request)));
});
