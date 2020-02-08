const CACHE_NAME = 'static-cache-v2';
const DATA_CACHE_NAME = 'data-cache-v1';

const FILES_TO_CACHE = [
  '/',
  '/assets/css/grayscale.css',
  '/assets/css/pricing.css',
  '/assets/css/registration.css',
  '/assets/css/trips.css',
  '/assets/img/downloads-bg.jpg',
  '/assets/img/icon-72x72.png',
  '/assets/img/intro-bg.jpg',
  '/assets/img/map-marker.png',
  '/assets/img/shield.png',
  '/assets/js/grayscale.js',
  '/assets/js/login.js',
  '/assets/js/place-search.js',
  '/service-worker.js',
  '/assets/js/signup.js',
  '/assets/js/trip.js',
  '/manifest.webmanifest',
  '/views/index.handlebars'
];

self.addEventListener('install', swInstall);
self.addEventListener('activate', swActivate);

/////

/*
  When Service Worker finished installing
*/
function swInstall(evt) {
  console.log('hiiiiii');
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Your files were pre-cached successfully!');
      return cache
        .addAll(FILES_TO_CACHE)
        .then(() => {
          console.log('added');
        })
        .catch(error => console.error('shit son', error));
    })
  );

  self.skipWaiting();
}

/*
  When Service Worker has been activated
*/
function swActivate(evt) {
  evt.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            console.log('Removing old cache data', key);
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim();
}
