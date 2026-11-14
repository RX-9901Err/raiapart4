const CACHE_NAME = "raiplem-portfolio-v2";
const APP_SHELL = [
  "./",
  "./index.html",
  "./rizal.html",
  "./styles.css",
  "./script.js",
  "./manifest.webmanifest",
  "./assets/app-icon-192.png",
  "./assets/app-icon-512.png",
  "./assets/app-icon-maskable-512.png",
  "./assets/apple-touch-icon.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key.startsWith("raiplem-portfolio-") && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const requestUrl = new URL(request.url);

  if (request.method !== "GET" || requestUrl.origin !== self.location.origin) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (!response.ok || !requestUrl.pathname.endsWith("/rizal.html")) {
            return response;
          }

          return caches.open(CACHE_NAME)
            .then((cache) => cache.put(request, response.clone()))
            .then(() => response);
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match("./rizal.html")))
    );
    return;
  }

  if (!["style", "script", "image", "font"].includes(request.destination)) {
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) {
        return cached;
      }

      return fetch(request).then((response) => {
        if (!response.ok) {
          return response;
        }

        return caches.open(CACHE_NAME)
          .then((cache) => cache.put(request, response.clone()))
          .then(() => response);
      });
    })
  );
});
