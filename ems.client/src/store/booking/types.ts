import * as ACTION_TYPE from "./action.types";
import * as GENERIC from "interfaces/generic.interface";
import { IBooking, IBookingPagination } from "interfaces/booking.interface";

type typeModal = IBooking;
type typeModalPagination = IBookingPagination;

export interface UpdateStatusRequestPayload{
  data:{ id: number }
  callback: any;
}
export interface UpdateStatusSuccessPayload{
  isValid: boolean;
  message: string;  
  data?: any;
}

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
  payload: GENERIC.FailureResponse;
};

export type ConfirmRequest = {
  type: typeof ACTION_TYPE.CONFIRM_REQUEST;
  payload: UpdateStatusRequestPayload;
}
export type ConfirmSuccess = {
  type: typeof ACTION_TYPE.CONFIRM_SUCCESS;
  payload: UpdateStatusSuccessPayload;
};
export type ConfirmFailure = {
  type: typeof ACTION_TYPE.CONFIRM_FAILURE;
  payload: GENERIC.FailureResponse;
};

export type RejectRequest = {
  type: typeof ACTION_TYPE.REJECT_REQUEST;
  payload: UpdateStatusRequestPayload;
}
export type RejectSuccess = {
  type: typeof ACTION_TYPE.REJECT_SUCCESS;
  payload: UpdateStatusSuccessPayload;
};
export type RejectFailure = {
  type: typeof ACTION_TYPE.REJECT_FAILURE;
  payload: GENERIC.FailureResponse;
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
  payload: GENERIC.FailureResponse;
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
  payload: GENERIC.FailureResponse;
};

export type BookingActions =
  | ListRequest
  | ListSuccess
  | ListFailure
  | ConfirmRequest
  | ConfirmSuccess
  | ConfirmFailure
  | RejectRequest
  | RejectSuccess
  | RejectFailure
  | GetRequest
  | GetSuccess
  | GetFailure
  | DeleteRequest
  | DeleteSuccess
  | DeleteFailure;
