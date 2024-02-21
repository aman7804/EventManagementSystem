import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  getFailure,
  getSuccess,
  updateFailure,
  updateSuccess,
} from "./actions";
import * as ACTION_TYPE from "./action.types";
import service from "services/profile.service";
import { IApiSuccessResponse } from "interfaces/generic.interface";
import { IProfile } from "interfaces/profile.interface";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* updateSaga(action: any) {
  try {
    const response: IApiSuccessResponse<IProfile> = yield call(
      service.updateProfile, action.payload.data     
      );
    yield put(
      updateSuccess(response)
    );
    action.payload.callback(response);
  } catch (e: any) {
    yield put(
      updateFailure({
        message: e.response?.data?.split("\n")[0] || e.message
      })
    );
  }
}

function* getSaga(action: any) {
  try {
    const response: IApiSuccessResponse<IProfile> = yield call( service.getProfile );
    yield put(
      getSuccess(response)
    );
  } catch (e: any) {
    yield put(
      getFailure({
        message: e.response?.data?.split("\n")[0] || e.message
      })
    );
  }
}

function* profileSaga() {
  yield all([
    takeLatest(ACTION_TYPE.UPDATE_REQUEST, updateSaga),
    takeLatest(ACTION_TYPE.GET_REQUEST, getSaga)
  ]);
}

export default profileSaga;
