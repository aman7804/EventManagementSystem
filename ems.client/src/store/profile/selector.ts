import { createSelector } from "reselect";
import { get } from "lodash";
import { RootState } from "store/root/root.reducer";

const getState = (state: RootState) => state;

export const getProfileSelector =
  createSelector( getState, (state) => get(state, "profile.user") )

export const getPendingSelector =
createSelector(getState, (state) => get(state, "profile.pending"));

