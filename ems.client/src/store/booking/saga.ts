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
  getReportSuccess,
  getReportFailure,
} from "./actions";
import * as ACTION_TYPE from "./action.types";
import service from "services/booking.service";
import { IBooking, IBookingPagination } from "interfaces/booking.interface";
import { IApiSuccessResponse } from "interfaces/generic.interface";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* listSaga(action: any) {
  try {
    const response: IApiSuccessResponse<IBookingPagination> = yield call(
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
    const response: IApiSuccessResponse<IBooking> = yield call(
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
    const response: IApiSuccessResponse<IBooking> = yield call(
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
    const response: IApiSuccessResponse<IBooking> = yield call(
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

function* getReport(action: any) {
  try {
    debugger
    const response: IApiSuccessResponse<IBooking> = yield call(
      service.getReport, action.payload.enumBookingReportType
    );
    yield put(
      getReportSuccess(response)
    );
    action.payload.callback(response);
  } catch (e: any) {
    yield put(
      getReportFailure({
        message: e.message
      })
    );
  }
}

function* bookingSaga() {
  yield all([takeLatest(ACTION_TYPE.LIST_REQUEST, listSaga)]);
  yield all([takeLatest(ACTION_TYPE.SAVE_REQUEST, saveSaga)]);
  yield all([takeLatest(ACTION_TYPE.GET_REQUEST, getByIdSaga)]);
  yield all([takeLatest(ACTION_TYPE.DELETE_REQUEST, deleteSaga)]);
  yield all([takeLatest(ACTION_TYPE.GET_REPORT_REQUEST, getReport)]);
}

export default bookingSaga;
