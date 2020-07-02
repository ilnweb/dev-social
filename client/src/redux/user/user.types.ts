export const UserActionTypes = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
  SET_USER_GAMES: 'SET_USER_GAMES',
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