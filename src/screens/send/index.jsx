import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import {
  Animated,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "../../components";
import { COLORS } from "../../constants";
import { styles } from "./styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "react-native";
import formReducer from "../../store/reducers/form.reducer";
import { formatBalance, formatFiatValue } from "../../utils/prices";
import BigNumber from "bignumber.js";
import { fetchBlockchains } from "../../store/actions/blockchains.action";

BigNumber.config({ DECIMAL_PLACES: 18 });

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
  const fiatSymbol = "USD";
  const [formState, dispatchFormState] = useReducer(formReducer, initialState);
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [calculatedAmount, setCalculatedAmount] = useState("");
  const [fontSize, setFontSize] = useState(52);
  const [margin, setMargin] = useState({ top: 16, left: 8 });
  const [recommendedFeePerByte, setRecommendedFeePerByte] = useState(0);
  const [isValidAddress, setIsValidAddress] = useState(true);
  const [isValidAmount, setIsValidAmount] = useState(true);
  const [withdrawFee, setWithdrawFee] = useState(0);
  const [isAmountPrimary, setIsAmountPrimary] = useState(true);
  const [errorMessages, setErrorMessages] = useState([]);
  const assetAmountInputRef = useRef(null);
  const rotateValueHolder = useRef(new Animated.Value(0)).current;
  const { blockchains } = useSelector((state) => state.blockchains);
  const [selectedBlockchain, setSelectedBlockchain] = useState();
  const [selectedBlockchainName, setSelectedBlockchainName] = useState();
  const { assets, selectedAsset, balances } = useSelector(
    (state) => state.assets
  );
  const amountSymbol = isAmountPrimary ? selectedAsset.symbol : fiatSymbol;
  const calculatedAmountSymbol = isAmountPrimary
    ? fiatSymbol
    : selectedAsset.symbol;
  // const { blockchains } = useSelector((state) => state.blockchains);
  const assetBalance = balances.find(
    (balance) => balance.symbol === selectedAsset.symbol
  );
  const asset = assets.find((asset) => asset.symbol === selectedAsset.symbol);
  const assetFiatValue = asset ? asset.fiatValue : 0;
  const balance = assetBalance ? assetBalance.balance : 0;
  const supportedBlockchains = blockchains.filter(
    (blockchain) => blockchain.tokenSymbol === selectedAsset.symbol
  );

  // const handleSendPress = () => {
  //   if (parseFloat(amount) <= balance) {
  //     navigation.navigate("Confirm", {
  //       address,
  //       amount,
  //       recommendedFeePerByte,
  //     });
  //   } else {
  //     setIsValidAmount(parseFloat(amount) <= balance);
  //   }
  // };

  const validateFields = () => {
    // Inicia sin errores
    let error = "";

    // Verificación de la red seleccionada
    if (!selectedBlockchain) {
      error = "Por favor, selecciona una red.";
    }
    // Verificación de la dirección
    else if (address.trim() === "") {
      error = "Por favor, ingresa la dirección de envío.";
    } else if (!isValidAddress) {
      error = "La dirección es inválida.";
    }
    // Verificación del monto
    else if (amount.trim() === "") {
      error = "El monto no puede estar vacío.";
    } else {
      // Verificación del monto más la comisión de retiro
      const amountBN = new BigNumber(amount || 0);
      const withdrawFeeBN = new BigNumber(withdrawFee || 0);
      const balanceBN = new BigNumber(balance);
      const totalDeduction = amountBN.plus(withdrawFeeBN);
      if (!totalDeduction.isLessThanOrEqualTo(balanceBN)) {
        error =
          "El monto más la comisión de retiro excede el saldo disponible.";
      }
    }

    setErrorMessages([error]);
    return error === "";
  };

  const handleSendPress = () => {
    if (!errorMessages[0]) {
      navigation.navigate("Verification", {
        address,
        amount,
        assetSymbol: selectedAsset.symbol,
        selectedBlockchain,
        verificationType: "send",
      });
    }
  };

  const convertCryptoToFiat = (cryptoAmount, fiatValue) => {
    const amountBN = new BigNumber(cryptoAmount);
    const fiatValueBN = new BigNumber(fiatValue);
    return amountBN.times(fiatValueBN).toFixed(2, BigNumber.ROUND_DOWN);
  };

  const convertFiatToCrypto = (fiatAmount, fiatValue) => {
    const amountBN = new BigNumber(fiatAmount);
    const fiatValueBN = new BigNumber(fiatValue);
    return amountBN.div(fiatValueBN).toFixed(8, BigNumber.ROUND_HALF_UP);
  };

  const handleUseMaxAmount = () => {
    if (isAmountPrimary) {
      const maxAmount = formatBalance(balance, selectedAsset.assetDecimals);
      setAmount(maxAmount);
    } else {
      const maxFiat = convertCryptoToFiat(balance, assetFiatValue);
      setAmount(maxFiat);
    }
  };

  const handleIconAnimation = () => {
    rotateValueHolder.setValue(0);

    Animated.timing(rotateValueHolder, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const rotateData = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const adjustFontSizeAndMargin = useCallback((text) => {
    let newFontSize = 52;
    let newMargin = { top: 0, left: 8 };
    if (text.length >= 10) {
      newFontSize = 22;
      newMargin = { top: -22, left: 14 };
    } else if (text.length >= 8) {
      newFontSize = 32;
      newMargin = { top: -8, left: 12 };
    } else if (text.length >= 6) {
      newFontSize = 42;
      newMargin = { top: -4, left: 10 };
    }
    setFontSize(newFontSize);
    setMargin(newMargin);
  }, []);

  useEffect(() => {
    console.log("useEffect amount and assetFiatValue updated");
    const amountBN = new BigNumber(amount || 0);
    const assetFiatValueBN = new BigNumber(assetFiatValue || 0);
    // console.log("AmountBN:", amountBN.toString());
    if (isAmountPrimary) {
      const calculatedFiat = amountBN
        .times(assetFiatValueBN)
        .toFixed(2, BigNumber.ROUND_HALF_DOWN);
      setCalculatedAmount(calculatedFiat);
    } else {
      const calculatedCrypto = amountBN
        .div(assetFiatValueBN)
        .toFixed(selectedAsset.assetDecimals, BigNumber.ROUND_HALF_UP);
      setCalculatedAmount(calculatedCrypto);
    }
  }, [amount, isAmountPrimary, assetFiatValue, selectedAsset.assetDecimals]);

  const handleAmountChange = (text) => {
    // Limpiar y preparar el texto para convertirlo a un BigNumber
    const newText = text
      .replace(/^0+/, "0") // Elimina ceros a la izquierda
      .replace(/[^0-9.]/g, "") // Elimina caracteres no numéricos excepto el punto
      .replace(/(\..*?)\..*/g, "$1") // Solo permite un punto para decimales
      .replace(/^(0\d)/g, "$1".slice(1)); // Evita los ceros a la izquierda antes de dígitos

    const finalText = newText === "." ? "0." : newText;

    setAmount(finalText);
    adjustFontSizeAndMargin(finalText);

    if (finalText === "" || finalText === "0.") {
      setCalculatedAmount("0.00");
    } else {
      // Usa BigNumber para manejar el cálculo de la cantidad
      const numericAmount = new BigNumber(finalText || 0);
      const fiatValueBN = new BigNumber(assetFiatValue || 0);
      const calculatedFiatAmount = numericAmount
        .multipliedBy(fiatValueBN)
        .toFixed(2); // Esto asegura que el resultado tenga 2 decimales

      setCalculatedAmount(calculatedFiatAmount);
    }
  };

  useEffect(() => {
    console.log(
      "useEffect balance and selectedAsset updated",
      balance,
      selectedAsset
    );
    const initialAmount = formatBalance(balance, selectedAsset.assetDecimals);
    setAmount(initialAmount);
    adjustFontSizeAndMargin(initialAmount);
  }, [balance, adjustFontSizeAndMargin]);

  const handleSwapValues = () => {
    // console.log(
    //   "Before swap - amount:",
    //   amount,
    //   "calculatedAmount:",
    //   calculatedAmount,
    //   "isAmountPrimary:",
    //   isAmountPrimary
    // );

    setIsAmountPrimary((current) => !current);

    setAmount((prevAmount) => {
      const tempAmount = calculatedAmount;
      setCalculatedAmount(prevAmount);
      return tempAmount;
    });
  };

  useEffect(() => {
    console.log(
      "useEffect amount and calculatedAmount isAmountPrimary updated",
      amount,
      calculatedAmount,
      isAmountPrimary
    );

    // console.log(
    //   "After swap - amount:",
    //   amount,
    //   "calculatedAmount:",
    //   calculatedAmount,
    //   "isAmountPrimary:",
    //   isAmountPrimary
    // );
  }, [amount, calculatedAmount, isAmountPrimary]);

  useEffect(() => {
    if (selectedBlockchain) {
      const blockchain = supportedBlockchains.find(
        (blockchain) =>
          blockchain.blockchainSymbol === selectedBlockchain.split(" ")[0]
      );
      console.log("blockchain", blockchain);
      setWithdrawFee(blockchain.withdrawFee);
    }
  }, [selectedBlockchain]);

  useEffect(() => {
    console.log("useEffect run");
    validateFields();
  }, [address, amount, selectedBlockchain, withdrawFee, balance]);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} showBackButton={true} />
      <View style={styles.assetConversionContainer}>
        <View style={styles.assetAmountContainer}>
          <View style={styles.assetAmountContainerTop}>
            <TextInput
              ref={assetAmountInputRef}
              style={[styles.assetAmount, { fontSize: fontSize }]}
              selectionColor={COLORS.primaryDark}
              autoFocus={true}
              keyboardType="decimal-pad"
              value={amount}
              onChangeText={handleAmountChange}
            />
            <Text style={styles.selectedAssetSymbol}>
              {amountSymbol.toUpperCase()}
            </Text>
          </View>

          <View style={styles.calculatedAssetAmountContainer}>
            <TouchableOpacity
              onPress={() => {
                handleIconAnimation();
                handleSwapValues();
              }}
            >
              <Animated.View style={{ transform: [{ rotate: rotateData }] }}>
                <Ionicons
                  name="sync"
                  size={24}
                  color={COLORS.greyLight}
                  style={styles.changeAssetIcon}
                />
              </Animated.View>
            </TouchableOpacity>
            <Text style={styles.calculatedAssetAmount}>
              {calculatedAmount} {calculatedAmountSymbol.toUpperCase()}
            </Text>
          </View>
        </View>

        <TouchableOpacity onPress={handleUseMaxAmount} style={styles.maxButton}>
          <Text style={styles.maxButtonText}>Max</Text>
        </TouchableOpacity>
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
      <View style={styles.feeContainer}>
        {selectedBlockchain && (
          <>
            <Text style={styles.feeTitle}>Comisión de retiro:</Text>
            <Text style={styles.feeValue}>
              {withdrawFee} {selectedAsset.symbol}
            </Text>
          </>
        )}
      </View>

      <View style={styles.screenTitleContainer}>
        <Text style={styles.screenTitle}>Enviar {selectedAsset.symbol}</Text>
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedBlockchain}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedBlockchain(itemValue)
          }
          style={styles.pickerStyle}
          placeholderTextColor={COLORS.greyLight}
        >
          <Picker.Item
            label="Selecciona una red"
            value={null}
            style={styles.pickerItemNull}
          />
          {supportedBlockchains.map((blockchain) => (
            <Picker.Item
              key={blockchain.blockchainId}
              label={`${blockchain.blockchainSymbol} (${
                blockchain.blockchainName
                  .split("-")[0]
                  .charAt(0)
                  .toUpperCase() +
                blockchain.blockchainName.split("-")[0].slice(1)
              })`}
              value={`${blockchain.blockchainSymbol} (${
                blockchain.blockchainName
                  .split("-")[0]
                  .charAt(0)
                  .toUpperCase() +
                blockchain.blockchainName.split("-")[0].slice(1)
              })`}
              style={styles.pickerItemNotNull}
            />
          ))}
        </Picker>
      </View>

      <TextInput
        placeholder="Dirección de destino"
        placeholderTextColor={COLORS.greyLight}
        value={address}
        onChangeText={setAddress}
        style={styles.input}
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
      <View style={styles.errorContainer}>
        {!!errorMessages[0] && (
          <Text style={styles.errorText}>{errorMessages[0]}</Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleSendPress}
        disabled={!!errorMessages[0]}
      >
        <Text style={styles.buttonText}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Send;
