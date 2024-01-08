import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { Header } from "../../components";
import { styles } from "./styles";

const Confirm = ({ route, navigation }) => {
  const { address, amount, recommendedFeePerByte } = route.params;
  const [usdRate, setUsdRate] = useState(0);
  const [loading, setLoading] = useState(true);
  const [networkFeeBTC, setNetworkFeeBTC] = useState(0.0002);
  const [networkFeeInUSD, setNetworkFeeInUSD] = useState(0);
  const { selectedAsset } = useSelector((state) => state.assets);
  const amountInUSD = amount * usdRate;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const rateResponse = await axios.get(
          "https://api.coindesk.com/v1/bpi/currentprice/BTC.json"
        );
        const rate = rateResponse.data.bpi.USD.rate_float;
        console.log("amount", amount);
        setUsdRate(rate);
        setNetworkFeeBTC(networkFeeBTC);
        setNetworkFeeInUSD(rate * networkFeeBTC);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleConfirmTransaction = async (
    address,
    amount,
    recommendedFeePerByte
  ) => {
    const sendBitcoin = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/send-bitcoin",
          {
            address: address,
            amount: amount,
            recommendedFeePerByte: recommendedFeePerByte,
          }
        );
        console.log("response", response);
      } catch (error) {
        console.error("Error sending data: ", error);
      }
    };
    sendBitcoin();
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} showBackButton={true} />
      <Text style={styles.assetAmount}>
        {amount} {selectedAsset.symbol}
      </Text>
      <Text style={styles.convertedAssetAmount}>
        ${amountInUSD.toFixed(2)} USD
      </Text>
      <View style={styles.separator} />
      <View style={styles.labelContainer}>
        <Text style={styles.label}>From</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>14fYB93AzSvc4TatnLJVKMnPAiXYBRgQ6M</Text>
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>To</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{address}</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.rowContainer}>
        <Text style={{ ...styles.label, marginTop: 8 }}>Network Fee</Text>
        <Text
          style={{
            ...styles.text,
            marginBottom: 4,
          }}
        >
          {networkFeeBTC} BTC (${networkFeeInUSD.toFixed(2)})
        </Text>
      </View>
      <View
        style={{
          ...styles.separator,
          marginTop: 8,
        }}
      />
      <View style={styles.rowContainer}>
        <Text style={{ ...styles.label, marginTop: 8 }}>Max Total</Text>
        <Text style={{ ...styles.text, marginBottom: 4 }}>
          {parseFloat(
            (
              (amount * 100000000 + networkFeeBTC * 100000000) /
              100000000
            ).toFixed(8)
          )}{" "}
          BTC (${(amountInUSD + networkFeeInUSD).toFixed(2)})
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          handleConfirmTransaction(address, amount, recommendedFeePerByte)
        }
      >
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
