import React, { useEffect } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "../../components";
import Navbar from "../../components/navbar";
import { COLORS } from "../../constants";
import {
  getAssetsLittleLineCharts,
  getStoredPrices,
  selectAsset,
} from "../../store/actions";
import { styles } from "./styles";
import LittleLineChart from "../../components/little-line-chart";
import webSocketService from "../../services/websocketService";
import { calculatePriceVariation, formatFiatValue } from "../../utils/prices";

const Assets = ({ navigation }) => {
  const { assets, assetsLittleLineCharts, storedPrices, totalBalance } =
    useSelector((state) => state.assets);

  const dispatch = useDispatch();

  const symbolImages = {
    btc: require("../../../assets/crypto-logos/btc.png"),
    eth: require("../../../assets/crypto-logos/eth.png"),
    doge: require("../../../assets/crypto-logos/doge.png"),
    usdt: require("../../../assets/crypto-logos/usdt.png"),
    ltc: require("../../../assets/crypto-logos/ltc.png"),
  };

  const handleAssetPress = (id) => {
    dispatch(selectAsset(id));
    navigation.navigate("Asset");
  };

  useEffect(() => {
    dispatch(getStoredPrices());
    dispatch(getAssetsLittleLineCharts());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header showBackButton={false} />
      <Text style={styles.balanceTitle}>BALANCE TOTAL</Text>
      <View style={styles.balanceDetails}>
        <Text style={styles.fiatSymbol}>$</Text>
        <Text style={styles.fiatConvertedAmount}>
          {totalBalance ? formatFiatValue(totalBalance, 2) : "0.00"}
        </Text>
        <Text style={styles.fiatTicker}>USD</Text>
      </View>
      <Navbar navigation={navigation} />
      <View style={{ flex: 1, position: "relative" }}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.sectionComponent}>
            <View style={styles.leftContainer}>
              <Image
                source={require("../../../assets/icons/dollar-circle.png")}
                style={styles.categoryImage}
                resizeMode="stretch"
              />
              <Text style={styles.titleStyle}>Cash</Text>
            </View>

            <View style={styles.rightContainer}>
              <Text style={styles.amountStyle}>$0.00</Text>
              <Text style={styles.percentageStyle}>4.00% Interés</Text>
            </View>
          </View>
          <View style={styles.sectionComponent}>
            <View style={styles.leftContainer}>
              <Image
                source={require("../../../assets/icons/billete-circle.png")}
                style={styles.categoryImage}
                resizeMode="stretch"
              />
              <Text style={styles.titleStyle}>Crypto</Text>
            </View>

            <View style={styles.rightContainer}>
              <Text style={styles.amountStyle}>
                ${totalBalance ? formatFiatValue(totalBalance, 2) : "0.00"}
              </Text>
            </View>
          </View>
          <View style={styles.sectionContainer}>
            <View style={styles.leftContainer}>
              <Text style={styles.sectionTitle}>Popular</Text>
              <Text style={styles.sectionTitleTimeframe}>24hs</Text>
            </View>
            <ScrollView style={styles.popularScrolLView}>
              {assets.map((item) => {
                const assetChartData = assetsLittleLineCharts.find(
                  (chartData) =>
                    chartData.assetName.toLowerCase() ===
                    item.name.toLowerCase()
                );

                const assetStoredPrice = storedPrices.find(
                  (storedPrice) =>
                    storedPrice.assetName.toLowerCase() ===
                    item.name.toLowerCase()
                );

                const displayPrice = item.fiatValue
                  ? item.fiatValue
                  : assetStoredPrice?.price;

                let priceVariation;
                let variationColor;

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
                    disabled={true}
                  >
                    <View style={styles.leftContainer}>
                      <Image
                        source={symbolImages[item.symbol.toLowerCase()]}
                        style={styles.logo}
                      />
                      <View style={styles.textContainer}>
                        <Text style={styles.cryptoName}>{item.name}</Text>
                        <Text style={styles.cryptoSymbol}>
                          {item.symbol.toUpperCase()}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.middleContainer}>
                      {assetChartData ? (
                        <LittleLineChart
                          symbol={item.symbol}
                          last7DaysData={assetChartData.last7DaysData}
                        />
                      ) : null}
                    </View>
                    <View style={styles.rightContainer}>
                      <View style={styles.priceRow}>
                        <Text style={styles.priceFiatAmount}>$</Text>
                        <Text style={styles.price}>
                          {formatFiatValue(displayPrice)}
                        </Text>
                      </View>
                      <Text
                        style={[styles.variation, { color: variationColor }]}
                      >
                        {priceVariation >= 0 && "+"}
                        {priceVariation}%
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            {/* <View style={styles.categoriesContainer}>
          <View style={styles.row}>
            <View style={styles.column}>
              <TouchableOpacity style={styles.categoryContainer} onPress={() => onSelectedCategory('Restaurantes')}>
                <Text style={styles.categoryTitle}>Restaurantes</Text>
                <Image source={require('../../../assets/restaurantes.png')} style={styles.categoryImage} resizeMode='stretch'/>
              </TouchableOpacity>
            </View>
            <View style={styles.column}>
              <TouchableOpacity style={styles.categoryContainer} onPress={() => onSelectedCategory('Bares')}>
                <Text style={styles.categoryTitle}>Bares</Text>
                <Image source={require('../../../assets/bares.png')} style={styles.categoryImage} resizeMode='stretch'/>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <TouchableOpacity style={styles.categoryContainer} onPress={() => onSelectedCategory('Panaderías')}>
                <Text style={styles.categoryTitle}>Panaderías</Text>
                <Image source={require('../../../assets/panaderias.png')} style={styles.categoryImage} resizeMode='stretch'/>
              </TouchableOpacity>
            </View>
            <View style={styles.column}>
              <TouchableOpacity style={styles.categoryContainer} onPress={() => onSelectedCategory('Cafeterías')}>
                <Text style={styles.categoryTitle}>Cafeterías</Text>
                <Image source={require('../../../assets/cafeterias.png')} style={styles.categoryImage} resizeMode='stretch'/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Lugares cerca tuyo</Text>
        <FlatList
          style={styles.scrollContainer}
          horizontal
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderHomePlaceItem}
        />
        <Text style={styles.sectionTitle}>Lugares destacados</Text>
        <FlatList
          style={styles.scrollContainer}
          horizontal
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderHomePlaceItem}
        /> */}
          </View>
        </ScrollView>
        <View style={styles.scrollIndicator} />
      </View>
    </SafeAreaView>
  );
};

export default Assets;
