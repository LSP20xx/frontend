import { authTypes } from "../types";

const {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  VERIFICATION_TOKEN_REQUEST,
  VERIFICATION_TOKEN_SUCCESS,
  VERIFICATION_TOKEN_FAILURE,
  CLEAR_ERROR,
  CLEAR_STATE,
} = authTypes;

const initialState = {
  isLoading: false,
  error: null,
  userId: null,
  email: null,
  token: null,
  phoneNumber: null,
  hasError: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case VERIFICATION_TOKEN_REQUEST:
      return {
        ...state,
        isLoading: true,
        token: null,
      };
    case VERIFICATION_TOKEN_SUCCESS:
      return {
        ...state,
        token: action.token,
        email: action.email,
        phoneNumber: action.phoneNumber,
        isLoading: false,
        error: null,
        hasError: false,
      };
    case VERIFICATION_TOKEN_FAILURE:
      return {
        ...state,
        token: null,
        isLoading: false,
        error: action.error,
        hasError: true,
      };
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
    case CLEAR_STATE:
      return {
        ...state,
        userId: null,
        email: null,
        phoneNumber: null,
        token: null,
      };
    default:
      return state;
  }
};

export default authReducer;
