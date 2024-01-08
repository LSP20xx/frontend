import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

const Navbar = ({ navigation }) => {
  const navItems = [
    {
      text: "Recibir",
      icon: "chevron-down-sharp",
      route: "Receive",
      disabled: false,
    },
    {
      text: "Cambiar",
      icon: "swap-horizontal-sharp",
      route: "ProfileTab",
      disabled: true,
    },
    {
      text: "Enviar",
      icon: "chevron-up-sharp",
      route: "Send",
      disabled: false,
    },
  ];

  return (
    <View style={styles.navbar}>
      {navItems.map((item, index) => (
        <View style={styles.navItemContainer} key={index}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate(item.route)}
            disabled={item.disabled}
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
