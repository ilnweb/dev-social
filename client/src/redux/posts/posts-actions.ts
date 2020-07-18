import { PostsActionTypes, IPosts, PostActionsInterface } from './posts.types';

export const setAllPosts = (posts: IPosts): PostActionsInterface => ({
  type: PostsActionTypes.SET_ALL_POSTS,
  payload: posts
});

// export const signOutUser = () => ({
//   type: UserActionTypes.SIGN_OUT_USER,
//   payload: null
// });
/////add post like
export const addPostLikeStart = (postId: string , userId:string) => ({
  type: PostsActionTypes.ADD_POST_LIKE_START,
  payload: { postId, userId }
});

export const addPostLikeSuccess = (postId: string, userId:string): PostActionsInterface => ({
  type: PostsActionTypes.ADD_POST_LIKE_SUCCESS,
  payload: { postId, userId }
});

/////remove post like
export const removePostLikeStart = (postId: string , userId:string) => ({
  type: PostsActionTypes.REMOVE_POST_LIKE_START,
  payload: { postId, userId }
});

export const removePostLikeSuccess = (postId: string, userId:string): PostActionsInterface => ({
  type: PostsActionTypes.REMOVE_POST_LIKE_SUCCESS,
  payload: { postId, userId }
});