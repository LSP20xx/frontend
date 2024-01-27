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

export const signUpWithEmail = ({ email, password }) => {
  return async (dispatch) => {
    try {
      console.log("llega al try1", email, phoneNumber, password);
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

      console.log("llega a la response", response);

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error response:", errorData);
        throw new Error(errorData.message || "Something went wrong!");
      }

      const data = await response.json();
      console.log("llega a la data", data);
      dispatch({
        type: SIGN_UP_SUCCESS,
        userId: data.userId,
        email: data.email,
        phoneNumber: data.phoneNumber,
      });
    } catch (error) {
      console.log("llega al error", error);
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
        console.log("Error response:", errorData);
        throw new Error(errorData.message || "Something went wrong!");
      }

      const data = await response.json();

      console.log("llega a la data", data);
      console.log("userId", data.userId);
      dispatch({
        type: SIGN_UP_SUCCESS,
        userId: data.userId,
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
  console.log("llega a la accion", email, phoneNumber, password);

  return async (dispatch) => {
    console.log("llega a la accion2", email, phoneNumber, password);
    try {
      console.log("llega al try", email, phoneNumber, password);
      dispatch({ type: SIGN_IN_REQUEST });
      const response = await fetch(AUTH_SIGN_IN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      console.log("llega a la response", response);

      const data = await response.json();
      console.log("llega a la data", data);

      if (data.error) {
        console.log("llega al if", data);
        dispatch({
          type: SIGN_IN_FAILURE,
          error: data.error.message,
        });
      } else {
        console.log("llega al else", data);
        dispatch({
          type: SIGN_IN_SUCCESS,
          userId: data.userId,
        });
      }
    } catch (error) {
      console.log("llega al error", error);
      dispatch({
        type: SIGN_IN_FAILURE,
        error: error.message,
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
        type: SIGN_IN_SUCCESS,
        userId: data.userId,
      });
    } catch (error) {
      dispatch({
        type: SIGN_IN_FAILURE,
        error: error.message,
      });
    }
  };
};

export const clearError = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_ERROR });
  };
};
