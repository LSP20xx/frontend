import BigNumber from "bignumber.js";

export const getAssetBalance = (state, assetSymbol) => {
  const assetBalance = state.assets.balances.find(
    (balance) => balance.symbol === assetSymbol
  );
  return assetBalance.balance;
};

export const getAssetFiatValue = (state, assetSymbol) => {
  const asset = state.assets.assets.find(
    (asset) => asset.symbol === assetSymbol
  );
  return asset.fiatValue;
};
