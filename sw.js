const CACHE_NAME = 'mas-gondrong-v13';
const urlsToCache = [
  'index.html',
  'admin.html',
  'produk.html',
  'manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

// Import script Firebase Messaging untuk Service Worker
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js");

// Initialize Firebase di SW
const firebaseConfig = {
  apiKey: "AIzaSyCtzYShY70eQGLNUnoQCi91uy7aMuFsYsc",
  authDomain: "mas-gondrong.firebaseapp.com",
  projectId: "mas-gondrong",
  storageBucket: "mas-gondrong.firebasestorage.app",
  messagingSenderId: "191854522046",
  appId: "1:191854522046:web:61bed6d89182392044b8ef"
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Background handler untuk notifikasi
messaging.onBackgroundMessage((payload) => {
  console.log('[sw.js] Notifikasi diterima di background', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'logo-192.png'
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
