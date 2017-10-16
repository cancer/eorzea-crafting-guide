import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import registerEvents from 'serviceworker-webpack-plugin/lib/browser/registerEvents';
import applyUpdate from 'serviceworker-webpack-plugin/lib/browser/applyUpdate';

if ('serviceWorker' in navigator &&
    ( window.location.protocol === 'https' ||
      window.location.hostname === 'localhost')) {

  const registration = runtime.register();

  registerEvents(registration, {
    onInstalled: () => {
      console.log('[SW] Installed');
    },
    onUpdateReady: () => {
      console.log('[SW] Update ready');
    },
    onUpdating: () => {
      console.log('[SW] Updating');
    },
    onUpdateFailed: () => {
      console.log('[SW] Update failed');
    },
    onUpdated: () => {
      console.log('[SW] Updated');
    },
  });

}
