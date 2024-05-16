import BigNumber from "bignumber.js";

export const getAssetBalance = (state, assetSymbol) => {
  console.log("LAST", assetSymbol);

  if (assetSymbol) {
    console.log("2", assetSymbol);
    const assetBalance = state.assets.balances.find(
      (balance) => balance.symbol === assetSymbol
    );

    // Check if assetBalance is defined before accessing its properties
    if (assetBalance) {
      console.log("assetBalance.balance", assetBalance.balance);
      return assetBalance.balance;
    } else {
      console.log("No asset balance found for symbol:", assetSymbol);
      return "0"; // Return "0" or any other fallback value
    }
  }

  console.log("No asset symbol provided");
  return "0"; // Return "0" when there's no asset symbol
};

export const getSpreadFiatValue = (state, assetSymbol) => {
  const asset = state.assets.assets.find(
    (asset) => asset.symbol === assetSymbol
  );
  if (asset.symbol === "USD") console.log("getSpreadFiatValue****", asset);
  console.log(`${assetSymbol}`);
  return asset?.spreadValue;
};

export const getAssetAddress = (state, assetSymbol) => {
  const assetBalance = state.assets.balances.find(
    (balance) => balance.symbol === assetSymbol
  );
  return assetBalance.address;
};

export const getCalculatedBalance = (state, assetSymbol) => {
  if (!assetSymbol) {
    console.log("Asset symbol is undefined.");
    return "0";
  }

  const assetBalance = state.assets.balances.find(
    (balance) => balance.symbol === assetSymbol
  );

  if (!assetBalance) {
    console.log(`No balance found for symbol: ${assetSymbol}`);
    return "0";
  }

  return assetBalance.calculatedBalance || "0";
};
export const getAssetFiatValue = (state, assetSymbol) => {
  const asset = state.assets.assets.find(
    (asset) => asset.symbol === assetSymbol
  );
  console.log(`${assetSymbol}****`);
  return asset?.fiatValue;
};

export const getERC20TokensBalances = (state, assetSymbol) => {
  const tokensBalances = state.assets.balances.find(
    (balance) => balance.symbol === assetSymbol
  );
  return tokensBalances.tokens;
};
