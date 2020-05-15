import { types, Instance } from "mobx-state-tree";

export const CommentModel = types.model("Comments", {
  commentText: types.string,
  id: types.identifier,
  userName: types.string,
  userImg: types.string
})

export const SinglePostModel = types.model("SinglePost", {
  userID: types.identifier,
  userPhoto: types.string,
  userName: types.string,
  tags: types.array(types.string),
  postBody: types.string,
  postImg: types.string,
  likes: types.number,
  comments: types.array(CommentModel),
  id:types.string
})

// export const PostsModel = types.model("Posts", {
//   posts: SinglePostModel
// })
// export type Posts = Instance<typeof PostsModel>
export type SinglePostInstance = Instance<typeof SinglePostModel>
export type CommentInstance = Instance<typeof CommentModel>

