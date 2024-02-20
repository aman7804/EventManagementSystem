import { createSelector } from "reselect";
import { get } from "lodash";

import { RootState } from "store/root/root.reducer";

const getState = (state: RootState) => state
  

export const getUserListSelector =
  createSelector( getState, (state) => get(state, "user.list"));
  
export const getCurrentUserSelector =
  createSelector( getState, (state) => get(state, "user.current") )

