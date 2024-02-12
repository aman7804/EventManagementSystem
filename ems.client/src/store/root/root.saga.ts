import { all, fork } from "redux-saga/effects";

import authSaga from "../auth/saga";
import citySaga from "../city/saga";
import venueSaga from "store/venue/saga";
import photographySaga from "store/photography/saga";
import decorationSaga from "store/decoration/saga";
import cateringSaga from "store/catering/saga";

export function* rootSaga() {
  yield all([fork(authSaga)]);
  yield all([fork(venueSaga)]);
  yield all([fork(citySaga)]);
  yield all([fork(photographySaga)]);
  yield all([fork(decorationSaga)]);
  yield all([fork(cateringSaga)]);
}