import { createSelector } from "reselect";
import { get } from "lodash";

import { RootState } from "store/root/root.reducer";


const getState = (state: RootState) => state;

export const getBookingListSelector =
  createSelector( getState, (state) => get(state, "booking.list") );

export const getCurrentBookingSelector =
  createSelector( getState, (state) => get(state, "booking.current") )

