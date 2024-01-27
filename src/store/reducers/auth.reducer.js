import { authTypes } from "../types";

const {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  CLEAR_ERROR,
} = authTypes;

const initialState = {
  isLoading: false,
  error: null,
  userId: null,
  email: null,
  phoneNumber: null,
  hasError: false,
};

const authReducer = (state = initialState, action) => {
  if (action.type === SIGN_UP_SUCCESS) {
    console.log("llega al reducer", action.userId);
  }
  switch (action.type) {
    case SIGN_UP_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        userId: action.userId,
        email: action.email,
        phoneNumber: action.phoneNumber,
        isLoading: false,
        error: null,
        hasError: false,
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        userId: null,
        isLoading: false,
        email: null,
        phoneNumber: null,
        error: action.error,
        hasError: true,
      };
    case SIGN_IN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        userId: action.userId,
        email: action.email,
        phoneNumber: action.phoneNumber,
        isLoading: false,
        error: null,
        hasError: false,
      };
    case SIGN_IN_FAILURE:
      return {
        ...state,
        userId: null,
        email: null,
        phoneNumber: null,
        isLoading: false,
        error: action.error,
        hasError: true,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
        hasError: false,
      };
    default:
      return state;
  }
};

export default authReducer;
