import React from 'react';
import { Dimensions, View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

const screenWidth = Dimensions.get('window').width;
const screenHeight = '300';

function BigLineChart({ symbol, data }) {
  if (!data || data.length === 0) {
    console.error(`No se encontraron datos para el símbolo: ${symbol}`);
    return null;
  }

  // Tomar solo las últimas 40 entradas
  const latestData = data.slice(-40);

  // Calcular valores mínimos y máximos para la escala
  const minValue = Math.min(...latestData.map((item) => item.close));
  const maxValue = Math.max(...latestData.map((item) => item.close));

  // Mapear los datos a puntos en la gráfica
  const plotData = latestData.map((item, index) => ({
    x: (screenWidth / latestData.length) * index,
    y:
      screenHeight -
      ((item.close - minValue) / (maxValue - minValue)) * screenHeight,
  }));

  const pathData = plotData
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ');

  const lineColor =
    plotData[0].close > plotData[plotData.length - 1].close
      ? '#F48421'
      : '#F48421';

  return (
    <View style={{ marginTop: 40 }}>
      <Svg height={screenHeight} width={screenWidth}>
        <Path d={pathData} fill="none" stroke={lineColor} strokeWidth="2" />
      </Svg>
    </View>
  );
}

export default BigLineChart;
