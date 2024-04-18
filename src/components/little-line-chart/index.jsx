import React from "react";
import { View, Dimensions } from "react-native";
import { Svg, Path } from "react-native-svg";
import BTCUSD from "../../../BTC-USD.json";
import ETHUSD from "../../../ETH-USD.json";
import LTCUSD from "../../../LTC-USD.json";
import DOGEUSD from "../../../DOGE-USD.json";
import USDTUSD from "../../../USDT-USD.json";

const dataFiles = {
  BTC: "#F7941C",
  ETH: "#5F73B7",
  LTC: "#325F9F",
  DOGE: "#C3A835",
  USDC: "#2E74BA",
  SOL: "#000000",
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

  let pathData = data.reduce((acc, point, index, points) => {
    if (index === 0) {
      return `M ${point.x},${point.y}`;
    }
    const prevPoint = points[index - 1];
    const midX = (prevPoint.x + point.x) / 2;
    const midY = (prevPoint.y + point.y) / 2;
    return `${acc} Q ${prevPoint.x},${prevPoint.y} ${midX},${midY}`;
  }, "");

  if (data.length > 1) {
    const lastPoint = data[data.length - 1];
    pathData += ` T ${lastPoint.x},${lastPoint.y}`;
  }

  // const lineColor =
  //   last7DaysData[0].close <= last7DaysData[last7DaysData.length - 1].close
  //     ? "#0A8956"
  //     : "red";

  const lineColor = dataFiles[symbol];
  return (
    <View>
      <Svg height={screenHeight} width={screenWidth}>
        <Path d={pathData} fill="none" stroke={lineColor} strokeWidth="2" />
      </Svg>
    </View>
  );
};

export default LittleLineChart;
