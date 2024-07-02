import { createSelector } from "reselect";
import { get } from "lodash";

import { RootState } from "store/root/root.reducer";


const getState = (state: RootState) => state;

export const getCateringListSelector =
  createSelector( getState, (state) => get(state, "catering.list") );

export const getCurrentCateringSelector =
  createSelector( getState, (state) => get(state, "catering.current") )

export const getDropDownSelector = 
  createSelector(getState, (state) => get(state, "catering.dropDownList") )

