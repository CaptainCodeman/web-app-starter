import ReduxThunk from 'redux-thunk';
import auth from './auth/middleware';
import storage from './storage';
import firestore from './firestore';
import { historyMiddleware, routeMiddleware } from './router';

export default [ReduxThunk, auth, storage, firestore, historyMiddleware, routeMiddleware]
