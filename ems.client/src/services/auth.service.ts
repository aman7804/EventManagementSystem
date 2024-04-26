// eslint-disable import/no-cycle 
import {
  ILogin,
  ISignup,
  IChangePassword
} from "../interfaces/auth.interface";
import baseService from "./base.service";
import { clearCookie } from "utils/helper";

const baseLoginUrl = "/api/Auth";

const login = async ( requestBody: ILogin ) =>
  baseService.post(`${baseLoginUrl}/login`, requestBody );

const signup = async( requestBody: ISignup ) =>
  baseService.post(`${baseLoginUrl}/signup`, requestBody);

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