import { all, fork } from "redux-saga/effects";

import authSaga from "../auth/saga";
import citySaga from "../city/saga";
import venueSaga from "store/venue/saga";
import photographySaga from "store/photography/saga";
import decorationSaga from "store/decoration/saga";
import cateringSaga from "store/catering/saga";
import userSaga from "store/user/saga";
import profileSaga from "store/profile/saga";
import packageSaga from "store/package/saga";
import bookingSaga from "store/booking/saga";

export function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(venueSaga),
    fork(citySaga),
    fork(photographySaga),
    fork(decorationSaga),
    fork(cateringSaga),
    fork(userSaga),
    fork(profileSaga),
    fork(packageSaga),
    fork(bookingSaga)
  ]);
}