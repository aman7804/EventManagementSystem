import { createSelector } from "reselect";
import { get } from "lodash";

import { RootState } from "store/root/root.reducer";
import { isTokenForAdmin } from "utils/helper";

const getState = (state: RootState) => state;

export const getAuthSelector =
    createSelector(getState, (state) => get(state, "auth.token"));

export const getPendingSelector =
    createSelector(getState, (state) => get(state, "auth.pending", false),);

export const getErrorSelector =
    createSelector(getState, (state) => get(state, "auth.error"));

export const getUserSelector =
    createSelector(getState, (state) => get(state, "auth.user.data"));

export const getUserEmailSelector =
    createSelector(getState, (state) => get(state, "auth.user.emailId"));

export const checkIsAuthenticated =
    createSelector(getState, (state) => !!get(state, "auth.token"));

export const checkIsAdmin = 
    createSelector(getState, (state) => isTokenForAdmin(get(state, "auth.token")));