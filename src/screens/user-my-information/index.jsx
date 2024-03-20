// MyInformation.jsx
import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { getStyles } from "./styles";
import { Header } from "../../components";
import { useTheme } from "../../context/ThemeContext";
import { useSelector } from "react-redux";

const MyInformation = ({ navigation, showBackButton }) => {
  const { verified } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const options = [
    {
      id: 1,
      name: "Nombre completo",
      rightComponent: null,
    },
    {
      id: 2,
      name: "Email",
      rightComponent: null,
    },
    {
      id: 3,
      name: "Teléfono",
      rightComponent: null,
    },
  ];

  const handleVerify = () => {
    navigation.navigate("KYCVerification");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        navigation={navigation}
        showBackButton={showBackButton !== undefined ? showBackButton : true}
      />
      <View style={styles.sectionContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.sectionTitle}>Mi información</Text>
        </View>
        {!verified && (
          <View style={styles.subtitleContainer}>
            <Text style={styles.sectionSubtitle}>
              Realiza la verificación KYC para acceder a todas las funciones.
            </Text>
            <Button title="Verificar ahora" onPress={handleVerify} />
          </View>
        )}
        <ScrollView style={styles.listScrolLView}>
          {options.map((item) => {
            // const assetChartData = assetsLittleLineCharts.find(
            //   (chartData) =>
            //     chartData.assetName.toLowerCase() === item.name.toLowerCase()
            // );

            return (
              <View key={item.id} style={styles.optionItem}>
                <View style={styles.leftContainer}>
                  <Text style={styles.textContainer}>
                    <Text style={styles.cryptoName}>{item.name}</Text>
                  </Text>
                </View>
                <View style={styles.rightContainer}>{item.rightComponent}</View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default MyInformation;
