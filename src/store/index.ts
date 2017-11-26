import { createStore, applyMiddleware, compose } from 'redux';

import root from './reducer';
import middleware from './middleware';
import { loadState } from './storage';

declare global {
  interface Window { __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any; }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(...middleware));

const state = loadState();
const store = createStore(root, state, enhancer);

export default store;

export { RootState } from './reducer';
export * from './auth';
