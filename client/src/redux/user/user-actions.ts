import { UserActionTypes, IUserData } from '../user/user.types';

export const setCurrentUser = (user: any) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
});

export const signOutUser = () => ({
  type: UserActionTypes.SIGN_OUT_USER,
  payload: null
});