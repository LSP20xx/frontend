// Security.jsx
import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { getStyles } from "./styles";
import { Header } from "../../components";
import { useTheme } from "../../context/ThemeContext";

const KYCStep1 = ({ navigation, showBackButton }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  return (
    <SafeAreaView style={styles.container}>
      <Header
        navigation={navigation}
        showBackButton={showBackButton !== undefined ? showBackButton : true}
      />
      <View style={styles.sectionContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.sectionTitle}>Verificación KYC</Text>
        </View>
      </View>
      <View style={styles.subtitleContainer}>
        <Text style={styles.sectionSubtitle}>
          Paso 1/4: Información personal
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default KYCStep1;
