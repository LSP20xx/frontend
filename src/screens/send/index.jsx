import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import {
  Button,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header, Input } from "../../components";
import { styles } from "./styles";
import { COLORS } from "../../constants";
import { useSelector } from "react-redux";
// import { validateAddress } from "../../utils/address";
import { formatBalance } from "../../utils/prices";
import { onInputChange } from "../../utils/forms";
import formReducer from "../../store/reducers/form.reducer";

const initialState = {
  address: { value: "", error: "", touched: false, hasError: true },
  isFormValid: false,
};

const Send = ({ navigation }) => {
  const [formState, dispatchFormState] = useReducer(formReducer, initialState);
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [recommendedFeePerByte, setRecommendedFeePerByte] = useState(0);
  const [isValidAddress, setIsValidAddress] = useState(true);
  const [isValidAmount, setIsValidAmount] = useState(true);
  const { selectedAsset, balances } = useSelector((state) => state.assets);
  const assetBalance = balances.find(
    (balance) => balance.symbol === selectedAsset.symbol
  );
  const balance = assetBalance ? assetBalance.balance : "";
  const assetCalculatedBalance = assetBalance
    ? assetBalance.calculatedBalance
    : 0;

  const onHandlerInputChange = ({ value, name }) => {
    onInputChange({ name, value, dispatch: dispatchFormState, formState });
  };

  const handleSendPress = () => {
    if (
      // validateAddress(address, selectedAsset.symbol, true) &&
      parseFloat(amount) <= balance
    ) {
      navigation.navigate("Confirm", {
        address,
        amount,
        recommendedFeePerByte,
      });
    } else {
      // setIsValidAddress(validateAddress(address, selectedAsset.symbol, true));
      setIsValidAmount(parseFloat(amount) <= balance);
    }
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
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} showBackButton={true} />
      <Text style={styles.assetAmount}>
        {formatBalance(balance)} {selectedAsset.symbol}
      </Text>
      <View style={styles.screenTitleContainer}>
        <Text style={styles.screenTitle}>Enviar {selectedAsset.symbol}</Text>
      </View>
      <Input
        placeholder="Dirección de destino"
        placeholderTextColor={COLORS.darkGray}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(text) =>
          onHandlerInputChange({ value: text, name: "address" })
        }
        // onFocus={onEmailInputFocus}
        value={formState.address.value}
        error={formState.address.error}
        touched={formState.address.touched}
        hasError={formState.address.hasError}
      />

      {/* <TextInput
        placeholder="Dirección de destino"
        placeholderTextColor={COLORS.greyLight}
        value={address}
        onChangeText={setAddress}
        style={styles.input}
        // onBlur={() =>
        //   setIsValidAddress(
        //     validateAddress(address, selectedAsset.symbol, true)
        //   )
        // }
      /> */}
      {!isValidAddress && <Text style={styles.errorText}>Invalid address</Text>}
      <TextInput
        placeholder="Cantidad a enviar"
        placeholderTextColor={COLORS.greyLight}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
        onBlur={() => setIsValidAmount(parseFloat(amount) <= balance)}
      />
      {!isValidAmount && (
        <Text style={styles.errorText}>
          La cantidad excede el saldo disponible
        </Text>
      )}
      <View style={styles.recentTransfersContainer}>
        <Text style={styles.recentTransfersTitle}>Historial de retiros</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSendPress}
        // disabled={!address || !amount || !isValidAddress || !isValidAmount}
        disabled={!formState.isFormValid}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Send;
