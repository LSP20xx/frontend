import React, { useEffect } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
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
import { SafeAreaView } from "react-native-safe-area-context";

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
  const selectedAssetTransactions = false;
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
      <View style={styles.sectionContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.sectionTitle}>
            Historial de {selectedAsset.symbol}
          </Text>
        </View>
        <View style={styles.subtitleContainer}>
          <Text style={styles.sectionSubtitle}>
            Encuentra todas las transacciones realizadas
          </Text>
        </View>

        <ScrollView style={styles.scrollView}>
          {selectedAssetTransactions ? (
            <>
              <View style={styles.contactsContainer}>
                <View style={styles.contactsTitleContainer}>
                  <Text style={styles.favoritesTitle}>
                    {selectedAsset.symbol} recibido
                  </Text>
                  <TouchableOpacity>
                    <Text style={styles.showAllButton}>Ver todos</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.addressesContainer}>
                  <View style={styles.addressContainer}>
                    {/* <Ionicons name="wallet-outline" size={24} /> */}
                    <Image
                      source={symbolImages[selectedAsset.symbol.toLowerCase()]}
                      style={styles.logo}
                    />
                    <View style={styles.addressAndNameContainer}>
                      <Text style={styles.favoriteAddressName}>Lautaro</Text>
                      <Text style={styles.address}>0x2312424eafaf</Text>
                    </View>
                  </View>
                  <View style={styles.addressContainer}>
                    {/* <Ionicons name="wallet-outline" size={24} /> */}
                    <Image
                      source={symbolImages[selectedAsset.symbol.toLowerCase()]}
                      style={styles.logo}
                    />
                    <View style={styles.addressAndNameContainer}>
                      <Text style={styles.favoriteAddressName}>Lautaro</Text>
                      <Text style={styles.address}>0x2312424eafaf</Text>
                    </View>
                  </View>
                  <View style={styles.addressContainer}>
                    {/* <Ionicons name="wallet-outline" size={24} /> */}
                    <Image
                      source={symbolImages[selectedAsset.symbol.toLowerCase()]}
                      style={styles.logo}
                    />
                    <View style={styles.addressAndNameContainer}>
                      <Text style={styles.favoriteAddressName}>Lautaro</Text>
                      <Text style={styles.address}>0x2312424eafaf</Text>
                    </View>
                  </View>
                  {/* <TouchableOpacity style={styles.addToFavoritesContainer}>
                <View style={styles.addToFavoritesBackgroundCircle}></View>

                <Text style={styles.addToFavoritesButton}>
                  Agregar a favoritos
                </Text>
              </TouchableOpacity> */}
                </View>
              </View>
              <View style={styles.contactsContainer}>
                <View style={styles.contactsTitleContainer}>
                  <Text style={styles.favoritesTitle}>
                    {selectedAsset.symbol} enviados
                  </Text>
                  <TouchableOpacity>
                    <Text style={styles.showAllButton}>Ver todos</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.addressesContainer}>
                  <View style={styles.addressContainer}>
                    {/* <Ionicons name="wallet-outline" size={24} /> */}
                    <Image
                      source={symbolImages[selectedAsset.symbol.toLowerCase()]}
                      style={styles.logo}
                    />
                    <View style={styles.addressAndNameContainer}>
                      <Text style={styles.favoriteAddressName}>Lautaro</Text>
                      <Text style={styles.address}>0x2312424eafaf</Text>
                    </View>
                  </View>
                  <View style={styles.addressContainer}>
                    {/* <Ionicons name="wallet-outline" size={24} /> */}
                    <Image
                      source={symbolImages[selectedAsset.symbol.toLowerCase()]}
                      style={styles.logo}
                    />
                    <View style={styles.addressAndNameContainer}>
                      <Text style={styles.favoriteAddressName}>Lautaro</Text>
                      <Text style={styles.address}>0x2312424eafaf</Text>
                    </View>
                  </View>
                  <View style={styles.addressContainer}>
                    {/* <Ionicons name="wallet-outline" size={24} /> */}
                    <Image
                      source={symbolImages[selectedAsset.symbol.toLowerCase()]}
                      style={styles.logo}
                    />
                    <View style={styles.addressAndNameContainer}>
                      <Text style={styles.favoriteAddressName}>Lautaro</Text>
                      <Text style={styles.address}>0x2312424eafaf</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.scrollIndicator} />
            </>
          ) : (
            <View style={styles.receiveMessageContainer}>
              <Text style={styles.receiveMessage}>
                Ingresa en{" "}
                <Text style={styles.receiveButton} onPress={() => {}}>
                  Recibir
                </Text>{" "}
                para encontrar tu dirección de {selectedAsset.symbol}
              </Text>
            </View>
          )}
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

export default Asset;
