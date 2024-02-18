import { all, call, put, takeEvery } from "redux-saga/effects";

import {
  changePasswordFailure,
  changePasswordSuccess,
  loginFailure,
  loginSuccess,
  registrationFailure,
  registrationSuccess,
} from "./actions";

import {
  CHANGE_PASSWORD_REQUEST,
  LOGIN_REQUEST, REGISTRATION_REQUEST,
} from "./action.types";
import authService from "services/auth.service";
import {
  LoginResponse, RegistrationResponse,
} from "./types";
import { IApiSuccessResponse } from "interfaces/generic.interface";

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
      mobileNo: action.payload.values.mobileNo,
      emailId: action.payload.values.emailId,
      password: action.payload.values.password
    })
    yield put(
      registrationSuccess({
        user: response.data
      })
    );
    action.payload.callback(response.data)
  }
  catch(e: any){
    yield put(
      registrationFailure({
        error: e.response.data.split("\n")[0]
      })
    )
  }
}

function* changePasswordSaga(action: any){
  try{
    const response: IApiSuccessResponse<null> = yield call(authService.changePassword,{
      emailId: action.payload.values.emailId,
      currentPassword: action.payload.values.currentPassword,
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
        error: e.response.data.split("\n")[0] || e.message
      })
    )
  }
}


function* authSaga() {
  yield all([
    takeEvery(LOGIN_REQUEST, loginSaga),
    takeEvery(REGISTRATION_REQUEST, registrationSaga),
    takeEvery(CHANGE_PASSWORD_REQUEST, changePasswordSaga)
  ]);
}

export default authSaga;