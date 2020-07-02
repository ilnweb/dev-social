import { PostsActionTypes } from './posts.types';

export const setAllPosts = (posts: any) => ({
  type: PostsActionTypes.SET_ALL_POSTS,
  payload: posts
});

// export const signOutUser = () => ({
//   type: UserActionTypes.SIGN_OUT_USER,
//   payload: null
// });