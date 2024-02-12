import { createSelector } from "reselect";
import { get } from "lodash";

import { RootState } from "store/root/root.reducer";

const getCateringList = (state: RootState) =>
  get(state, "catering.list");

export const getCateringListSelector = createSelector(
  getCateringList,
  (list) => list
);

const getCurrentCatering = (state: RootState) => 
  get(state, "catering.current");

export const getCurrentCateringSelector = createSelector(
  getCurrentCatering,
  (current) => current
)

