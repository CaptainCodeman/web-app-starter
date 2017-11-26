import { Unsubscribe } from 'redux';
import store from './';

export interface Connectable {
  mapStateToProps<S>(state : S) : any
  shouldUpdateProps?<S>(state : S) : boolean
}

type Constructor<T> = new(...args: any[]) => T;

export function connect<T extends Constructor<Connectable>>(superclass: T) {
  class connected extends superclass {
    private unsubscribe : Unsubscribe;

    connectedCallback() {
      this.unsubscribe = store.subscribe(() => this.connect(store.getState()))
      this.connect(store.getState())
    }
  
    disconnectedCallback() {
      this.unsubscribe()
    }

    shouldUpdateProps<S>(state : S) : boolean {
      return true
    }
  
    connect<S>(state : S) {
      if (this.shouldUpdateProps(state)) {
        this.setProperties(this.mapStateToProps(state))
      }
    }
  
    setProperties(val : any) {
      Object.assign(this, val);
    }
  }

  return connected as T
}
