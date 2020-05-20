import { useContext, createContext } from "react";
import { types, Instance } from "mobx-state-tree";
import { PostsModel } from './post-feed.context';
// import { currentUserModel } from './user.context';

export const RootModel = types.model("RootStore", {
  posts: PostsModel,
  // currentUser: currentUserModel
})

export type RootInstance = Instance<typeof RootModel>

export const rootStore = RootModel.create({
  posts: {
    posts:[]
  }
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