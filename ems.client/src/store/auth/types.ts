import * as GENERIC from "interfaces/generic.interface";
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTRATION_REQUEST,
    REGISTRATION_SUCCESS,
    REGISTRATION_FAILURE,
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAILURE,
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
  export interface RegistrationResponse{
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
  
  export interface RegistrationPayload{
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
  export interface RegistrationSuccessPayload{
    user: {
      id: number;
      fullName: string;
      emailId: string;
    };
  }
  export interface RegistrationFailurePayload{
    error: string;
  }
  
  
  export interface ChangePasswordPayload{
    values: {
      email: string,
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
  export interface ChangePasswordFailurePayload{
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
  
  export interface RegistrationRequest {
    type: typeof REGISTRATION_REQUEST,
    payload: RegistrationPayload;
  }
  export type RegistrationSuccess = {
    type: typeof REGISTRATION_SUCCESS,
    payload: RegistrationSuccessPayload;
  }
  export type RegistrationFailure = {
    type: typeof REGISTRATION_FAILURE,
    payload: RegistrationFailurePayload; 
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
    payload: ChangePasswordFailurePayload
  }

  export type AuthActions =
    | LoginRequest
    | LoginSuccess
    | LoginFailure
    | RegistrationRequest
    | RegistrationSuccess
    | RegistrationFailure
    | ChangePasswordRequest
    | ChangePasswordSuccess
    | ChangePasswordFailure
