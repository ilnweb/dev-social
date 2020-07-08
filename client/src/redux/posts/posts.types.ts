export const PostsActionTypes = {
  SET_ALL_POSTS: 'SET_ALL_POSTS',
  GET_ALL_POSTS_START: 'GET_ALL_POSTS_START',
  GET_ALL_POSTS_SUCCSESS: 'GET_ALL_POSTS_SUCCSESS',
  GET_ALL_POSTS_FAILURE: 'GET_ALL_POSTS_FAILURE',
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
  likes: number | null,
  comments: IComment[],
  _id: string,
  createdAt: string
}

export interface IPosts {
  posts?: ISinglePost[] | null
}

export interface setAllPosts {
  type: typeof PostsActionTypes.SET_ALL_POSTS,
  payload: IPosts
}

export type PostActionsInterface = setAllPosts;
