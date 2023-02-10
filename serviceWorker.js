/* serviceWorker.js */
// (参考) https://developer.mozilla.org/ja/docs/Web/Progressive_web_apps/Offline_Service_workers
'use strict';

const cacheName = 'OtokogiGammon-v20221209';
const ORIGIN = (location.hostname == 'localhost') ? '' : location.protocol + '//' + location.hostname;

const contentToCache = [
  ORIGIN + '/OtokogiGammon/',
  ORIGIN + '/OtokogiGammon/index.html',
  ORIGIN + '/OtokogiGammon/manifest.json',
  ORIGIN + '/OtokogiGammon/icon/favicon.ico',
  ORIGIN + '/OtokogiGammon/icon/apple-touch-icon.png',
  ORIGIN + '/OtokogiGammon/icon/android-chrome-96x96.png',
  ORIGIN + '/OtokogiGammon/icon/android-chrome-192x192.png',
  ORIGIN + '/OtokogiGammon/icon/android-chrome-512x512.png',
  ORIGIN + '/OtokogiGammon/css/OtokogiGame.css',
  ORIGIN + '/OtokogiGammon/css/OtokogiBoard.css',
  ORIGIN + '/css/font-awesome-animation.min.css',
  ORIGIN + '/js/fontawesome-all.min.js',
  ORIGIN + '/js/jquery-3.6.1.min.js',
  ORIGIN + '/js/inobounce.min.js',
  ORIGIN + '/OtokogiGammon/js/Ogid_class.js',
  ORIGIN + '/OtokogiGammon/js/OtokogiChequer_class.js',
  ORIGIN + '/OtokogiGammon/js/OtokogiBoard_class.js',
  ORIGIN + '/OtokogiGammon/js/OtokogiGame_class.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(contentToCache);
    })
  );
});
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
      return r || fetch(e.request).then((response) => {
        return caches.open(cacheName).then((cache) => {
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        const [kyappname, kyversion] = key.split('-');
        const [cnappname, cnversion] = cacheName.split('-');
        if (kyappname === cnappname && kyversion !== cnversion) {
          return caches.delete(key);
        }
      }));
    })
  );
});
