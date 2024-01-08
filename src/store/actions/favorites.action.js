import { favoritesTypes } from "../types";
import { FIREBASE_REALTIME_DB_URL } from "../../constants";

const { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES, GET_FAVORITES, IS_FAVORITE } =
  favoritesTypes;

export const addToFavorites = (place) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${FIREBASE_REALTIME_DB_URL}/favorites.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(place),
        }
      );

      const result = await response.json();
      dispatch({
        type: ADD_TO_FAVORITES,
        item: {
          ...place,
          id: place.id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeFromFavorites = (id) => ({
  type: REMOVE_FROM_FAVORITES,
  id,
});

export const getFavorites = () => ({
  type: GET_FAVORITES,
});

export const isFavorite = (place) => ({
  type: IS_FAVORITE,
  item: place,
});
