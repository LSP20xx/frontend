import React from "react";

import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "../../components/index";

import { styles } from "./styles";
import { COLORS } from "../../constants";
import {
  calculatePriceVariation,
  formatFiatValue,
  formatBalance,
} from "../../utils/prices";
import { selectAsset } from "../../store/actions";

const AssetsList = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { assets, storedPrices, balances } = useSelector(
    (state) => state.assets
  );

  const { mode } = route.params;

  const title = mode === "recibir" ? "Recibir" : "Enviar";
  const subtitle =
    mode === "recibir"
      ? "Selecciona un activo para depositar"
      : "Selecciona un activo para retirar";

  const symbolImages = {
    btc: require("../../../assets/crypto-logos/btc.png"),
    eth: require("../../../assets/crypto-logos/eth.png"),
    doge: require("../../../assets/crypto-logos/doge.png"),
    usdt: require("../../../assets/crypto-logos/usdt.png"),
    ltc: require("../../../assets/crypto-logos/ltc.png"),
  };

  const handleAssetPress = (id) => {
    dispatch(selectAsset(id));
    if (mode === "recibir") {
      return navigation.navigate("Receive");
    } else if (mode === "enviar") {
      return navigation.navigate("Send");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} showBackButton={true} />
      <View style={styles.sectionContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        <View style={styles.subtitleContainer}>
          <Text style={styles.sectionSubtitle}>{subtitle}</Text>
        </View>
        <ScrollView style={styles.listScrolLView}>
          {assets.map((item) => {
            // const assetChartData = assetsLittleLineCharts.find(
            //   (chartData) =>
            //     chartData.assetName.toLowerCase() === item.name.toLowerCase()
            // );

            const balance = balances.find(
              (balance) => balance.symbol === item.symbol
            );

            const assetStoredPrice = storedPrices.find(
              (storedPrice) =>
                storedPrice.assetName.toLowerCase() === item.name.toLowerCase()
            );

            const displayPrice = item.fiatValue
              ? item.fiatValue
              : assetStoredPrice?.price;

            let priceVariation;

            if (item.fiatValue && item.opening24h) {
              const currentPrice = parseFloat(item.fiatValue);
              const openingPrice = parseFloat(item.opening24h);
              priceVariation = calculatePriceVariation(
                currentPrice,
                openingPrice
              );
              variationColor = priceVariation >= 0 ? COLORS.green : "red";
            } else if (assetStoredPrice?.priceVariation) {
              priceVariation = assetStoredPrice.priceVariation;
              variationColor =
                parseFloat(priceVariation) >= 0 ? COLORS.green : "red";
            } else {
              priceVariation = "0.00";
              variationColor = "grey";
            }

            return (
              <TouchableOpacity
                key={item.id}
                style={styles.cryptoItem}
                onPress={() => handleAssetPress(item.id)}
                disabled={item.disabled}
              >
                <View style={styles.leftContainer}>
                  <Image
                    source={symbolImages[item.symbol.toLowerCase()]}
                    style={styles.logo}
                  />
                  <View style={styles.textContainer}>
                    <Text style={styles.cryptoName}>{item.name}</Text>
                    <Text style={styles.cryptoSymbol}>
                      ${formatFiatValue(displayPrice)}
                    </Text>
                  </View>
                </View>

                <View style={styles.rightContainer}>
                  <View style={styles.amountRow}>
                    <Text style={styles.amount}>
                      {formatBalance(balance?.balance)} {item.symbol}
                    </Text>
                  </View>
                  <Text style={styles.calculatedBalance}>
                    ${formatFiatValue(balance?.calculatedBalance)}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AssetsList;
