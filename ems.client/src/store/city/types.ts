import * as ACTION_TYPE from "./action.types";
import * as GENERIC from "interfaces/generic.interface";
import {GetDropDownListPayload} from "interfaces/city.interface"

export type DropDownListRequest = {
  type: typeof ACTION_TYPE.DROP_DOWN_LIST_REQUEST;
  payload: GetDropDownListPayload
};

export type DropDownListSuccess = {
  type: typeof ACTION_TYPE.DROP_DOWN_LIST_SUCCESS;
  payload: GENERIC.GetSuccessResponse<GENERIC.IKeyValuePair[]>;
};

export type DropDownListFailure = {
  type: typeof ACTION_TYPE.DROP_DOWN_LIST_FAILURE;
  payload: GENERIC.FailureResponse;
};

export type CityActions =
  | DropDownListRequest
  | DropDownListSuccess
  | DropDownListFailure
