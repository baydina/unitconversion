const CACHE_NAME = "unit-converter-cache-v1";
const urlsToCache = ["/", "index.html", "main.js", "styles.css"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredPrompt = event;

  // Show a button to prompt the user to install the PWA
  const installButton = document.getElementById("install-button");
  installButton.style.display = "block";
  installButton.addEventListener("click", () => {
    installButton.style.display = "none";
    deferredPrompt.prompt();
  });
});


