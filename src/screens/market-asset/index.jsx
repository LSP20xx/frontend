import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "../../components/index";
import { getStyles, styles } from "./styles";
import {
  calculatePriceVariation,
  formatBalance,
  formatFiatValue,
} from "../../utils/prices";
import { useTheme } from "../../context/ThemeContext";
import TradingViewSimpleChart from "../../components/trading-view-simple-chart";
import { getCandlestickChart } from "../../store/actions";

const MarketAsset = ({ navigation }) => {
  const dispatch = useDispatch();
  const { assets, selectedAsset, balances, storedPrices } = useSelector(
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
  const assetOpening24h = asset ? asset.opening24h : 0;
  const priceVariation = calculatePriceVariation(
    assetFiatValue,
    assetOpening24h
  );
  const priceDifference = assetFiatValue - assetOpening24h;
  const description = blockchains.find(
    (blockchain) => blockchain.tokenSymbol === selectedAsset.symbol
  )?.description;
  const temporalities = ["1m", "5m", "15m", "1h", "4h", "1d", "1w", "1M"];
  const [selectedTemporality, setSelectedTemporality] = useState("1d");

  const { theme } = useTheme();
  const styles = getStyles(theme);

  useEffect(() => {
    dispatch(
      getCandlestickChart(selectedAsset.name.toLowerCase(), selectedTemporality)
    );
  }, [selectedAsset, selectedTemporality]);

  const formatPriceWithSymbol = (value) => {
    const formattedValue = formatFiatValue(Math.abs(value));
    return `${value < 0 ? "-" : "+"}$${formattedValue}`;
  };

  useEffect(() => {
    console.log("ASSET BALANCE", assetBalance);
    console.log("asset", asset);
  }, [assetBalance, asset]);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} showBackButton={true} />
      <View style={styles.chartContainer}>
        {/* <BigLineChart symbol={selectedAsset.symbol} /> */}
        <TradingViewSimpleChart />
        <View style={styles.priceContainer}>
          <Text style={styles.symbolText}>{selectedAsset.symbol}</Text>
          <Text style={styles.nameText}>{selectedAsset.name}</Text>
          <Text style={styles.priceText}>${assetFiatValue}</Text>
          <Text
            style={
              priceVariation >= 0
                ? styles.changeTextPositive
                : styles.changeTextNegative
            }
          >
            {formatPriceWithSymbol(priceDifference)} ({priceVariation}%)
          </Text>
        </View>
      </View>
      <View style={styles.temporalitiesContainer}>
        {["● LIVE", ...temporalities].map((temporality) => (
          <TouchableOpacity
            key={temporality}
            style={
              temporality === selectedTemporality
                ? styles.temporalityButtonSelected
                : styles.temporalityButton
            }
            onPress={() => {
              setSelectedTemporality(temporality);
            }}
          >
            <Text
              style={
                temporality === selectedTemporality
                  ? styles.temporalityTextSelected
                  : styles.temporalityText
              }
            >
              {temporality}
            </Text>
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
