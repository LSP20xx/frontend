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

const OdometerAnimation = ({ value }) => {
  const digits = value.toString().split("");

  const animatedValues = digits.map(
    () => useRef(new Animated.Value(1)).current
  );

  useEffect(() => {
    const animations = animatedValues.map((animatedValue) =>
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      })
    );

    Animated.parallel(animations).start();
  }, [value, animatedValues]);

  return (
    <View style={{ flexDirection: "row" }}>
      {digits.map((digit, index) => (
        <Animated.Text
          key={index}
          style={{
            opacity: animatedValues[index],
          }}
        >
          {digit}
        </Animated.Text>
      ))}
    </View>
  );
};

const SendSetAmount = ({ route, navigation }) => {
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
      <View style={styles.row}>
        <View style={styles.columnOne}>
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>
              Cantidad de {selectedAsset.symbol} a enviar
            </Text>
          </View>
          <View style={styles.subtitleContainer}>
            <Text style={styles.sectionSubtitle}>
              Ingresa la cantidad a enviar
            </Text>
          </View>
        </View>
        <View style={styles.columnTwo}>
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

      <ScrollView contentContainerStyle={{ maxHeight: 600 }}>
        <View style={styles.assetConversionContainer}>
          {blockchainId && toAddress && (
            <>
              <View style={styles.assetConversionContainerFirstColumn}>
                <View style={styles.assetAmountContainerTop}>
                  <View style={styles.row}>
                    <View style={styles.columnOne}>
                      <View style={styles.row}>
                        {onMaxPress ? (
                          <TextInput
                            ref={assetAmountInputRef}
                            style={[styles.assetAmount, { fontSize: fontSize }]}
                            selectionColor={COLORS.primaryDark}
                            autoFocus={true}
                            keyboardType="decimal-pad"
                            value={
                              isFiatPrimary
                                ? new BigNumber(balance)
                                    .minus(withdrawFee)
                                    .times(assetFiatValue)
                                    .toFixed(2)
                                : new BigNumber(balance)
                                    .minus(withdrawFee)
                                    .toFixed(selectedAsset.assetDecimals)
                            }
                            onChangeText={(text) => {
                              setOnMaxPress(!onMaxPress);
                              setAmount(text);
                            }}
                          />
                        ) : (
                          <TextInput
                            ref={assetAmountInputRef}
                            style={[styles.assetAmount, { fontSize: fontSize }]}
                            selectionColor={COLORS.primaryDark}
                            autoFocus={true}
                            keyboardType="decimal-pad"
                            value={amount}
                            onChangeText={handleAmountChange}
                          />
                        )}
                        <Text
                          style={[
                            styles.selectedAsetSymbol,
                            { fontSize: fontSize },
                          ]}
                        >
                          {isFiatPrimary
                            ? fiatSymbol.toUpperCase()
                            : selectedAsset.symbol.toUpperCase()}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.columnTwo}>
                      {onMaxPress ? (
                        <TouchableOpacity
                          style={styles.maxButtonPressed}
                          onPress={() => {
                            setOnMaxPress(!onMaxPress);
                            // adjustFontSizeAndMargin(calculatedBalance);
                          }}
                        >
                          <Text style={styles.maxButtonTextOnPressed}>Máx</Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          style={styles.maxButton}
                          onPress={() => {
                            setOnMaxPress(!onMaxPress);
                            setAmount(
                              isFiatPrimary
                                ? new BigNumber(balance)
                                    .minus(withdrawFee)
                                    .times(assetFiatValue)
                                    .toFixed(2)
                                : new BigNumber(balance)
                                    .minus(withdrawFee)
                                    .toFixed(selectedAsset.assetDecimals)
                            );
                            adjustFontSizeAndMargin(
                              isFiatPrimary
                                ? new BigNumber(balance)
                                    .minus(withdrawFee)
                                    .times(assetFiatValue)
                                    .toFixed(2)
                                : new BigNumber(balance)
                                    .minus(withdrawFee)
                                    .toFixed(selectedAsset.assetDecimals)
                            );

                            // setOnMaxPress(!onMaxPress);
                            // setAmount(calculatedBalance);
                            // adjustFontSizeAndMargin(calculatedBalance);
                          }}
                        >
                          <Text style={styles.maxButtonText}>Máx</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>

                <View style={styles.calculatedAssetAmountColumn}>
                  {onMaxPress ? (
                    <Text
                      style={[
                        styles.calculatedAssetAmount,
                        { color: dataFiles[selectedAsset.symbol] },
                      ]}
                    >
                      {isFiatPrimary
                        ? new BigNumber(balance)
                            .minus(withdrawFee)
                            .toFixed(selectedAsset.assetDecimals)
                        : new BigNumber(balance)
                            .minus(withdrawFee)
                            .times(assetFiatValue)
                            .toFixed(2)}{" "}
                      {isFiatPrimary
                        ? selectedAsset.symbol.toUpperCase()
                        : fiatSymbol.toUpperCase()}
                    </Text>
                  ) : (
                    <Text
                      style={[
                        styles.calculatedAssetAmount,
                        { color: dataFiles[selectedAsset.symbol] },
                      ]}
                    >
                      {calculatedAmount}{" "}
                      {isFiatPrimary
                        ? selectedAsset.symbol.toUpperCase()
                        : fiatSymbol.toUpperCase()}
                    </Text>
                  )}
                  <View style={styles.calculatedAssetAmountContainer}>
                    <PressableSwapIcons
                      onPress={() => {
                        handleIconAnimation();
                        handleSwapValues();
                        adjustFontSizeAndMargin(calculatedAmount);
                      }}
                    />
                  </View>
                </View>
              </View>
            </>
          )}
        </View>

        <View style={styles.assetSendSetup}>
          <View style={styles.assetSendSetupRow}>
            <TouchableOpacity style={styles.assetSendSetupColumn}>
              <Image
                source={symbolImages[selectedAsset.symbol.toLowerCase()]}
                style={styles.selectedAssetImage}
              />
              <Text style={styles.networkLabel}>Red:</Text>
              <Text style={styles.networkName}>
                {blockchainName &&
                  blockchainName.charAt(0).toUpperCase() +
                    blockchainName.slice(1)}
              </Text>
              <TouchableOpacity>
                <Ionicons
                  name="chevron-down"
                  size={24}
                  color={COLORS.greyLight}
                  style={styles.dropdownIcon}
                />
              </TouchableOpacity>
            </TouchableOpacity>
            <View style={styles.availableBalanceContainer}>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <Text style={styles.amount}>
                      {isFiatPrimary
                        ? new BigNumber(balance)
                            .minus(withdrawFee)
                            .times(assetFiatValue)
                            .toFixed(2)
                        : new BigNumber(balance)
                            .minus(withdrawFee)
                            .toFixed(selectedAsset.assetDecimals)}
                    </Text>
                    <Text style={styles.symbol}>
                      {isFiatPrimary
                        ? fiatSymbol.toUpperCase()
                        : selectedAsset.symbol.toUpperCase()}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Text style={styles.available}>Disponible</Text>
                    <Ionicons
                      name="information-circle"
                      size={16}
                      color={COLORS.greyLight}
                      style={styles.infoIcon}
                    />
                  </View>

                  {/* <MaterialIcons name="info-outline" style={styles.icon} /> */}
                  {/* <MaterialIcons name="chevron-right" style={styles.icon} /> */}
                </View>
                <TouchableOpacity>
                  <Ionicons
                    name="chevron-forward"
                    size={24}
                    color={COLORS.greyLight}
                    style={styles.forwardIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.separator} />

          <View style={styles.assetSendSetupRow}>
            <TouchableOpacity style={styles.walletRow}>
              <View style={styles.walletIconContainer}>
                <View style={styles.walletIcon}>
                  <Ionicons name="wallet" size={15} color={theme.text} />
                </View>
              </View>

              <View>
                <Text style={styles.toTitle}>Destino</Text>
                <Text style={styles.toAddress}>Address</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <Ionicons
                name="chevron-forward"
                size={24}
                color={COLORS.greyLight}
                style={[styles.forwardIcon, { marginRight: 8 }]}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* <View style={styles.availableBalanceContainer}>
          <View style={styles.availableBalanceLeftContainer}>
            <Text style={styles.availableBalanceText}>Balance</Text>
            <Text style={styles.feeText}>Comisión</Text>
            <Text style={[styles.totalText, { paddingTop: 8 }]}>
              Disponible
            </Text>
          </View>
          <View style={styles.availableBalanceRightContainer}>
            <Text style={styles.availableBalanceText}>
              {isFiatPrimary
                ? new BigNumber(calculatedBalance).toFixed(2)
                : new BigNumber(balance).toFixed(
                    selectedAsset.assetDecimals
                  )}{" "}
              {isFiatPrimary ? fiatSymbol : selectedAsset.symbol}{" "}
            </Text>
            <Text style={styles.feeText}>
              -
              {isFiatPrimary
                ? new BigNumber(withdrawFee).times(assetFiatValue).toFixed(2)
                : new BigNumber(withdrawFee).toFixed(
                    selectedAsset.assetDecimals
                  )}{" "}
              {isFiatPrimary ? fiatSymbol : selectedAsset.symbol}{" "}
            </Text>
            <View style={styles.separator} />

            <Text style={styles.totalText}>
              {isFiatPrimary
                ? new BigNumber(calculatedBalance)
                    .minus(new BigNumber(withdrawFee).times(assetFiatValue))
                    .toFixed(2)
                : new BigNumber(balance)
                    .minus(withdrawFee)
                    .toFixed(selectedAsset.assetDecimals)}{" "}
              {isFiatPrimary ? fiatSymbol : selectedAsset.symbol}
            </Text>
          </View>
        </View> */}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSendPress}
          disabled={!!errorMessages[0]}
        >
          <Text style={styles.buttonText}>CONTINUAR</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SendSetAmount;
