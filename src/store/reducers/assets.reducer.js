import { assetsTypes } from "../types";
import { ASSETS } from "../../constants/data/assets";
const {
  SELECT_ASSET,
  UPDATE_ASSETS_PRICES,
  GET_ASSETS_LITTLE_LINE_CHARTS,
  GET_STORED_PRICES,
} = assetsTypes;

const initialState = {
  assets: ASSETS,
  selectedAsset: null,
  assetsLittleLineCharts: [],
  storedPrices: [],
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
      const updatedAssets = state.assets?.map((asset) => {
        if (action.payload.symbol === `${asset.symbol}/USD`) {
          return {
            ...asset,
            fiatValue: action.payload.fiatValue,
            highest24h: action.payload.highest24h,
            lowest24h: action.payload.lowest24h,
            opening24h: action.payload.opening24h,
          };
        }
        return asset;
      });
      return { ...state, assets: updatedAssets };
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
