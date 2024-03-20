// LocalCurrency.jsx
import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { getStyles, styles } from "./styles";
import { Header } from "../../components";
import { useTheme } from "../../context/ThemeContext";

const LocalCurrency = ({ navigation, showBackButton }) => {
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
          <Text style={styles.sectionTitle}>Moneda local</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LocalCurrency;
