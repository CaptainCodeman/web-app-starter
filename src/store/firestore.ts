import * as firebase from 'firebase/app';
import { MiddlewareAPI, Action } from 'redux';
import { RootState } from './reducer';

const firestore = firebase.firestore().enablePersistence()
  .then(() => firebase.firestore())
  .catch((err) => {
    switch (err.code) {
      case 'failed-precondition':
        // multiple tabs open, persistence can only be enabled in one tab at a time
      case 'unimplemented':
        // the current browser does not support features required to enable persistence
      default:
        return firebase.firestore()
    }
  })
    
const subscriptions = {};

export type SubscribeFn = (db : firebase.firestore.Firestore) => Promise<firebase.firestore.DocumentSnapshot>;
export type SuccessFn = (doc : firebase.firestore.DocumentSnapshot) => Action;
export type FailureFn = (err : Error) => Action;

export default ({ dispatch, getState } : MiddlewareAPI<RootState>) => next => action => {
  const { 
    type, 
    name, 
    subscribe, 
    unsubscribe, 
    started, 
    success, 
    failure, 
    payload = {}
  } : {
    type: string,
    name: string,
    subscribe: SubscribeFn,
    unsubscribe: string,
    started: any, // function => action ?
    success: SuccessFn,
    failure: FailureFn,
    payload: any,
  } = action;

  // TODO: define an interface for subscriptions to implement and check for that

  if (!subscribe && !unsubscribe) {
    return next(action)
  }

  if (subscribe) {
    dispatch(started)
    firestore.then(db => {
      subscriptions[name] = subscribe(db)
        .then(doc => dispatch(success(doc)), err => dispatch(failure(err)))
    })
    return
  }

  if (unsubscribe) {
    subscriptions[unsubscribe]()
    return
  }
}
