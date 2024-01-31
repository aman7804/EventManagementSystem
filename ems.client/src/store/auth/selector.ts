import { createSelector } from "reselect";
import { get } from "lodash";

import { RootState } from "store/root/root.reducer";

const getPending = (state: RootState) => get(state, "auth.pending", false);

const getToken = (state: RootState) => get(state, "auth.token");

const getError = (state: RootState) => get(state, "auth.error");

const getUser = (state: RootState) => get(state, "auth.user");

export const getAuthSelector = createSelector(getToken, (token) => token);

export const getPendingSelector = createSelector( getPending, (pending) => pending,);

export const getErrorSelector = createSelector(getError, (error) => error);

export const getUserSelector = createSelector(getUser, (user) => user);

export const checkIsAuthenticated = createSelector(getToken, (token) => !!token);