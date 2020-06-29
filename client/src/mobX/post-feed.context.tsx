import { types, Instance } from "mobx-state-tree";

interface Date {
  seconds: number
  nanoseconds: number
}

export const postedBy = types.model({
  _id: types.identifier,
  photoURL: types.string,
  displayName: types.string,
})

export const CommentModel = types.model({
  commentText: types.string,
  id: types.identifier,
  userName: types.string,
  userImg: types.string,
  likes:types.number
  // date: types.custom<number, Date>()
})

export const SinglePostModel = types.model({
  postTitle: types.string,
  postImg: types.string,
  postBody: types.string,
  tags: types.array(types.string),
  postedBy:postedBy,
  likes: types.optional(types.maybeNull(types.number), null),
  comments: types.optional(types.array(CommentModel), []),
  _id: types.string
})

export const PostsModel = types.model({
  posts: types.optional(types.array(SinglePostModel), [])
})

export type PostsInstance = Instance<typeof PostsModel>
export type SinglePostInstance = Instance<typeof SinglePostModel>
export type CommentInstance = Instance<typeof CommentModel>
