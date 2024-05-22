interface Token {
  id: string;
  symbol: string;
  balance: string;
}

interface Balance {
  symbol: string;
  balance?: string;
  address?: string;
  calculatedBalance?: string;
  tokens?: Token[];
}

interface Asset {
  symbol: string;
  spreadValue?: number;
  fiatValue?: number;
}

interface State {
  assets: {
    balances: Balance[];
    assets: Asset[];
  };
}

export const getAssetBalance = (state: State, assetSymbol: string): string => {
  if (assetSymbol) {
    const assetBalance = state.assets.balances.find(
      (balance) => balance.symbol === assetSymbol,
    );

    if (assetBalance) {
      return assetBalance.balance || '0';
    }
    console.log('No asset balance found for symbol:', assetSymbol);
    return '0';
  }

  console.log('No asset symbol provided');
  return '0';
};

export const getSpreadFiatValue = (
  state: State,
  assetSymbol: string,
): number | undefined => {
  const asset = state.assets.assets.find(
    (asset) => asset.symbol === assetSymbol,
  );
  return asset?.spreadValue;
};

export const getAssetAddress = (
  state: State,
  assetSymbol: string,
): string | undefined => {
  const assetBalance = state.assets.balances.find(
    (balance) => balance.symbol === assetSymbol,
  );
  return assetBalance?.address;
};

export const getCalculatedBalance = (
  state: State,
  assetSymbol: string,
): string => {
  if (!assetSymbol) {
    console.log('Asset symbol is undefined.');
    return '0';
  }

  const assetBalance = state.assets.balances.find(
    (balance) => balance.symbol === assetSymbol,
  );

  if (!assetBalance) {
    console.log(`No balance found for symbol: ${assetSymbol}`);
    return '0';
  }

  return assetBalance.calculatedBalance || '0';
};

export const getAssetFiatValue = (
  state: State,
  assetSymbol: string,
): number | undefined => {
  const asset = state.assets.assets.find(
    (asset) => asset.symbol === assetSymbol,
  );
  return asset?.fiatValue;
};

export const getERC20TokensBalances = (
  state: State,
  assetSymbol: string,
): Token[] | undefined => {
  const tokensBalances = state.assets.balances.find(
    (balance) => balance.symbol === assetSymbol,
  );
  return tokensBalances?.tokens;
};
