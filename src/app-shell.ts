import { LitElement, html } from 'lit-html-element';
import { connect } from './store/connect';
import store, { signIn, signOut, anonymous, authenticated, RootState } from './store';

export default () => {
  class AppShell extends LitElement {
    private _opened : boolean
    private _animatable : boolean
    private toggleClassMenu : Function
    private transitionEnd : Function
    private statusKnown : boolean
    private user : object
    private anonymous : boolean
    private authenticated : boolean

    static get is() { return 'app-shell' }

    static get properties() {
      return {
        statusKnown: {
          type: Boolean
        },
        user: {
          type: Object
        }
      }
    }

    constructor() {
      super()
      this._opened = false;
      this.toggleClassMenu = this._toggleClassMenu.bind(this);
      this.transitionEnd = this._transitionEnd.bind(this);
    }

    mapStateToProps(state : RootState) : any {
      return {
        statusKnown: state.auth.statusKnown,
        user: state.auth.user,
        anonymous: anonymous(state),
        authenticated: authenticated(state),
      }
    }

    signIn(e) {
      store.dispatch(signIn('google'))
    }

    signOut(e) {
      store.dispatch(signOut())
    }

    get menuClass() {
      return (this._opened ? 'menu--visible' : '') +
             (this._animatable ? ' menu--animatable' : '');
    }

    _toggleClassMenu(e : Event) {
      this._animatable = true;
      this._opened = !this._opened;
      this.invalidate();
    }

    _transitionEnd(e : Event) {
      this._animatable = false;
      this.invalidate();
    }

    json(val) {
      return JSON.stringify(val, null, '  ')
    }

    render() {
      return html`
<style>
:host { display: block }
:host([hidden]) { display: none }

#menu {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  pointer-events: none;
  z-index: 150;
}

.menu--visible {
  pointer-events: auto;
}

#drawer {
  background-color: #fff;
  color: #fff;
  position: relative;
  max-width: 256px;
  width: 90%;
  height: 100vh;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
  -webkit-transform: translateX(-103%);
          transform: translateX(-103%);
  display: flex;
  flex-direction: column;
  will-change: transform;
  z-index: 160;
  pointer-events: auto;
}

.menu--visible #drawer {
  -webkit-transform: none;
          transform: none;
}

.menu--animatable #drawer {
  transition: all 130ms ease-in;
}

.menu--visible.menu--animatable #drawer {
  transition: all 330ms ease-out;
}

#menu:after {
  content: '';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
  opacity: 0;
  will-change: opacity;
  pointer-events: none;
  transition: opacity 0.3s cubic-bezier(0,0,0.3,1);
}

#menu.menu--visible:after {
  opacity: 1;
  pointer-events: auto;
}

#layout {
  width: 100vw;
  height: 100vh;
  position: relative;
}

#header {
  background-color: #4285f4;
  overflow: auto;
}

#menu-icon {
  content: "Menu";
  color: #fff;
  width: 48px;
  height: 48px;
  float: left;
}

#drawer {
  width: 256px;
  height: 100vh;
  box-shadow: none;
  background-color: #f7f7f7;
}

#menu:after {
  width: 100vw;
}

#body {
  margin: 20px;
}

h1 {
  margin: 6px 0 0 56px;
  font-size: 24px;
  font-weight: normal;
  color: #fff;
}

svg {
  pointer-events: none;
  display: block;
  width: 24px;
  height: 24px;
  padding: 12px;
}
path {
  fill: #fff;
}
</style>
<div id="menu" class$="${this.menuClass}" on-click=${this.toggleClassMenu} on-transitionend=${this.transitionEnd}>
  <div id="drawer">
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </div>
</div>
<div id="layout">
  <div id="header">
    <div id="menu-icon" on-click=${this.toggleClassMenu}>
      <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet"><g id="menu"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></g></svg>
    </div>
    <h1>My App</h1>
  </div>
  <div id="body">
    <p>This is some content</p>
    <p>
      <button on-click="${this.signIn}">Sign In</button>
      <button on-click="${this.signOut}">Sign Out</button>
    </p>
    <p>
      Status Known: ${this.statusKnown}
      Anonymous: ${this.anonymous}
      Authenticated: ${this.authenticated}
    </p>
    <pre>${this.json(this.user)}</pre>
  </div>
</div>`;
    }
  }

  AppShell.withProperties()

  customElements.define('app-shell', connect(AppShell));
}
