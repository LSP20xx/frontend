import { assetsTypes } from "../types";
import {
  LITTLE_LINE_CHARTS_URL,
  CANDLESTICK_CHART_URL,
  STORED_PRICES_URL,
} from "../../constants";

const {
  SELECT_ASSET,
  UPDATE_ASSETS_PRICES,
  UPDATE_BALANCES,
  GET_ASSETS_LITTLE_LINE_CHARTS,
  GET_CANDLESTICK_CHART,
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

export const getCandlestickChart = (name, interval) => {
  return async (dispatch) => {
    try {
      const nameAndInterval = `${name}_${interval}`;
      const response = await fetch(
        `${CANDLESTICK_CHART_URL}/${nameAndInterval}`
      );
      const result = await response.json();

      if (result.length > 0) {
        dispatch({
          type: GET_CANDLESTICK_CHART,
          payload: result,
        });
      }
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

export const updateBalances = (balances) => {
  return {
    type: UPDATE_BALANCES,
    payload: balances,
  };
};
