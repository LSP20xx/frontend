import React, { useEffect } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
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
import { SafeAreaView } from "react-native-safe-area-context";

const Wallet = ({ navigation }) => {
  const { assets, assetsLittleLineCharts, storedPrices, totalBalance } =
    useSelector((state) => state.assets);
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const dispatch = useDispatch();

  const symbolImages = {
    btc: require("../../../assets/crypto-logos/btc.png"),
    eth: require("../../../assets/crypto-logos/eth.png"),
    doge: require("../../../assets/crypto-logos/doge.png"),
    usdc: require("../../../assets/crypto-logos/usdc.png"),
    usdt: require("../../../assets/crypto-logos/usdt.png"),
    ltc: require("../../../assets/crypto-logos/ltc.png"),
    sol: require("../../../assets/crypto-logos/sol.png"),
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
      <Header navigation={navigation} showBackButton={false} isHome={true} />
      <Text style={styles.balanceTitle}>BALANCE TOTAL</Text>
      <View style={styles.balanceDetails}>
        <Text style={styles.fiatSymbol}>$</Text>
        <Text style={styles.fiatConvertedAmount}>
          {totalBalance ? new BigNumber(totalBalance).toFixed(2) : "0.00"}
        </Text>
        <Text style={styles.fiatTicker}> USD</Text>
      </View>
      <Navbar navigation={navigation} />
      <View style={styles.sectionContainer}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.sectionComponent}>
            <View style={styles.titleAndLiquidityBalance}>
              <Text style={styles.titleStyle}>Cash</Text>
              <View style={styles.liquidityBalanceAndFiatSymbolContainer}>
                <Text style={styles.liquidityBalance}>$200.00</Text>
                <Text style={styles.liquidityFiatSymbol}> USD</Text>
              </View>
              <View style={styles.row}>
                <View style={styles.leftContainer}>
                  <Image
                    source={require("../../../assets/icons/dollar-circle.png")}
                    style={styles.logo}
                  />
                  <Text style={styles.liquiditySymbol}>USD</Text>
                </View>
              </View>

              <View style={styles.leftContainer}>
                <Image source={symbolImages["usdc"]} style={styles.logo} />
                <Text style={styles.liquiditySymbol}>USDC</Text>
                <Text style={styles.liquidityInterest}>4.00% interés</Text>
              </View>
              <View style={styles.leftContainer}>
                <Image source={symbolImages["usdt"]} style={styles.logo} />
                <Text style={styles.liquiditySymbol}>USDT</Text>
                <Text style={styles.liquidityInterest}>3.00% interés</Text>
              </View>

              {/* <View style={styles.rightContainer}>
                <Image
                  source={require("../../../assets/icons/dollar-circle.png")}
                  style={styles.categoryImage}
                  resizeMode="stretch"
                />
                <Text style={styles.liquiditySymbol}>USD</Text>
              </View> */}
            </View>

            <View style={styles.leftContainer}>
              {/* <Text style={styles.titleStyle}>Cash</Text> */}
            </View>

            <View style={styles.rightContainer}>
              {/* <Text style={styles.amountStyle}>$0.00</Text>
              <Text style={styles.percentageStyle}>4.00% Interés</Text> */}
            </View>
          </View>
          <View style={styles.sectionComponent}>
            <View style={styles.titleAndLiquidityBalance}>
              <Text style={styles.titleStyle}>Crypto</Text>
              <View style={styles.liquidityBalanceAndFiatSymbolContainer}>
                <Text style={styles.liquidityBalance}>
                  $
                  {totalBalance
                    ? new BigNumber(totalBalance).toFixed(2)
                    : "0.00"}
                </Text>
                <Text style={styles.liquidityFiatSymbol}> USD</Text>
              </View>
            </View>
            {/* <View style={styles.leftContainer}>
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
            </View> */}
          </View>
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
    </SafeAreaView>
  );
};

export default Wallet;
