import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BigNumber from 'bignumber.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components';
import Navbar from '../../components/navbar';
import { getStyles } from './styles';
import { COLORS } from '../../constants';
import {
  getAssetsLittleLineCharts,
  getStoredPrices,
  selectAsset,
  selectCalculatedAsset,
} from '../../store/actions';
import LittleLineChart from '../../components/little-line-chart';
import webSocketService from '../../services/websocketService';
import { calculatePriceVariation, formatFiatValue } from '../../utils/prices';
import { useTheme } from '../../context/ThemeContext';
import { AnimatedNumber } from '../../animations';

function Assets({ navigation }) {
  const {
    assets,
    selectedAsset,
    selectedCalculatedAsset,
    assetsLittleLineCharts,
    storedPrices,
    totalBalance,
    totalLiquidityBalance,
    totalNonLiquidityBalance,
    balances,
    assetWithMaxCalculatedBalance,
  } = useSelector((state) => state.assets);
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const dispatch = useDispatch();

  const symbolImages = {
    btc: require('../../../assets/crypto-logos/btc.png'),
    eth: require('../../../assets/crypto-logos/eth.png'),
    doge: require('../../../assets/crypto-logos/doge.png'),
    usdc: require('../../../assets/crypto-logos/usdc.png'),
    ltc: require('../../../assets/crypto-logos/ltc.png'),
    sol: require('../../../assets/crypto-logos/sol.png'),
    usd: require('../../../assets/crypto-logos/usd.png'),
  };

  const handleAssetPress = (id) => {
    dispatch(selectAsset(id));
    navigation.navigate('MarketAsset');
  };

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        dispatch(getStoredPrices()),
        dispatch(getAssetsLittleLineCharts()),
        webSocketService.requestBalanceUpdate(),
      ]);
      setIsDataLoaded(true);
    };
    loadData();
  }, [dispatch]);
  useEffect(() => {
    if (selectedCalculatedAsset?.symbol === selectedAsset?.symbol) {
      let newAsset;
      switch (selectedCalculatedAsset?.symbol) {
        case 'USD':
          newAsset = 'USDC';
          break;
        default:
          newAsset = 'USD';
          break;
      }
      dispatch(selectCalculatedAsset(newAsset));
    }
  }, [selectedCalculatedAsset, selectedAsset, dispatch]);

  if (!isDataLoaded) {
    return (
      <ActivityIndicator
        size="large"
        color={COLORS.primaryLight}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      />
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} showBackButton={false} isHome />
      <Text style={styles.balanceTitle}>BALANCE TOTAL</Text>
      <View style={styles.balanceDetails}>
        <AnimatedNumber
          animateToNumber={new BigNumber(totalBalance).toFixed(2)}
          includeComma
          animationComplete
          symbol="$"
          name="USD"
          fontStyle={styles.fiatConvertedAmount}
        />
      </View>
      <Navbar navigation={navigation} />
      <View style={{ flex: 1, position: 'relative' }}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.sectionComponent}>
            <View style={styles.leftContainer}>
              <Image
                source={require('../../../assets/icons/dollar-circle.png')}
                style={styles.categoryImage}
                resizeMode="stretch"
              />
              <Text style={styles.titleStyle}>Cash</Text>
            </View>

            <View style={styles.rightContainer}>
              <Text style={styles.amountStyle}>
                $
                {totalLiquidityBalance
                  ? new BigNumber(totalLiquidityBalance).toFixed(2)
                  : '0.00'}
              </Text>
              <Text style={styles.percentageStyle}>4.00% Interés</Text>
            </View>
          </View>
          <View style={styles.sectionComponent}>
            <View style={styles.leftContainer}>
              <Image
                source={require('../../../assets/icons/billete-circle.png')}
                style={styles.categoryImage}
                resizeMode="stretch"
              />
              <Text style={styles.titleStyle}>Crypto</Text>
            </View>

            <View style={styles.rightContainer}>
              <Text style={styles.amountStyle}>
                ${new BigNumber(totalNonLiquidityBalance).toFixed(2) || '0.00'}
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
                if (item.isLiquidity) return;
                const assetChartData = assetsLittleLineCharts.find(
                  (chartData) =>
                    chartData.assetName.toLowerCase() ===
                    item.name.toLowerCase(),
                );

                const assetStoredPrice = storedPrices.find(
                  (storedPrice) =>
                    storedPrice.assetName.toLowerCase() ===
                    item.name.toLowerCase(),
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
                    openingPrice,
                  );
                  variationColor = priceVariation >= 0 ? COLORS.green : 'red';
                } else if (assetStoredPrice?.priceVariation) {
                  priceVariation = assetStoredPrice.priceVariation;
                  variationColor =
                    parseFloat(priceVariation) >= 0 ? COLORS.green : 'red';
                } else {
                  priceVariation = '0.00';
                  variationColor = 'grey';
                }

                return (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.cryptoItem}
                    onPress={() => handleAssetPress(item.id)}
                    disabled={false}
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
                          {formatFiatValue(displayPrice, item.priceDecimals)}
                        </Text>
                      </View>
                      <Text
                        style={[styles.variation, { color: variationColor }]}
                      >
                        {priceVariation >= 0 && '+'}
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
}

export default Assets;
