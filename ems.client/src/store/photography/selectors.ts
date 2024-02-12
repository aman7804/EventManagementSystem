import { createSelector } from "reselect";
import { get } from "lodash";

import { RootState } from "store/root/root.reducer";

const getPhotographyList = (state: RootState) =>
  get(state, "photography.list");

export const getPhotographyListSelector = createSelector(
  getPhotographyList,
  (list) => list
);

const getCurrentPhotography = (state: RootState) => 
  get(state, "photography.current");

export const getCurrentPhotographySelector = createSelector(
  getCurrentPhotography,
  (current) => current
)

