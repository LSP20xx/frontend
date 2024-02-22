import axios from "axios";
import React, { useEffect, useReducer, useRef, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
// import { validateAddress } from "../../utils/address";
import { formatBalance } from "../../utils/prices";
import { onInputChange } from "../../utils/forms";
import formReducer from "../../store/reducers/form.reducer";
import { fetchBlockchains } from "../../store/actions";
import { Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const initialState = {
  address: { value: "", error: "", touched: false, hasError: true },
  isFormValid: false,
};

const symbolImages = {
  btc: require("../../../assets/crypto-logos/btc.png"),
  eth: require("../../../assets/crypto-logos/eth.png"),
  doge: require("../../../assets/crypto-logos/doge.png"),
  usdt: require("../../../assets/crypto-logos/usdt.png"),
  ltc: require("../../../assets/crypto-logos/ltc.png"),
};

const Send = ({ navigation }) => {
  const dispatch = useDispatch();
  const [formState, dispatchFormState] = useReducer(formReducer, initialState);
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [fontSize, setFontSize] = useState(52);
  const [margin, setMargin] = useState({ top: 16, left: 8 });
  const [recommendedFeePerByte, setRecommendedFeePerByte] = useState(0);
  const [isValidAddress, setIsValidAddress] = useState(true);
  const [isValidAmount, setIsValidAmount] = useState(true);
  const assetAmountInputRef = useRef(null);
  const { selectedAsset, balances } = useSelector((state) => state.assets);
  const { blockchains } = useSelector((state) => state.blockchains);
  const assetBalance = balances.find(
    (balance) => balance.symbol === selectedAsset.symbol
  );
  const balance = assetBalance ? assetBalance.balance : "0.00";
  const formattedBalance = formatBalance(balance);
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
    dispatch(fetchBlockchains(selectedAsset.symbol));
  }, []);

  const validateInput = (text) => {
    const regex = /^[0-9]*\.?[0-9]*$/;
    return regex.test(text);
  };

  const handleAmountChange = (text) => {
    if (validateInput(text)) {
      setAmount(text);
      if (text.length < 6) {
        setFontSize(52);
        setMargin({ top: 16, left: 8 });
      } else if (text.length < 8) {
        setFontSize(42);
        setMargin({ top: 12, left: 10 });
      } else if (text.length < 10) {
        setFontSize(32);
        setMargin({ top: 8, left: 12 });
      } else {
        setFontSize(22);
        setMargin({ top: -6, left: 14 });
      }
    }
  };

  useEffect(() => {
    console.log("blockchains", blockchains);
  }, [blockchains]);

  useEffect(() => {
    setAmount(formatBalance(balance));
  }, [balance]);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} showBackButton={true} />
      <View style={styles.assetConversionContainer}>
        <TextInput
          ref={assetAmountInputRef}
          style={[styles.assetAmount, { fontSize: fontSize }]}
          selectionColor={COLORS.primaryDark}
          autoFocus={true}
          keyboardType="decimal-pad"
          value={amount}
          onChangeText={handleAmountChange}
        />
        <Text
          style={[
            styles.selectedAssetSymbol,
            { marginTop: margin.top, marginLeft: margin.left },
          ]}
        >
          {selectedAsset.symbol.toUpperCase()}
        </Text>
        <TouchableOpacity
          style={styles.selectedAssetImageContainer}
          onPress={() =>
            navigation.navigate("SendList", {
              mode: "enviar",
            })
          }
        >
          <Image
            source={symbolImages[selectedAsset.symbol.toLowerCase()]}
            style={styles.selectedAssetImage}
          />
          <Ionicons name="chevron-down" size={24} color={COLORS.greyLight} />
        </TouchableOpacity>
      </View>
      <View style={styles.screenTitleContainer}>
        <Text style={styles.screenTitle}>Enviar {selectedAsset.symbol}</Text>
      </View>
      <TextInput
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
      />
      {!isValidAddress && <Text style={styles.errorText}>Invalid address</Text>}
      {/* <TextInput
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
      )} */}
      {/* <View style={styles.recentTransfersContainer}>
        <Text style={styles.recentTransfersTitle}>Historial de retiros</Text>
      </View> */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSendPress}
        // disabled={!address || !amount || !isValidAddress || !isValidAmount}
        disabled={!formState.isFormValid}
      >
        <Text style={styles.buttonText}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Send;
