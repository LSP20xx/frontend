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
import { Header, RotatingArrows } from "../../components";
import { COLORS } from "../../constants";
import { getStyles, styles } from "./styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "react-native";
import formReducer from "../../store/reducers/form.reducer";
import { createSelector } from "reselect";

import { formatBalance, formatFiatValue } from "../../utils/prices";
import BigNumber from "bignumber.js";
import { fetchBlockchains } from "../../store/actions/blockchains.action";
import { validateAddress } from "../../utils/address";
import {
  getAssetAddress,
  getAssetBalance,
  getAssetFiatValue,
  getCalculatedBalance,
} from "../../store/selectors/assets.selector";
import { useTheme } from "../../context/ThemeContext";
import PressableSwapIcons from "../../components/pressable-swap-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../../components/navbar";

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
  usdc: require("../../../assets/crypto-logos/usdc.png"),
  ltc: require("../../../assets/crypto-logos/ltc.png"),
  sol: require("../../../assets/crypto-logos/sol.png"),
};

const dataFiles = {
  BTC: "#F7941C",
  ETH: "#5F73B7",
  LTC: "#325F9F",
  DOGE: "#C3A835",
  USDC: "#2E74BA",
  SOL: "#000000",
};

const Convert = ({ route, navigation }) => {
  const { toAddress } = route.params;

  const { assets, selectedAsset, balances } = useSelector(
    (state) => state.assets
  );
  const balance = useSelector((state) =>
    getAssetBalance(state, selectedAsset.symbol)
  );

  const fromAddress = useSelector((state) =>
    getAssetAddress(state, selectedAsset.symbol)
  );

  const calculatedBalance = useSelector((state) =>
    getCalculatedBalance(state, selectedAsset.symbol)
  );

  const assetFiatValue = useSelector((state) =>
    getAssetFiatValue(state, selectedAsset.symbol)
  );

  useEffect(() => {
    console.log("balance", balance);
  }, [balance]);

  useEffect(() => {}, [assetFiatValue]);

  const fiatSymbol = "USD";
  const [amount, setAmount] = useState("");
  const [blockchainId, setBlockchainId] = useState("");
  const [blockchainName, setBlockchainName] = useState("");
  const [calculatedAmount, setCalculatedAmount] = useState("");
  const [fontSize, setFontSize] = useState(52);
  const [margin, setMargin] = useState({ top: 16, left: 8 });
  const [isValidAddress, setIsValidAddress] = useState(true);
  const [onMaxPress, setOnMaxPress] = useState(false);
  const [withdrawFee, setWithdrawFee] = useState(0);
  const [calculatedWithdrawFees, setCalculatedWithdrawFees] = useState([]);
  const [isFiatPrimary, setIsAmountPrimary] = useState(true);
  const [errorMessages, setErrorMessages] = useState([]);
  const assetAmountInputRef = useRef(null);
  const rotateValueHolder = useRef(new Animated.Value(0)).current;
  const { blockchains } = useSelector((state) => state.blockchains);
  const [selectedBlockchain, setSelectedBlockchain] = useState();
  const [blockchainsWithFees, setBlockchainsWithFees] = useState([]);
  // const { blockchains } = useSelector((state) => state.blockchains);
  const supportedBlockchains = blockchains.filter(
    (blockchain) => blockchain.tokenSymbol === selectedAsset.symbol
  );
  const [isAddingFavorite, setIsAddingFavorite] = useState(false);
  const addressInputRef = useRef(null);
  const nameInputRef = useRef(null);
  const { theme } = useTheme();

  const styles = getStyles(theme);

  useEffect(() => {
    const blockchainsWithCalculatedFees = blockchains
      .filter((blockchain) => blockchain.tokenSymbol === selectedAsset.symbol)
      .map((blockchain) => ({
        ...blockchain,
        calculatedWithdrawFee: new BigNumber(blockchain.withdrawFee)
          .times(assetFiatValue)
          .toFixed(2),
      }));

    setBlockchainsWithFees(blockchainsWithCalculatedFees);
  }, [blockchains, selectedAsset, assetFiatValue]);

  const handleSendPress = () => {
    let result;
    if (isFiatPrimary && onMaxPress) {
      result = new BigNumber(balance).toFixed(selectedAsset.assetDecimals);
    } else if (isFiatPrimary && !onMaxPress) {
      result = new BigNumber(calculatedAmount).toFixed(
        selectedAsset.assetDecimals
      );
    } else if (!isFiatPrimary && onMaxPress) {
      result = new BigNumber(balance).toFixed(selectedAsset.assetDecimals);
    } else if (!isFiatPrimary && !onMaxPress) {
      result = new BigNumber(amount).toFixed(selectedAsset.assetDecimals);
    }
    if (!errorMessages[0]) {
      navigation.navigate("Verification", {
        toAddress,
        fromAddress,
        // amount: Result,
        amount: 0,
        coin: selectedAsset.symbol,
        selectedBlockchain,
        verificationType: "send",
        blockchainId,
      });
    }
  };

  const validateFields = useCallback(() => {
    let error = "";
    /*  if (
      /*  (!selectedBlockchain) {
      error = "Por favor, selecciona una red.";
    } else if  toAddress.trim() === ""
    ) {
      error = "Por favor, ingresa la dirección de envío.";
    } else if (!isValidAddress) {
      error = "La dirección es inválida.";
    } */ if (amount.trim() === "") {
      error = "El monto no puede estar vacío.";
    } else {
      let amountBN;
      if (isFiatPrimary) {
        amountBN = new BigNumber(calculatedAmount);
      } else {
        amountBN = new BigNumber(amount || 0);
      }
      const balanceBN = new BigNumber(balance || 0);
      const withdrawFeeBN = new BigNumber(withdrawFee || 0);
      const totalDeduction = amountBN.plus(withdrawFeeBN);
      if (!totalDeduction.isLessThanOrEqualTo(balanceBN)) {
        error =
          "El monto más la comisión de retiro excede el saldo disponible.";
      }
      console.log("amount", amountBN.toString());
      console.log("balance", balanceBN.toString());
      console.log("withdrawFee", withdrawFeeBN.toString());
      console.log("totalDeduction", totalDeduction.toString());
      console.log(
        "isLessThanOrEqualTo",
        totalDeduction.isLessThanOrEqualTo(balanceBN)
      );
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

  // const handleAddressChange = (address) => {
  //   const trimmedAddress = address.trim();
  //   setToAddress(trimmedAddress);
  //   const isValid = validateAddress(trimmedAddress, selectedAsset.symbol, true);
  //   setIsValidAddress(isValid);
  // };

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
    if (!onMaxPress) {
      const amountBN = new BigNumber(amount || 0);
      const calculatedValue = !isFiatPrimary
        ? amountBN.times(assetFiatValue).toFixed(2)
        : amountBN.div(assetFiatValue).toFixed(selectedAsset.assetDecimals);
      setCalculatedAmount(calculatedValue);
    }
  }, [amount, isFiatPrimary, assetFiatValue, selectedAsset.assetDecimals]);

  const handleSwapValues = () => {
    setIsAmountPrimary((current) => !current);
    setAmount((prevAmount) => {
      const tempAmount = calculatedAmount;
      setCalculatedAmount(prevAmount);
      return tempAmount;
    });
  };

  useEffect(() => {
    console.log("SUPPORTED blockchains", supportedBlockchains);
    // const blockchain = supportedBlockchains.find(
    //   (blockchain) =>
    //     blockchain.blockchainSymbol === selectedBlockchain.split(" ")[0]
    // );
    const blockchain = supportedBlockchains[0];
    console.log("blockchain", blockchain);

    setWithdrawFee(blockchain.withdrawFee);
    setBlockchainId(blockchain.blockchainId);
    setBlockchainName(blockchain.blockchainName.split("-")[0]);
  }, []);

  useEffect(() => {
    console.log("fromAddress", fromAddress);
  }, [balance]);

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

  useEffect(() => {
    setCalculatedWithdrawFees(
      new BigNumber(withdrawFee).times(assetFiatValue).toFixed(2)
    );
  }, [withdrawFee, assetFiatValue]);

  // useEffect(() => {
  //   const calculatedBalanceBN = new BigNumber(calculatedBalance).toFixed(2);
  //   setAmount(calculatedBalanceBN);
  //   adjustFontSizeAndMargin(calculatedBalanceBN);
  // }, [selectedAsset.assetDecimals]);

  useEffect(() => {
    if (isAddingFavorite && isValidAddress) {
      nameInputRef.current && nameInputRef.current.focus();
    }
  }, [isAddingFavorite, isValidAddress]);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} showBackButton={true} />
      <View style={styles.titleContainer}>
        <Text style={styles.sectionTitle}>Cambiar</Text>
      </View>
      <View style={styles.subtitleContainer}>
        <Text style={styles.sectionSubtitle}>Seleccioná las dos monedas</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.convertContainer}>
          <View style={styles.firstAssetContainer}>
            <Text style={styles.convertTitle}>Quiero vender</Text>
            <TouchableOpacity style={styles.selectAsset}>
              <Image
                source={symbolImages[selectedAsset.symbol.toLowerCase()]}
                style={styles.selectedAssetImage}
              />
              <Text style={styles.assetName}>{selectedAsset.symbol}</Text>
              <Ionicons
                name="chevron-down"
                size={24}
                color={COLORS.greyLight}
              />
            </TouchableOpacity>
            <View style={styles.inputContainer}>
              <TextInput style={styles.textInput}></TextInput>
            </View>
          </View>
          <View style={styles.secondAssetContainer}>
            <Text style={styles.convertTitle}>Quiero comprar</Text>
            <TouchableOpacity style={styles.selectAsset}>
              <Image
                source={symbolImages["usdc"]}
                style={styles.selectedAssetImage}
              />
              <Text style={styles.assetName}>USDC</Text>

              <Ionicons
                name="chevron-down"
                size={24}
                color={COLORS.greyLight}
              />
            </TouchableOpacity>
            <View style={styles.inputContainer}>
              <TextInput style={styles.textInput}></TextInput>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>CONFIRMAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Convert;
