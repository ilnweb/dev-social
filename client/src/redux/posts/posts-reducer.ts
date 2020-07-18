import { PostsActionTypes, IPosts, ISinglePost } from './posts.types';
import { addLike,removeLike } from './post-utils';

const INITIAL_STATE: IPosts = {
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
        posts: addLike(state.posts, action.payload.postId, action.payload.userId)
      };
      case PostsActionTypes.REMOVE_POST_LIKE_SUCCESS:
        return {
          ...state,
          posts: removeLike(state.posts, action.payload.postId, action.payload.userId)
        };
    default:
      return state;
  }
};

export default userReducer;