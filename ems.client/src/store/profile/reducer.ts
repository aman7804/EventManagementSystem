import * as ACTION_TYPE from "./action.types";

import { ProfileActions } from "./types";
import { ProfileState } from "interfaces/profile.interface";

const initialState: ProfileState= {
  user: null
};

const reducers = (state = initialState, action: ProfileActions): unknown => {
  switch (action.type) {
    case ACTION_TYPE.GET_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case ACTION_TYPE.GET_SUCCESS:
      return {
        ...state,
        pending: false,
        user: action.payload.data,
        error: null,
      };
    case ACTION_TYPE.GET_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.message,
      };
    case ACTION_TYPE.UPDATE_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case ACTION_TYPE.UPDATE_SUCCESS:
      return {
        ...state,
        pending: false,
        success: action.payload.message,
        error: null,
      };
    case ACTION_TYPE.UPDATE_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.message,
      };
    default:
      return state;
  }
};

export default reducers;
