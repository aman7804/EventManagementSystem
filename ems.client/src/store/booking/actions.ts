import { IGetByIdBooking, IBookingPagination, IBookingReportRequestPayload } from "interfaces/booking.interface";
import * as ACTION_TYPE from "./action.types";
import * as TYPES from "./types";
import * as GENERIC from "interfaces/generic.interface";

type typeModalPagination = IBookingPagination;

export const listRequest = (
  payload: GENERIC.ListRequestPayload<typeModalPagination>
): TYPES.ListRequest => ({
  type: ACTION_TYPE.LIST_REQUEST,
  payload,
});
export const listSuccess = (
  payload: GENERIC.ListSuccessResponse<typeModalPagination>
): TYPES.ListSuccess => ({
  type: ACTION_TYPE.LIST_SUCCESS,
  payload,
});
export const listFailure = (
  payload: GENERIC.FailureResponse
): TYPES.ListFailure => ({
  type: ACTION_TYPE.LIST_FAILURE,
  payload,
});

export const confirmRequest = (
  payload: TYPES.UpdateStatusRequestPayload
): TYPES.ConfirmRequest => ({
  type: ACTION_TYPE.CONFIRM_REQUEST,
  payload,
});
export const confirmSuccess = (
  payload: TYPES.UpdateStatusSuccessPayload
): TYPES.ConfirmSuccess => ({
  type: ACTION_TYPE.CONFIRM_SUCCESS,
  payload,
});
export const confirmFailure = (
  payload: GENERIC.FailureResponse
): TYPES.ConfirmFailure => ({
  type: ACTION_TYPE.CONFIRM_FAILURE,
  payload,
});

export const rejectRequest = (
  payload: TYPES.UpdateStatusRequestPayload
): TYPES.RejectRequest => ({
  type: ACTION_TYPE.REJECT_REQUEST,
  payload,
});
export const rejectSuccess = (
  payload: TYPES.UpdateStatusSuccessPayload
): TYPES.RejectSuccess => ({
  type: ACTION_TYPE.REJECT_SUCCESS,
  payload,
});
export const rejectFailure = (
  payload: GENERIC.FailureResponse
): TYPES.RejectFailure => ({
  type: ACTION_TYPE.REJECT_FAILURE,
  payload,
});

export const getByIdRequest = (
  payload: GENERIC.GetRequestPayload
): TYPES.GetRequest => ({
  type: ACTION_TYPE.GET_REQUEST,
  payload,
});
export const getByIdSuccess = (
  payload: GENERIC.GetSuccessResponse<IGetByIdBooking>
): TYPES.GetSuccess => ({
  type: ACTION_TYPE.GET_SUCCESS,
  payload,
});
export const getByIdFailure = (
  payload: GENERIC.FailureResponse
): TYPES.GetFailure => ({
  type: ACTION_TYPE.GET_FAILURE,
  payload,
});

export const deleteRequest = (
  payload: GENERIC.DeleteRequestPayload
): TYPES.DeleteRequest => ({
  type: ACTION_TYPE.DELETE_REQUEST,
  payload,
});
export const deleteSuccess = (
  payload: GENERIC.DeleteSuccessResponse
): TYPES.DeleteSuccess => ({
  type: ACTION_TYPE.DELETE_SUCCESS,
  payload,
});
export const deleteFailure = (
  payload: GENERIC.FailureResponse
): TYPES.DeleteFailure => ({
  type: ACTION_TYPE.DELETE_FAILURE,
  payload,
});

/* Report */

export const getReportRequest = (
  payload: IBookingReportRequestPayload
): TYPES.GetReportRequest => ({
  type: ACTION_TYPE.GET_REPORT_REQUEST,
  payload,
});

export const getReportSuccess = (
  payload: GENERIC.GetSuccessResponse<typeModal>
): TYPES.GetSuccess => ({
  type: ACTION_TYPE.GET_SUCCESS,
  payload,
});

export const getReportFailure = (
  payload: GENERIC.FailureResponse
): TYPES.GetFailure => ({
  type: ACTION_TYPE.GET_FAILURE,
  payload,
});
