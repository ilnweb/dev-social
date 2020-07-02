import { UserActionTypes, IUserData,UserActionsInterface } from '../user/user.types';

export const setCurrentUser = (user: IUserData):UserActionsInterface => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
});

export const signOutUser = () => ({
  type: UserActionTypes.SIGN_OUT_USER,
  payload: null
});

