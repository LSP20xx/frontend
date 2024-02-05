import { assetsTypes } from "../types";
import { LITTLE_LINE_CHARTS_URL, STORED_PRICES_URL } from "../../constants";

const {
  SELECT_ASSET,
  UPDATE_ASSETS_PRICES,
  GET_ASSETS_LITTLE_LINE_CHARTS,
  GET_STORED_PRICES,
} = assetsTypes;

export const selectAsset = (id) => {
  return {
    type: SELECT_ASSET,
    id: id,
  };
};

export const updateAssetsPrices = (currencyData) => {
  return {
    type: UPDATE_ASSETS_PRICES,
    payload: currencyData,
  };
};

export const getAssetsLittleLineCharts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(LITTLE_LINE_CHARTS_URL);
      const result = await response.json();

      dispatch({
        type: GET_ASSETS_LITTLE_LINE_CHARTS,
        payload: result,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getStoredPrices = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(STORED_PRICES_URL);
      const result = await response.json();

      dispatch({
        type: GET_STORED_PRICES,
        payload: result,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
