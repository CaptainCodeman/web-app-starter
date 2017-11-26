import ReduxThunk from 'redux-thunk';
import auth from './auth/middleware';
import storage from './storage';
import { historyMiddleware, routeMiddleware } from './router';

export default [ReduxThunk, auth, storage, historyMiddleware, routeMiddleware]
