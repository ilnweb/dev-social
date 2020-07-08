import { UserActionTypes, ICurrentUser, UserActionsInterface } from './user.types';

const INITIAL_STATE: ICurrentUser = {
  currentUser: null,
  error: null
};

const userReducer = (state = INITIAL_STATE, action: any): ICurrentUser => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
    case UserActionTypes.EMAIL_SING_IN_SUCCESS:
      case UserActionTypes.AUTO_SING_IN_SUCCSESS:
      return {
        ...state,
        currentUser: action.payload
      };
    case UserActionTypes.SING_IN_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case UserActionTypes.SIGN_OUT_USER:
      return {
        ...state,
        currentUser: action.payload
      };

    default:
      return state;
  }
};

export default userReducer;