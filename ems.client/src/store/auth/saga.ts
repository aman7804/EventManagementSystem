import { all, call, put, takeEvery } from "redux-saga/effects";

import {
  loginFailure,
  loginSuccess,
  registrationFailure,
  registrationSuccess,
} from "./actions";

import {
  LOGIN_REQUEST, REGISTRATION_REQUEST,
} from "./action.types";
import authService from "services/auth.service";
import {
  LoginResponse, RegistrationResponse,
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

function* registrationSaga(action: any){
  try{
    const response: RegistrationResponse = yield call(authService.registration,{
      firstName: action.payload.values.firstName,
      lastName: action.payload.values.lastName,
      address: action.payload.values.address,
      cityId: action.payload.values.cityId,
      mobileNo: action.payload.values.mobileNo,
      emailId: action.payload.values.emailId,
      password: action.payload.values.password
    })
    console.log(response.data)
    yield put(
      registrationSuccess({
        user: response.data
      })
    );
  }
  catch(e: any){
    console.log(e.response.data)
    yield put(
      registrationFailure({
        error: e.response.data.split("\n")[0]
      })
    )
  }
}


function* authSaga() {
  yield all([
    takeEvery(LOGIN_REQUEST, loginSaga),
    takeEvery(REGISTRATION_REQUEST, registrationSaga)
  ]);
}

export default authSaga;