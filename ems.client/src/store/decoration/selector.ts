import { createSelector } from "reselect";
import { get } from "lodash";

import { RootState } from "store/root/root.reducer";

const getState = (state: RootState) => state;

export const getDecorationListSelector =
  createSelector( getState, (state) => get(state, "decoration.list"));

export const getCurrentDecorationSelector =
  createSelector( getState, (state) => get(state, "decoration.current"));

export const getDropDownSelector = 
  createSelector(getState, (state) => get(state, "decoration.dropDownList") )