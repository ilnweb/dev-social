import { useContext, createContext } from "react";
import { types, Instance, SnapshotIn, cast,destroy } from "mobx-state-tree";
import { SinglePostModel } from './post-feed.context';
import { currentUserModel, currentUserInstance } from './user.context';

export const RootModel = types.model({
  posts: types.optional(types.array(SinglePostModel), []),
  currentUser: types.optional(types.maybeNull(currentUserModel), () => null)
}).actions(self => ({
  addAllPosts(allPosts: SnapshotIn<[]>) {
    self.posts = cast(allPosts);
  },
  setCurrentUser(user: currentUserInstance) {
    self.currentUser = user;
  },
  removeCurrentUser(user: currentUserInstance) {
    destroy(user)
  }
})).views(self => ({
  getSinglePost(id: string) {
    const post: any = () => {
      
    } 
    return new Promise((res, reg) => {
      res(self.posts.find(post => id === post._id))
    })
  }
}))

export type RootInstance = Instance<typeof RootModel>

export const rootStore = RootModel.create({
  posts: [],
  currentUser: null
});

// onSnapshot(rootStore, snapshot => console.log("Snapshot: ", snapshot));

const RootStoreContext = createContext<null | RootInstance>(null);

export const Provider = RootStoreContext.Provider;
export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}