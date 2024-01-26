import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
  } from "./action.types";
  
  
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
      fullName: string;
      emailId: string;
      token: string;
      id: number;
    };
  }
  export interface SignupResponse{
    data: {
      id: number;
      fullName: string;
      emailId: string;
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
      fullName: string;
      emailId: string;
      token: string;
    };
  }
  export interface LoginFailurePayload {
    error: string;
  }
  
  export interface SignupPayload{
    value:{
      firstName:string,
      lastName:string,
      emailId:string,
      password:string
    }
    callback: any
  }
  export interface SignupSuccessPayload{
    user: {
      id: number;
      fullName: string;
      emailId: string;
    };
  }
  export interface SignupFailurePayload{
    error: string;
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
    payload: LoginFailurePayload;
  };
  
  export interface SignupRequest {
    type: typeof SIGNUP_REQUEST,
    payload: SignupPayload;
  }
  export type SignupSuccess = {
    type: typeof SIGNUP_SUCCESS,
    payload: SignupSuccessPayload;
  }
  export type SignupFailure = {
    type: typeof SIGNUP_FAILURE,
    payload: SignupFailurePayload; 
  }

  export type AuthActions =
    | LoginRequest
    | LoginSuccess
    | LoginFailure
    | SignupRequest
    | SignupSuccess
    | SignupFailure
