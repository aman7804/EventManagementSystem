import { JWTToken } from "../../interfaces/jwtToken.interface";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { LoginResponse } from "store/auth/types";

export const setCookie = (name: string, value?: string) => {
  if(value) Cookies.set(name, value);
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


export const setLoginDetails = async (loginDetails?: LoginResponse) => {
    setCookie("auth_token", loginDetails?.accessToken);
};

export const showLoader = (): void => {
  const loaderDiv = document.getElementById("loaderForAPICall");
  const wrapper = document.getElementById("wrapper");
  
  
  if (loaderDiv && wrapper) {
    loaderDiv.classList.add("loaderShow");
    loaderDiv.classList.remove("loaderHide");
    
    wrapper.classList.add("reduced-opacity-wrapper")
    wrapper.classList.remove("wrapper")
    
  }
};

export const hideLoader = (): void => {
  const loaderDiv = document.getElementById("loaderForAPICall");
  const wrapper = document.getElementById("wrapper");
  if (loaderDiv && wrapper) {
    loaderDiv.classList.remove("loaderShow");
    loaderDiv.classList.add("loaderHide");
    
    wrapper.classList.add("wrapper")
    wrapper.classList.remove("reduced-opacity-wrapper")
  }
};