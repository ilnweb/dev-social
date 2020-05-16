import { useContext, createContext } from "react";
// import { onSnapshot } from "mobx-state-tree";
import { RootInstance, RootModel } from './root-store';

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