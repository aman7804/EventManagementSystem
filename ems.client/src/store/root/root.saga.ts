import { all, fork } from "redux-saga/effects";

import authSaga from "../auth/saga";
import citySaga from "../city/saga";
import venueSaga from "store/venue/saga";

export function* rootSaga() {
  yield all([fork(authSaga)]);
  yield all([fork(venueSaga)]);
  yield all([fork(citySaga)]);
}