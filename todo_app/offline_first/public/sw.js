self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('todos').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/favicon.ico',
        '/javascripts/main.js',
        '/javascripts/model.js',
        '/javascripts/store.js',
        '/stylesheets/app.css',
        '/stylesheets/base.css',
      ]);
    })
  );
});

self.addEventListener('fetch', function(e) {
  console.log(e.request.method, e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
