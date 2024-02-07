import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  dropDownListFailure,
  dropDownListSuccess,
} from "./actions";
import * as ACTION_TYPE from "./action.types";
import * as GENERIC from "interfaces/generic.interface"
import service from "services/city.service";
import { IApiSuccessResponse } from "interfaces/generic.interface";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* listSaga(action: any) {
  try {
    const response: IApiSuccessResponse<GENERIC.GetSuccessResponse<GENERIC.IKeyValuePair[]>> = yield call(
      service.getDropDownList, action.payload.data
      );
      yield put(
      dropDownListSuccess({
        data: response.data?.data || null
      })
    );
    action.payload.callback({
      data: response.data
    });
  } catch (e: any) {
    console.log("saga error:",e)
    yield put(
      dropDownListFailure({
        message: e.response?.data?.split("\n")[0] || e.message
      })
    );
  }
}

function* citySaga() {
  yield all([takeLatest(ACTION_TYPE.DROP_DOWN_LIST_REQUEST, listSaga)]);
}

export default citySaga;
