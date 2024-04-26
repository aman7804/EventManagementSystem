import { IBooking, IBookingPagination, IBookingReportRequestPayload } from "interfaces/booking.interface";
import * as ACTION_TYPE from "./action.types";
import * as TYPES from "./types";
import * as GENERIC from "interfaces/generic.interface";


type typeModal = IBooking;
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

export const saveRequest = (
  payload: GENERIC.SaveRequestPayload<typeModal>
): TYPES.SaveRequest => ({
  type: ACTION_TYPE.SAVE_REQUEST,
  payload,
});

export const saveSuccess = (
  payload: GENERIC.SaveSuccessResponse
): TYPES.SaveSuccess => ({
  type: ACTION_TYPE.SAVE_SUCCESS,
  payload,
});

export const saveFailure = (
  payload: GENERIC.FailureResponse
): TYPES.SaveFailure => ({
  type: ACTION_TYPE.SAVE_FAILURE,
  payload,
});

export const getByIdRequest = (
  payload: GENERIC.GetRequestPayload
): TYPES.GetRequest => ({
  type: ACTION_TYPE.GET_REQUEST,
  payload,
});

export const getByIdSuccess = (
  payload: GENERIC.GetSuccessResponse<typeModal>
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