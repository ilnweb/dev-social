import { takeLatest, put, all, call } from "redux-saga/effects";
import { PostsActionTypes } from "./posts.types";
import { addPostLikeSuccess,removePostLikeSuccess } from "./posts-actions";
import axios from "axios";


export function* addLike({ payload: { postId, userId } }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }
    console.log(userId);
  yield put(addPostLikeSuccess(postId, userId))
  try {
     yield axios.post(
      `http://localhost:5000/feed/like`,
      {
        postId,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        }
      }
    );  
  } catch (error) {
    console.log("error getting all posts " + error.message);
  }
}

export function* onLike() {
  yield takeLatest(PostsActionTypes.ADD_POST_LIKE_START, addLike);
}
/////////////////////////

export function* removeLike({ payload: { postId, userId } }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }
  yield put(removePostLikeSuccess(postId, userId))
  try {
     yield axios.post(
      `http://localhost:5000/feed/unlike`,
      {
        postId,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        }
      }
    );  
  } catch (error) {
    console.log("error getting all posts " + error.message);
  }
}

export function* onUnlike() {
  yield takeLatest(PostsActionTypes.REMOVE_POST_LIKE_START, removeLike);
}

export function* postSagas() {
  yield all([
    call(onLike),
    call(onUnlike)
  ]);
}
