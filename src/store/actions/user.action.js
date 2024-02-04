import {
  REALTIME_DB_URL,
  SEND_EMAIL_URL,
  SEND_SMS_URL,
  VERIFY_SMS_URL,
} from "../../constants";
import { authTypes } from "../types";
import { userTypes } from "../types/user.types";
const { GET_USER, ADD_USER, SET_USER_IMAGE, SEND_EMAIL, SEND_SMS } = userTypes;
const {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  CLEAR_ERROR,
  CLEAR_STATE,
} = authTypes;

export const getUser = (userId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${REALTIME_DB_URL}/users/${userId}.json`);
      const result = await response.json();
      dispatch({
        type: GET_USER,
        item: result,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addUser = (user) => {
  return async (dispatch) => {
    try {
      const userId = user.userId;
      if (user.favorites.length === 0) {
        user = {
          ...user,
          favorites: [-1],
        };
      }
      const response = await fetch(`${REALTIME_DB_URL}/users/${userId}.json`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const result = await response.json();
      dispatch({
        type: ADD_USER,
        item: user,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const setUserImage = (userId, image) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${REALTIME_DB_URL}/users/${userId}.json`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image }),
      });
      const result = await response.json();
      dispatch({
        type: SET_USER_IMAGE,
        item: result,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const sendEmail = (to, subject, message) => {
  return async (dispatch) => {
    try {
      const response = await fetch(SEND_EMAIL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to, subject, message }),
      });
      if (!response.ok) {
        throw new Error("Error sending email");
      }
      const result = await response.json();
      console.log(result);
      dispatch({
        type: SEND_EMAIL,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const sendSMS = (to) => {
  return async (dispatch) => {
    try {
      console.log(to);
      const response = await fetch(SEND_SMS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to }),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Error sending email");
      }
      console.log(response);
      const result = await response.json();
      console.log(result);
      dispatch({
        type: SEND_SMS,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
