import { all, call } from 'redux-saga/effects';
import { userSagas } from './user/user-saga';
import { postSagas } from './posts/posts-saga';


export default function* rootSaga() {
  yield all([
    call(userSagas),
    call(postSagas)
  ])
}