import { PostsActionTypes, IPosts,ISinglePost } from './posts.types';

const INITIAL_STATE: any = {
  posts: null
};

const userReducer = (state = INITIAL_STATE, action: any): IPosts => {
  switch (action.type) {
    case PostsActionTypes.SET_ALL_POSTS:
      return {
        ...state,
        posts: action.payload
      };
    case PostsActionTypes.ADD_POST_LIKE_SUCCESS:
      return {
        ...state,
        posts: state?.posts?.map((post:any) => post._id === action.payload.postId ? {...post, likes: post.likes+1} : post)
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