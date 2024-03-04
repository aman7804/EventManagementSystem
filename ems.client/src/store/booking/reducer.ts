import { GenericState } from "interfaces/generic.interface";
import * as ACTION_TYPE from "./action.types";
import * as GENERIC from "interfaces/generic.interface";

import { BookingActions, UpdateStatusSuccessPayload } from "./types";
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
        error: (action.payload as GENERIC.FailureResponse).message,
      };
    case ACTION_TYPE.CONFIRM_REQUEST:
      return {
        ...state,
        pending: true
      }
    case ACTION_TYPE.CONFIRM_SUCCESS:
      return {
        ...state,
        pending: false,
        success: (action.payload as UpdateStatusSuccessPayload).message,
        error: null,
      }
    case ACTION_TYPE.CONFIRM_FAILURE:
      return {
        ...state,
        pending: false,
        error: (action.payload as GENERIC.FailureResponse).message,
      }
    case ACTION_TYPE.REJECT_REQUEST:
      return {
        ...state,
        pending: true
      }
    case ACTION_TYPE.REJECT_SUCCESS:
      return {
        ...state,
        pending: false,
        success: (action.payload as UpdateStatusSuccessPayload).message,
        error: null,
      }
    case ACTION_TYPE.REJECT_FAILURE:
      return {
        ...state,
        pending: false,
        error: (action.payload as GENERIC.FailureResponse).message,
      }
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
        error: (action.payload as GENERIC.FailureResponse).message,
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
        error: (action.payload as GENERIC.FailureResponse).message,
      };
    default:
      return state;
  }
};

export default reducers;
