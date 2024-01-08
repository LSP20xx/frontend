import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../components";
import { styles } from "./styles";
import { COLORS } from "../../constants";
import { useSelector } from "react-redux";

const Send = ({ navigation }) => {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [recommendedFeePerByte, setRecommendedFeePerByte] = useState(0);
  const { selectedAsset } = useSelector((state) => state.assets);

  const handleSendPress = () => {
    navigation.navigate("Confirm", { address, amount, recommendedFeePerByte });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.blockchair.com/bitcoin/stats"
        );
        const recommendedFeePerByte =
          response.data.data.suggested_transaction_fee_per_byte_sat;
        setRecommendedFeePerByte(recommendedFeePerByte);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} showBackButton={true} />
      <Text style={styles.assetAmount}>0 {selectedAsset.symbol}</Text>
      <View style={styles.screenTitleContainer}>
        <Text style={styles.screenTitle}>Send {selectedAsset.symbol}</Text>
      </View>
      <TextInput
        placeholder="Address"
        placeholderTextColor={COLORS.greyLight}
        value={address}
        onChangeText={setAddress}
        style={styles.input}
      />
      <TextInput
        placeholder="Amount"
        placeholderTextColor={COLORS.greyLight}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />
      <View style={styles.separator} />
      <View style={styles.recentTransfersContainer}>
        <Text style={styles.recentTransfersTitle}>Recent transfers</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSendPress}
        disabled={!address && !amount}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Send;
