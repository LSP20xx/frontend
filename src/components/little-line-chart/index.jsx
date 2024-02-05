import React from "react";
import { View, Dimensions } from "react-native";
import { Svg, Path } from "react-native-svg";
import BTCUSD from "../../../BTC-USD.json";
import ETHUSD from "../../../ETH-USD.json";
import LTCUSD from "../../../LTC-USD.json";
import DOGEUSD from "../../../DOGE-USD.json";
import USDTUSD from "../../../USDT-USD.json";

const dataFiles = {
  "BTC-USD": BTCUSD,
  "ETH-USD": ETHUSD,
  "LTC-USD": LTCUSD,
  "DOGE-USD": DOGEUSD,
  "USDT-USD": USDTUSD,
};

const screenWidth = 75;
const screenHeight = 30;

const getMinValue = (data) => Math.min(...data.map((item) => item.close));
const getMaxValue = (data) => Math.max(...data.map((item) => item.close));

const LittleLineChart = ({ symbol, last7DaysData }) => {
  if (!last7DaysData || last7DaysData.length === 0) {
    console.error(`No se encontraron datos para el símbolo: ${symbol}`);
    return null;
  }

  const minValue = getMinValue(last7DaysData);
  const maxValue = getMaxValue(last7DaysData);

  const data = last7DaysData.map((item, index) => ({
    x: (screenWidth / (last7DaysData.length - 1)) * index,
    y:
      screenHeight -
      ((item.close - minValue) / (maxValue - minValue)) * screenHeight,
  }));

  const pathData = data
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  const lineColor =
    last7DaysData[0].close <= last7DaysData[last7DaysData.length - 1].close
      ? "#0A8956"
      : "red";

  return (
    <View>
      <Svg height={screenHeight} width={screenWidth}>
        <Path d={pathData} fill="none" stroke={lineColor} strokeWidth="2" />
      </Svg>
    </View>
  );
};

export default LittleLineChart;
