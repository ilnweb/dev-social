import { types, Instance, SnapshotIn, cast  } from "mobx-state-tree";



export const CommentModel = types.model({
  commentText: types.string,
  id: types.identifier,
  userName: types.string,
  userImg: types.string
})

export const SinglePostModel = types.model({
  userID:types.string,
  userPhoto: types.string,
  userName: types.string,
  tags: types.array(types.string),
  postBody: types.string,
  postImg: types.string,
  likes: types.number,
  comments: types.array(CommentModel),
  id:types.identifier
})

export const PostsModel = types.model({
  posts: types.optional(types.array(SinglePostModel),[])
  
}).actions(self => ({
  addAllPosts(allPosts:[]) {
    self.posts = cast(allPosts);
  }
}))


export type PostsInstance = Instance<typeof PostsModel>
export type SinglePostInstance = Instance<typeof SinglePostModel>
export type CommentInstance = Instance<typeof CommentModel>
