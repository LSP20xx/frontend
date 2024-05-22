import BigNumber from 'bignumber.js';
import { assetsTypes } from '../types';
import ASSETS from '../../constants/data/assets';

const {
  SELECT_ASSET,
  SELECT_CALCULATED_ASSET,
  UPDATE_ASSETS_PRICES,
  GET_ASSETS_LITTLE_LINE_CHARTS,
  GET_CANDLESTICK_CHART_REQUEST,
  GET_CANDLESTICK_CHART_SUCCESS,
  GET_CANDLESTICK_CHART_FAILURE,
  GET_LINEAR_CHART_REQUEST,
  GET_LINEAR_CHART_SUCCESS,
  GET_LINEAR_CHART_FAILURE,
  GET_STORED_PRICES,
  UPDATE_BALANCES,
  CONVERT_ASSETS,
} = assetsTypes;

interface Token {
  id: string;
  symbol: string;
  balance: string;
}

interface Balance {
  symbol: string;
  balance: string;
  calculatedBalance: string;
  address?: string;
  assetDecimals?: number;
  assetName?: string;
  id?: string;
  tokens?: Token[];
}

interface Asset {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  fiatValue: number;
  lowest24h: number;
  highest24h: number;
  logo: string;
  disabled: boolean;
  assetDecimals: number;
  priceDecimals: number;
  spreadValue: number;
  isLiquidity?: boolean;
  opening24h?: number;
}

interface AssetPriceUpdate {
  symbol: string;
  spreadValue: number;
  fiatValue: number;
  highest24h: number;
  lowest24h: number;
  opening24h: number;
}

interface Action {
  type: string;
  payload?:
    | AssetPriceUpdate
    | Balance[]
    | Record<string, unknown>[]
    | string
    | null;
  id?: string;
  symbol?: string;
}

interface FiatBalance {
  currency: string;
  amount: number;
}

interface State {
  assets: Asset[];
  loading: boolean;
  error: string | null;
  balances: Balance[];
  fiatBalances: FiatBalance[];
  tokensBalances: Token[];
  selectedAsset: Asset | null;
  selectedCalculatedAsset: Asset | null;
  assetWithMaxCalculatedBalance: Balance | null;
  assetsLittleLineCharts: Record<string, unknown>[];
  candlestickChart: Record<string, unknown>[];
  linearChart: Record<string, unknown>[];
  storedPrices: Record<string, unknown>[];
  totalBalance: string;
  totalLiquidityBalance: string;
  totalNonLiquidityBalance: string;
}

const initialState: State = {
  assets: ASSETS,
  loading: false,
  error: null,
  balances: [],
  fiatBalances: [],
  tokensBalances: [],
  selectedAsset: null,
  selectedCalculatedAsset: null,
  assetWithMaxCalculatedBalance: null,
  assetsLittleLineCharts: [],
  candlestickChart: [],
  linearChart: [],
  storedPrices: [],
  totalBalance: '0',
  totalLiquidityBalance: '0',
  totalNonLiquidityBalance: '0',
};

const calculateBalanceValue = (
  balanceAmount: string,
  fiatValue: string,
): string => {
  const safeFiatValue = fiatValue || '0';
  const safeBalanceAmount = balanceAmount || '0';
  return new BigNumber(safeBalanceAmount.toString())
    .multipliedBy(new BigNumber(safeFiatValue.toString()))
    .toString();
};

const calculateTotalBalance = (balances: Balance[]): string => {
  const total = balances.reduce((accumulator: BigNumber, balance: Balance) => {
    const result = accumulator.plus(new BigNumber(balance.calculatedBalance));
    return result;
  }, new BigNumber(0));
  return total.toString();
};

const calculateBalances = (balances: Balance[], assets: Asset[]) => {
  let totalLiquidity = new BigNumber(0);
  let totalNonLiquidity = new BigNumber(0);

  const updatedBalances = balances.map((balance) => {
    const asset = assets.find((a) => a.symbol === balance.symbol);
    if (!asset) return balance;

    const calculatedBalance = calculateBalanceValue(
      balance.balance,
      asset.fiatValue.toString(),
    );

    if (asset.isLiquidity) {
      totalLiquidity = totalLiquidity.plus(calculatedBalance);
    } else {
      totalNonLiquidity = totalNonLiquidity.plus(calculatedBalance);
    }

    return {
      ...balance,
      calculatedBalance,
      assetDecimals: asset.assetDecimals,
      assetName: asset.name,
      id: asset.id,
    };
  });

  return {
    updatedBalances,
    totalLiquidityBalance: totalLiquidity.toString(),
    totalNonLiquidityBalance: totalNonLiquidity.toString(),
  };
};

const assetsReducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case SELECT_ASSET: {
      if (action.id === null) return { ...state, selectedAsset: null };
      const indexAsset = state.assets.findIndex(
        (asset) => asset.id === action.id,
      );
      if (indexAsset === -1) return state;
      return { ...state, selectedAsset: state.assets[indexAsset] };
    }
    case SELECT_CALCULATED_ASSET: {
      if (action.symbol === null)
        return { ...state, selectedCalculatedAsset: null };
      const indexCalculatedAsset = state.assets.findIndex(
        (asset) => asset.symbol === action.symbol,
      );
      if (indexCalculatedAsset === -1) return state;
      return {
        ...state,
        selectedCalculatedAsset: state.assets[indexCalculatedAsset],
      };
    }
    case UPDATE_ASSETS_PRICES: {
      let pricesChanged = false;
      const updatedAssets = state.assets.map((asset) => {
        if (
          action.payload &&
          typeof action.payload === 'object' &&
          'symbol' in action.payload &&
          (action.payload as AssetPriceUpdate).symbol === `${asset.symbol}/USD`
        ) {
          const { spreadValue, fiatValue, highest24h, lowest24h, opening24h } =
            action.payload as AssetPriceUpdate;
          if (
            asset.fiatValue !== fiatValue ||
            asset.highest24h !== highest24h ||
            asset.lowest24h !== lowest24h ||
            asset.spreadValue !== spreadValue
          ) {
            pricesChanged = true;
            return {
              ...asset,
              fiatValue,
              spreadValue,
              highest24h,
              lowest24h,
              opening24h,
            };
          }
        }
        return asset;
      });

      if (!pricesChanged) return state;

      const {
        updatedBalances,
        totalLiquidityBalance,
        totalNonLiquidityBalance,
      } = calculateBalances(state.balances, updatedAssets);

      return {
        ...state,
        assets: updatedAssets,
        balances: updatedBalances,
        totalBalance: calculateTotalBalance(updatedBalances),
        totalLiquidityBalance,
        totalNonLiquidityBalance,
      };
    }
    case UPDATE_BALANCES: {
      const {
        updatedBalances,
        totalLiquidityBalance,
        totalNonLiquidityBalance,
      } = calculateBalances(action.payload as Balance[], state.assets);
      const totalBalance = calculateTotalBalance(updatedBalances);
      const assetWithMaxCalculatedBalance = updatedBalances.reduce(
        (maxAsset, asset) => {
          const maxBalance = new BigNumber(maxAsset.calculatedBalance);
          const currentBalance = new BigNumber(asset.calculatedBalance);
          return currentBalance.isGreaterThan(maxBalance) ? asset : maxAsset;
        },
        { calculatedBalance: '0', symbol: '', balance: '0' } as Balance,
      );

      return {
        ...state,
        balances: updatedBalances,
        totalBalance,
        totalLiquidityBalance,
        totalNonLiquidityBalance,
        assetWithMaxCalculatedBalance,
      };
    }
    case GET_ASSETS_LITTLE_LINE_CHARTS:
      return {
        ...state,
        assetsLittleLineCharts: action.payload as Record<string, unknown>[],
      };
    case GET_CANDLESTICK_CHART_REQUEST:
      return { ...state, loading: true };
    case GET_CANDLESTICK_CHART_SUCCESS:
      return {
        ...state,
        loading: false,
        candlestickChart: action.payload as Record<string, unknown>[],
      };
    case GET_CANDLESTICK_CHART_FAILURE:
      return { ...state, loading: false, error: action.payload as string };
    case GET_LINEAR_CHART_REQUEST:
      return { ...state, loading: true };
    case GET_LINEAR_CHART_SUCCESS:
      return {
        ...state,
        loading: false,
        linearChart: action.payload as Record<string, unknown>[],
      };
    case GET_LINEAR_CHART_FAILURE:
      return { ...state, loading: false, error: action.payload as string };
    case GET_STORED_PRICES:
      return {
        ...state,
        storedPrices: action.payload as Record<string, unknown>[],
      };
    case CONVERT_ASSETS:
      return { ...state, balances: action.payload as Balance[] };
    default:
      return state;
  }
};

export default assetsReducer;
