import { UserActionTypes, IUserData, UserActionsInterface } from '../user/user.types';


export const setCurrentUser = (user: IUserData): UserActionsInterface => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
});

////// create user profile
export const createUserProfileStart = (email: string, password: string, name: string) => ({
  type: UserActionTypes.CREATE_USER_PROFILE_START,
  payload: { email, password, name }
})

export const createUserProfileSuccess = (user: IUserData): UserActionsInterface => ({
  type: UserActionTypes.CREATE_USER_PROFILE_SUCCESS,
  payload: user
})

/////// email sign in
export const emailSignInStart = (email: string, password: string, history: any) => ({
  type: UserActionTypes.EMAIL_SING_IN_START,
  payload: {
    email,
    password,
    history
  }
});

export const emailSignInSuccsess = (user: IUserData): UserActionsInterface => ({
  type: UserActionTypes.EMAIL_SING_IN_SUCCESS,
  payload: user
});

/////// auto sign in
export const autoSignInStart = () => ({
  type: UserActionTypes.AUTO_SING_IN_START
})

export const autoSignInSuccsess = (user: IUserData): UserActionsInterface => ({
  type: UserActionTypes.AUTO_SING_IN_SUCCSESS,
  payload: user
})


/////// update user info
export const updateUserInfoStart = (info: any) => ({
  type: UserActionTypes.UPDATE_USER_INFO_START,
  payload: { info }
})

export const updateUserInfoSuccess = (user: IUserData): UserActionsInterface => ({
  type: UserActionTypes.UPDATE_USER_INFO_SUCCESS,
  payload: user
})

/////// update avatar
export const updateUserAvatarStart = (image: string) => ({
  type: UserActionTypes.UPDATE_USER_AVATAR_START,
  payload: { image }
})

export const updateUserAvatarSuccess = (user: IUserData): UserActionsInterface => ({
  type: UserActionTypes.UPDATE_USER_AVATAR_SUCCESS,
  payload: user
})

/////// sign in fail
export const signInFalure = (error: string): UserActionsInterface => ({
  type: UserActionTypes.SING_IN_FAILURE,
  payload: error
});


///// sign out user
export const signOutUser = (): UserActionsInterface => ({
  type: UserActionTypes.SIGN_OUT_USER,
  payload: null
});
