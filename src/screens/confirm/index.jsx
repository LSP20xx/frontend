import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { Header } from "../../components";
import { styles } from "./styles";

const Confirm = ({ route, navigation }) => {
  const { address, amount, recommendedFeePerByte } = route.params;
  const { selectedAsset, balances } = useSelector((state) => state.assets);
  const assetBalance = balances.find(
    (balance) => balance.symbol === selectedAsset.symbol
  );

  const fromAddress = assetBalance ? assetBalance.address : "";
  const assetCalculatedBalance = assetBalance
    ? assetBalance.calculatedBalance
    : 0;

  useEffect(() => {
    console.log("assetBalance", assetBalance);
    console.log("fromAddress", fromAddress);
  }, []);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} showBackButton={true} />
      <Text style={styles.assetAmount}>
        {amount} {selectedAsset.symbol}
      </Text>
      <Text style={styles.convertedAssetAmount}>
        ${assetCalculatedBalance.toFixed(2)} USD
      </Text>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Desde</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{fromAddress}</Text>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Hasta</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{address}</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={{ ...styles.label, marginTop: 8 }}>Comisión</Text>
        <Text
          style={{
            ...styles.text,
            marginBottom: 4,
          }}
        >
          0
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
    // <View>
    //   <Text>
    //     Amount: {amount} BTC (${amountInUSD.toFixed(2)})
    //   </Text>
    //   <Text>From: {address}</Text>
    //   <Text>To: {address}</Text>
    //   <Text>
    //     Network Fee: {/*networkFee*/} BTC (${/*networkFeeInUSD.toFixed(2)*/})
    //   </Text>
    //   <Button title="Send" onPress={handleSendTransaction} />
    // </View>
  );
};

export default Confirm;
