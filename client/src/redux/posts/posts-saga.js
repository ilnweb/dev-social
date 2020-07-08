import { takeLatest, put,all,call } from 'redux-saga/effects';
import { PostsActionTypes } from './posts.types';
import axios from 'axios'; 

export function* getAllPosts() {
  let result;
  try {
    result = await axios.get(`http://localhost:5000/feed/posts`);
  }
  catch (error) {
    console.log('error getting all posts ' + error.message);
  }
  return result?.data?.posts?.reverse();
}

export function* onSignIn() {
  yield takeLatest(PostsActionTypes.GET_ALL_POSTS, getAllPosts)
}

export function* userSagas() {
  yield all([call(onSignIn)])
}