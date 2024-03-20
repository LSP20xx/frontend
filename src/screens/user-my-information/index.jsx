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
import KYCVerification from "../../components/kyc-verification";

const MyInformation = ({ navigation, showBackButton }) => {
  const { verified } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const options = [
    {
      id: 1,
      name: "Paso 1/4",
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
          <KYCVerification />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default MyInformation;
