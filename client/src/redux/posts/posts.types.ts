export const PostsActionTypes = {
  SET_ALL_POSTS: 'SET_ALL_POSTS'
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
  likes:number
  // date: custom<number, Date>()
}

export interface ISinglePost {
  postTitle: string,
  postImg: string,
  postBody: string,
  tags: string[],
  postedBy:IPostedBy,
  likes: number|null,
  comments: IComment [],
  _id: string,
  createdAt:string
}

export interface IPosts {
  posts: ISinglePost[]
}

