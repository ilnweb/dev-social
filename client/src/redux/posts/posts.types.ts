export const PostsActionTypes = {
  SET_ALL_POSTS: 'SET_ALL_POSTS',

  GET_ALL_POSTS_START: 'GET_ALL_POSTS_START',
  GET_ALL_POSTS_SUCCSESS: 'GET_ALL_POSTS_SUCCSESS',
  GET_ALL_POSTS_FAILURE: 'GET_ALL_POSTS_FAILURE',

  ADD_POST_LIKE_START: 'ADD_POST_LIKE_START',
  ADD_POST_LIKE_SUCCESS: 'ADD_POST_LIKE_SUCCESS'
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
  likes: number,
  comments: IComment[],
  _id: string,
  createdAt: string
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
  payload: { postId: string }
}


export type PostActionsInterface = setAllPosts | addPostLikeSuccess;
