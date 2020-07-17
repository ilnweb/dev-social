import { takeLatest, put, all, call } from "redux-saga/effects";
import { UserActionTypes } from "./user.types";
import {
  emailSignInSuccsess,
  signInFalure,
  autoSignInSuccsess,
  createUserProfileSuccess,
  updateUserInfoSuccess,
  updateUserAvatarSuccess
} from "./user-actions";
import axios from "axios";

const token = localStorage.getItem("token");

export function* signIn({ payload: { email, password, history } }) {
  let result;
  try {
    result = yield axios.post(`http://localhost:5000/auth/login`, {
      password,
      email,
    });
    if (result.status === 200) {
      console.log("result signed in");
      result && localStorage.setItem("token", result.data.token);
      yield put(emailSignInSuccsess(result.data.user));
      yield put(signInFalure(null));
      history.push("/");
    }
  } catch (error) {
    console.log("error loging in user " + error.message);
    yield put(signInFalure(error));
  }
  return result;
}

export function* onSignIn() {
  yield takeLatest(UserActionTypes.EMAIL_SING_IN_START, signIn);
}

//////////////////////////////////////

export function* autoSignIn() {
  if (!token) {
    yield put(signInFalure("no-user"));
    return;
  }
  let result;
  try {
    result = yield axios.post(
      `http://localhost:5000/auth/login-auto`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (result.status === 200) {
      yield put(autoSignInSuccsess(result?.data.user));
    }
  } catch (error) {
    console.log("error loging in user automaticaly" + error.message);
    yield put(signInFalure(error));
  }
}
export function* onAutoSignIn() {
  yield takeLatest(UserActionTypes.AUTO_SING_IN_START, autoSignIn);
}

//////////////////////////////////////

export function* createUserProfile({ payload: { email, password, name } }) {
  let result;
  try {
    result = yield axios.post(`http://localhost:5000/auth/signup`, {
      name,
      password,
      email,
    });
    if (result.status === 200) {
      result && localStorage.setItem("token", result.data.token);
      yield put(createUserProfileSuccess(result?.data.user));
    }
  } catch (error) {
    console.log("error creating user " + error.message);
    yield put(signInFalure(error));
  }
}

export function* onCreateUserProfile() {
  yield takeLatest(
    UserActionTypes.CREATE_USER_PROFILE_START,
    createUserProfile
  );
}

//////////////////////////////////////

export function* updateUserInfo({ payload: { info } }) {
  if (!token) {
    return;
  }
  console.log(info);
  let result;
  try {
    result = yield axios.post(
      `http://localhost:5000/user/profile-info`,
      {
        info
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (result.status === 200) {
      yield put(updateUserInfoSuccess(result?.data.user));
    }
  } catch (error) {
    console.log("error updating user Info " + error.message);
    yield put(signInFalure(error));
  }
}

export function* onUpdateUserInfo() {
  yield takeLatest(UserActionTypes.UPDATE_USER_INFO_START, updateUserInfo);
}

/////////////////////////////////

export function* updateUserAvatar({ payload: { image } }) {
  if (!token) {
    return;
  }
  let result;
  try {
    result = yield axios.post(
      `http://localhost:5000/user/avatar`,
      {
        image
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (result.status === 200) {
      yield put(updateUserAvatarSuccess(result?.data.user));
    }
  } catch (error) {
    console.log("error updating user Avatar " + error.message);
    yield put(signInFalure(error));
  }
}

export function* onUpdateUserAvatar() {
  yield takeLatest(UserActionTypes.UPDATE_USER_AVATAR_START, updateUserAvatar);
}

/////////////////MainSAGA
export function* userSagas() {
  yield all([
    call(onSignIn),
    call(onAutoSignIn),
    call(onCreateUserProfile),
    call(onUpdateUserInfo),
    call(onUpdateUserAvatar)
  ]);
}
