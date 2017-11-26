import { combineReducers, Reducer } from 'redux';
import auth, { AuthState } from './auth/reducer';
import { routerReducer as router, RouterState } from './router';

export interface RootState {
  readonly auth : AuthState;
  readonly router : RouterState;
}

export default combineReducers<RootState>({
  auth,
  router,
})
