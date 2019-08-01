self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('video-store').then(function(cache) {
     return cache.addAll([
       '/apis/client-side-storage/cache-sw/video-store-offline/',
       '/apis/client-side-storage/cache-sw/video-store-offline/index.html',
       '/apis/client-side-storage/cache-sw/video-store-offline/index.js',
       '/apis/client-side-storage/cache-sw/video-store-offline/style.css'
     ]);
   })
 );
});

self.addEventListener('fetch', function(e) {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
