import { authTypes } from '../types';

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
  VERIFY_SMS_CODE,
  VERIFY_SMS_CODE_SUCCESS,
  VERIFY_SMS_CODE_ON_WITHDRAW_SUCCESS,
  VERIFY_SMS_CODE_FAILURE,
  VERIFY_EMAIL_CODE,
  VERIFY_EMAIL_CODE_SUCCESS,
  VERIFY_EMAIL_CODE_FAILURE,
  VERIFY_EMAIL_CODE_ON_WITHDRAW_SUCCESS,
} = authTypes;

const initialState = {
  isLoading: false,
  error: null,
  userId: null,
  tempId: null,
  isLogin: true,
  email: null,
  preVerificationToken: null,
  phoneNumber: null,
  verified: false,
  verificationMethods: [],
  termsAndConditionsAccepted: false,
  hasError: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case VERIFICATION_TOKEN_REQUEST:
      return {
        ...state,
        isLoading: true,
        preVerificationToken: null,
      };
    case VERIFICATION_TOKEN_SUCCESS:
      return {
        ...state,
        tempId: action.tempId,
        isLogin: action.isLogin,
        preVerificationToken: action.preVerificationToken,
        email: action.email,
        phoneNumber: action.phoneNumber,
        verificationMethods: action.verificationMethods,
        isLoading: false,
        error: null,
        hasError: false,
      };
    case VERIFICATION_TOKEN_FAILURE:
      return {
        ...state,
        preVerificationToken: null,
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
        firstName: action.firstName,
        lastName: action.lastName,
        email: action.email,
        phoneNumber: action.phoneNumber,
        verified: action.verified,
        verificationMethods: action.verificationMethods,
        termsAndConditionsAccepted: action.termsAndConditionsAccepted,
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
        firstName: action.firstName,
        lastName: action.lastName,
        email: action.email,
        phoneNumber: action.phoneNumber,
        verified: action.verified,
        verificationMethods: action.verificationMethods,
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
        tempId: null,
        preVerificationToken: null,
        verificationMethods: [],
      };
    case VERIFY_SMS_CODE:
      return {
        ...state,
        isLoading: true,
      };
    case VERIFY_SMS_CODE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userId: action.userId,
      };
    case VERIFY_SMS_CODE_ON_WITHDRAW_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case VERIFY_SMS_CODE_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case VERIFY_EMAIL_CODE:
      console.log(
        'Verificando email. Actualizando estado.',
        'Payload:',
        action,
      );
      return {
        ...state,
        isLoading: true,
      };
    case VERIFY_EMAIL_CODE_SUCCESS:
      console.log(
        'Email verificado exitosamente. Actualizando estado.',
        'Payload:',
        action,
      );

      return {
        ...state,
        isLoading: false,
        userId: action.userId,
      };
    case VERIFY_EMAIL_CODE_ON_WITHDRAW_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case VERIFY_EMAIL_CODE_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
