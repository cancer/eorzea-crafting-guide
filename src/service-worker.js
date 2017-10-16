import { jobIconMappings, levelList } from './constants'
import { httpGet } from './lib/http-get';

const CACHE_NAME = 'ecg-cache';

const cacheUrls = [
  './',
  './app.js',
  './static/job_icon/1kMI2v_KEVgo30RFvdFCyySkFo.png',
  './static/job_icon/ACAcQe3hWFxbWRVPqxKj_MzDiY.png',
  './static/job_icon/bBVQ9IFeXqjEdpuIxmKvSkqalE.png',
  './static/job_icon/E69jrsOMGFvFpCX87F5wqgT_Vo.png',
  './static/job_icon/EEHVV5cIPkOZ6v5ALaoN5XSVRU.png',
  './static/job_icon/LbEjgw0cwO_2gQSmhta9z03pjM.png',
  './static/job_icon/Rq5wcK3IPEaAB8N-T9l6tBPxCY.png',
  './static/job_icon/YCN6F-xiXf03Ts3pXoBihh2OBk.png',
  'https://api.xivdb.com/data/classjobs',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(cacheUrls);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhiteList = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(cacheNames.map(cacheName => {
        if (cacheWhiteList.indexOf(cacheName) !== -1) {
          return caches.delete(cacheName);
        }
      }))
    })
  )
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }

        const fetchRequest = event.request.clone();
        return fetch(fetchRequest)
          .then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          });
      })
  );
});

//const prefetch = () => {
//  const jobQueries = Object.keys(jobIconMappings).map(jobId => {
//    const query = {
//      classjobs: jobId,
//      one:       'recipes',
//      language:  'ja',
//    };
//  });
//  const levelQueries = levelList.map(level => {
//    const [ levelRow, levelHigh ] = level.splig(' - ');
//    const query = {
//      "level_view|gt": levelRow,
//      "level_view|lt": levelHigh,
//      one:             'recipes',
//      language:        'ja',
//    };
//  });
//
//  return Promise.all(jobQueries.concat(levelQueries).map(query => {
//    return httpGet('https://api.xivdb.com/search', query)
//      .then(res => res.json());
//  }));
//};
//
