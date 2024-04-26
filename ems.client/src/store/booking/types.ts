import * as ACTION_TYPE from "./action.types";
import * as GENERIC from "interfaces/generic.interface";
import { IBooking, IBookingPagination, IBookingReport, IBookingReportRequestPayload } from "interfaces/booking.interface";

type typeModal = IBooking;
type typeModalPagination = IBookingPagination;

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

/* Reports */

export type GetReportRequest = {
  type: typeof ACTION_TYPE.GET_REPORT_REQUEST;
  payload: IBookingReportRequestPayload;
}

export type GetReportSuccess = {
  type: typeof ACTION_TYPE.GET_REPORT_SUCCESS;
  payload: GENERIC.GetSuccessResponse<IBookingReport>;
};

export type GetReportFailure = {
  type: typeof ACTION_TYPE.GET_REPORT_FAILURE;
  payload: GENERIC.FailureResponse;
};


export type BookingActions =
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
  | DeleteFailure
  | GetReportRequest
  | GetReportSuccess
  | GetReportFailure;
