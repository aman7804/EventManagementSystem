import { all, call, put, takeEvery } from "redux-saga/effects";

import {
  loginFailure,
  loginSuccess,
  signupFailure,
  signupSuccess,
} from "./actions";

import {
  LOGIN_REQUEST, SIGNUP_REQUEST,
} from "./action.types";
import authService from "services/auth.service";
import {
  LoginResponse, SignupResponse,
} from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* loginSaga(action: any) {
  try {
    const response: LoginResponse = yield call(authService.login, {
      emailId: action.payload.values.email,
      password: action.payload.values.password,
    });    
    const successPayload = {
      ...response.data,
      rememberMe: true //action.payload.values.rememberMe,
    };

    yield put(
      loginSuccess({
        token: response.data.token,
        user: successPayload,
      }),
    );
    action.payload.callback({
      token: response.data.token,
      user: successPayload,
    });
  } catch (e: any) {
    yield put(
      loginFailure({
        error: e.message,
      }),
    );
  }
}

function* signupSaga(action: any){
  try{
    const response: SignupResponse = yield call(authService.signup,{
      firstName: action.payload.values.firstName,
      lastName: action.payload.values.lastName,
      emailId: action.payload.values.emailId,
      password: action.payload.values.password
    })
    yield put(
      signupSuccess({
        user: response.data
      })
    );
  }
  catch(e: any){
    console.log(e.response.data)
    yield put(
      signupFailure({
        error: e.response.data.split("\n")[0]
      })
    )
  }
}


function* authSaga() {
  yield all([
    takeEvery(LOGIN_REQUEST, loginSaga),
    takeEvery(SIGNUP_REQUEST, signupSaga)
  ]);
}

export default authSaga;