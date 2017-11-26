import './polyfill';
import app from './app-shell';

function bootstrap() {
  app()
}

declare global {
  interface Window { WebComponents: any; }
}

if (window.WebComponents && window.WebComponents.ready) {
  bootstrap();
} else {
  window.addEventListener('WebComponentsReady', bootstrap);
}
