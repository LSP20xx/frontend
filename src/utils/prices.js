export const calculatePriceVariation = (currentPrice, openingPrice) => {
  let variation = ((currentPrice - openingPrice) / openingPrice) * 100;
  return variation ? variation.toFixed(2) : 0;
};

export const formatFiatValue = (value) => {
  if (value === undefined || value === null) {
    return "0.00";
  }

  const decimalPart = value.toString().split(".")[1];
  return decimalPart && decimalPart.length > 2
    ? value.toFixed(4)
    : value.toFixed(2);
};
