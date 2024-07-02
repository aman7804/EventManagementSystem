import { createSelector } from "reselect";
import { get } from "lodash";

import { RootState } from "store/root/root.reducer";

const getState = (state: RootState) => state;

export const getPhotographyListSelector =
  createSelector( getState, (state) => get(state, "photography.list") );

export const getCurrentPhotographySelector =
  createSelector( getState, (state) => get(state, "photography.current") )

export const getDropDownSelector = 
  createSelector(getState, (state) => get(state, "photography.dropDownList") )