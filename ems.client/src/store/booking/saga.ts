import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  deleteFailure,
  deleteSuccess,
  getByIdFailure,
  getByIdSuccess,
  listFailure,
  listSuccess,
  confirmSuccess,
  confirmFailure,
  rejectSuccess,
  rejectFailure,
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

function* confirmSaga(action: any) {
  try {
    const response: IApiSuccessResponse<IBooking> = yield call(
      service.confirmBooking, action.payload.data
    );
      yield put(
        confirmSuccess(response)
    );
    action.payload.callback(response);
  } catch (e: any) {
    yield put(
      confirmFailure({
        message: e.message
      })
    );
  }
}

function* rejectSaga(action: any) {
  try {
    const response: IApiSuccessResponse<IBooking> = yield call(
      service.rejectBooking, action.payload.data
    );
      yield put(
        rejectSuccess(response)
    );
    action.payload.callback(response);
  } catch (e: any) {
    yield put(
      rejectFailure({
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

function* bookingSaga() {
  yield all([
    takeLatest(ACTION_TYPE.LIST_REQUEST, listSaga),
    takeLatest(ACTION_TYPE.GET_REQUEST, getByIdSaga),
    takeLatest(ACTION_TYPE.CONFIRM_REQUEST, confirmSaga),
    takeLatest(ACTION_TYPE.REJECT_REQUEST, rejectSaga),
    takeLatest(ACTION_TYPE.DELETE_REQUEST, deleteSaga)
  ]);
}

export default bookingSaga;
