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

const options = [
  {
    id: 1,
    name: "Soporte",
    disabled: true,
  },
  {
    id: 2,
    name: "Seguridad",
    disabled: true,
  },
  {
    id: 3,
    name: "Moneda local",
    disabled: true,
  },
  {
    id: 4,
    name: "Idioma",
    disabled: true,
  },
  {
    id: 5,
    name: "Notificaciones",
    disabled: true,
  },
];

const UserConfig = ({ navigation, showBackButton }) => {
  const dispatch = useDispatch();
  const { assets, storedPrices, balances } = useSelector(
    (state) => state.assets
  );

  // Modificar título y subtítulo basado en el nuevo modo "markets"

  const symbolImages = {
    btc: require("../../../assets/crypto-logos/btc.png"),
    eth: require("../../../assets/crypto-logos/eth.png"),
    doge: require("../../../assets/crypto-logos/doge.png"),
    usdt: require("../../../assets/crypto-logos/usdt.png"),
    ltc: require("../../../assets/crypto-logos/ltc.png"),
  };

  const handleAssetPress = (id) => {
    dispatch(selectAsset(id));
    // if (mode === "recibir") {
    //   return navigation.navigate("Receive");
    // } else if (mode === "enviar") {
    //   return navigation.navigate("Send");
    // } else if (mode === "markets") {
    //   return navigation.navigate("MarketAsset");
    // }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        navigation={navigation}
        showBackButton={showBackButton !== undefined ? showBackButton : true}
      />
      <View style={styles.sectionContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.sectionTitle}>Configuración de usuario</Text>
        </View>
        <View style={styles.subtitleContainer}>
          <Text style={styles.sectionSubtitle}>
            Selecciona una opción para configurar
          </Text>
        </View>
        <ScrollView style={styles.listScrolLView}>
          {options.map((item) => {
            // const assetChartData = assetsLittleLineCharts.find(
            //   (chartData) =>
            //     chartData.assetName.toLowerCase() === item.name.toLowerCase()
            // );

            return (
              <TouchableOpacity
                key={item.id}
                style={styles.optionItem}
                onPress={() => handleAssetPress(item.id)}
                disabled={item.disabled}
              >
                <View style={styles.leftContainer}>
                  <View style={styles.textContainer}>
                    <Text style={styles.cryptoName}>{item.name}</Text>
                  </View>
                </View>

                <View style={styles.rightContainer}></View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default UserConfig;
