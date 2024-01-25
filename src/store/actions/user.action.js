import { userTypes } from "../types/user.types";
const { GET_USER, ADD_USER, SET_USER_IMAGE } = userTypes;
import { REALTIME_DB_URL } from "../../constants";

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
