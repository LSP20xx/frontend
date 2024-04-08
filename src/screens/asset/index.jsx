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
import { getStyles } from "./styles";
import { COLORS } from "../../constants";
import {
  getAssetsLittleLineCharts,
  getStoredPrices,
  selectAsset,
} from "../../store/actions";
import LittleLineChart from "../../components/little-line-chart";
import webSocketService from "../../services/websocketService";
import { calculatePriceVariation, formatFiatValue } from "../../utils/prices";
import BigNumber from "bignumber.js";
import { useTheme } from "../../context/ThemeContext";

const Asset = ({ navigation }) => {
  const {
    assets,
    assetsLittleLineCharts,
    storedPrices,
    totalBalance,
    selectedAsset,
    balances,
  } = useSelector((state) => state.assets);
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const dispatch = useDispatch();

  const balance = balances.find(
    (balance) => balance.symbol === selectedAsset.symbol
  );

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

  useEffect(() => {
    console.log("balance", balance);
  }, [balance]);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} showBackButton={true} />
      <Text style={styles.balanceTitle}>
        BALANCE {selectedAsset.name.toUpperCase()}
      </Text>
      <View style={styles.balanceDetails}>
        <Text style={styles.fiatSymbol}>$</Text>
        <Text style={styles.fiatConvertedAmount}>
          {balance
            ? new BigNumber(balance.calculatedBalance).toFixed(2)
            : "0.00"}
        </Text>
        <Text style={styles.fiatTicker}> USD</Text>
      </View>
      <Navbar navigation={navigation} />
      <View style={{ flex: 1, position: "relative" }}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.sectionContainer}>
            <View style={styles.leftContainer}>
              <Text style={styles.sectionTitle}>Historial</Text>
            </View>
            <ScrollView style={styles.popularScrolLView}>
              {assets.map((item) => {
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
                      {/* {assetChartData ? (
                        <LittleLineChart
                          symbol={item.symbol}
                          last7DaysData={assetChartData.last7DaysData}
                        />
                      ) : null} */}
                    </View>
                    <View style={styles.rightContainer}>
                      <View style={styles.priceRow}>
                        {/* <Text style={styles.priceFiatAmount}>$</Text> */}
                        <Text style={styles.price}>
                          {/* {formatFiatValue(displayPrice, item.priceDecimals)} */}
                        </Text>
                      </View>
                      <Text
                        style={[styles.variation, { color: variationColor }]}
                      >
                        {/* {priceVariation >= 0 && "+"}
                        {priceVariation}% */}
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

export default Asset;
