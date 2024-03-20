// Notifications.jsx
import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { getStyles } from "./styles";
import { Header } from "../../components";
import { useTheme } from "../../context/ThemeContext";

const Notifications = ({ navigation, showBackButton }) => {
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
          <Text style={styles.sectionTitle}>Notificaciones</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Notifications;
