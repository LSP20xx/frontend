import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

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
    name: "Mi información",
    disabled: true,
  },
  {
    id: 2,
    name: "Seguridad",
    disabled: true,
  },
  {
    id: 3,
    name: "Notificaciones",
    disabled: true,
  },
  {
    id: 4,
    name: "Moneda local",
    disabled: true,
  },
  {
    id: 5,
    name: "Idioma",
    disabled: true,
  },
];

const UserConfig = ({ navigation, showBackButton }) => {
  const dispatch = useDispatch();
  const { assets, storedPrices, balances } = useSelector(
    (state) => state.assets
  );
  const { firstName, lastName, verified, verificationMethods } = useSelector(
    (state) => state.auth
  );

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
          {verified ? (
            <Text style={styles.sectionTitle}>
              {firstName} {lastName}
            </Text>
          ) : (
            <Text style={styles.sectionTitle}>Verificación pendiente</Text>
          )}
        </View>
        <View style={styles.subtitleContainer}>
          {verified ? (
            <View style={styles.subtitleContainer}>
              <Text style={styles.sectionSubtitle}>Usuario verificado</Text>
              <Ionicons
                name="shield-checkmark"
                size={32}
                color={COLORS.green}
                style={styles.verifiedIcon}
              />
            </View>
          ) : (
            <View style={styles.subtitleContainer}>
              <Text style={styles.sectionSubtitle}>Usuario no verificado</Text>
              <Ionicons
                name="close-circle"
                size={32}
                color={COLORS.error}
                style={styles.unverifiedIcon}
              />
            </View>
          )}
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
