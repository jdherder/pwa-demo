const CACHE_NAME = 'pwa-demo-cache-v1';

const urlsToCache = [
  '/',
  'manifest.json',
  '/css/main.css',
  '/js/main.js'
];

/**
 * Install event, happens on first run of new service worker. Use to create new cache, save appropriate assets.
 */
self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

/**
 * Fetch event, intercepts http requests. Conditionally return cached assets.
 */
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {

        // Cache hit - return response
        if (response) {
          console.log('Fetch listener - Returning cached asset.');
          return response;
        }

        // No cached asset found, send request.
        return fetch(event.request);
      }
    )
  );
});

/**
 * Activate event. New service worker has been installed and is activated, can be used to clear old caches, etc.
 */
self.addEventListener('activate', event => {
  console.log('Service worker activate event fired.');
});
