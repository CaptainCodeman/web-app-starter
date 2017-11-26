import * as firebase from 'firebase/app';
import { AuthTypes, signedIn, signedOut } from './actions';

export default ({ dispatch, getState }) => {
  
  const auth = firebase.auth();

  auth.onAuthStateChanged(user => {
    if (user) {
      dispatch(signedIn(user))

    } else {
      dispatch(signedOut());
    }
  });

  function providerFromName(name) {
    switch (name) {
      case 'facebook': return new firebase.auth.FacebookAuthProvider();
      case 'google':   return new firebase.auth.GoogleAuthProvider();
      case 'twitter':  return new firebase.auth.TwitterAuthProvider();
    }
  }

  return next => action => {

    const {
      type,
      payload = {}
    } = action

    switch (type) {
      case AuthTypes.SIGN_IN:
        var provider = providerFromName(payload)
        auth.signInWithPopup(provider)
        break;

      case AuthTypes.SIGN_OUT:
        auth.signOut()
        break;

      default:
        return next(action)
    }
  }
}
