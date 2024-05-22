import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import BigNumber from 'bignumber.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components';
import Navbar from '../../components/navbar';
import { getStyles } from './styles';
import { useTheme } from '../../context/ThemeContext';

interface WalletProps {
  navigation: unknown;
}

interface Balance {
  symbol: string;
  calculatedBalance: number;
}

interface RootState {
  assets: {
    totalBalance: number;
    totalLiquidityBalance: number;
    totalNonLiquidityBalance: number;
    balances: Balance[];
  };
}

function Wallet({ navigation }: WalletProps) {
  const {
    totalBalance,
    totalLiquidityBalance,
    totalNonLiquidityBalance,
    balances,
  } = useSelector((state: RootState) => state.assets);

  const { theme } = useTheme();
  const styles = getStyles(theme);

  const usdBalance = balances.find((balance) => balance.symbol === 'USD');
  const usdcBalance = balances.find((balance) => balance.symbol === 'USDC');
  const usdtBalance = balances.find((balance) => balance.symbol === 'USDT');

  const symbolImages = {
    btc: require('../../../assets/crypto-logos/btc.png'),
    eth: require('../../../assets/crypto-logos/eth.png'),
    doge: require('../../../assets/crypto-logos/doge.png'),
    usdc: require('../../../assets/crypto-logos/usdc.png'),
    usdt: require('../../../assets/crypto-logos/usdt.png'),
    ltc: require('../../../assets/crypto-logos/ltc.png'),
    sol: require('../../../assets/crypto-logos/sol.png'),
    usd: require('../../../assets/crypto-logos/usd.png'),
  };

  const marginLeft198Top8 = { marginLeft: 198, marginTop: 8 };
  const marginLeft100Top8 = { marginLeft: 100, marginTop: 8 };
  const marginLeft103Top8 = { marginLeft: 103, marginTop: 8 };
  const marginLeft118Top8 = { marginLeft: 118, marginTop: 8 };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        navigation={navigation}
        showBackButton={false}
        isHome
        isUserConfig={false}
      />
      <Text style={styles.balanceTitle}>BALANCE TOTAL</Text>
      <View style={styles.balanceDetails}>
        <Text style={styles.fiatSymbol}>$</Text>
        <Text style={styles.fiatConvertedAmount}>
          {totalBalance ? new BigNumber(totalBalance).toFixed(2) : '0.00'}
        </Text>
        <Text style={styles.fiatTicker}> USD</Text>
      </View>
      <Navbar navigation={navigation} />
      <View style={styles.sectionContainer}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.sectionComponent}>
            <View style={styles.liquidityBalanceAndFiatSymbolContainer}>
              <Text style={styles.titleStyle}>Cash</Text>
              <View style={styles.liquidityBalanceAndFiatSymbolContainer}>
                <Text style={styles.liquidityBalance}>
                  ${new BigNumber(totalLiquidityBalance).toFixed(2)}
                </Text>
                <Text style={styles.liquidityFiatSymbol}> USD</Text>
              </View>
              <View style={styles.row}>
                <View style={styles.leftContainer}>
                  <Image
                    source={require('../../../assets/icons/dollar-circle.png')}
                    style={styles.logo}
                  />
                  <Text style={styles.liquiditySymbol}>USD</Text>
                  <Text style={[styles.liquidityBalance, marginLeft198Top8]}>
                    $
                    {new BigNumber(usdBalance?.calculatedBalance ?? 0).toFixed(
                      2,
                    )}
                  </Text>
                </View>
              </View>

              <View style={styles.leftContainer}>
                <Image source={symbolImages.usdc} style={styles.logo} />
                <Text style={styles.liquiditySymbol}>USDC</Text>
                <Text style={styles.liquidityInterest}>4.00% interés</Text>
                <Text style={[styles.liquidityBalance, marginLeft100Top8]}>
                  $
                  {new BigNumber(usdcBalance?.calculatedBalance ?? 0).toFixed(
                    2,
                  )}
                </Text>
              </View>
              <View style={styles.leftContainer}>
                <Image source={symbolImages.usdt} style={styles.logo} />
                <Text style={styles.liquiditySymbol}>USDT</Text>
                <Text style={styles.liquidityInterest}>3.00% interés</Text>
                <Text style={[styles.liquidityBalance, marginLeft103Top8]}>
                  $
                  {new BigNumber(usdtBalance?.calculatedBalance ?? 0).toFixed(
                    2,
                  )}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.sectionCryptoComponent}>
            <View style={styles.liquidityBalanceAndFiatSymbolContainer}>
              <Text style={styles.titleStyle}>Crypto</Text>
              <View style={styles.liquidityBalanceAndFiatSymbolContainer}>
                <Text style={styles.liquidityBalance}>
                  $
                  {totalNonLiquidityBalance
                    ? new BigNumber(totalNonLiquidityBalance).toFixed(2)
                    : '0.00'}
                </Text>
                <Text style={styles.liquidityFiatSymbol}> USD</Text>
              </View>
              <View style={styles.row}>
                <View style={styles.leftContainer}>
                  <Image source={symbolImages.btc} style={styles.logo} />
                  <Text style={styles.liquiditySymbol}>BTC</Text>
                  <Text style={[styles.liquidityBalance, marginLeft198Top8]}>
                    $0.00
                  </Text>
                </View>
              </View>

              <View style={styles.leftContainer}>
                <Image source={symbolImages.eth} style={styles.logo} />
                <Text style={styles.liquiditySymbol}>ETH</Text>
                <Text style={styles.liquidityInterest}>2.75% interés</Text>
                <Text style={[styles.liquidityBalance, marginLeft118Top8]}>
                  $0.00
                </Text>
              </View>
              <View style={styles.leftContainer}>
                <Image source={symbolImages.sol} style={styles.logo} />
                <Text style={styles.liquiditySymbol}>SOL</Text>
                <Text style={styles.liquidityInterest}>4.75% interés</Text>
                <Text style={[styles.liquidityBalance, marginLeft118Top8]}>
                  $0.00
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default Wallet;
