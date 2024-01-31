import {
    LOGIN_REQUEST,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    REGISTRATION_REQUEST,
    REGISTRATION_SUCCESS,
    REGISTRATION_FAILURE,
  } from "./action.types";
  
  import {
    LoginPayload,
    LoginRequest,
    LoginSuccess,
    LoginSuccessPayload,
    LoginFailure,
    LoginFailurePayload,
    RegistrationRequest,
    RegistrationPayload,
    RegistrationSuccessPayload,
    RegistrationSuccess,
    RegistrationFailurePayload,
    RegistrationFailure,
  } from "./types";
  
  export const loginRequest = (payload: LoginPayload): LoginRequest => ({
    type: LOGIN_REQUEST,
    payload,
  });
  export const loginSuccess = (payload: LoginSuccessPayload): LoginSuccess => ({
    type: LOGIN_SUCCESS,
    payload,
  });
  export const loginFailure = (payload: LoginFailurePayload): LoginFailure => ({
    type: LOGIN_FAILURE,
    payload,
  });

  export const registrationRequest = (payload: RegistrationPayload): RegistrationRequest => ({
    type: REGISTRATION_REQUEST,
    payload
  })
  export const registrationSuccess = (payload: RegistrationSuccessPayload): RegistrationSuccess => ({
    type: REGISTRATION_SUCCESS,
    payload
  })
  export const registrationFailure = (payload: RegistrationFailurePayload): RegistrationFailure => ({
    type: REGISTRATION_FAILURE,
    payload
  })