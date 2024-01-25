import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
  } from "./action.types";
  
  
  export interface IAuth {
    token: string;
  }
  
  export interface AuthState {
    pending: boolean;
    token: string;
    error: string | null;
  }
  
  export interface LoginPayload {
    values: { 
      email: string; 
      password: string; 
    };
    callback: any;
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
  
  export type AuthActions =
    | LoginRequest
    | LoginSuccess
    | LoginFailure