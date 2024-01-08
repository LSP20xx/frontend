import { assetsTypes } from "../types";

const { SELECT_ASSET, UPDATE_ASSETS_PRICES /*, FILTER_PLACES*/ } = assetsTypes;

export const selectAsset = (id) => {
  return {
    type: SELECT_ASSET,
    id: id,
  };
};

export const updateAssetsPrices = (currencyData) => ({
  type: UPDATE_ASSETS_PRICES,
  payload: currencyData,
});
/*
export const filterPlaces = (category) => ({
    type: FILTER_PLACES,
    categoryName: category,
});
*/
