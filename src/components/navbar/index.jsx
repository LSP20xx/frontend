import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { getStyles, styles } from "./styles";
import { useSelector } from "react-redux";
import { useTheme } from "../../context/ThemeContext";
import ReceiveIcon from "../../../assets/icons/receive-icon.svg";
import SendIcon from "../../../assets/icons/send-icon.svg";
import ExchangeIcon from "../../../assets/icons/exchange-icon.svg";

import { SvgXml } from "react-native-svg";

const Navbar = ({ navigation }) => {
  const { verified } = useSelector((state) => state.auth);
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const getReceiveButtonSvg = () => {
    return `<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 90.85 59.78"><defs><style>.cls-1{fill:#fff;}</style></defs><polygon class="cls-1" points="90.85 14.35 45.43 59.78 45.43 59.78 45.42 59.78 0 14.35 14.35 0 45.43 31.07 76.5 0 90.85 14.35"/></svg>`;
  };

  const getSendIconSvg = () => {
    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 90.85 59.78" style="enable-background:new 0 0 90.85 59.78;" xml:space="preserve">
    <style type="text/css">
      .st0{fill:#FFFFFF;}
    </style>
    <polygon class="st0" points="90.85,45.43 45.43,0 45.43,0 45.43,0 0,45.43 14.35,59.78 45.43,28.7 76.5,59.78 "/>
    </svg>`;
  };

  const getExchangeButtonSvg = () => {
    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 81.84 79.21" style="enable-background:new 0 0 81.84 79.21;" xml:space="preserve">
    <style type="text/css">
      .st0{fill:#FFFFFF;}
    </style>
    <g>
      <polygon class="st0" points="81.84,10.42 21.08,10.42 21.08,0 0,20.57 21.08,41.14 21.08,30.72 81.84,30.72  "/>
      <polygon class="st0" points="0,48.49 60.76,48.49 60.76,38.07 81.84,58.64 60.76,79.21 60.76,68.8 0,68.8  "/>
    </g>
    </svg>`;
  };
  const navItems = [
    {
      text: "Recibir",
      icon: "chevron-down-sharp",
      route: "ReceiveList",
      disabled: false,
      function: getReceiveButtonSvg(),
    },
    {
      text: "Cambiar",
      icon: "swap-horizontal-sharp",
      route: "Convert",
      disabled: true,
      function: getExchangeButtonSvg(),
    },
    {
      text: "Enviar",
      icon: "chevron-up-sharp",
      route: "SendList",
      disabled: false,
      function: getSendIconSvg(),
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
            <SvgXml
              xml={item.function}
              width={50}
              height={50}
              stroke={theme.primaryLight}
              fill={theme.background}
            />
          </TouchableOpacity>
          <Text style={styles.navText}>{item.text}</Text>
        </View>
      ))}
    </View>
  );
};

export default Navbar;
