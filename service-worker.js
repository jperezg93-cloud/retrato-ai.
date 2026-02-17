
// CAMBIA ESTE NUMERO CADA VEZ QUE ACTUALICES EL CÓDIGO (v1 -> v2 -> v3...)
// Esto forzará a los celulares a descargar la nueva versión.
const CACHE_NAME = 'retrato-ai-v3';

const urlsToCache = [
  '/',
  '/index.html',
  '/index.tsx',
  '/manifest.json'
];

// 1. INSTALACIÓN: Guarda los archivos iniciales
self.addEventListener('install', (event) => {
  // Obliga al SW a activarse inmediatamente, sin esperar a que se cierren pestañas
  self.skipWaiting(); 
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. ACTIVACIÓN: Limpia cachés viejas (v1, v2...) cuando subes una nueva
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Borra versiones antiguas para asegurar que el usuario vea los nuevos textos
            console.log('Borrando caché antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
        // Toma el control de la página inmediatamente
        return self.clients.claim();
    })
  );
});

// 3. FETCH: Sirve desde caché si existe, sino busca en internet
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
