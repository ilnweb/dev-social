export const UserActionTypes = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',

  EMAIL_SING_IN_START: 'EMAIL_SING_IN_START',
  EMAIL_SING_IN_SUCCESS: 'EMAIL_SING_IN_SUCCESS',

  AUTO_SING_IN_START: 'AUTO_SING_IN_START',
  AUTO_SING_IN_SUCCSESS: 'AUTO_SING_IN_SUCCSESS',

  CREATE_USER_PROFILE_START: 'CREATE_USER_PROFILE_START',
  CREATE_USER_PROFILE_SUCCESS: 'CREATE_USER_PROFILE_SUCCESS',

  UPDATE_USER_INFO_START: 'UPDATE_USER_INFO_START',
  UPDATE_USER_INFO_SUCCESS: 'UPDATE_USER_INFO_SUCCESS',

  UPDATE_USER_AVATAR_START: 'UPDATE_USER_AVATAR_START',
  UPDATE_USER_AVATAR_SUCCESS: 'UPDATE_USER_AVATAR_SUCCESS',

  SING_IN_FAILURE: 'SING_IN_FAILURE',
  SIGN_OUT_USER: 'SIGN_OUT_USER',
};


////INTERFACE USER DATA
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

/////INTERFACES USER ACTIONS
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

interface createUserProfileSuccess {
  type: typeof UserActionTypes.CREATE_USER_PROFILE_SUCCESS,
  payload: {
    email: string;
    password: string;
    name: string;
  }
}

interface updateUserInfoSuccess {
  type: typeof UserActionTypes.UPDATE_USER_INFO_SUCCESS,
  payload: IUserData
}

interface updateUserAvatarSuccess {
  type: typeof UserActionTypes.UPDATE_USER_AVATAR_SUCCESS,
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



export type UserActionsInterface = emailSignInSuccsess | signInFalure | signOutUser | setCurrentUser | autoSignInSuccsess |createUserProfileSuccess | updateUserInfoSuccess;