import { PostsActionTypes, IPosts, PostActionsInterface } from './posts.types';

export const setAllPosts = (posts: IPosts): PostActionsInterface => ({
  type: PostsActionTypes.SET_ALL_POSTS,
  payload: posts
});

// export const signOutUser = () => ({
//   type: UserActionTypes.SIGN_OUT_USER,
//   payload: null
// });

export const addPostLikeStart = (postId: string) => ({
  type: PostsActionTypes.ADD_POST_LIKE_START,
  payload: { postId }
});

export const addPostLikeSuccess = (postId: string): PostActionsInterface => ({
  type: PostsActionTypes.ADD_POST_LIKE_SUCCESS,
  payload: { postId }
});