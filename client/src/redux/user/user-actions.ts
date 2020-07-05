import { UserActionTypes, IUserData,UserActionsInterface } from '../user/user.types';

export const setCurrentUser = (user: IUserData):UserActionsInterface => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
});

export const signOutUser = () => ({
  type: UserActionTypes.SIGN_OUT_USER,
  payload: null
});

export const emailSignInStart = (email:string, password:string, history:any) => ({
  type: UserActionTypes.EMAIL_SING_IN_START,
  payload: {
    email,
    password,
    history
  }
});

export const emailSignInSuccsess = (user:IUserData) => ({
  type: UserActionTypes.EMAIL_SING_IN_SUCCESS,
  payload: user
});

export const emailSignInFalure = (error:string) => ({
  type: UserActionTypes.EMAIL_SING_IN_FAILURE,
  payload: error
});

