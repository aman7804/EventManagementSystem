import { createSelector } from "reselect";
import { get } from "lodash";

import { RootState } from "store/root/root.reducer";

const getDecorationList = (state: RootState) =>
  get(state, "decoration.list");

export const getDecorationListSelector = createSelector(
  getDecorationList,
  (list) => list
);

const getCurrentDecoration = (state: RootState) => 
  get(state, "decoration.current");

export const getCurrentDecorationSelector = createSelector(
  getCurrentDecoration,
  (current) => current
)

