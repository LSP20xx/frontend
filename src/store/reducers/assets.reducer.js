import { assetsTypes } from "../types";
import { ASSETS } from "../../constants/data/assets";
const { SELECT_ASSET, UPDATE_ASSETS_PRICES } = assetsTypes;

const initialState = {
  assets: ASSETS,
  selectedAsset: null,
  currencies: {},
};

const assetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_ASSET:
      const indexAsset = state.assets
        .map((asset) => asset.id)
        .indexOf(action.id);

      if (indexAsset === -1) return state;
      return {
        ...state,
        selectedAsset: state.assets[indexAsset],
      };
    /*case FILTER_PLACES:
            return {
                ...state,
                filteredPlaces: state.data.filter(place => place.categories.some(category => category === action.categoryName)),
            }*/
    case UPDATE_ASSETS_PRICES:
      const updatedAssets = state.assets.map((asset) => {
        if (action.payload.symbol === `${asset.symbol}/USD`) {
          return {
            ...asset,
            fiatValue: action.payload.fiatValue,
            change24h: action.payload.change24h,
          };
        }
        return asset;
      });
      return { ...state, assets: updatedAssets };

    default:
      return state;
  }
};

export default assetsReducer;
