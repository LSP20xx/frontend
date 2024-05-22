import BigNumber from 'bignumber.js';

BigNumber.config({ DECIMAL_PLACES: 18 });

export const calculatePriceVariation = (currentPrice, openingPrice) => {
  if (!openingPrice) return '0.00';
  const variation = new BigNumber(currentPrice)
    .minus(openingPrice)
    .div(openingPrice)
    .multipliedBy(100)
    .toNumber();
  return variation.toFixed(2);
};

export const formatFiatValue = (value, decimals = 2) => {
  if (!value) return '0.00';
  return new BigNumber(value).toFixed(decimals, BigNumber.ROUND_DOWN);
};

export const formatBalance = (value, decimals = 18) => {
  if (!value) return '0.0000';
  return new BigNumber(value).toFixed(decimals, BigNumber.ROUND_DOWN);
};
