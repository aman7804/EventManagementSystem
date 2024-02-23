import {
    LOGIN_REQUEST,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    REGISTRATION_REQUEST,
    REGISTRATION_SUCCESS,
    REGISTRATION_FAILURE,
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAILURE

  } from "./action.types";
  import * as TYPES from "./types";
  import * as GENERIC from "interfaces/generic.interface";
  export const loginRequest = (
    payload: TYPES.LoginPayload
  ): TYPES.LoginRequest => ({
    type: LOGIN_REQUEST,
    payload,
  });
  export const loginSuccess = (
    payload: TYPES.LoginSuccessPayload
  ): TYPES.LoginSuccess => ({
    type: LOGIN_SUCCESS,
    payload,
  });
  export const loginFailure = (
    payload: GENERIC.FailureResponse
  ): TYPES.LoginFailure => ({
    type: LOGIN_FAILURE,
    payload,
  });

  export const signupRequest = (
    payload: TYPES.SignupPayload
  ): TYPES.SignupRequest => ({
    type: REGISTRATION_REQUEST,
    payload
  })
  export const signupSuccess = (
    payload: GENERIC.SaveSuccessResponse
  ): TYPES.SignupSuccess => ({
    type: REGISTRATION_SUCCESS,
    payload
  })
  export const signupFailure = (
    payload: GENERIC.FailureResponse
  ): TYPES.SignupFailure => ({
    type: REGISTRATION_FAILURE,
    payload
  })

  export const changePasswordRequest = (
    payload: TYPES.ChangePasswordPayload
  ): TYPES.ChangePasswordRequest => ({
    type: CHANGE_PASSWORD_REQUEST,
    payload
  })
  export const changePasswordSuccess = (
    payload: TYPES.ChangePasswordSuccessPayload
  ): TYPES.ChangePasswordSuccess => ({
    type: CHANGE_PASSWORD_SUCCESS,
    payload
  })
  export const changePasswordFailure = (
    payload: GENERIC.FailureResponse
  ): TYPES.ChangePasswordFailure => ({
    type: CHANGE_PASSWORD_FAILURE,
    payload
  })