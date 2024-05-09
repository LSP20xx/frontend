export const processKrakenData = (data) => {
  if (Array.isArray(data)) {
    if (data[2] == "ticker" && data.length == 4) {
      const currencyPair = data[3];
      const currencyInfo = data[1];

      let transformedCurrencyPair = currencyPair;
      if (currencyPair.includes("XBT")) {
        transformedCurrencyPair = transformedCurrencyPair.replace("XBT", "BTC");
      }
      if (currencyPair.includes("XDG")) {
        transformedCurrencyPair = transformedCurrencyPair.replace(
          "XDG",
          "DOGE"
        );
      }

      console.log(
        "parseFloat(currencyInfo.s[0])",
        parseFloat(currencyInfo.s[0])
      );

      return {
        symbol: transformedCurrencyPair,
        fiatValue: parseFloat(currencyInfo.c[0]),
        spreadValue: parseFloat(currencyInfo.s[0]),
        lowest24h: parseFloat(currencyInfo.l[1]),
        highest24h: parseFloat(currencyInfo.h[1]),
        opening24h: parseFloat(currencyInfo.o[1]),
      };
    } else {
      return null;
    }
  }
};
