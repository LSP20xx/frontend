import React, { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { WebView } from "react-native-webview";
import { useSelector } from "react-redux";
import { useTheme } from "../../context/ThemeContext";

const TradingViewLinearChart = (symbol) => {
  const webViewRef = useRef(null);
  const { linearChart, loading } = useSelector((state) => state.assets);
  const { theme } = useTheme();

  useEffect(() => {
    console.log("symbol***", symbol);
  }, [theme]);

  const dataFiles = {
    BTC: "#F7941C",
    ETH: "#5F73B7",
    LTC: "#325F9F",
    DOGE: "#C3A835",
    USDC: "#2E74BA",
    SOL: "#000000",
  };

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bezier Curve Chart</title>
    <script src="https://unpkg.com/lightweight-charts/dist/lightweight-charts.standalone.production.js"></script>
    <style>
        body, html { margin: 0; height: 100%; }
        #chart { height: 100%; }
        .linechart-timeline { display: none !important; }
        .linechart-cursor { display: none !important; }
        .chart-container .chart-element:nth-child(3) { display: none !important; }
    </style>
</head>
<body>
    <div id="chart"></div>
    <script>
        const chart = LightweightCharts.createChart(document.getElementById('chart'), {
            width: document.body.clientWidth,
            height: document.body.clientHeight,
            layout: {
                fontSize: 14,
                textColor: '${theme.text}',
                background: { color: '${theme.background}' }, 
            },
            grid: {
                vertLines: {
                    color: '${theme.background}',
                },
                horzLines: {
                    color: '${theme.background}',
                },
            },
            rightPriceScale: {
              visible: false, // Esto oculta la escala de precios derecha
          },
          timeScale: {
            timeVisible: true, // Asegura que la escala de tiempo muestra las fechas
            borderColor: '#485c7b',
            fixLeftEdge: true,
            fixRightEdge: true,
            rightOffset: 5,
            lockVisibleTimeRangeOnResize: true,
            rightBarStaysOnScroll: true,
            borderVisible: false,
            visible: true,
            secondsVisible: false, // Puedes ajustar esto si no necesitas mostrar segundos
        }
        });

        const linearChartData = ${JSON.stringify(linearChart)};

        // Add gradient area below the line
        const firstValue = linearChartData[0].value;
        const gradient = chart.addAreaSeries({
            topColor: '${dataFiles[symbol.symbol]}',
            bottomColor: '${theme.background}', // Mismo color que el topColor
            lineColor: 'rgba(0, 0, 0, 0)',
            lineWidth: 0,
            priceLineVisible: false,
        });
        gradient.setData([
            { time: linearChartData[0].time, value: firstValue },
            ...linearChartData,
        ]);
        chart.timeScale().fitContent(); 
        

        const lineSeries = chart.addLineSeries({
            color: '${dataFiles[symbol.symbol]}',
            lineWidth: 2,
        });
        lineSeries.setData(linearChartData);

        // Add current price line
        const lastValue = linearChartData[linearChartData.length - 1].value;
        chart.addLineSeries({
            priceLineVisible: true,
            color: '${dataFiles[symbol.symbol]}',
            lineWidth: 1,
            price: lastValue,
        });
    </script>
</body>
</html>
`;

  return (
    <View style={{ height: 380 }}>
      {loading && (
        <ActivityIndicator
          size="large"
          color="#00ff00"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      )}
      <WebView
        ref={webViewRef}
        originWhitelist={["*"]}
        source={{ html: htmlContent }}
        onMessage={(event) => {}}
        javaScriptEnabled={true}
        scrollEnabled={false}
        style={{ opacity: loading ? 0 : 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default TradingViewLinearChart;
