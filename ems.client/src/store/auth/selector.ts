import { createSelector } from "reselect";
import { get } from "lodash";

import { RootState } from "store/root/root.reducer";

const getState = (state: RootState) => state;

export const getAuthSelector =
    createSelector(getState, (state) => get(state, "auth.token"));

export const getPendingSelector =
    createSelector(getState, (state) => get(state, "auth.pending", false),);

export const getErrorSelector =
    createSelector(getState, (state) => get(state, "auth.error"));

export const getUserSelector =
    createSelector(getState, (state) => get(state, "auth.user"));

export const getUserEmailSelector =
    createSelector(getState, (state) => get(state, "auth.user.emailId"));

export const checkIsAuthenticated =
    createSelector(getState, (state) => !!get(state, "auth.token"));