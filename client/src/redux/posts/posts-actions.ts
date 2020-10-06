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
export const addPostLikeStart = (postId: string, userId: string) => ({
  type: PostsActionTypes.ADD_POST_LIKE_START,
  payload: { postId, userId }
});

export const addPostLikeSuccess = (postId: string, userId: string): PostActionsInterface => ({
  type: PostsActionTypes.ADD_POST_LIKE_SUCCESS,
  payload: { postId, userId }
});

/////remove post like
export const removePostLikeStart = (postId: string, userId: string) => ({
  type: PostsActionTypes.REMOVE_POST_LIKE_START,
  payload: { postId, userId }
});

export const removePostLikeSuccess = (postId: string, userId: string): PostActionsInterface => ({
  type: PostsActionTypes.REMOVE_POST_LIKE_SUCCESS,
  payload: { postId, userId }
});

/////add Post Comment
export const addPostCommentStart = (postId: string, userId: string, comment: string) => ({
  type: PostsActionTypes.ADD_POST_COMMENT_START,
  payload: { postId, userId, comment }
});

export const addPostCommentSuccess = (postId: string, comments:any) => ({
  type: PostsActionTypes.ADD_POST_COMMENT_SUCCESS,
  payload: { postId, comments }
});


/////add Post Reply
export const addPostReplyStart = (postId: string, userId: string, commentId: string, comment: string) => ({
  type: PostsActionTypes.ADD_POST_REPLY_START,
  payload: { postId, userId, commentId, comment }
});

/////add Comment like
export const addCommentLikeStart = (postId: string, userId: string) => ({
  type: PostsActionTypes.ADD_COMMENT_LIKE_START,
  payload: { postId, userId }
});

// export const addPostReplySuccess = (postId: string, comments: any) => ({
//   type: PostsActionTypes.ADD_POST_REPLY_SUCCESS,
//   payload: { postId, comments }
// });