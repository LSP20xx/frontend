import { AUTH_SIGN_IN_URL, AUTH_SIGN_UP_URL } from "../../constants";
import { authTypes } from "../types";

const {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  CLEAR_ERROR,
} = authTypes;

export const signUp = ({ email, phoneNumber, password }) => {
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
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      dispatch({
        type: SIGN_UP_SUCCESS,
        userId: data.userId,
        email: data.email,
        phoneNumber: data.phoneNumber,
      });
    } catch (error) {
      dispatch({
        type: SIGN_UP_FAILURE,
        error,
      });
    }
  };
};

export const signIn = ({ email, phoneNumber, password }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SIGN_IN_REQUEST });
      const response = await fetch(AUTH_SIGN_IN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
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
          token: data.idToken,
          userId: data.localId,
          email: data.email,
        });
      }
    } catch (error) {
      dispatch({
        type: SIGN_IN_FAILURE,
        error,
      });
    }
  };
};

export const clearError = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_ERROR });
  };
};
