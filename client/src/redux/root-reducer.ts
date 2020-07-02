import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './user/user-reducer';
import postsReducer from './posts/posts-reducer';

const persisitConfig = {
  key: 'root',
  storage,
  whitelist:['user','allPosts']
}

const rootReducer = combineReducers({
  user: userReducer,
  allPosts:postsReducer
});

export type RootState = ReturnType<typeof rootReducer>

export default persistReducer(persisitConfig, rootReducer);