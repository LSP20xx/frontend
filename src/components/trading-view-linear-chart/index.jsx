import React, { useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const TradingViewLinearChart = () => {
  const [loading, setLoading] = useState(true);
  const chartHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Line Chart</title>
      <style>
        body, html {
          margin: 0;
          padding: 0;
          height: 100%;
          overflow: hidden;
        }
        #container {
          height: 100%;
          width: 100%;
        }
      </style>
      <script src="https://unpkg.com/lightweight-charts/dist/lightweight-charts.standalone.production.js"></script>
    </head>
    <body>
      <div id="container"></div>
      <script>
        const chart = LightweightCharts.createChart(document.getElementById('container'), {
          width: window.innerWidth,
          height: window.innerHeight,
          layout: {
            backgroundColor: '#ffffff',
            textColor: '#333',
          },
          grid: {
            vertLines: {
              color: '#e1ecf1',
            },
            horzLines: {
              color: '#e1ecf1',
            },
          },
        });
        
        const lineSeries = chart.addLineSeries();
        lineSeries.setData([
          { time: '2020-01-01', value: 50 },
          { time: '2020-01-02', value: 58 },
          { time: '2020-01-03', value: 56 },
          { time: '2020-01-04', value: 60 },
          // Puedes añadir más datos aquí
        ]);
        
        window.addEventListener('resize', () => {
          chart.applyOptions({ width: window.innerWidth, height: window.innerHeight });
        });
      </script>
    </body>
    </html>
  `;

  return (
    <View style={{ flex: 1 }}>
      {loading && (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.activityIndicator}
        />
      )}
      <WebView
        originWhitelist={["*"]}
        source={{ html: chartHTML }}
        onLoadEnd={() => setLoading(false)}
        javaScriptEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  activityIndicator: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TradingViewLinearChart;
