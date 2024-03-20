import { USER_INFO_URL, SEND_EMAIL_URL, SEND_SMS_URL } from "../../constants";
import { userTypes } from "../types/user.types";
const { GET_USER_INFO_BY_ID, ADD_USER, SET_USER_IMAGE, SEND_EMAIL, SEND_SMS } =
  userTypes;

export const getUserInfoById = (userId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${USER_INFO_URL}/${userId}`);
      const result = await response.json();
      dispatch({
        type: GET_USER_INFO_BY_ID,
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

export const sendEmail = (to, subject, template) => {
  return async (dispatch) => {
    try {
      console.log(to);
      console.log(subject);
      console.log(template);
      console.log(SEND_EMAIL_URL);
      const response = await fetch(SEND_EMAIL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to, subject, template }),
      });
      console.log("response: ", response.ok);
      if (!response.ok) {
        console.log("Error sending email before throw");
        throw new Error("Error sending email");
      }

      let result;
      if (response.headers.get("content-length") !== "0") {
        result = await response.json();
        console.log(result);
      } else {
        console.log(
          "Email sent successfully, but no content returned from server."
        );
      }

      dispatch({
        type: SEND_EMAIL,
      });
    } catch (error) {
      console.error(error);
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
        throw new Error("Error sending sms");
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
