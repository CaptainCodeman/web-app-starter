import * as firebase from 'firebase/app';

export enum AuthTypes {
  SIGN_IN = 'USER_SIGN_IN',
  SIGN_OUT = 'USER_SIGN_OUT',
  SIGNED_IN = 'USER_SIGNED_IN',
  SIGNED_OUT = 'USER_SIGNED_OUT',
}

interface SignInAction {
  readonly type : AuthTypes.SIGN_IN;
  readonly payload : string;
}

interface SignOutAction {
  readonly type: AuthTypes.SIGN_OUT;
}

interface SignedInAction {
  readonly type : AuthTypes.SIGNED_IN;
  readonly payload : firebase.User;
}

interface SignedOutAction {
  readonly type: AuthTypes.SIGNED_OUT;
}

export type AuthActions = SignedInAction | SignedOutAction;

export const signIn = (provider : string) : SignInAction => ({
  type : AuthTypes.SIGN_IN,
  payload : provider,
})

export const signOut = () : SignOutAction => ({
  type : AuthTypes.SIGN_OUT,
})

export const signedIn = (user : firebase.User) : SignedInAction => ({
  type : AuthTypes.SIGNED_IN,
  payload : user,
})

export const signedOut = () : SignedOutAction => ({
  type : AuthTypes.SIGNED_OUT,
})
