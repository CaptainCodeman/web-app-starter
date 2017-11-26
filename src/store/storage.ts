import { MiddlewareAPI } from 'redux';
import { RootState } from './reducer';

const storageKey = 'app-state';

export const loadState = () : RootState => {
  try {
    const serializedState = localStorage.getItem(storageKey);
    if (serializedState === null) {
      return undefined;
    }
    return <RootState>JSON.parse(serializedState);
  } catch(err) {
    console.error(err);
    return undefined;
  }
}

export default ({ getState } : MiddlewareAPI<RootState>) => next => action => {
  const value = next(action)
  const state = getState();

  try {
    const serializedState = JSON.stringify({
      // only store whatever branch of the state should be persisted
      // selected: state.selected
    });
    localStorage.setItem(storageKey, serializedState);
  } catch(err) {
    console.error(err);
  }

  return value
}
