import { createSelector } from "reselect";
import { get } from "lodash";
import { RootState } from "store/root/root.reducer";

const getState = (state: RootState) => state;

export const getVenueListSelector =
  createSelector( getState, (state) => get(state, "city.list"));


