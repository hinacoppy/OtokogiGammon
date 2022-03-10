/* serviceWorker.js */
// (参考) https://qiita.com/kaihar4/items/c09a6d73e190ab0b9b01
'use strict';

const CACHE_NAME = "OtokogiGammon-v20220310";
const ORIGIN = (location.hostname == 'localhost') ? '' : location.protocol + '//' + location.hostname;

const STATIC_FILES = [
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
  ORIGIN + '/js/jquery-3.6.0.min.js',
  ORIGIN + '/js/inobounce.min.js',
  ORIGIN + '/OtokogiGammon/js/Ogid_class.js',
  ORIGIN + '/OtokogiGammon/js/OtokogiChequer_class.js',
  ORIGIN + '/OtokogiGammon/js/OtokogiBoard_class.js',
  ORIGIN + '/OtokogiGammon/js/OtokogiGame_class.js'
];

const CACHE_KEYS = [
  CACHE_NAME
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.all(
        STATIC_FILES.map(url => {
          return fetch(new Request(url, { cache: 'no-cache', mode: 'no-cors' })).then(response => {
            return cache.put(url, response);
          });
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => {
          return !CACHE_KEYS.includes(key);
        }).map(key => {
          return caches.delete(key);
        })
      );
    })
  );
});

