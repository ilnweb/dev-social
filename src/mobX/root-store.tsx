import { types, Instance } from "mobx-state-tree";
import { PostsModel } from './post-feed.context';
import { currentUserModel } from './user.context';

export const RootModel = types.model("RootStore", {
  posts: PostsModel,
  // currentUser: currentUserModel
})

export type RootInstance = Instance<typeof RootModel>
