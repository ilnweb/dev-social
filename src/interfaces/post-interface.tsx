export interface IComment {
  commentText: string
  id: string
  date: {
    nanoseconds: number
    seconds: number
  }
  userName: string
  userImg: string
}


export interface IPost {
  postImg?: string;
  userName?: string;
  createdAt?: string;
  postBody?: string;
  userPhoto?: string;
  tags?: string[];
  comments?: IComment[]
  userID?: string
  id?: string
}