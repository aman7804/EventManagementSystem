import * as ACTION_TYPE from "./action.types";
import * as GENERIC from "interfaces/generic.interface";
import { IProfile } from "interfaces/profile.interface";

type typeModal = IProfile;

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
export type UpdateRequest = {
  type: typeof ACTION_TYPE.UPDATE_REQUEST;
  payload: GENERIC.SaveRequestPayload<typeModal>;
}

export type UpdateSuccess = {
  type: typeof ACTION_TYPE.UPDATE_SUCCESS;
  payload: GENERIC.SaveSuccessResponse;
};

export type UpdateFailure = {
  type: typeof ACTION_TYPE.UPDATE_FAILURE;
  payload: GENERIC.SaveFailureResponse;
};


export type ProfileActions =
  | GetRequest
  | GetSuccess
  | GetFailure
  | UpdateRequest
  | UpdateSuccess
  | UpdateFailure;
