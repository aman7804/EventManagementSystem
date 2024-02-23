// eslint-disable import/no-cycle 
import {
  ILogin,
  ILoginResponse,
  ISignup,
  IChangePassword
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

const signup = async(
  requestBody: ISignup,
): Promise<AxiosResponse<IApiSuccessResponse<null>>> =>
  baseService.post<IApiSuccessResponse<null>>(
    `${baseLoginUrl}/signup`, requestBody
  );

const changePassword = async( payload: IChangePassword) =>
  baseService.put(`${baseLoginUrl}/change-password`, payload);

const signOut = (): void => {
  localStorage.clear();
  sessionStorage.clear();
  clearCookie("auth_token");
  clearCookie("remember_me");
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  login,  
  signup,
  signOut,
  changePassword
};