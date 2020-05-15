import { types, Instance } from "mobx-state-tree";
import { PostsModel } from './post-feed.context';

export const RootModel = types.model("RootStore", {
  posts: PostsModel,
})

export type RootInstance = Instance<typeof RootModel>
