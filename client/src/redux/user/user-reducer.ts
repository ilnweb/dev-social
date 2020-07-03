import { UserActionTypes, ICurrentUser,UserActionsInterface } from './user.types';

const INITIAL_STATE: ICurrentUser = {
	currentUser: null
};

const userReducer = (state = INITIAL_STATE, action:UserActionsInterface):ICurrentUser => {
	switch (action.type) {
		// case UserActionTypes.SET_CURRENT_USER:
      case UserActionTypes.EMAIL_SING_IN_SUCCESS:
			return {
				...state,
				currentUser: action.payload
			};
		case UserActionTypes.EMAIL_SING_IN_FAILURE:
			return {
				...state,
				currentUser: action.payload
			};

		default:
			return state;
	}
};

export default userReducer;