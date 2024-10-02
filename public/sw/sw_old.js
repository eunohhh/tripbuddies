import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst } from 'workbox-strategies';

clientsClaim();

// self.__WB_MANIFEST is injected by workbox-build during the build process
precacheAndRoute(self.__WB_MANIFEST || []);

// Cache CSS, JS, and web worker requests with a network-first strategy.
registerRoute(
  ({ request }) =>
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'worker',
  new NetworkFirst({
    cacheName: 'static-resources',
  }),
);

// Cache image files with a cache-first strategy.
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
      }),
    ],
  }),
);

// Cache API calls with a network-first strategy.
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new NetworkFirst({
    cacheName: 'api',
    networkTimeoutSeconds: 10,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }),
);

// Cache the start URL with a network-first strategy.
registerRoute(
  '/',
  new NetworkFirst({
    cacheName: 'start-url',
    plugins: [
      {
        cacheWillUpdate: async ({ request, response }) => {
          if (response && response.type === 'opaqueredirect') {
            return new Response(response.body, {
              status: 200,
              statusText: 'OK',
              headers: response.headers,
            });
          }
          return response;
        },
      },
    ],
  }),
);

// Cache everything else with a network-only strategy.
registerRoute(
  ({ request }) => true,
  new CacheFirst({
    cacheName: 'catch-all',
  }),
);
