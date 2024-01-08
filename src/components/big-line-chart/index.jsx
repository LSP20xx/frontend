import React from "react";
import { Dimensions, View } from "react-native";
import { Path, Svg } from "react-native-svg";
import BTCUSD from "../../../BTC-USD.json";
import DOGEUSD from "../../../DOGE-USD.json";
import ETHUSD from "../../../ETH-USD.json";
import LTCUSD from "../../../LTC-USD.json";
import USDTUSD from "../../../USDT-USD.json";
import { COLORS } from "../../constants";

const dataFiles = {
  "BTC-USD": BTCUSD,
  "ETH-USD": ETHUSD,
  "LTC-USD": LTCUSD,
  "DOGE-USD": DOGEUSD,
  "USDT-USD": USDTUSD,
};

const screenWidth = Dimensions.get("window").width;
const screenHeight = "300";

const BigLineChart = ({ symbol }) => {
  const jsonData = dataFiles[`${symbol}-USD`];

  if (!jsonData) {
    console.error(`No se encontraron datos para el símbolo: ${symbol}`);
    return null;
  }

  const data = Object.entries(jsonData).map(([date, { Close }], index) => ({
    x: (screenWidth / (Object.keys(jsonData).length - 1)) * index,
    y:
      screenHeight -
      ((Close - getMinValue(jsonData)) /
        (getMaxValue(jsonData) - getMinValue(jsonData))) *
        screenHeight,
  }));

  const pathData = data
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  const firstClose = jsonData[Object.keys(jsonData)[0]].Close;
  const lastClose =
    jsonData[Object.keys(jsonData)[Object.keys(jsonData).length - 1]].Close;
  const lineColor =
    firstClose > lastClose
      ? "red"
      : firstClose < lastClose
      ? "#0A8956"
      : "black";

  return (
    <View style={{ marginTop: 80 }}>
      <Svg height={screenHeight} width={screenWidth}>
        <Path d={pathData} fill="none" stroke={lineColor} strokeWidth="2" />
      </Svg>
    </View>
  );
};

const getMinValue = (data) => {
  return Math.min(...Object.values(data).map((item) => item.Close));
};

const getMaxValue = (data) => {
  return Math.max(...Object.values(data).map((item) => item.Close));
};

export default BigLineChart;
