import { all, call, put, takeEvery } from "redux-saga/effects";

import {
  loginFailure,
  loginSuccess,
} from "./actions";

import {
  LOGIN_REQUEST,
} from "./action.types";
import loginService from "services/auth.service";
import {
  LoginResponse,
} from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* loginSaga(action: any) {
  try {
    const response: LoginResponse = yield call(loginService.login, {
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

function* authSaga() {
  yield all([takeEvery(LOGIN_REQUEST, loginSaga)]);  
}

export default authSaga;