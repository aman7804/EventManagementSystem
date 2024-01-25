import { JWTToken } from "../../interfaces/jwtToken.interface";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { LoginSuccessPayload } from "store/auth/types";

export const setCookie = (name: string, value: string) => {
  Cookies.set(name, value);
};

export const setCookieWithExpiry = (name: string, value: string) => {
  Cookies.set(name, value, { expires: 7 });
};

export const getCookie = (name: string) => {
  const cookie = Cookies.get(name);
  if (cookie) {
    return cookie;
  }

  return "";
};

export const clearCookie = (name: string) => {
  Cookies.remove(name);
};

export const getDecodedToken = (token: string): JWTToken => {
  try {
    const decodedValue = jwtDecode(token);

    return new JWTToken(decodedValue as JWTToken);
  } catch {
    return new JWTToken();
  }
};

export const isTokenExpired = (token: string): boolean => {
  const expireTime = getDecodedToken(token).exp;
  const currentTime = new Date().getTime() / 1000;
  if (expireTime) {
    return currentTime > expireTime;
  }

  return false;
};


export const setLoginDetails = async (loginDetails: LoginSuccessPayload) => {
    setCookie("auth_token", loginDetails.token);
};

export const showLoader = (): void => {
  const loaderDiv = document.getElementById("loaderForAPICall");

  if (loaderDiv) {
    loaderDiv.classList.add("loaderShow");
    loaderDiv.classList.remove("loaderHide");
  }
};

export const hideLoader = (): void => {
  const loaderDiv = document.getElementById("loaderForAPICall");
  if (loaderDiv) {
    loaderDiv.classList.remove("loaderShow");
    loaderDiv.classList.add("loaderHide");
  }
};