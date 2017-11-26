import { createBrowserHistory, routerReducer, routerMiddleware, startListener, push } from 'redux-first-routing';

export interface RouterState {
  pathname: string
  search: string
  queries: any
  hash: string
}

const history = createBrowserHistory()
const historyMiddleware = routerMiddleware(history)

declare global {
  interface Event {
    readonly composed: boolean;
    readonly composedPath: () => Array<HTMLElement>;
  }
}

export const routeMiddleware = store => {
  startListener(history, store)

  window.document.documentElement.addEventListener('click', (e : MouseEvent) => {
    if ((e.button && e.button !== 0)
      || e.metaKey
      || e.altKey
      || e.ctrlKey
      || e.shiftKey
      || e.defaultPrevented === true) {
      return;
    }

    let origin = window.location.origin
               ? window.location.origin
               : window.location.protocol + '//' + window.location.host;

    let path = e.composedPath()
    for (let i = 0; i < path.length; i++) {
      let el = path[i]
      if (el instanceof HTMLAnchorElement) {
        let anchor = <HTMLAnchorElement>el;
        if (anchor.href.indexOf(origin) === 0) {
          e.preventDefault();
          store.dispatch(push(anchor.href.substr(origin.length)))
        }
        return 
      }
    }
  })
  
  return next => action => next(action)
}

export {
  historyMiddleware, routerMiddleware, routerReducer, push
}
