import { IProfile } from "interfaces/profile.interface";
import * as ACTION_TYPE from "./action.types";
import * as TYPES from "./types";
import * as GENERIC from "interfaces/generic.interface";


type typeModal = IProfile;

export const getRequest = () => ({
  type: ACTION_TYPE.GET_REQUEST
})

export const getSuccess = (
  payload: GENERIC.GetSuccessResponse<typeModal>
): TYPES.GetSuccess => ({
  type: ACTION_TYPE.GET_SUCCESS,
  payload
})

export const getFailure = (
  payload: GENERIC.GetFailureResponse
): TYPES.GetFailure => ({
  type: ACTION_TYPE.GET_FAILURE,
  payload
})

export const updateRequest = (
  payload: GENERIC.SaveRequestPayload<typeModal>
): TYPES.UpdateRequest => ({
  type: ACTION_TYPE.UPDATE_REQUEST,
  payload,
});

export const updateSuccess = (
  payload: GENERIC.SaveSuccessResponse
): TYPES.UpdateSuccess => ({
  type: ACTION_TYPE.UPDATE_SUCCESS,
  payload,
});

export const updateFailure = (
  payload: GENERIC.SaveFailureResponse
): TYPES.UpdateFailure => ({
  type: ACTION_TYPE.UPDATE_FAILURE,
  payload,
});