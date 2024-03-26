import React, { useEffect } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { Header } from "../../components/index";
import { getStyles, styles } from "./styles";
import BigLineChart from "../../components/big-line-chart";
import { formatBalance, formatFiatValue } from "../../utils/prices";
import { useTheme } from "../../context/ThemeContext";
import webSocketService from "../../services/websocketService";

const MarketAsset = ({ navigation }) => {
  const { assets, selectedAsset, balances } = useSelector(
    (state) => state.assets
  );
  const { verified } = useSelector((state) => state.auth);
  const { blockchains } = useSelector((state) => state.blockchains);
  const assetBalance = balances.find(
    (balance) => balance.symbol === selectedAsset.symbol
  );
  const asset = assets.find((asset) => asset.symbol === selectedAsset.symbol);
  const assetFiatValue = asset ? asset.fiatValue : 0;
  const balance = assetBalance ? assetBalance.balance : 0;
  const description = blockchains.find(
    (blockchain) => blockchain.tokenSymbol === selectedAsset.symbol
  )?.description;
  const intervals = ["1m", "5m", "15m", "1H", "4H", "1D", "1W", "1M"];
  useEffect(() => {
    console.log("blockchains ***************", blockchains);
  }, [blockchains]);

  // useEffect(() => {
  //   webSocketService.subscribeToOhlcData(selectedAsset.symbol, "1m");
  // }, [selectedAsset]);

  const { theme } = useTheme();
  const styles = getStyles(theme);
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} showBackButton={true} />
      <View style={styles.chartContainer}>
        <BigLineChart symbol={selectedAsset.symbol} />
        <View style={styles.priceContainer}>
          <Text style={styles.symbolText}>{selectedAsset.symbol}</Text>
          <Text style={styles.nameText}>{selectedAsset.name}</Text>
          <Text style={styles.priceText}>${assetFiatValue}</Text>
          <Text style={styles.changeText}>+740.73 (1.68%)</Text>
        </View>
      </View>
      <View style={styles.temporalitiesContainer}>
        {["● LIVE", ...intervals].map((temporality) => (
          <TouchableOpacity key={temporality} style={styles.temporalityButton}>
            <Text style={styles.temporalityText}>{temporality}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.balanceContainer}>
        <View style={styles.column}>
          <Text style={styles.text}>Balance</Text>
          <Text style={styles.value}>
            {formatBalance(balance, asset.assetDecimals)} {selectedAsset.symbol}
          </Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.text}>Valor</Text>
          <Text style={styles.value}>
            ${formatFiatValue(assetBalance?.calculatedBalance)}
          </Text>
        </View>
      </View>
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity
          style={verified ? styles.button : styles.buttonDisabled}
        >
          <Text style={styles.buttonText}>Comprar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={verified ? styles.button : styles.buttonDisabled}
        >
          <Text style={styles.buttonText}>Vender</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.aboutContainer}>
        <Text style={styles.aboutTitle}>Acerca</Text>
        <Text style={styles.aboutText}>
          {description || "No hay descripción disponible"}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default MarketAsset;
