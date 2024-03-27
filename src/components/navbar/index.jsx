import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { getStyles, styles } from "./styles";
import { useSelector } from "react-redux";
import { useTheme } from "../../context/ThemeContext";

const Navbar = ({ navigation }) => {
  const { verified } = useSelector((state) => state.auth);
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const navItems = [
    {
      text: "Recibir",
      icon: "chevron-down-sharp",
      route: "ReceiveList",
      disabled: false,
    },
    {
      text: "Cambiar",
      icon: "swap-horizontal-sharp",
      route: "WalletTab",
      disabled: true,
    },
    {
      text: "Enviar",
      icon: "chevron-up-sharp",
      route: "SendList",
      disabled: false,
    },
  ];

  useEffect(() => {
    console.log("verified", verified);
  }, [verified]);

  return (
    <View style={styles.navbar}>
      {navItems.map((item, index) => (
        <View style={styles.navItemContainer} key={index}>
          <TouchableOpacity
            style={verified ? styles.navItem : styles.navItemDisabled}
            onPress={() =>
              navigation.navigate(item.route, { mode: item.text.toLowerCase() })
            }
            disabled={!verified}
          >
            <Ionicons name={item.icon} style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.navText}>{item.text}</Text>
        </View>
      ))}
    </View>
  );
};

export default Navbar;
