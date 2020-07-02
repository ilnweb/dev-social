import { PostsActionTypes, PostActionsInterface,IPosts } from './posts.types';

const INITIAL_STATE:IPosts = {
	posts: null
};

const userReducer = (state = INITIAL_STATE, action:any):IPosts => {
	switch (action.type) {
		case PostsActionTypes.SET_ALL_POSTS:
			return {
				...state,
				posts: action.payload
			};
		// case UserActionTypes.SIGN_OUT_USER:
		// 	return {
		// 		...state,
		// 		currentUser: action.payload
		// 	};

		default:
			return state;
	}
};

export default userReducer;