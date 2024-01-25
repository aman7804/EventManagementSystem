import {
    LoginPayload,
  } from "store/auth/types";
  
  export interface ILogin {
    emailId: string;
    password: string;
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
  
  export interface ILoginContainerState {
    rememberMe: boolean;
  }
  
  export interface ILoginContainerDispatch {
    loginRequest: (payload: LoginPayload) => {};
  }