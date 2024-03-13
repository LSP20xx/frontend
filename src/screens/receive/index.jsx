import React, { useEffect } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { Header } from "../../components/index";
import Navbar from "../../components/navbar";
import { styles } from "./styles";
import QRCode from "react-native-qrcode-svg";
import { Clipboard, Alert } from "react-native";
import { SvgFromUri } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
const Receive = ({ navigation }) => {
  const { selectedAsset, balances } = useSelector((state) => state.assets);
  const assetBalance = balances.find(
    (balance) => balance.symbol === selectedAsset.symbol
  );
  const address = assetBalance ? assetBalance.address : "";

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
