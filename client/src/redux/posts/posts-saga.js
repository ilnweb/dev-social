import { takeLatest, put, all, call } from "redux-saga/effects";
import { PostsActionTypes } from "./posts.types";
import { addPostLikeSuccess, removePostLikeSuccess, addPostCommentSuccess } from "./posts-actions";
import axios from "axios";

///////add like
export function* addLike({ payload: { postId, userId } }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }
  console.log(userId);
  yield put(addPostLikeSuccess(postId, userId));
  try {
    yield axios.post(
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
  } catch (error) {
    console.log("error getting all posts " + error.message);
  }
}

export function* onLike() {
  yield takeLatest(PostsActionTypes.ADD_POST_LIKE_START, addLike);
}
///////////remove like

export function* removeLike({ payload: { postId, userId } }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }
  yield put(removePostLikeSuccess(postId, userId));
  try {
    yield axios.post(
      `http://localhost:5000/feed/unlike`,
      {
        postId,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  } catch (error) {
    console.log("error getting all posts " + error.message);
  }
}

export function* onUnlike() {
  yield takeLatest(PostsActionTypes.REMOVE_POST_LIKE_START, removeLike);
}

///////////add comment

export function* addComment({ payload: { postId, userId, comment } }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }
  let result;
  try {
    result = yield axios.post(
      `http://localhost:5000/feed/comment`,
      {
        postId,
        comment,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (result.status === 200) {
      yield put(addPostCommentSuccess(postId, result.data.comments))
    }
     
  } catch (error) {
    console.log("error getting all posts " + error.message);
  }
}

export function* onAddComment() {
  yield takeLatest(PostsActionTypes.ADD_POST_COMMENT_START, addComment);
}

///////////add comment reply

export function* addCommentReply({ payload: { postId, userId, commentId, comment }}) {
  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }
  let result;
  try {
    result = yield axios.post(
      `http://localhost:5000/feed/comment-reply`,
      {
        postId,
        commentId,
        comment,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (result.status === 200) {
      yield put(addPostCommentSuccess(postId, result.data.comments))
    }
  } catch (error) {
    console.log("error getting all posts " + error.message);
  }
}

export function* onAddCommentReply() {
  yield takeLatest(PostsActionTypes.ADD_POST_REPLY_START, addCommentReply);
}

export function* postSagas() {
  yield all([
    call(onLike),
    call(onUnlike),
    call(onAddComment),
    call(onAddCommentReply),
  ]);
}
