const CACHE_NAME = 'static';
self.addEventListener('install', (event) => {
  //console.log('Install dcode!!');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(['./', './src/master.css', './images/logo192.png']);
      //.then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('fetch', (e) => {
  console.log(`Intercepting fetch request for: ${e.request.url}`);
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        // Make copy /clone of response
        const resClone = res.clone();
        // Openc ache
        caches.open(CACHE_NAME).then((cache) => {
          // add response to cache
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch((err) => {
        console.log('matching:', e.request);
        caches.match(e.request).then((res) => res);
      })
  );
  // e.respondWith(
  //   caches.match(e.request).then((r) => {
  //     console.log('e.request:', e.request);
  //     console.log('matching:', r);
  //     return (
  //       r ||
  //       fetch(e.request).catch((error) => {
  //         console.log('error:', error);
  //         //throw error;
  //       })
  //     );
  //   })
  // );
});
