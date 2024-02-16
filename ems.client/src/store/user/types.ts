import { IUser, IUserPagination } from "interfaces/user.interface";
import * as ACTION_TYPE from "./action.types";
import * as GENERIC from "interfaces/generic.interface";

type typeModal = IUser;
type typeModalPagination = IUserPagination;

export type ListRequest = {
  type: typeof ACTION_TYPE.LIST_REQUEST;
  payload: GENERIC.ListRequestPayload<typeModalPagination>;
};

export type ListSuccess = {
  type: typeof ACTION_TYPE.LIST_SUCCESS;
  payload: GENERIC.ListSuccessResponse<typeModalPagination>;
};

export type ListFailure = {
  type: typeof ACTION_TYPE.LIST_FAILURE;
  payload: GENERIC.ListFailureResponse;
};

export type SaveRequest = {
  type: typeof ACTION_TYPE.SAVE_REQUEST;
  payload: GENERIC.SaveRequestPayload<typeModal>;
}

export type SaveSuccess = {
  type: typeof ACTION_TYPE.SAVE_SUCCESS;
  payload: GENERIC.SaveSuccessResponse;
};

export type SaveFailure = {
  type: typeof ACTION_TYPE.SAVE_FAILURE;
  payload: GENERIC.SaveFailureResponse;
};

export type GetRequest = {
  type: typeof ACTION_TYPE.GET_REQUEST;
  payload: GENERIC.GetRequestPayload;
}

export type GetSuccess = {
  type: typeof ACTION_TYPE.GET_SUCCESS;
  payload: GENERIC.GetSuccessResponse<typeModal>;
};

export type GetFailure = {
  type: typeof ACTION_TYPE.GET_FAILURE;
  payload: GENERIC.GetFailureResponse;
};

export type DeleteRequest = {
  type: typeof ACTION_TYPE.DELETE_REQUEST;
  payload: GENERIC.DeleteRequestPayload;
}

export type DeleteSuccess = {
  type: typeof ACTION_TYPE.DELETE_SUCCESS;
  payload: GENERIC.DeleteSuccessResponse;
};

export type DeleteFailure = {
  type: typeof ACTION_TYPE.DELETE_FAILURE;
  payload: GENERIC.DeleteFailureResponse;
};

export type UserActions =
  | ListRequest
  | ListSuccess
  | ListFailure
  | SaveRequest
  | SaveSuccess
  | SaveFailure
  | GetRequest
  | GetSuccess
  | GetFailure
  | DeleteRequest
  | DeleteSuccess
  | DeleteFailure;
