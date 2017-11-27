import './polyfill';
import app from './app-shell';
import router from './app-router';

function bootstrap() {
  app()
  router()
}

declare global {
  interface Window { WebComponents: any; }
}

if (window.WebComponents && window.WebComponents.ready) {
  bootstrap();
} else {
  window.addEventListener('WebComponentsReady', bootstrap);
}
