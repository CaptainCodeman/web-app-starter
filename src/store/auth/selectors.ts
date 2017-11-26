import { createSelector } from 'reselect';
import { RootState } from '../reducer';

const getAuth = (state : RootState) => state.auth;

export const user = createSelector(
  [getAuth],
  (auth) => auth.user
);

export const statusKnown = createSelector(
  [getAuth],
  (auth) => auth.statusKnown
);

export const anonymous = createSelector(
  [getAuth],
  (auth) => auth.user === null
)

export const authenticated = createSelector(
  [getAuth],
  (auth) => auth.user !== null
)
