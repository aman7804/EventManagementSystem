import { createSelector } from "reselect";
import { get } from "lodash";

import { RootState } from "store/root/root.reducer";

const getState = (state: RootState) => state;

export const getPackageListSelector =
  createSelector( getState, (state) => get(state, "package.list") );

export const getCurrentPackageSelector =
  createSelector( getState, (state) => get(state, "package.current") )

