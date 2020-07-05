import { takeLatest, put,all,call } from 'redux-saga/effects';
import { UserActionTypes } from './user.types';
import { emailSignInSuccsess } from './user-actions';
import axios from 'axios';
import { push } from 'react-router-redux';    

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
  }
  return result;
}

export function* onSignIn() {
  yield takeLatest(UserActionTypes.EMAIL_SING_IN_START, signIn)
}

export function* userSagas() {
  yield all([call(onSignIn)])
}