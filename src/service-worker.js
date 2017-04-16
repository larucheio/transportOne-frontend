
const CACHE_NAME = 'transport-one-v1'
const urlsToCache = [
  '/',
  'index.html'
]

self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(urlsToCache)
      })
  )
})

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        // Cache hit - return cached response and don't fetch the network response
        // uncomment it if you want to retrieve only the cashed response (in case you want to avoid data traffic),
        // then you would need to update the service worker's version to update the cache
        // if (response) {
        //   return response
        // }

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        var fetchRequest = event.request.clone()

        return fetch(fetchRequest).then(
          function (response) {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            const responseToCache = response.clone()

            caches.open(CACHE_NAME)
              .then(function (cache) {
                cache.put(event.request, responseToCache)
              })
            return response
          }
        )
      })
    )
})
