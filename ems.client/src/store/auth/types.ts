import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAILURE,
  } from "./action.types";
import * as GENERIC from "interfaces/generic.interface";
  
  
  export interface IAuth {
    token: string;
  }
  
  export interface AuthState {
    pending: boolean;
    token: string;
    error: string | null;
  }

  export interface LoginResponse {
    accessToken: string;
    data: {
      firstName: string;
      lastName: string;
      emailId: string;
      token: string;
      id: number;
    };
  }
  
  export interface LoginPayload {
    values: { 
      email: string; 
      password: string; 
    };
    callback: any;
  }
  export interface LoginSuccessPayload {
    token: string;
    user: {
      id: number;
      firstName: string;
      lastName: string;
      emailId: string;
      token: string;
    };
  }
  
  export interface SignupPayload{
    values:{
      firstName:string,
      lastName:string,
      address: string,
      mobileNo: string,
      emailId:string,
      password:string
    }
    callback: any
  }

  export interface ChangePasswordPayload{
    values: {
      emailId: string,
      oldPassword: string,
      newPassword: string
    };
    callback: any;
  }
  export interface ChangePasswordSuccessPayload {
    isValid: boolean;
    message: string;
    data?: any;
  }

  export interface LoginRequest {
    type: typeof LOGIN_REQUEST;
    payload: LoginPayload;
  }
  export type LoginSuccess = {
    type: typeof LOGIN_SUCCESS;
    payload: LoginSuccessPayload;
  };
  export type LoginFailure = {
    type: typeof LOGIN_FAILURE;
    payload: GENERIC.FailureResponse;
  };
  
  export interface SignupRequest {
    type: typeof SIGNUP_REQUEST,
    payload: SignupPayload;
  }
  export type SignupSuccess = {
    type: typeof SIGNUP_SUCCESS,
    payload: GENERIC.SaveSuccessResponse;
  }
  export type SignupFailure = {
    type: typeof SIGNUP_FAILURE,
    payload: GENERIC.FailureResponse; 
  }

  export type ChangePasswordRequest = {
    type: typeof  CHANGE_PASSWORD_REQUEST,
    payload: ChangePasswordPayload
  }
  export type ChangePasswordSuccess = {
    type: typeof CHANGE_PASSWORD_SUCCESS,
    payload: ChangePasswordSuccessPayload
  }
  export type ChangePasswordFailure = {
    type: typeof CHANGE_PASSWORD_FAILURE,
    payload: GENERIC.FailureResponse
  }

  export type AuthActions =
    | LoginRequest
    | LoginSuccess
    | LoginFailure
    | SignupRequest
    | SignupSuccess
    | SignupFailure
    | ChangePasswordRequest
    | ChangePasswordSuccess
    | ChangePasswordFailure
