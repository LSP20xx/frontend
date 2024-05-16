import { assetsTypes } from "../types";
import {
  LITTLE_LINE_CHARTS_URL,
  CANDLESTICK_CHART_URL,
  LINEAR_CHART_URL,
  GET_TRANSACTIONS_URL,
  STORED_PRICES_URL,
  CONVERT_URL,
} from "../../constants";

const {
  SELECT_ASSET,
  SELECT_CALCULATED_ASSET,
  UPDATE_ASSETS_PRICES,
  UPDATE_BALANCES,
  GET_ASSETS_LITTLE_LINE_CHARTS,
  GET_CANDLESTICK_CHART_SUCCESS,
  GET_CANDLESTICK_CHART_REQUEST,
  GET_CANDLESTICK_CHART_FAILURE,
  GET_LINEAR_CHART_SUCCESS,
  GET_LINEAR_CHART_REQUEST,
  GET_LINEAR_CHART_FAILURE,
  GET_STORED_PRICES,
  GET_TRANSACTIONS,
  CONVERT_ASSETS,
} = assetsTypes;

export const selectAsset = (id) => {
  console.log("llega acá a select");
  return {
    type: SELECT_ASSET,
    id: id,
  };
};

export const selectCalculatedAsset = (symbol) => {
  console.log("llega a selectCalculatedAsset");
  return {
    type: SELECT_CALCULATED_ASSET,
    symbol: symbol,
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
      console.log("result", result);

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
      dispatch({
        type: GET_CANDLESTICK_CHART_REQUEST,
      });
      const nameAndInterval = `${name}_${interval}`;
      const response = await fetch(
        `${CANDLESTICK_CHART_URL}/${nameAndInterval}`
      );
      const result = await response.json();

      if (result.length > 0) {
        dispatch({
          type: GET_CANDLESTICK_CHART_SUCCESS,
          payload: result,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_CANDLESTICK_CHART_FAILURE,
        payload: { error: error },
      });
      console.log(error);
    }
  };
};

export const getLinearChart = (symbol) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_LINEAR_CHART_REQUEST,
      });
      console.log("symbol", symbol);
      const response = await fetch(`${LINEAR_CHART_URL}/${symbol}`);
      const result = await response.json();
      console.log("result **", result);

      if (result.length > 0) {
        dispatch({
          type: GET_LINEAR_CHART_SUCCESS,
          payload: result,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_LINEAR_CHART_FAILURE,
        payload: { error: error },
      });
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

export const getTransactions = (userId) => {
  return async (dispatch) => {
    try {
      console.log(`${GET_TRANSACTIONS_URL}/${userId}`);
      const response = await fetch(`${GET_TRANSACTIONS_URL}/${userId}`);
      const result = await response.json();
      console.log("RESULT GET TRANSACTIONS", result);
      dispatch({
        type: GET_TRANSACTIONS,
        payload: result,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const convert = (userId, fromSymbol, toSymbol, fromAmount, toAmount) => {
  return async (dispatch) => {
    try {
      console.log(`${CONVERT_URL}/${userId}`);
      const response = await fetch(`${CONVERT_URL}/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fromSymbol,
          toSymbol,
          fromAmount,
          toAmount,
        }),
      });
      const result = await response.json();
      dispatch({
        type: CONVERT_ASSETS,
        payload: result,
      });
      return Promise.resolve(result);
    } catch (error) {
      console.log(error);
    }
  };
};
