import React, { useRef, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { WebView } from "react-native-webview";
import { useTheme } from "../../context/ThemeContext";
import { getCandlestickChart } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";

// const ChartComponent = (props) => {
//   const {
//     data,
//     colors: {
//       backgroundColor = "white",
//       lineColor = "#2962FF",
//       textColor = "black",
//       areaTopColor = "#2962FF",
//       areaBottomColor = "rgba(41, 98, 255, 0.28)",
//     } = {},
//   } = props;

//   const chartContainerRef = useRef();

//   useEffect(() => {
//     const handleResize = () => {
//       chart.applyOptions({ width: chartContainerRef.current.clientWidth });
//     };

//     const chart = createChart(chartContainerRef.current, {
//       layout: {
//         background: { type: ColorType.Solid, color: backgroundColor },
//         textColor,
//       },
//       width: chartContainerRef.current.clientWidth,
//       height: 300,
//     });
//     chart.timeScale().fitContent();

//     const newSeries = chart.addAreaSeries({
//       lineColor,
//       topColor: areaTopColor,
//       bottomColor: areaBottomColor,
//     });
//     newSeries.setData(data);

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);

//       chart.remove();
//     };
//   }, [
//     data,
//     backgroundColor,
//     lineColor,
//     textColor,
//     areaTopColor,
//     areaBottomColor,
//   ]);

//   return <div ref={chartContainerRef} />;
// };

// const initialData = [
//   { time: "2018-12-22", value: 32.51 },
//   { time: "2018-12-23", value: 31.11 },
//   { time: "2018-12-24", value: 27.02 },
//   { time: "2018-12-25", value: 27.32 },
//   { time: "2018-12-26", value: 25.17 },
//   { time: "2018-12-27", value: 28.89 },
//   { time: "2018-12-28", value: 25.46 },
//   { time: "2018-12-29", value: 23.92 },
//   { time: "2018-12-30", value: 22.68 },
//   { time: "2018-12-31", value: 22.67 },
// ];

const TradingViewSimpleChart = () => {
  const webViewRef = useRef(null);
  const { theme } = useTheme();
  const { candlestickChart } = useSelector((state) => state.assets);
  const [loading, setLoading] = useState(true);

  {
    loading && (
      <ActivityIndicator
        size="large"
        color="#00ff00" // Cambia esto por el color que prefieras
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
    );
  }

  let filteredData =
    candlestickChart.length > 0 ? candlestickChart[0].filteredData : null;

  if (filteredData) {
    filteredData.shift();
  }

  console.log("MODIFIED DATA *************", filteredData);

  // const handleIncomingChartData = (data) => {
  //   const formattedData = transformChartData(data);
  //   webViewRef.current.postMessage(JSON.stringify(formattedData));
  // };

  // window.addEventListener("message", function (event) {
  //   const data = JSON.parse(event.data);
  //   candleSeries.update(data);
  // });

  // useEffect(() => {
  //   if (candlestickChart.filteredData) {
  //     webViewRef.current.postMessage(
  //       JSON.stringify(candlestickChart.filteredData)
  //     );
  //   }
  // }, [candlestickChart]);

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
        color: '#404040',
      },
      horzLines: {
        color: '#404040',
      },
    }, });
    const candleSeries = chart.addCandlestickSeries();
    const data = ${JSON.stringify(filteredData)};
    
    candleSeries.setData(data);

    if (data.length) {
      const endIndex = data.length - 1;
      const startIndex = endIndex - 30;
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

  // useEffect(() => {
  //     // Aquí puedes suscribirte a WebSocketService y escuchar los datos OHLC.
  //     // Suponiendo que tienes una función setupWebSocketListeners en tu servicio:
  //     WebSocketService.setupWebSocketListeners(handleIncomingChartData);

  //     return () => {
  //         // No olvides limpiar y desconectar los listeners al desmontar el componente.
  //         WebSocketService.disconnectWebSocketListeners(handleIncomingChartData);
  //     };
  // }, []);

  // const handleIncomingChartData = (data) => {
  //     const formattedData = transformChartData(data);
  //     webViewRef.current.postMessage(JSON.stringify(formattedData));
  // };

  // const transformChartData = (data) => {
  //     // Transforma los datos recibidos del WebSocket al formato esperado por el gráfico.
  //     return data; // Este es solo un placeholder. Ajusta según sea necesario.
  // };
  useEffect(() => {
    console.log("theme.background", theme.background);
  }, [theme.background]);
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
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onMessage={(event) => {}}
        javaScriptEnabled={true}
        style={{ opacity: loading ? 0 : 1 }}
      />
    </View>
  );
};

export default TradingViewSimpleChart;
