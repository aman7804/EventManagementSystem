// eslint-disable import/no-cycle 
import {
  ILogin,
  ILoginResponse,
  IRegistration,
  IRegistrationResponse,
} from "../interfaces/auth.interface";
import { IApiSuccessResponse } from "../interfaces/generic.interface";
import baseService from "./base.service";
import { AxiosResponse } from "axios";
import { clearCookie } from "utils/helper";

const baseLoginUrl = "/api/Auth";

const login = async (
  requestBody: ILogin,
): Promise<AxiosResponse<IApiSuccessResponse<ILoginResponse>>> =>
  baseService.post<IApiSuccessResponse<ILoginResponse>>(
    `${baseLoginUrl}/login`,
    requestBody,
  );

const registration = async(
  requestBody: IRegistration,
): Promise<AxiosResponse<IApiSuccessResponse<IRegistrationResponse>>> =>
  baseService.post<IApiSuccessResponse<IRegistrationResponse>>(
    `${baseLoginUrl}/signup`, requestBody
  );


const signOut = (): void => {
  localStorage.clear();
  sessionStorage.clear();
  clearCookie("auth_token");
  clearCookie("remember_me");
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  login,  
  registration,
  signOut,
};