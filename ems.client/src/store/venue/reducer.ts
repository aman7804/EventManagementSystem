import { GenericState } from "interfaces/generic.interface";
import * as ACTION_TYPE from "./action.types";

import { VenueActions } from "./types";
import { IVenue } from "interfaces/venue.interface";

const initialState: GenericState<IVenue> = {
  pending: false,
  list: [],
  message: null,
  current: null,
};

const reducers = (state = initialState, action: VenueActions): unknown => {
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
    default:
      return state;
  }
};

export default reducers;