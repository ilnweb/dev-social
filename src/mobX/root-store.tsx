import { types, Instance } from "mobx-state-tree";
import { SinglePostModel } from './post-feed.context';

export const RootModel = types.model("RootStore", {
  posts: types.array(SinglePostModel)
})

export type RootInstance = Instance<typeof RootModel>
