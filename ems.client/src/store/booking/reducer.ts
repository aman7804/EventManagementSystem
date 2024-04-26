import { GenericState } from "interfaces/generic.interface";
import * as ACTION_TYPE from "./action.types";

import { BookingActions } from "./types";
import { IBooking } from "interfaces/booking.interface";

const initialState: GenericState<IBooking> = {
  pending: false,
  list: [],
  message: null,
  current: null,
};

const reducers = (state = initialState, action: BookingActions): unknown => {
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
    /* Report */
    case ACTION_TYPE.GET_REPORT_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case ACTION_TYPE.GET_REPORT_SUCCESS:
      return {
        ...state,
        pending: false,
        report: action.payload.data,
        error: null,
      };
    case ACTION_TYPE.GET_REPORT_FAILURE:
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
