import { GetDropDownListPayload } from "interfaces/city.interface";
import * as ACTION_TYPE from "./action.types";
import * as TYPES from "./types";
import * as GENERIC from "interfaces/generic.interface";

export const dropDownListRequest = (
  payload: GetDropDownListPayload
): TYPES.DropDownListRequest => ({
  type: ACTION_TYPE.DROP_DOWN_LIST_REQUEST,
  payload,
});

export const dropDownListSuccess = (
  payload: GENERIC.GetSuccessResponse<GENERIC.IKeyValuePair[]>
): TYPES.DropDownListSuccess => ({
  type: ACTION_TYPE.DROP_DOWN_LIST_SUCCESS,
  payload,
});

export const dropDownListFailure = (
  payload: GENERIC.FailureResponse
): TYPES.DropDownListFailure => ({
  type: ACTION_TYPE.DROP_DOWN_LIST_FAILURE,
  payload,
});
