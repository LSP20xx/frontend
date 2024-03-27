import { assetsTypes } from "../types";
import { ASSETS } from "../../constants/data/assets";
import BigNumber from "bignumber.js";
const {
  SELECT_ASSET,
  UPDATE_ASSETS_PRICES,
  GET_ASSETS_LITTLE_LINE_CHARTS,
  GET_CANDLESTICK_CHART_REQUEST,
  GET_CANDLESTICK_CHART_SUCCESS,
  GET_CANDLESTICK_CHART_FAILURE,
  GET_STORED_PRICES,
  UPDATE_BALANCES,
} = assetsTypes;

const initialState = {
  assets: ASSETS,
  loading: false,
  error: null,
  balances: [],
  selectedAsset: null,
  assetsLittleLineCharts: [],
  candlestickChart: [],
  storedPrices: [],
  totalBalance: 0,
};

const calculateBalanceValue = (balanceAmount, fiatValue) => {
  const safeFiatValue = fiatValue || "0";
  const safeBalanceAmount = balanceAmount || "0";
  return new BigNumber(safeBalanceAmount.toString())
    .multipliedBy(new BigNumber(safeFiatValue.toString()))
    .toString();
};

const calculateTotalBalance = (balances) => {
  const total = balances.reduce((accumulator, balance) => {
    const result = accumulator.plus(new BigNumber(balance.calculatedBalance));
    // console.log(
    //   `Summing balance: ${balance.calculatedBalance}, current total: ${result}`
    // );
    return result;
  }, new BigNumber(0));
  // console.log(`Total balance calculated: ${total.toString()}`);
  return total.toString();
};

const assetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_ASSET:
      const indexAsset = state.assets
        .map((asset) => asset.id)
        .indexOf(action.id);

      console.log(state.assets);

      if (indexAsset === -1) return state;
      return {
        ...state,
        selectedAsset: state.assets[indexAsset],
      };
    case UPDATE_ASSETS_PRICES:
      let pricesChanged = false;
      const updatedAssets = state.assets.map((asset) => {
        if (action.payload.symbol === `${asset.symbol}/USD`) {
          const { fiatValue, highest24h, lowest24h, opening24h } =
            action.payload;
          if (
            asset.fiatValue !== fiatValue ||
            asset.highest24h !== highest24h ||
            asset.lowest24h !== lowest24h ||
            asset.opening24h !== opening24h
          ) {
            pricesChanged = true;
            return { ...asset, fiatValue, highest24h, lowest24h, opening24h };
          }
        }
        return asset;
      });

      if (!pricesChanged) return state;

      const updatedBalances = state.balances.map((balance) => {
        const asset = updatedAssets.find((a) => a.symbol === balance.symbol);
        return {
          ...balance,
          calculatedBalance: calculateBalanceValue(
            balance.balance,
            asset ? asset.fiatValue : "1"
          ),
        };
      });

      return {
        ...state,
        assets: updatedAssets,
        balances: updatedBalances,
        totalBalance: calculateTotalBalance(updatedBalances),
      };
    case UPDATE_BALANCES: {
      const updatedBalances = action.payload.map((balance) => {
        const asset = state.assets.find((a) => a.symbol === balance.symbol);
        const fiatValue = asset ? asset.fiatValue : "1";
        const calculatedBalance = calculateBalanceValue(
          balance.balance,
          fiatValue
        );
        if (isNaN(calculatedBalance)) {
          console.error(
            `NaN detected in calculated balance for balance: ${balance.balance}, fiatValue: ${fiatValue}`
          );
        }
        return { ...balance, calculatedBalance };
      });

      // Calcular el balance total utilizando la función correcta.
      const totalBalance = calculateTotalBalance(updatedBalances);
      if (isNaN(totalBalance)) {
        console.error(`NaN detected in total balance`);
      }

      return {
        ...state,
        balances: updatedBalances,
        totalBalance,
      };
    }

    // case UPDATE_ASSETS_PRICES:
    //   const assetIndexToUpdate = state.assets.findIndex(
    //     (asset) => asset.id === action.payload.id
    //   );
    //   if (assetIndexToUpdate === -1) return state;

    //   const updatedAssets = [...state.assets];
    //   updatedAssets[assetIndexToUpdate] = {
    //     ...state.assets[assetIndexToUpdate],
    //     ...action.payload.prices,
    //   };

    //   let updatedSelectedAsset = state.selectedAsset;
    //   if (state.selectedAsset && state.selectedAsset.id === action.payload.id) {
    //     updatedSelectedAsset = {
    //       ...state.selectedAsset,
    //       ...action.payload.prices,
    //     };
    //   }

    //   return {
    //     ...state,
    //     assets: updatedAssets,
    //     selectedAsset: updatedSelectedAsset,
    //   };
    case GET_ASSETS_LITTLE_LINE_CHARTS:
      return {
        ...state,
        assetsLittleLineCharts: action.payload,
      };
    case GET_CANDLESTICK_CHART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_CANDLESTICK_CHART_SUCCESS:
      return {
        ...state,
        loading: false,
        candlestickChart: action.payload,
      };

    case GET_CANDLESTICK_CHART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case GET_STORED_PRICES:
      return {
        ...state,
        storedPrices: action.payload,
      };
    default:
      return state;
  }
};

export default assetsReducer;
