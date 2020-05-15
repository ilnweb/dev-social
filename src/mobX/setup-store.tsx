import { useContext, createContext } from "react";
import { types, Instance, onSnapshot } from "mobx-state-tree";
import { RootInstance, RootModel } from './root-store';
import {SinglePostModel} from './post-feed.context';

export const rootStore = RootModel.create({
  posts: [{
    userID: '123',
    userPhoto: 'photo',
    userName: 'iliyan',
    tags: ['arr', 'react'],
    comments: [
      {
        commentText: "jj",
        id: '1',
        userImg: 'jhkh',
        userName:'ygghhhj'
      }
    ],
    likes: 6,
    postBody: 'uhihkj',
    postImg: 'jkhkjhk',
    id:'kggkjgk'
  }]
});


onSnapshot(rootStore, snapshot => console.log("Snapshot: ", snapshot));

const RootStoreContext = createContext<null | RootInstance>(null);

export const Provider = RootStoreContext.Provider;
export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}