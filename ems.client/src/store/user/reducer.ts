import { GenericState } from "interfaces/generic.interface";
import * as ACTION_TYPE from "./action.types";

import { UserActions } from "./types";
import { IUser } from "interfaces/user.interface";

const initialState: GenericState<IUser> = {
  pending: false,
  list: [],
  message: null,
  current: null,
};

const reducers = (state = initialState, action: UserActions): unknown => {
  switch (action.type) {
    case ACTION_TYPE.LIST_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case ACTION_TYPE.LIST_SUCCESS:
      return {
        ...state,
        pending: false,
        list: action.payload?.data,
        error: null,
      };
    case ACTION_TYPE.LIST_FAILURE:
      return {
    ...state,
    pending: false,
    error: action.payload?.message,
  };
  case ACTION_TYPE.SAVE_REQUEST:
    return {
      ...state,
      pending: true,
    };
    case ACTION_TYPE.SAVE_SUCCESS:
      return {
        ...state,
        pending: false,
        success: action.payload?.message,
        error: null,
      };
      case ACTION_TYPE.SAVE_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload?.message,
      };
    case ACTION_TYPE.GET_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case ACTION_TYPE.GET_SUCCESS:
      return {
        ...state,
        pending: false,
        current: action.payload?.data,
        error: null,
      };
    case ACTION_TYPE.GET_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload?.message,
      };
    case ACTION_TYPE.DELETE_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case ACTION_TYPE.DELETE_SUCCESS:
      return {
        ...state,
        pending: false,
        success: action.payload,
        error: null,
      };
    case ACTION_TYPE.DELETE_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload?.message,
      };
    case ACTION_TYPE.GET_PROFILE_REQUEST:
      return {
        ...state,
        pending: true,
      }
    case ACTION_TYPE.GET_PROFILE_SUCCESS:
      return {
        ...state,
        pending: false,
        profile: action.payload?.data,
        error: null
      }
    case ACTION_TYPE.GET_PROFILE_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload?.message
      }
    case ACTION_TYPE.UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case ACTION_TYPE.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        pending: false,
        success: action.payload?.message,
        error: null,
      };
    case ACTION_TYPE.UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload?.message,
      };
    default:
      return state;
  }
};

export default reducers;
