export const calculatePriceVariation = (currentPrice, openingPrice) => {
  let variation = ((currentPrice - openingPrice) / openingPrice) * 100;
  return variation ? variation.toFixed(2) : 0;
};

export const formatFiatValue = (value, decimal) => {
  if (value === undefined || value === null) {
    return "0.00";
  }

  const decimalPart = value.toString().split(".")[1];

  if (decimal) {
    return decimalPart && value.toFixed(decimal);
  }
  return decimalPart && decimalPart.length > 2
    ? value.toFixed(2)
    : value.toFixed(2);
};

export const formatBalance = (value, decimal) => {
  if (!value) {
    return "0";
  }

  const decimalPart = value.toString().split(".")[1];

  if (decimal) {
    return decimalPart && value.toFixed(decimal);
  }
  return decimalPart && decimalPart.length > 2
    ? value.toFixed(4)
    : value.toFixed(2);
};
