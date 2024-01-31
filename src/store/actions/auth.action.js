import {
  AUTH_SIGN_IN_URL,
  AUTH_SIGN_UP_URL,
  AUTH_CHECK_DATA,
} from "../../constants";
import { authTypes } from "../types";

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
} = authTypes;

export const signUpWithEmail = ({ email, password }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SIGN_UP_REQUEST });
      const response = await fetch(AUTH_SIGN_UP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong!");
      }

      const data = await response.json();
      dispatch({
        type: SIGN_UP_SUCCESS,
        userId: data.userId,
        email: data.email,
      });
    } catch (error) {
      dispatch({
        type: SIGN_UP_FAILURE,
        error: error.message,
      });
    }
  };
};

export const signUpWithPhoneNumber = ({ phoneNumber, password }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SIGN_UP_REQUEST });
      const response = await fetch(AUTH_SIGN_UP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong!");
      }

      const data = await response.json();

      dispatch({
        type: SIGN_UP_SUCCESS,
        userId: data.userId,
        phoneNumber: data.phoneNumber,
      });
    } catch (error) {
      dispatch({
        type: SIGN_UP_FAILURE,
        error: error.message,
      });
    }
  };
};

export const signInWithEmail = ({ email, password }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SIGN_IN_REQUEST });
      const response = await fetch(AUTH_SIGN_IN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: email,
          password,
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
          email: data.email,
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

export const signInWithPhoneNumber = ({ phoneNumber, password }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SIGN_IN_REQUEST });
      const response = await fetch(AUTH_SIGN_IN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: phoneNumber,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong!");
      }

      const data = await response.json();
      dispatch({
        type: SIGN_IN_SUCCESS,
        userId: data.userId,
        phoneNumber: data.phoneNumber,
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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, isLogin }),
      });

      const data = await response.json();
      console.log("DATA: ", data);

      if (data.error) {
        dispatch({
          type: VERIFICATION_TOKEN_FAILURE,
          error: data.message,
        });
      } else {
        dispatch({
          type: VERIFICATION_TOKEN_SUCCESS,
          token: data.token,
        });
      }
    } catch (error) {
      dispatch({
        type: VERIFICATION_TOKEN_FAILURE,
        error: error.message || "An unexpected error occurred",
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
      dispatch({ type: VERIFICATION_TOKEN_REQUEST });

      const response = await fetch(AUTH_CHECK_DATA, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber,
          password,
          isLogin,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        dispatch({
          type: VERIFICATION_TOKEN_FAILURE,
          error: data.message || "An error occurred",
        });
      } else {
        dispatch({
          type: VERIFICATION_TOKEN_SUCCESS,
          token: data.token,
        });
      }
    } catch (error) {
      console.error("ERROR: ", error);
      dispatch({
        type: VERIFICATION_TOKEN_FAILURE,
        error: error.message,
      });
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
