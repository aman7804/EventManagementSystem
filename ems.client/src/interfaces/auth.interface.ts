import {
    LoginPayload, SignupPayload,
  } from "store/auth/types";
  
  export interface ILogin {
    emailId: string;
    password: string;
  }
  export interface ISignup{
    firstName: string,
    lastName: string,
    emailId: string,
    password: string
  }
  
  export interface ILoginResponse {
    firstName: string;
    lastName: string;
    emailAddress: string;
    roleId: number;
    token: string;
    roleName: string;
    id: number;
  }
  export interface ISignupResponse{
    id: number,
    fullName: string,
    emailId: string,
  }
  
  export interface ILoginContainerState {
    rememberMe: boolean;
  }
  
  export interface ILoginContainerDispatch {
    loginRequest: (payload: LoginPayload) => {};
  }
  export interface ISignupContainerDispatch {
    signupRequest: (payload: SignupPayload) => {};
  }