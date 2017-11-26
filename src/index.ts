import './polyfill';

function bootstrap() {
}

declare global {
  interface Window { WebComponents: any; }
}

if (window.WebComponents && window.WebComponents.ready) {
  bootstrap();
} else {
  window.addEventListener('WebComponentsReady', bootstrap);
}
