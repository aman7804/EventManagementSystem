import {
    LoginPayload, RegistrationPayload,
  } from "store/auth/types";
  
  export interface ILogin {
    emailId: string;
    password: string;
  }
  export interface IRegistration{
    firstName:string,
    lastName:string,
    address: string,
    mobileNo: string,
    emailId:string,
    password:string
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
  export interface IRegistrationResponse{
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
  export interface IRegistrationContainerDispatch {
    registrationRequest: (payload: RegistrationPayload) => {};
  }