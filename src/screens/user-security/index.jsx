// Security.jsx
import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { styles } from "./styles";
import { Header } from "../../components";

const Security = ({ navigation, showBackButton }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        navigation={navigation}
        showBackButton={showBackButton !== undefined ? showBackButton : true}
      />
      <View style={styles.sectionContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.sectionTitle}>Seguridad</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Security;
