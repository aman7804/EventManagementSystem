import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTRATION_REQUEST,
    REGISTRATION_SUCCESS,
    REGISTRATION_FAILURE,
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAILURE
  } from "./action.types";
  
  import { AuthActions, AuthState } from "./types";
  
  const initialState: AuthState = {
    pending: false,
    token: "",
    error: null,
  };
  
  const reducers = (state = initialState, action: AuthActions) => {
    switch (action.type) {
      case LOGIN_REQUEST:
        return {
          ...state,
          pending: true,
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          pending: false,
          token: action.payload.token,
          user: action.payload.user,
          error: null,
        };
      case LOGIN_FAILURE:
        return {
          ...state,
          pending: false,
          token: "",
          error: action.payload.message,
        };    
      // Signup Logic is the same as Login logic but we do not store Token in State
      case REGISTRATION_REQUEST:
        return {
          ...state,
          pending: true,
        };
      case REGISTRATION_SUCCESS:
        return {
          ...state,
          pending: false,
          success: action.payload.message, 
          error: null
        };
      case REGISTRATION_FAILURE:
        return {
          ...state,
          pending: false,
          error: action.payload.message
        }

      case CHANGE_PASSWORD_REQUEST:
        return {
          ...state,
          pending: true
        };
      case CHANGE_PASSWORD_SUCCESS:
        return {
          ...state,
          pending: false,
          success: action.payload.message, 
          error: null
        } 
      case CHANGE_PASSWORD_FAILURE:
        return {
          ...state,
          pending: false,
          error: action.payload.message
        }
      default:
        return state;
    }
  };
  
  export default reducers;