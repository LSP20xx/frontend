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
import { setSelectedAddress } from "../../store/actions/user.action";
import {
  getAssetAddress,
  getAssetBalance,
  getAssetFiatValue,
  getCalculatedBalance,
} from "../../store/selectors/assets.selector";
import { useTheme } from "../../context/ThemeContext";
import PressableSwapIcons from "../../components/pressable-swap-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

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

const Send = ({ navigation }) => {
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
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [blockchainId, setBlockchainId] = useState("");
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
  const [clipboardContent, setClipboardContent] = useState("");
  const { selectedAddress } = useSelector((state) => state.user);
  const styles = getStyles(theme);
  const dispatch = useDispatch();

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

  const handlePastePress = async () => {
    const content = await Clipboard.getString();
    setClipboardContent(content);
    setToAddress(content); // Esto pegará el contenido en el TextInput
  };

  const handleSendPress = () => {
    // let result;
    // if (isFiatPrimary && onMaxPress) {
    //   result = new BigNumber(balance).toFixed(selectedAsset.assetDecimals);
    // } else if (isFiatPrimary && !onMaxPress) {
    //   result = new BigNumber(calculatedAmount).toFixed(
    //     selectedAsset.assetDecimals
    //   );
    // } else if (!isFiatPrimary && onMaxPress) {
    //   result = new BigNumber(balance).toFixed(selectedAsset.assetDecimals);
    // } else if (!isFiatPrimary && !onMaxPress) {
    //   result = new BigNumber(amount).toFixed(selectedAsset.assetDecimals);
    // }
    if (!errorMessages[0]) {
      navigation.navigate("SendSetAmount", {
        toAddress,
        fromAddress,
        // amount: result,
        // amount: 0,
        coin: selectedAsset.symbol,
        selectedBlockchain,
        verificationType: "send",
        blockchainId,
      });
    }
  };

  const validateFields = useCallback(() => {
    let error = "";
    if (
      /*  (!selectedBlockchain) {
      error = "Por favor, selecciona una red.";
    } else if */ toAddress.trim() === ""
    ) {
      error = "Por favor, ingresa la dirección de envío.";
    } else if (!isValidAddress) {
      error = "La dirección es inválida.";
    } /* else if (amount.trim() === "") {
      error = "El monto no puede estar vacío.";
    }  else {
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
    }*/
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

  const handleAddressChange = (address) => {
    const trimmedAddress = address.trim();
    setToAddress(trimmedAddress);
    const isValid = validateAddress(trimmedAddress, selectedAsset.symbol, true);
    setIsValidAddress(isValid);

    if (isValid) {
      dispatch(setSelectedAddress(trimmedAddress));
    } else {
      dispatch(setSelectedAddress(null));
    }
  };

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
    if (selectedBlockchain) {
      const blockchain = supportedBlockchains.find(
        (blockchain) =>
          blockchain.blockchainSymbol === selectedBlockchain.split(" ")[0]
      );
      setWithdrawFee(blockchain.withdrawFee);
      setBlockchainId(blockchain.blockchainId);
    }
  }, [selectedBlockchain]);

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

  useFocusEffect(
    React.useCallback(() => {
      console.log("Screen is focused, selectedAddress:", selectedAddress);

      return () => {
        console.log("Screen is unfocused");
      };
    }, [selectedAddress])
  );
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} showBackButton={true} />

      <View style={styles.titleContainer}>
        <Text style={styles.sectionTitle}>Enviar {selectedAsset.symbol}</Text>
      </View>
      <View style={styles.subtitleContainer}>
        <Text style={styles.sectionSubtitle}>
          Ingresa la dirección de destino
        </Text>
      </View>
      <ScrollView contentContainerStyle={{ maxHeight: 600 }}>
        {/* <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedBlockchain}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedBlockchain(itemValue)
          }
          style={styles.pickerStyle}
          placeholderTextColor={theme.placeholder}
        >
          <Picker.Item
            label="Selecciona una red"
            value={null}
            style={styles.pickerItemNull}
          />
          {blockchainsWithFees.map((blockchain) => (
            <Picker.Item
              key={blockchain.blockchainId}
              label={`${blockchain.blockchainSymbol} (${
                blockchain.blockchainName
                  .split("-")[0]
                  .charAt(0)
                  .toUpperCase() +
                blockchain.blockchainName.split("-")[0].slice(1)
              })                             ${
                blockchain.calculatedWithdrawFee
              } ${fiatSymbol}`}
              value={blockchain.blockchainSymbol}
              style={styles.pickerItemNotNull}
            />
          ))}
        </Picker>
      </View> */}
        <TextInput
          placeholder="Dirección de destino"
          placeholderTextColor={theme.placeholder}
          value={selectedAddress ? selectedAddress : toAddress}
          onChangeText={handleAddressChange}
          ref={addressInputRef}
          style={[
            styles.input,
            toAddress === ""
              ? null
              : isValidAddress
              ? { borderColor: COLORS.green, borderWidth: 1 }
              : { borderColor: COLORS.error, borderWidth: 1 },
          ]}
        />

        <View style={styles.validationContainer}>
          {toAddress !== "" && (
            <Ionicons
              name={isValidAddress ? "shield-checkmark" : "close-circle"}
              size={16}
              color={isValidAddress ? COLORS.green : COLORS.red}
              style={styles.verifiedIcon}
            />
          )}
          {toAddress === "" ? (
            <Text style={styles.exampleAddressText}>
              Ej: 0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B{" "}
            </Text>
          ) : isValidAddress ? (
            <Text style={styles.validText}>Dirección válida</Text>
          ) : (
            <Text style={styles.errorText}>Dirección inválida</Text>
          )}
        </View>

        {isAddingFavorite && (
          <TextInput
            ref={nameInputRef}
            placeholder="Nombre del favorito"
            placeholderTextColor={theme.placeholder}
            style={styles.input}
          />
        )}
        <View style={styles.contactsContainer}>
          {false && (
            <View style={styles.contactsTitleContainer}>
              <Text style={styles.favoritesTitle}>Favoritos</Text>
              <TouchableOpacity>
                <Text style={styles.showAllButton}>Ver todos</Text>
              </TouchableOpacity>
            </View>
          )}
          {false && (
            <View style={styles.addressesContainer}>
              <View style={styles.addressContainer}>
                <Ionicons name="wallet-outline" size={24} />

                <View style={styles.addressAndNameContainer}>
                  <Text style={styles.favoriteAddressName}>Lautaro</Text>
                  <Text style={styles.address}>0x2312424eafaf</Text>
                </View>
              </View>
              <View style={styles.addressContainer}>
                <Ionicons name="wallet-outline" size={24} />

                <View style={styles.addressAndNameContainer}>
                  <Text style={styles.favoriteAddressName}>Lautaro</Text>
                  <Text style={styles.address}>0x2312424eafaf</Text>
                </View>
              </View>
              <View style={styles.addressContainer}>
                <Ionicons name="wallet-outline" size={24} />

                <View style={styles.addressAndNameContainer}>
                  <Text style={styles.favoriteAddressName}>Lautaro</Text>
                  <Text style={styles.address}>0x2312424eafaf</Text>
                </View>
              </View>
            </View>
          )}
        </View>
        {(toAddress === "" || isValidAddress) && !isAddingFavorite && (
          <TouchableOpacity
            style={styles.addToFavoritesContainer}
            onPress={() => {
              if (toAddress === "") {
                addressInputRef.current && addressInputRef.current.focus();
              } else if (isValidAddress) {
                setIsAddingFavorite(true);
              }
            }}
          >
            <View style={styles.addToFavoritesBackgroundCircle}>
              <Ionicons
                style={styles.addToFavoritesIcon}
                name="add-outline"
                size={24}
              />
            </View>
            <Text style={styles.addToFavoritesButton}>Agregar a favoritos</Text>
          </TouchableOpacity>
        )}
        {false && (
          <View style={styles.contactsContainer}>
            <View style={styles.contactsTitleContainer}>
              <Text style={styles.favoritesTitle}>Recientes</Text>
              <TouchableOpacity>
                <Text style={styles.showAllButton}>Ver todos</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.addressesContainer}>
              <View style={styles.addressContainer}>
                <Ionicons name="wallet-outline" size={24} />

                <View style={styles.addressAndNameContainer}>
                  <Text style={styles.favoriteAddressName}>Lautaro</Text>
                  <Text style={styles.address}>0x2312424eafaf</Text>
                </View>
              </View>
              <View style={styles.addressContainer}>
                <Ionicons name="wallet-outline" size={24} />

                <View style={styles.addressAndNameContainer}>
                  <Text style={styles.favoriteAddressName}>Lautaro</Text>
                  <Text style={styles.address}>0x2312424eafaf</Text>
                </View>
              </View>
              <View style={styles.addressContainer}>
                <Ionicons name="wallet-outline" size={24} />

                <View style={styles.addressAndNameContainer}>
                  <Text style={styles.favoriteAddressName}>Lautaro</Text>
                  <Text style={styles.address}>0x2312424eafaf</Text>
                </View>
              </View>
            </View>
          </View>
        )}
        {/* <View style={styles.assetConversionContainer}>
          {selectedBlockchain && toAddress && (
            <>
              <PressableSwapIcons
                onPress={() => {
                  handleIconAnimation();
                  handleSwapValues();
                  adjustFontSizeAndMargin(calculatedAmount);
                }}
              />
              <View style={styles.assetConversionContainerFirstColumn}>
                <View style={styles.assetAmountContainerTop}>
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
                  <Text style={styles.selectedAssetSymbol}>
                    {isFiatPrimary
                      ? fiatSymbol.toUpperCase()
                      : selectedAsset.symbol.toUpperCase()}
                  </Text>
                </View>

                <View style={styles.calculatedAssetAmountContainer}>
                  <View style={styles.calculatedAssetAmountColumn}>
                    {onMaxPress ? (
                      <Text style={styles.calculatedAssetAmount}>
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
                      <Text style={styles.calculatedAssetAmount}>
                        {calculatedAmount}{" "}
                        {isFiatPrimary
                          ? selectedAsset.symbol.toUpperCase()
                          : fiatSymbol.toUpperCase()}
                      </Text>
                    )}
                  </View>
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
                  <Ionicons
                    name="chevron-down"
                    size={24}
                    color={COLORS.greyLight}
                  />
                </TouchableOpacity>
                {onMaxPress ? (
                  <TouchableOpacity
                    style={styles.maxButtonPressed}
                    onPress={() => {
                      setOnMaxPress(!onMaxPress);
                      // adjustFontSizeAndMargin(calculatedBalance);
                    }}
                  >
                    <Text style={styles.maxButtonText}>Max</Text>
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
                    <Text style={styles.maxButtonText}>Max</Text>
                  </TouchableOpacity>
                )}
              </View>
            </>
          )}
        </View> */}
        {/*
      <View style={styles.availableBalanceContainer}>
         <View style={styles.availableBalanceLeftContainer}>
          <Text style={styles.availableBalanceText}>Balance</Text>
          <Text style={styles.feeText}>Comisión</Text>
          <Text style={[styles.totalText, { paddingTop: 8 }]}>Disponible</Text>
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
      </View>*/}
        {/* <View style={styles.feeContainer}>
        {selectedBlockchain && (
          <>
             <Text style={styles.feeTitle}>Comisión de retiro:</Text> 
          <Text style={styles.feeValue}>
              {withdrawFee} {selectedAsset.symbol}
            </Text> 
          </>
        )}
      </View> */}
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
        {/* <View style={styles.errorContainer}>
        {!!errorMessages[0] && (
          <Text style={styles.errorText}>{errorMessages[0]}</Text>
        )}
      </View> */}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSendPress}
          disabled={!!errorMessages[0]}
        >
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Send;
