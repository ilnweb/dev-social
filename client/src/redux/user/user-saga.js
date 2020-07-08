import { takeLatest, put,all,call } from 'redux-saga/effects';
import { UserActionTypes } from './user.types';
import { emailSignInSuccsess, signInFalure , autoSignInSuccsess} from './user-actions';
import axios from 'axios'; 

export function* signIn({payload:{email, password, history}}) {
  let result;
  try {
    result = yield axios.post(`http://localhost:5000/auth/login`, {
      password,
      email
    })
    if (result.status === 200) {
      console.log('result signed in');
      result && localStorage.setItem('token', result.data.token);
      yield put(
        emailSignInSuccsess(result.data.user)
      )
      history.push('/')
    }
  }
  catch (error) {
    console.log('error loging in user ' + error.message);
    yield put(
      signInFalure(error)
    )
  }
  return result;
}

export function* onSignIn() {
  yield takeLatest(UserActionTypes.EMAIL_SING_IN_START, signIn)
}
//////////////////////////////////////

export function* autoSignIn({payload:{token}}) {
  let result;
  console.log(token);
  try {
    result = yield axios.post(`http://localhost:5000/auth/login-auto`, {
      token
    })
    if (result.status === 200) {
      yield put(
        autoSignInSuccsess(result?.data.user)
      )
    }
  }
  catch (error) {
    console.log('error loging in user automaticaly' + error.message);
    yield put(
      signInFalure(error)
    )
  }
}

export function* onAutoSignIn() {
  yield takeLatest(UserActionTypes.AUTO_SING_IN_START, autoSignIn)
}




/////////////////MainSAGA
export function* userSagas() {
  yield all([call(onSignIn),call(onAutoSignIn)])
}