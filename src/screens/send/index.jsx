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
import { createSelector } from "reselect";

import { formatBalance, formatFiatValue } from "../../utils/prices";
import BigNumber from "bignumber.js";
import { fetchBlockchains } from "../../store/actions/blockchains.action";
import {
  getAssetBalance,
  getAssetFiatValue,
} from "../../store/selectors/assets.selector";

BigNumber.config({ DECIMAL_PLACES: 18 });

const initialState = {
  toAddress: { value: "", error: "", touched: false, hasError: true },
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
  const { assets, selectedAsset, balances } = useSelector(
    (state) => state.assets
  );
  const balance = useSelector((state) =>
    getAssetBalance(state, selectedAsset.symbol)
  );
  const assetFiatValue = useSelector((state) =>
    getAssetFiatValue(state, selectedAsset.symbol)
  );

  const fiatSymbol = "USD";
  const [toAddress, setToAddress] = useState("");
  const [fromAddress, setFromAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [blockchainId, setBlockchainId] = useState("");
  const [calculatedAmount, setCalculatedAmount] = useState("");
  const [fontSize, setFontSize] = useState(52);
  const [margin, setMargin] = useState({ top: 16, left: 8 });
  const [isValidAddress, setIsValidAddress] = useState(true);
  const [isValidAmount, setIsValidAmount] = useState(true);
  const [withdrawFee, setWithdrawFee] = useState(0);
  const [isFiatPrimary, setIsAmountPrimary] = useState(true);
  const [errorMessages, setErrorMessages] = useState([]);
  const assetAmountInputRef = useRef(null);
  const rotateValueHolder = useRef(new Animated.Value(0)).current;
  const { blockchains } = useSelector((state) => state.blockchains);
  const [selectedBlockchain, setSelectedBlockchain] = useState();

  // const { blockchains } = useSelector((state) => state.blockchains);
  const supportedBlockchains = blockchains.filter(
    (blockchain) => blockchain.tokenSymbol === selectedAsset.symbol
  );

  const handleSendPress = () => {
    if (!errorMessages[0]) {
      navigation.navigate("Verification", {
        toAddress,
        fromAddress,
        amount,
        coin: selectedAsset.symbol,
        selectedBlockchain,
        verificationType: "send",
        blockchainId,
      });
    }
  };

  const validateFields = useCallback(() => {
    let error = "";
    if (!selectedBlockchain) {
      error = "Por favor, selecciona una red.";
    } else if (toAddress.trim() === "") {
      error = "Por favor, ingresa la dirección de envío.";
    } else if (!isValidAddress) {
      error = "La dirección es inválida.";
    } else if (amount.trim() === "") {
      error = "El monto no puede estar vacío.";
    } else {
      const amountBN = new BigNumber(amount || 0);
      const balanceBN = new BigNumber(balance || 0);
      const withdrawFeeBN = new BigNumber(withdrawFee || 0);
      const totalDeduction = amountBN.plus(withdrawFeeBN);
      if (!totalDeduction.isLessThanOrEqualTo(balanceBN)) {
        error =
          "El monto más la comisión de retiro excede el saldo disponible.";
      }
    }
    setErrorMessages([error]);
    return error === "";
  }, [
    selectedBlockchain,
    toAddress,
    isValidAddress,
    amount,
    withdrawFee,
    balance,
  ]);

  const handleAmountChange = useCallback(
    (text) => {
      const newText = text
        .replace(/^0+/, "0")
        .replace(/[^0-9.]/g, "")
        .replace(/(\..*?)\..*/g, "$1")
        .replace(/^(0\d)/g, "$1".slice(1));

      const finalText = newText === "." ? "0." : newText;
      setAmount(finalText);
      adjustFontSizeAndMargin(finalText);
    },
    [adjustFontSizeAndMargin]
  );

  const handleIconAnimation = () => {
    rotateValueHolder.setValue(0);

    Animated.timing(rotateValueHolder, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleAdjustFontSizeAndMargin = useCallback((text) => {
    let newFontSize = 52;
    let newMargin = { top: 16, left: 8 };
    if (text.length >= 10) {
      newFontSize = 22;
      newMargin = { top: 16, left: 14 };
    } else if (text.length >= 8) {
      newFontSize = 32;
      newMargin = { top: 16, left: 12 };
    } else if (text.length >= 6) {
      newFontSize = 42;
      newMargin = { top: 16, left: 10 };
    }
    setFontSize(newFontSize);
    setMargin(newMargin);
  }, []);

  const rotateData = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const adjustFontSizeAndMargin = useCallback((text) => {
    let newFontSize = 52;
    let newMargin = { top: -8, left: 8 };
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
    const amountBN = new BigNumber(amount || 0);
    const calculatedValue = !isFiatPrimary
      ? amountBN.times(assetFiatValue).toFixed(2)
      : amountBN.div(assetFiatValue).toFixed(selectedAsset.assetDecimals);
    setCalculatedAmount(calculatedValue);
  }, [amount, isFiatPrimary, assetFiatValue, selectedAsset.assetDecimals]);

  const handleSwapValues = () => {
    setIsAmountPrimary((current) => !current);
    setAmount((prevAmount) => {
      const tempAmount = calculatedAmount;
      setCalculatedAmount(prevAmount);
      // adjustFontSizeAndMargin(tempAmount);
      return tempAmount;
    });
  };

  useEffect(() => {
    if (selectedBlockchain) {
      const blockchain = supportedBlockchains.find(
        (blockchain) =>
          blockchain.blockchainSymbol === selectedBlockchain.split(" ")[0]
      );
      setWithdrawFee(blockchain.withdrawFee);
      setFromAddress(blockchain.walletAddress);
      setBlockchainId(blockchain.blockchainId);
    }
  }, [selectedBlockchain]);

  useEffect(() => {
    validateFields();
  }, [
    toAddress,
    amount,
    selectedBlockchain,
    withdrawFee,
    balance,
    validateFields,
  ]);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} showBackButton={true} />
      <View style={styles.assetConversionContainer}>
        <View style={styles.assetConversionContainerFirstColumn}>
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
              {isFiatPrimary
                ? fiatSymbol.toUpperCase()
                : selectedAsset.symbol.toUpperCase()}
            </Text>
          </View>

          <View style={styles.calculatedAssetAmountContainer}>
            <TouchableOpacity
              onPress={() => {
                handleIconAnimation();
                handleSwapValues();
                adjustFontSizeAndMargin(calculatedAmount);
              }}
            >
              <Animated.View style={{ transform: [{ rotate: rotateData }] }}>
                <Ionicons
                  name="sync"
                  size={48}
                  color={COLORS.greyLight}
                  style={styles.changeAssetIcon}
                />
              </Animated.View>
            </TouchableOpacity>
            <Text style={styles.calculatedAssetAmount}>
              {calculatedAmount}{" "}
              {isFiatPrimary
                ? selectedAsset.symbol.toUpperCase()
                : fiatSymbol.toUpperCase()}
            </Text>
          </View>
        </View>
        <View style={styles.assetConversionContainerSecondColumn}>
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
      </View>
      <View style={styles.feeContainer}>
        <TouchableOpacity style={styles.maxButton}>
          <Text style={styles.maxButtonText}>Max</Text>
        </TouchableOpacity>
        {selectedBlockchain && (
          <>
            {/* <Text style={styles.feeTitle}>Comisión de retiro:</Text> */}
            {/* <Text style={styles.feeValue}>
              {withdrawFee} {selectedAsset.symbol}
            </Text> */}
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
        value={toAddress}
        onChangeText={setToAddress}
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
