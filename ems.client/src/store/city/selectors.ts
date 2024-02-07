import { createSelector } from "reselect";
import { get } from "lodash";

import { RootState } from "store/root/root.reducer";

const getDropDownList = (state: RootState) =>
  get(state, "city.list");

export const getVenueListSelector = createSelector(
  getDropDownList,
  (list) => list
);


