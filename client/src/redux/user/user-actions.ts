import { UserActionTypes, IUserData, UserActionsInterface } from '../user/user.types';

export const setCurrentUser = (user: IUserData): UserActionsInterface => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
});

export const signOutUser = (): UserActionsInterface => ({
  type: UserActionTypes.SIGN_OUT_USER,
  payload: null
});

export const emailSignInStart = (email: string, password: string, history: any) => ({
  type: UserActionTypes.EMAIL_SING_IN_START,
  payload: {
    email,
    password,
    history
  }
});

export const autoSignInStart = (token: string) => ({
  type: UserActionTypes.AUTO_SING_IN_START,
  payload: { token }
})

export const createUserProfileStart = (email: string, password: string, name: string) => ({
  type: UserActionTypes.CREATE_USER_PROFILE_START,
  payload: { email, password, name }
})

export const createUserProfileSuccess = (user:IUserData):UserActionsInterface => ({
  type: UserActionTypes.CREATE_USER_PROFILE_SUCCESS,
  payload: user
})

export const autoSignInSuccsess = (user: IUserData): UserActionsInterface => ({
  type: UserActionTypes.AUTO_SING_IN_SUCCSESS,
  payload: user
})

export const emailSignInSuccsess = (user: IUserData): UserActionsInterface => ({
  type: UserActionTypes.EMAIL_SING_IN_SUCCESS,
  payload: user
});

export const signInFalure = (error: string): UserActionsInterface => ({
  type: UserActionTypes.SING_IN_FAILURE,
  payload: error
});

