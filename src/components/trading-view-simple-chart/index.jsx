import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { WebView } from "react-native-webview";
import { useSelector } from "react-redux";
import { useTheme } from "../../context/ThemeContext";
import { COLORS } from "../../constants";
const TradingViewSimpleChart = () => {
  const webViewRef = useRef(null);
  const { theme } = useTheme();
  const { candlestickChart, loading } = useSelector((state) => state.assets);
  const [isLoading, setIsLoading] = useState(loading);

  let filteredData =
    candlestickChart.length > 0 ? candlestickChart[0].filteredData : null;

  const htmlContent = `<!DOCTYPE html>
  <html>
  <head>
    <title>TradingView Chart</title>
    <script src="https://unpkg.com/lightweight-charts/dist/lightweight-charts.standalone.production.js"></script>
    <style>
      body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background-color: ${
        theme.background
      }; }
      #chart { width: 100%; height: 100%; }
    </style>
  </head>
  <body>
    <div id="chart"></div>
    <script>

    function setChartDimensions() {
      const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

      return { width, height };
    }
    const { width, height } = setChartDimensions();
    const chart = LightweightCharts.createChart(document.getElementById("chart"), { width, height,     layout: {
      fontSize: 24,
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
    }, });
    const candleSeries = chart.addCandlestickSeries();
    const data = ${JSON.stringify(filteredData)};
    
    candleSeries.setData(data);

    if (data.length) {
      const endIndex = data.length - 1;
      const startIndex = endIndex - 100;
      const from = data[startIndex < 0 ? 0 : startIndex].time;
      const to = data[endIndex].time;

      chart.timeScale().setVisibleRange({ from, to });
    }
    

        window.updateChartData = (data) => {
          candleSeries.update(data);
        };
    </script>
  </body>
  </html>
  `;

  useEffect(() => {
    if (filteredData) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [filteredData]);

  useEffect(() => {
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  }, [filteredData]);

  return (
    <View style={{ height: 380 }}>
      {isLoading && (
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
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
        style={{ opacity: isLoading ? 0 : 1 }}
      />
    </View>
  );
};

export default TradingViewSimpleChart;
