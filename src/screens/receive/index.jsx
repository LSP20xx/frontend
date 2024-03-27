import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Alert,
  Clipboard,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { SvgFromUri } from "react-native-svg";
import { useSelector } from "react-redux";
import { Header } from "../../components/index";
import { useTheme } from "../../context/ThemeContext";
import { getStyles } from "./styles";
const Receive = ({ navigation }) => {
  const { selectedAsset, balances } = useSelector((state) => state.assets);
  const assetBalance = balances.find(
    (balance) => balance.symbol === selectedAsset.symbol
  );
  const address = assetBalance ? assetBalance.address : "";

  const { theme } = useTheme();
  const styles = getStyles(theme);

  const handlePress = () => {
    Clipboard.setString(address);
    Alert.alert("Address copied", "Address copied to clipboard.", [
      { text: "OK" },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} showBackButton={true} />
      <View style={styles.screenTitleContainer}>
        <Text style={styles.screenTitle}>Recibir {selectedAsset?.symbol}</Text>
      </View>
      <View style={styles.logoContainer}>
        <SvgFromUri uri={selectedAsset.logo} style={styles.logo} />
      </View>
      <View style={styles.qrCodeContainer}>
        <QRCode value={address} size={200} style={styles.qrCode} />
      </View>
      <View style={styles.addressContainer} onPress={handlePress}>
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.address}>{address}</Text>
        </TouchableOpacity>
        <Ionicons
          name="copy-sharp"
          style={styles.copyIcon}
          onPress={handlePress}
        />
      </View>
      <View style={styles.warningContainer}>
        <Text style={styles.warning}>
          Envía solo {selectedAsset.name} {`(${selectedAsset.symbol})`} a esta
          dirección.
        </Text>
        <Text style={styles.warning}>
          Si envías cualquier otro activo, podrías perderlo.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Receive;
