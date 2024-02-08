import { GenericState } from "interfaces/generic.interface";
import * as ACTION_TYPE from "./action.types";

import { CityActions } from "./types";
import { ICity } from "interfaces/city.interface";

const initialState: GenericState<ICity> = {
  pending: false,
  list: [],
  message: null,
  current: null,
};

const reducers = (state = initialState, action: CityActions): unknown => {
  switch (action.type) {
    case ACTION_TYPE.DROP_DOWN_LIST_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case ACTION_TYPE.DROP_DOWN_LIST_SUCCESS:
      return {
        ...state,
        pending: false,
        list: action.payload.data,
        error: null,
      };
    case ACTION_TYPE.DROP_DOWN_LIST_FAILURE:
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
