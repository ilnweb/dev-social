export const UserActionTypes = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
  EMAIL_SING_IN_START: 'EMAIL_SING_IN_START',
  EMAIL_SING_IN_SUCCESS: 'EMAIL_SING_IN_SUCCESS',
  EMAIL_SING_IN_FAILURE: 'EMAIL_SING_IN_FAILURE',
  SIGN_OUT_USER: 'SIGN_OUT_USER',
};

export interface IUserData{
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
  currentUser: IUserData | null
}

interface setCurrentUser {
  type: typeof UserActionTypes.SET_CURRENT_USER,
  payload: IUserData
}

export type UserActionsInterface = setCurrentUser;