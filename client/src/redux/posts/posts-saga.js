import { takeLatest, put, all, call } from "redux-saga/effects";
import { PostsActionTypes } from "./posts.types";
import { addPostLikeSuccess } from "./posts-actions";
import axios from "axios";

const token = localStorage.getItem("token");

export function* addLike({ payload: { postId } }) {
  if (!token) {
    return;
  }
  console.log(postId);
  let result;
  try {
    result = yield axios.post(
      `http://localhost:5000/feed/like`,
      {
        postId,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    
      yield put(addPostLikeSuccess(postId));
    
  } catch (error) {
    console.log("error getting all posts " + error.message);
    // yield put(autoSignInSuccsess(result?.data.user));
  }
}

export function* onLike() {
  yield takeLatest(PostsActionTypes.ADD_POST_LIKE_START, addLike);
}

export function* postSagas() {
  yield all([call(onLike)]);
}
