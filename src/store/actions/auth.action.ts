import {
  AUTH_SIGN_IN_URL,
  AUTH_SIGN_UP_URL,
  AUTH_CHECK_DATA,
  VERIFY_SMS_URL,
  VERIFY_EMAIL_URL,
} from '../../constants';
import { authTypes } from '../types';
import { withdrawFromEvmWallet } from './transactions.action';

const {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  VERIFICATION_TOKEN_REQUEST,
  VERIFICATION_TOKEN_SUCCESS,
  VERIFICATION_TOKEN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  CLEAR_STATE,
  CLEAR_ERROR,
  VERIFY_SMS_CODE,
  VERIFY_SMS_CODE_SUCCESS,
  VERIFY_SMS_CODE_ON_WITHDRAW_SUCCESS,
  VERIFY_SMS_CODE_FAILURE,
  VERIFY_EMAIL_CODE,
  VERIFY_EMAIL_CODE_SUCCESS,
  VERIFY_EMAIL_CODE_FAILURE,
  VERIFY_EMAIL_CODE_ON_WITHDRAW_SUCCESS,
} = authTypes;

export const signUpWithEmail = ({ email, tempId }) => {
  return async (dispatch) => {
    try {
      console.log('llega a signUpWithEmail');
      dispatch({ type: SIGN_UP_REQUEST });
      const response = await fetch(AUTH_SIGN_UP_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          tempId,
        }),
      });
      console.log('response: ', response);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong!');
      }

      const data = await response.json();
      dispatch({
        type: SIGN_UP_SUCCESS,
        userId: data.userId,
        firstName: data.firstName,
        lastName: data.lastName,
        sessionTempId: data.sessionTempId,
        phoneNumber: data.phoneNumber,
        email: data.email,
        verified: data.verified,
        verificationMethods: data.verificationMethods,
        termsAndConditionsAccepted: data.termsAndConditionsAccepted,
      });
    } catch (error) {
      dispatch({
        type: SIGN_UP_FAILURE,
        error: error.message,
      });
    }
  };
};

export const signUpWithPhoneNumber = ({ phoneNumber, tempId }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SIGN_UP_REQUEST });
      const response = await fetch(AUTH_SIGN_UP_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber,
          tempId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong!');
      }

      const data = await response.json();

      dispatch({
        type: SIGN_UP_SUCCESS,
        userId: data.userId,
        firstName: data.firstName,
        lastName: data.lastName,
        sessionTempId: data.sessionTempId,
        phoneNumber: data.phoneNumber,
        email: data.email,
        verified: data.verified,
        verificationMethods: data.verificationMethods,
        termsAndConditionsAccepted: data.termsAndConditionsAccepted,
      });
    } catch (error) {
      dispatch({
        type: SIGN_UP_FAILURE,
        error: error.message,
      });
    }
  };
};

export const signInWithEmail = ({ email, tempId }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SIGN_IN_REQUEST });
      const response = await fetch(AUTH_SIGN_IN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: email,
          tempId,
        }),
      });

      const data = await response.json();

      if (data.error) {
        dispatch({
          type: SIGN_IN_FAILURE,
          error: data.error.message,
        });
      } else {
        dispatch({
          type: SIGN_IN_SUCCESS,
          userId: data.userId,
          firstName: data.firstName,
          lastName: data.lastName,
          sessionTempId: data.sessionTempId,
          phoneNumber: data.phoneNumber,
          email: data.email,
          verified: data.verified,
          verificationMethods: data.verificationMethods,
        });
      }
    } catch (error) {
      dispatch({
        type: SIGN_IN_FAILURE,
        error: data.error.message,
      });
    }
  };
};

export const signInWithPhoneNumber = ({ phoneNumber, tempId }) => {
  console.log('llega a signInWithPhoneNumber');
  return async (dispatch) => {
    try {
      dispatch({ type: SIGN_IN_REQUEST });
      const response = await fetch(AUTH_SIGN_IN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: phoneNumber,
          tempId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong!');
      }

      const data = await response.json();
      console.log('DATA: ', data);
      dispatch({
        type: SIGN_IN_SUCCESS,
        userId: data.userId,
        firstName: data.firstName,
        lastName: data.lastName,
        sessionTempId: data.sessionTempId,
        phoneNumber: data.phoneNumber,
        email: data.email,
        verified: data.verified,
        verificationMethods: data.verificationMethods,
      });
    } catch (error) {
      dispatch({
        type: SIGN_IN_FAILURE,
        error: error.message,
      });
    }
  };
};
export const checkEmailAuthData = ({ email, password, isLogin }) => {
  return async (dispatch) => {
    dispatch({ type: VERIFICATION_TOKEN_REQUEST });

    try {
      const response = await fetch(AUTH_CHECK_DATA, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, isLogin }),
      });

      const data = await response.json();
      console.log('DATA: ', data);

      if (data.error) {
        dispatch({
          type: VERIFICATION_TOKEN_FAILURE,
          error: data.message,
        });
      } else {
        dispatch({
          type: VERIFICATION_TOKEN_SUCCESS,
          tempId: data.tempId,
          isLogin,
          preVerificationToken: data.preVerificationToken,
          verificationMethods: data.verificationMethods,
          phoneNumber: data.phoneNumber,
          email: data.email,
        });
      }
    } catch (error) {
      dispatch({
        type: VERIFICATION_TOKEN_FAILURE,
        error: error.message || 'An unexpected error occurred',
      });
    }
  };
};

export const checkPhoneNumberAuthData = ({
  phoneNumber,
  password,
  isLogin,
}) => {
  return async (dispatch) => {
    try {
      console.log('llega antes de checkPhoneNumberAuthData');
      dispatch({ type: VERIFICATION_TOKEN_REQUEST });
      console.log('AUTH_CHECK_DATA', AUTH_CHECK_DATA);
      const response = await fetch(AUTH_CHECK_DATA, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber,
          password,
          isLogin,
        }),
      });

      const data = await response.json();
      console.log('llega despues de checkPhoneNumberAuthData');

      console.log('DATA check: ', data);

      if (!response.ok) {
        dispatch({
          type: VERIFICATION_TOKEN_FAILURE,
          error: data.message || 'An error occurred',
        });
      } else {
        dispatch({
          type: VERIFICATION_TOKEN_SUCCESS,
          tempId: data.tempId,
          isLogin,
          preVerificationToken: data.preVerificationToken,
          verificationMethods: data.verificationMethods,
          phoneNumber: data.phoneNumber,
          email: data.email,
        });
      }
    } catch (error) {
      console.error('ERROR: ', error);
      dispatch({
        type: VERIFICATION_TOKEN_FAILURE,
        error: error.message,
      });
    }
  };
};

export const verifySmsCodeOnWithdraw = (
  to,
  code,
  fromAddress,
  toAddress,
  amount,
  coin,
  userId,
  blockchainId,
) => {
  return async (dispatch) => {
    console.log('fromAddress: ', fromAddress, 'toAddress: ', toAddress);
    try {
      dispatch({
        type: VERIFY_SMS_CODE,
      });
      const response = await fetch(VERIFY_SMS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to, code }),
      });
      if (!response.ok) {
        const errorResponse = await response.text();
        console.error('Error verifying sms code:', errorResponse);
        throw new Error(`Error verifying sms code: ${errorResponse}`);
      }
      const result = await response.json();
      if (result.isVerified) {
        console.log('llega a verificarse CORRECTAMENTE');
        dispatch({ type: VERIFY_SMS_CODE_ON_WITHDRAW_SUCCESS });
        console.log('blockchainId: ', blockchainId, typeof blockchainId);
        if (['1', '11155111'].includes(blockchainId)) {
          console.log('llega a dispatchear withdrawFromEvmWallet');
          dispatch(
            withdrawFromEvmWallet(
              fromAddress,
              toAddress,
              amount,
              coin,
              userId,
              blockchainId,
            ),
          );
        }
      } else {
        dispatch({ type: VERIFY_SMS_CODE_FAILURE });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: VERIFY_SMS_CODE_FAILURE });
    }
  };
};

export const verifySmsCode = (to, code, tempId, isLogin) => {
  return async (dispatch) => {
    console.log(
      'Despachando acción para verificar código SMS',
      'PhoneNumber:',
      to,
      'Código:',
      code,
      'tempId:',
      tempId,
      'isLogin:',
      isLogin,
    );

    try {
      dispatch({
        type: VERIFY_SMS_CODE,
      });
      const response = await fetch(VERIFY_SMS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to, code }),
      });
      if (!response.ok) {
        throw new Error('Error verifying sms code');
      }
      const result = await response.json();
      console.log('llegó a verificarse CORRECTAMENTE');
      if (result.isVerified) {
        dispatch({ type: VERIFY_SMS_CODE_SUCCESS });
        if (isLogin) {
          console.log('llega antes de loguear con teléfono');
          dispatch(signInWithPhoneNumber({ phoneNumber: to, tempId }));
        } else {
          dispatch(signUpWithPhoneNumber({ phoneNumber: to, tempId }));
        }
      } else {
        dispatch({ type: VERIFY_SMS_CODE_FAILURE });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: VERIFY_SMS_CODE_FAILURE });
    }
  };
};

export const verifyEmailCode = (email, code, tempId, isLogin) => {
  console.log(
    'Despachando acción para verificar código de email',
    'Email:',
    email,
    'Código:',
    code,
    'tempId:',
    tempId,
    'isLogin:',
    isLogin,
  );

  return async (dispatch) => {
    try {
      dispatch({
        type: VERIFY_EMAIL_CODE,
      });
      const response = await fetch(VERIFY_EMAIL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to: email, code }),
      });
      if (!response.ok) {
        console.log('Error en verificación. Respuesta:', await response.text());

        throw new Error('Error verifying email code');
      }
      const result = await response.json();
      console.log('Resultado de la verificación:', result);

      if (result.isVerified) {
        console.log('Email verificado exitosamente');
        dispatch({ type: VERIFY_EMAIL_CODE_SUCCESS });
        if (isLogin) {
          dispatch(signInWithEmail({ email, tempId }));
        } else {
          console.log('llega a dispatchear signUpWithEmail');
          dispatch(signUpWithEmail({ email, tempId }));
        }
      } else {
        dispatch({ type: VERIFY_EMAIL_CODE_FAILURE });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: VERIFY_EMAIL_CODE_FAILURE });
    }
  };
};

export const clearState = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_STATE });
  };
};

export const clearError = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_ERROR });
  };
};
