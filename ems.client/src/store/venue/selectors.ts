import { createSelector } from "reselect";
import { get } from "lodash";

import { RootState } from "store/root/root.reducer";

const getVenueList = (state: RootState) =>
  get(state, "venue.list");

export const getVenueListSelector = createSelector(
  getVenueList,
  (list) => list
);

const getCurrentVenue = (state: RootState) => 
  get(state, "venue.current");

export const getCurrentVenueSelector = createSelector(
  getCurrentVenue,
  (current) => current
)

