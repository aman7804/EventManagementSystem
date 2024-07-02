import { GenericState } from "interfaces/generic.interface";
import * as ACTION_TYPE from "./action.types";

import { CateringActions } from "./types";
import { ICatering } from "interfaces/catering.interface";

const initialState: GenericState<ICatering> = {
  pending: false,
  list: [],
  message: null,
  current: null,
};

const reducers = (state = initialState, action: CateringActions): unknown => {
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
        list: action.payload.data,
        error: null,
      };
    case ACTION_TYPE.LIST_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.message,
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
        success: action.payload.message,
        error: null,
      };
    case ACTION_TYPE.SAVE_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.message,
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
        current: action.payload.data,
        error: null,
      };
    case ACTION_TYPE.GET_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.message,
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
        error: action.payload.message,
      };
    case ACTION_TYPE.DROP_DOWN_LIST_REQUEST:
      return {
        ...state,
        pending: true
      };
    case ACTION_TYPE.DROP_DOWN_LIST_SUCCESS:
      return {
        ...state,
        pending: false,
        dropDownList: action.payload.data,
        error: null
      };
    case ACTION_TYPE.DROP_DOWN_LIST_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.message
      };
    default:
      return state;
  }
};

export default reducers;
