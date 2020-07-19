export const PostsActionTypes = {
  SET_ALL_POSTS: 'SET_ALL_POSTS',

  GET_ALL_POSTS_START: 'GET_ALL_POSTS_START',
  GET_ALL_POSTS_SUCCSESS: 'GET_ALL_POSTS_SUCCSESS',
  GET_ALL_POSTS_FAILURE: 'GET_ALL_POSTS_FAILURE',

  ADD_POST_LIKE_START: 'ADD_POST_LIKE_START',
  ADD_POST_LIKE_SUCCESS: 'ADD_POST_LIKE_SUCCESS',

  REMOVE_POST_LIKE_START: 'REMOVE_POST_LIKE_START',
  REMOVE_POST_LIKE_SUCCESS: 'REMOVE_POST_LIKE_SUCCESS',

  ADD_POST_COMMENT_START: 'ADD_POST_COMMENT_START',
  ADD_POST_COMMENT_SUCCESS: 'ADD_POST_COMMENT_SUCCESS',

  ADD_POST_REPLY_START: 'ADD_POST_REPLY_START',
  ADD_POST_REPLY_SUCCESS: 'ADD_POST_REPLY_SUCCESS'
};

export interface IPostedBy {
  _id: string,
  photoURL: string,
  displayName: string,
}

export interface IComment {
  commentText: string,
  _id: string,
  userName: string,
  userImg: string,
  likes: number
  // date: custom<number, Date>()
}

export interface ISinglePost {
  postTitle: string,
  postImg: string,
  postBody: string,
  tags: string[],
  postedBy: IPostedBy,
  likes: string[],
  likesCount: number
  comments: IComment[],
  _id: string,
  createdAt: string
  commentsCount:number
}

export interface IPosts {
  posts?: ISinglePost[] | null | undefined
}

export interface setAllPosts {
  type: typeof PostsActionTypes.SET_ALL_POSTS,
  payload: IPosts
}

export interface addPostLikeSuccess {
  type: typeof PostsActionTypes.ADD_POST_LIKE_SUCCESS,
  payload: {
    postId: string
    userId: string
  }
}

export interface removePostLikeSuccess {
  type: typeof PostsActionTypes.REMOVE_POST_LIKE_SUCCESS,
  payload: {
    postId: string
    userId: string
  }
}

export interface addPostCommentSuccess {
  type: typeof PostsActionTypes.ADD_POST_COMMENT_SUCCESS,
  payload: {
    postId: string
    userId: string
    comment: string
  }
}

export interface addPostReplySuccess {
  type: typeof PostsActionTypes.ADD_POST_REPLY_SUCCESS,
  payload: {
    postId: string
    userId: string
    comment: string
  }
}


export type PostActionsInterface = setAllPosts | addPostLikeSuccess | removePostLikeSuccess;
