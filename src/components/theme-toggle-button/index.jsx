import React, { useEffect, useState } from "react";
import { StyleSheet, Switch, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "../../context/ThemeContext";
import { COLORS } from "../../constants";

const ThemeToggleButton = (/* { isLightTheme, toggleTheme } */) => {
  const { theme, toggleTheme, isLightTheme } = useTheme();

  const toggleSwitch = () => {
    const newState = !isLightTheme;
    toggleTheme(newState);
  };

  useEffect(() => {
    console.log("isLightTheme", isLightTheme);
  }, [isLightTheme]);

  const styles = StyleSheet.create({
    toggleContainer: {
      flexDirection: "row",
      width: 70,
      height: 35,
      borderRadius: 35,
      backgroundColor: theme.primaryLight,
      overflow: "hidden",
    },
    iconContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    inactiveBackground: {
      backgroundColor: "#333",
    },
  });

  return (
    <TouchableOpacity
      onPress={toggleSwitch}
      style={styles.toggleContainer}
      activeOpacity={1}
    >
      <View
        style={[
          styles.iconContainer,
          isLightTheme ? null : styles.inactiveBackground,
        ]}
      >
        {isLightTheme ? (
          <MaterialCommunityIcons
            name="white-balance-sunny"
            size={24}
            color={theme.black}
            style={{ marginLeft: 2 }}
          />
        ) : null}
      </View>
      <View
        style={[
          styles.iconContainer,
          !isLightTheme ? null : styles.inactiveBackground,
        ]}
      >
        {!isLightTheme ? (
          <MaterialCommunityIcons
            name="weather-night"
            size={24}
            color={theme.black}
            style={{ marginRight: 2 }}
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default ThemeToggleButton;
