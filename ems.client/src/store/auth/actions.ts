import {
    LOGIN_REQUEST,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
  } from "./action.types";
  
  import {
    LoginPayload,
    LoginRequest,
    LoginSuccess,
    LoginSuccessPayload,
    LoginFailure,
    LoginFailurePayload,
    SignupRequest,
    SignupPayload,
    SignupSuccessPayload,
    SignupSuccess,
    SignupFailurePayload,
    SignupFailure,
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

  export const signupRequest = (payload: SignupPayload): SignupRequest => ({
    type: SIGNUP_REQUEST,
    payload
  })
  export const signupSuccess = (payload: SignupSuccessPayload): SignupSuccess => ({
    type: SIGNUP_SUCCESS,
    payload
  })
  export const signupFailure = (payload: SignupFailurePayload): SignupFailure => ({
    type: SIGNUP_FAILURE,
    payload
  })