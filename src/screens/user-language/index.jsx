// Language.jsx
import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { styles } from "./styles";
import { Header } from "../../components";

const Language = ({ navigation, showBackButton }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        navigation={navigation}
        showBackButton={showBackButton !== undefined ? showBackButton : true}
      />
      <View style={styles.sectionContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.sectionTitle}>Idioma</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Language;
