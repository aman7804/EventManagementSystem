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
  dropDownListSuccess,
  dropDownListFailure,
} from "./actions";
import * as ACTION_TYPE from "./action.types";
import service from "services/photography.service";
import { IPhotography, IPhotographyPagination } from "interfaces/photography.interface";
import { IApiSuccessResponse } from "interfaces/generic.interface";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* listSaga(action: any) {
  try {
    const response: IApiSuccessResponse<IPhotographyPagination> = yield call(
      service.getList, action.payload.data    
      );
      yield put(
      listSuccess({
        data: response.data,
      })
    );
    action.payload.callback({
      data: response.data
    });
  } catch (e: any) {
    yield put(
      listFailure({
        message: e.message
      })
    );
  }
}

function* saveSaga(action: any) {
  try {
    const response: IApiSuccessResponse<IPhotography> = yield call(
      service.save, action.payload.data
    );
      yield put(
        saveSuccess(response)
    );
    action.payload.callback(response);
  } catch (e: any) {
    yield put(
      saveFailure({
        message: e.message
      })
    );
  }
}

function* getByIdSaga(action: any) {
  try {
    const response: IApiSuccessResponse<IPhotography> = yield call(
      service.getById,action.payload.data
    );
    yield put(
      getByIdSuccess(response)
    );
    action.payload.callback(response);
  } catch (e: any) {
    yield put(
      getByIdFailure({
        message: e.message
      })
    );
  }
}

function* deleteSaga(action: any) {
  try {
    const response: IApiSuccessResponse<IPhotography> = yield call(
      service.deleteById,action.payload.data
    );

    yield put(
      deleteSuccess(response)
    );
    action.payload.callback(response);
  } catch (e: any) {
    yield put(
      deleteFailure({
        message: e.message
      })
    );
  }
}

function* getDropDownListSaga(action: any) {
  try {
    const response: IApiSuccessResponse<any> = yield call( service.getDropDownList );

    yield put(
      dropDownListSuccess(response)
    );
    action.payload.callback(response);
  } catch (e: any) {
    yield put(
      dropDownListFailure({
        message: e.message
      })
    );
  }
}

function* photographySaga() {
  yield all([
    takeLatest(ACTION_TYPE.LIST_REQUEST, listSaga),
    takeLatest(ACTION_TYPE.SAVE_REQUEST, saveSaga),
    takeLatest(ACTION_TYPE.GET_REQUEST, getByIdSaga),
    takeLatest(ACTION_TYPE.DELETE_REQUEST, deleteSaga),
    takeLatest(ACTION_TYPE.DROP_DOWN_LIST_REQUEST, getDropDownListSaga),
  ]);
}

export default photographySaga;
