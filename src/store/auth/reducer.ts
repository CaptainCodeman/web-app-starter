import * as firebase from 'firebase/app';
import { Reducer } from 'redux';
import { AuthActions, AuthTypes } from './actions';

export interface AuthState {
  user?: firebase.User;
  statusKnown: boolean;
}

const initialState : AuthState = {
  user: null,
  statusKnown: false,
};

export default <Reducer>(state : AuthState = initialState, action: AuthActions) => {
  switch (action.type) {
    case AuthTypes.SIGNED_IN:
      return { ...state,
        user: action.payload,
        statusKnown: true,
      };

    case AuthTypes.SIGNED_OUT:
      return { ...state,
        user: null,
        statusKnown: true,
      }

    default:
      return state;
  }
}
