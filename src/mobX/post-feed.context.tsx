import { types, Instance, SnapshotIn, cast  } from "mobx-state-tree";

interface Date {
  seconds: number
  nanoseconds:number
}

export const CommentModel = types.model({
  commentText: types.string,
  id: types.identifier,
  userName: types.string,
  userImg: types.string,
  // date: types.custom<number, Date>()
})

export const SinglePostModel = types.model({
  userID:types.string,
  userPhoto: types.string,
  userName: types.string,
  tags: types.array(types.string),
  postBody: types.string,
  postImg: types.string,
  likes: types.number,
  comments: types.optional(types.array(CommentModel),[]),
  id:types.string
})

export const PostsModel = types.model({
  posts: types.optional(types.array(SinglePostModel),[])
  
})


export type PostsInstance = Instance<typeof PostsModel>
export type SinglePostInstance = Instance<typeof SinglePostModel>
export type CommentInstance = Instance<typeof CommentModel>
