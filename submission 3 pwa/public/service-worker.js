importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox){
    console.log(`Workbox berhasil dimuat`);
    workbox.precaching.precacheAndRoute([
        { url: '/', revision: '1' },
        { url: '/css/materialize.css', revision: '1' },
        { url: '/css/materialize.min.css', revision: '1' },
        { url: '/img/gambar.png', revision: '1' },
        { url: '/img/icon.png', revision: '1' },
        { url: '/img/jadwal.png', revision: '1' },
        { url: '/img/pemain.png', revision: '1' },
        { url: '/img/tim.png', revision: '1' },
        { url: '/js/api.js', revision: '1' },
        { url: '/js/date.js', revision: '1' },
        { url: '/js/db.js', revision: '1' },
        { url: '/js/idb.js', revision: '1' },
        { url: '/js/klasemen.js', revision: '1' },
        { url: '/js/matches.js', revision: '1' },
        { url: '/js/materialize.js', revision: '1' },
        { url: '/js/materialize.min.js', revision: '1' },
        { url: '/js/nav.js', revision: '1' },
        { url: '/js/script.js', revision: '1' },
        { url: '/js/snarkdown.umd.js', revision: '1' },
        { url: '/js/tim.js', revision: '1' },
        { url: '/pages/favorites.html', revision: '1' },
        { url: '/pages/home.html', revision: '1' },
        { url: '/pages/matches.html', revision: '1' },
        { url: '/detailMatch.html', revision: '1' },
        { url: '/detailPlayer.html', revision: '1' },
        { url: '/detailTeam.html', revision: '1' },
        { url: '/favicon.ico', revision: '1' },
        { url: '/index.html', revision: '1' },
        { url: '/manifest.json', revision: '1' },
        { url: '/nav.html', revision: '1' },
        ]);


         //cache data.org
        workbox.routing.registerRoute(
          new RegExp('https://api.football-data.org/'),
          workbox.strategies.staleWhileRevalidate()
          )


          // cache png/img
    workbox.routing.registerRoute(
        /.*(?:png|gif|jpg|jpeg|svg|ico)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'images-cache',
            plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            }),
            new workbox.expiration.Plugin({
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60,
            }),
            ]
        })
        );

  // Caching Google Fonts
  workbox.routing.registerRoute(
    /.*(?:googleapis|gstatic)\.com/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
  })
    );
    // Menyimpan cache untuk file font selama 1 tahun
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  workbox.strategies.cacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'static-resources',
  })
);
// cache css
workbox.routing.registerRoute(
	new RegExp('./css/'),
	workbox.strategies.cacheFirst({
		cacheName: 'css-cache'
	})
);
// cache js
workbox.routing.registerRoute(
	new RegExp('./js/'),
	workbox.strategies.cacheFirst({
		cacheName: 'js-cache'
	})
);

// cache pages
workbox.routing.registerRoute(
  new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

}else{
  console.log(`Workbox gagal dimuat`);
}

// push notification
self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'img/icon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});