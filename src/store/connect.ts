import { Unsubscribe } from 'redux';
import store, { RootState } from './';

export interface Connectable {
  mapStateToProps(state : RootState) : any
  shouldUpdateProps?(state : RootState) : boolean
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

    shouldUpdateProps(state : RootState) : boolean {
      return true
    }
  
    connect(state : RootState) {
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
