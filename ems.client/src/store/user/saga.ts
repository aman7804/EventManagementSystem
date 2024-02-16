import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  saveFailure,
  saveSuccess,
  deleteFailure,
  deleteSuccess,
  getByIdFailure,
  getByIdSuccess,
  listFailure,
  listSuccess,
} from "./actions";
import * as ACTION_TYPE from "./action.types";
import service from "services/user.service";
import { IUser, IUserPagination } from "interfaces/user.interface";
import { IApiSuccessResponse } from "interfaces/generic.interface";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* listSaga(action: any) {
  try {
    const response: IApiSuccessResponse<IUserPagination> = yield call(
      service.getList, action.payload.data    
      );
      yield put(
      listSuccess({
        data: response.data,
      })
    );
    console.log("saga:", response.data)
    action.payload.callback({
      data: response.data
    });
  } catch (e: any) {
    console.log(e)
    yield put(
      listFailure({
        message: e.response?.data?.split("\n")[0] || e.message
      })
    );
  }
}

function* saveSaga(action: any) {
  try {
    const response: IApiSuccessResponse<IUser> = yield call(
      service.save, action.payload.data
    );
      yield put(
        saveSuccess(response)
    );
    action.payload.callback(response);
  } catch (e: any) {
    console.log(e)
    console.log(e.response?.data || e.message)
    yield put(
      saveFailure({
        message: e.response?.data?.split("\n")[0] || e.message
      })
    );
  }
}

function* getByIdSaga(action: any) {
  try {
    const response: IApiSuccessResponse<IUser> = yield call(
      service.getById,action.payload.data
    );
    yield put(
      getByIdSuccess(response)
    );
    action.payload.callback(response);
  } catch (e: any) {
    yield put(
      getByIdFailure({
        message: e.response?.data?.split("\n")[0] || e.message
      })
    );
  }
}

function* deleteSaga(action: any) {
  try {
    const response: IApiSuccessResponse<IUser> = yield call(
      service.deleteById,action.payload.data
    );

    yield put(
      deleteSuccess(response)
    );
    action.payload.callback(response);
  } catch (e: any) {
    yield put(
      deleteFailure({
        message: e.response?.data?.split("\n")[0] || e.message
      })
    );
  }
}

function* userSaga() {
  yield all([takeLatest(ACTION_TYPE.LIST_REQUEST, listSaga)]);
  yield all([takeLatest(ACTION_TYPE.SAVE_REQUEST, saveSaga)]);
  yield all([takeLatest(ACTION_TYPE.GET_REQUEST, getByIdSaga)]);
  yield all([takeLatest(ACTION_TYPE.DELETE_REQUEST, deleteSaga)]);
}

export default userSaga;