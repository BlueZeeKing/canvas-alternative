var CACHE_NAME = "canvas-alternative-v1";
var urlsToCache = ["/"];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", (event) => { // TODO: clear old cache
  // Remove old caches 
  console.log("activate")
  event.waitUntil(
    caches.delete(CACHE_NAME)
  );
});

self.addEventListener("fetch", function (event) {
  console.log("fetch")
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Cache hit - return response
      if (response) {
        console.log("HIT!!!")
        return response;
      }

      return fetch(event.request).then(function (response) {
        console.log("fetch")
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        // IMPORTANT: Clone the response. A response is a stream
        // and because we want the browser to consume the response
        // as well as the cache consuming the response, we need
        // to clone it so we have two streams.
        var responseToCache = response.clone();

        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});
