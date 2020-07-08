export const UserActionTypes = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',

  EMAIL_SING_IN_START: 'EMAIL_SING_IN_START',
  EMAIL_SING_IN_SUCCESS: 'EMAIL_SING_IN_SUCCESS',

  AUTO_SING_IN_START: 'AUTO_SING_IN_START',
  AUTO_SING_IN_SUCCSESS: 'AUTO_SING_IN_SUCCSESS',

  SING_IN_FAILURE: 'EMAIL_SING_IN_FAILURE',
  SIGN_OUT_USER: 'SIGN_OUT_USER',
};

export interface IUserData {
  photoURL: string,
  id: string,
  displayName: string,
  email: string,
  location?: string | null,
  jobTitle?: string | null,
  workStatus?: string | null,
  skills?: string | null,
}

export interface ICurrentUser {
  currentUser: IUserData | null;
  error: string | null;
}

interface setCurrentUser {
  type: typeof UserActionTypes.SET_CURRENT_USER,
  payload: IUserData
}

interface emailSignInSuccsess {
  type: typeof UserActionTypes.EMAIL_SING_IN_SUCCESS,
  payload: IUserData
}

interface autoSignInSuccsess {
  type: typeof UserActionTypes.AUTO_SING_IN_SUCCSESS,
  payload: IUserData
}

interface signInFalure {
  type: typeof UserActionTypes.SING_IN_FAILURE,
  payload: string
}

interface signOutUser {
  type: typeof UserActionTypes.SIGN_OUT_USER,
  payload: null
}



export type UserActionsInterface = emailSignInSuccsess | signInFalure | signOutUser | setCurrentUser | autoSignInSuccsess;