import { all, call, put, takeEvery } from "redux-saga/effects";

import {
  changePasswordFailure,
  changePasswordSuccess,
  loginFailure,
  loginSuccess,
  signupFailure,
  signupSuccess,
} from "./actions";

import {
  CHANGE_PASSWORD_REQUEST,
  LOGIN_REQUEST, SIGNUP_REQUEST,
} from "./action.types";
import authService from "services/auth.service";
import { LoginResponse } from "./types";
import { IApiSuccessResponse } from "interfaces/generic.interface";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* loginSaga(action: any) {
  try {
    const response: LoginResponse = yield call(
      authService.login, action.payload.values
    );
    yield put(
      loginSuccess({
        accessToken: response.data.token,
        data: response.data,
      }),
    );
    action.payload.callback({
      accessToken: response.data.token,
      data: response.data,
    });
  } catch (e: any) {
    yield put(
      loginFailure({
        message: e.response.data.split("\n")[0] || e.message
      }),
    );
  }
}

function* signupSaga(action: any){
  try{
    const response: IApiSuccessResponse<null> = yield call(authService.signup,{
      firstName: action.payload.values.firstName,
      lastName: action.payload.values.lastName,
      address: action.payload.values.address,
      mobileNo: action.payload.values.mobileNo,
      emailId: action.payload.values.emailId,
      password: action.payload.values.password
    })
    yield put(
      signupSuccess(response)
    );
    action.payload.callback(response)
  }
  catch(e: any){
    yield put(
      signupFailure({
        message: e.response.data.split("\n")[0] || e.message
      })
    )
  }
}

function* changePasswordSaga(action: any){
  try{
    const response: IApiSuccessResponse<null> = yield call(authService.changePassword,{
      emailId: action.payload.values.emailId,
      oldPassword: action.payload.values.oldPassword,
      newPassword: action.payload.values.newPassword,
    })
    yield put(
      changePasswordSuccess({...response})
    );
    action.payload.callback(response)
  }
  catch(e: any){
    yield put(
      changePasswordFailure({
        message: e.response.data.split("\n")[0] || e.message
      })
    )
  }
}


function* authSaga() {
  yield all([
    takeEvery(LOGIN_REQUEST, loginSaga),
    takeEvery(SIGNUP_REQUEST, signupSaga),
    takeEvery(CHANGE_PASSWORD_REQUEST, changePasswordSaga)
  ]);
}

export default authSaga;