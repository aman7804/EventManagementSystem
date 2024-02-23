import { createSelector } from "reselect";
import { get } from "lodash";
import { RootState } from "store/root/root.reducer";

const getState = (state: RootState) => state;

export const loaderStateSelector =
  createSelector( getState, (state) => get(state, "loader.togglerLoader"));