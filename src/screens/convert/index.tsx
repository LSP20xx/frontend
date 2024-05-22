import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  Button,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createSelector } from 'reselect';
import BigNumber from 'bignumber.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ReactNativeModal as RNModal } from 'react-native-modal';
import { Header, RotatingArrows, SwipeButton } from '../../components';
import { COLORS } from '../../constants';
import { getStyles, styles } from './styles';

import formReducer from '../../store/reducers/form.reducer';
import { formatBalance, formatFiatValue } from '../../utils/prices';
import { fetchBlockchains } from '../../store/actions/blockchains.action';
import { validateAddress } from '../../utils/address';
import {
  getAssetAddress,
  getAssetBalance,
  getAssetFiatValue,
  getSpreadFiatValue,
  getCalculatedBalance,
  getAssetsBalances,
  getERC20TokensBalances,
} from '../../store/selectors/assets.selector';
import { useTheme } from '../../context/ThemeContext';
import PressableSwapIcons from '../../components/pressable-swap-icons';
import Navbar from '../../components/navbar';
import {
  convert,
  selectAsset,
  selectCalculatedAsset,
} from '../../store/actions';
import { AnimatedNumber } from '../../animations';
import webSocketService from '../../services/websocketService';

const initialState = {
  toAddress: { value: '', error: '', touched: false, hasError: true },
  isFormValid: false,
};

const symbolImages = {
  btc: require('../../../assets/crypto-logos/btc.png'),
  eth: require('../../../assets/crypto-logos/eth.png'),
  doge: require('../../../assets/crypto-logos/doge.png'),
  usdt: require('../../../assets/crypto-logos/usdt.png'),
  usdc: require('../../../assets/crypto-logos/usdc.png'),
  ltc: require('../../../assets/crypto-logos/ltc.png'),
  sol: require('../../../assets/crypto-logos/sol.png'),
  usd: require('../../../assets/crypto-logos/usd.png'),
};

function Convert({ route, navigation }) {
  const dispatch = useDispatch();
  const {
    assets,
    selectedAsset,
    selectedCalculatedAsset,
    balances,
    fiatBalances,
    tokensBalances,
  } = useSelector((state) => state.assets);

  const { userId } = useSelector((state) => state.auth);

  const symbolsWithId = assets.reduce((acc, asset) => {
    acc[asset?.symbol] = asset?.id;
    return acc;
  }, {});

  const [activeAssetType, setActiveAssetType] = useState('sell');

  const balance = useSelector((state) =>
    getAssetBalance(state, selectedAsset?.symbol),
  );

  const calculatedAssetBalance = useSelector((state) =>
    getAssetBalance(state, selectedCalculatedAsset?.symbol),
  );

  const spreadFiatValue = useSelector(
    (state) => getSpreadFiatValue(state, selectedAsset?.symbol) || '0',
  );

  const calculatedAssetSpreadFiatValue = useSelector(
    (state) =>
      getSpreadFiatValue(state, selectedCalculatedAsset?.symbol) || '0',
  );

  const assetFiatValue = useSelector((state) =>
    getAssetFiatValue(state, selectedAsset?.symbol),
  );
  const calculatedAssetFiatValue = useSelector((state) =>
    getAssetFiatValue(state, selectedCalculatedAsset?.symbol),
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = (type) => {
    setActiveAssetType(type);
    setIsModalVisible(!isModalVisible);
  };

  const calculateAmount = (inputAmount, rate) => {
    return new BigNumber(inputAmount).multipliedBy(rate).toFixed(2);
  };

  const [amount, setAmount] = useState('');
  const [calculatedAmount, setCalculatedAmount] = useState('');
  const [fontSize, setFontSize] = useState(52);
  const [margin, setMargin] = useState({ top: 16, left: 8 });
  const [onMaxPress, setOnMaxPress] = useState(false);
  const [isFiatPrimary, setIsAmountPrimary] = useState(true);
  const [errorMessages, setErrorMessages] = useState([]);
  const assetAmountInputRef = useRef(null);
  const rotateValueHolder = useRef(new Animated.Value(0)).current;

  const [resetSwipeButton, setResetSwipeButton] = useState(false);

  const { theme } = useTheme();

  const styles = getStyles(theme);

  const handleSendPress = () => {
    let result;
    if (isFiatPrimary && onMaxPress) {
      result = new BigNumber(balance).toFixed(selectedAsset.assetDecimals);
    } else if (isFiatPrimary && !onMaxPress) {
      result = new BigNumber(calculatedAmount).toFixed(
        selectedAsset.assetDecimals,
      );
    } else if (!isFiatPrimary && onMaxPress) {
      result = new BigNumber(balance).toFixed(selectedAsset.assetDecimals);
    } else if (!isFiatPrimary && !onMaxPress) {
      result = new BigNumber(amount).toFixed(selectedAsset.assetDecimals);
    }
    if (!errorMessages[0]) {
      console.log('ERROR**************************');
    }
  };

  const validateFields = useCallback(() => {
    const error = '';

    let amountBN;
    if (isFiatPrimary) {
      amountBN = new BigNumber(calculatedAmount);
    } else {
      amountBN = new BigNumber(amount || 0);
    }
    const balanceBN = new BigNumber(balance || 0);

    setErrorMessages([error]);
    return error === '';
  }, [amount, balance]);

  const handleAmountChange = useCallback(
    (text) => {
      const newText = text
        .replace(/^0+/, '0')
        .replace(/[^0-9.]/g, '')
        .replace(/(\..*?)\..*/g, '$1')
        .replace(/^(0\d)/g, '$1'.slice(1));

      const finalText = newText === '.' ? '0.' : newText;
      setAmount(finalText);
      adjustFontSizeAndMargin(finalText);
    },
    [adjustFontSizeAndMargin],
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
    outputRange: ['0deg', '180deg'],
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
        : amountBN.div(assetFiatValue).toFixed(selectedAsset?.assetDecimals);
      setCalculatedAmount(calculatedValue);
    }
  }, [amount, isFiatPrimary, assetFiatValue, selectedAsset?.assetDecimals]);

  useEffect(() => {
    if (amount && assetFiatValue) {
      const newCalculatedAmount = calculateAmount(amount, assetFiatValue);
      setCalculatedAmount(newCalculatedAmount);
    }
  }, [amount, assetFiatValue]);

  const handleSwapValues = () => {
    const currentCalculatedAssetId =
      symbolsWithId[selectedCalculatedAsset?.symbol];

    dispatch(selectAsset(currentCalculatedAssetId));
    dispatch(selectCalculatedAsset(selectedAsset?.symbol));
  };

  // useEffect(() => {
  //   console.log("SUPPORTED blockchains", supportedBlockchains);
  //   // const blockchain = supportedBlockchains.find(
  //   //   (blockchain) =>
  //   //     blockchain.blockchainSymbol === selectedBlockchain.split(" ")[0]
  //   // );
  //   const blockchain = supportedBlockchains[0];
  //   console.log("blockchain", blockchain);

  //   setWithdrawFee(blockchain.withdrawFee);
  //   setBlockchainId(blockchain.blockchainId);
  //   setBlockchainName(blockchain.blockchainName.split("-")[0]);
  // }, []);

  // useEffect(() => {
  //   console.log("fromAddress", fromAddress);
  // }, [balance]);

  // useEffect(() => {
  //   validateFields();
  // }, [
  //   toAddress,
  //   amount,
  //   selectedBlockchain,
  //   withdrawFee,
  //   balance,
  //   validateFields,
  // ]);

  // useEffect(() => {
  //   setCalculatedWithdrawFees(
  //     new BigNumber(withdrawFee).times(assetFiatValue).toFixed(2)
  //   );
  // }, [withdrawFee, assetFiatValue]);

  // useEffect(() => {
  //   const calculatedBalanceBN = new BigNumber(calculatedBalance).toFixed(2);
  //   setAmount(calculatedBalanceBN);
  //   adjustFontSizeAndMargin(calculatedBalanceBN);
  // }, [selectedAsset.assetDecimals]);

  // useEffect(() => {
  //   if (isAddingFavorite && isValidAddress) {
  //     nameInputRef.current && nameInputRef.current.focus();
  //   }
  // }, [isAddingFavorite, isValidAddress]);

  // const [animateToNumber, setAnimateToNumber] = React.useState(7979.12);

  // const increase = () => {
  //   setAnimateToNumber(animateToNumber + 123456789);
  // };

  const validNumber = (value) => {
    const number = new BigNumber(value);
    return number.isFinite() && !number.isNaN();
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} showBackButton />
      <View style={styles.titleContainer}>
        <Text style={styles.sectionTitle}>Cambiar</Text>
      </View>
      <View style={styles.subtitleContainer}>
        <Text style={styles.sectionSubtitle}>Seleccioná las dos monedas</Text>
      </View>
      {/* <AnimatedNumber
        includeComma={true}
        animateToNumber={animateToNumber}
        fontStyle={{ fontSize: 50, fontWeight: "bold" }}
      />
      <Button title="increase" onPress={increase} /> */}
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.convertContainer}>
          <View style={styles.firstAssetContainer}>
            <View style={styles.balanceRow}>
              <Text style={styles.convertTitle}>Quiero vender</Text>
              <View style={styles.availableBalanceContainer}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 4,
                  }}
                >
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        height: 16,
                      }}
                    >
                      {validNumber(balance) && (
                        <AnimatedNumber
                          animateToNumber={new BigNumber(balance).toFixed(
                            selectedAsset?.assetDecimals,
                          )}
                          fontStyle={styles.amount}
                          includeComma
                          name={selectedAsset?.symbol}
                        />
                      )}
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
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
            <TouchableOpacity
              style={styles.selectAsset}
              onPress={() => toggleModal('sell')}
            >
              <Image
                source={symbolImages[selectedAsset?.symbol.toLowerCase()]}
                style={styles.selectedAssetImage}
              />
              <Text style={styles.assetName}>{selectedAsset?.symbol}</Text>
              <Ionicons
                name="chevron-down"
                size={24}
                color={COLORS.greyLight}
              />
            </TouchableOpacity>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                // value={new BigNumber(balance).toFixed(
                //   selectedAsset?.assetDecimals
                // )}
                onChangeText={handleAmountChange}
                keyboardType="decimal-pad"
                value={amount}
              />
            </View>
          </View>

          <View style={styles.swapLineContainer}>
            <View style={styles.line} />
            <TouchableOpacity style={styles.iconContainer}>
              <PressableSwapIcons
                onPress={() => {
                  handleIconAnimation();
                  handleSwapValues();
                  adjustFontSizeAndMargin(calculatedAmount);
                }}
              />
            </TouchableOpacity>
            <View style={styles.line} />
          </View>
          <View style={styles.secondAssetContainer}>
            <View style={styles.balanceRow}>
              <Text style={styles.convertTitle}>Quiero comprar</Text>
              <View style={styles.availableBalanceContainer}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 4,
                  }}
                >
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        height: 16,
                      }}
                    >
                      {validNumber(balance) && (
                        <AnimatedNumber
                          animateToNumber={new BigNumber(
                            calculatedAssetBalance,
                          ).toFixed(selectedCalculatedAsset?.assetDecimals)}
                          fontStyle={styles.amount}
                          includeComma
                          name={selectedCalculatedAsset?.symbol}
                        />
                      )}
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
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
            <TouchableOpacity
              style={styles.selectAsset}
              onPress={() => toggleModal('buy')}
            >
              <Image
                source={
                  symbolImages[selectedCalculatedAsset?.symbol.toLowerCase()]
                }
                style={styles.selectedAssetImage}
              />
              <Text style={styles.assetName}>
                {selectedCalculatedAsset?.symbol}
              </Text>
              <Ionicons
                name="chevron-down"
                size={24}
                color={COLORS.greyLight}
              />
            </TouchableOpacity>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={
                  amount
                    ? new BigNumber(amount)
                        .multipliedBy(spreadFiatValue)
                        .dividedBy(calculatedAssetFiatValue)
                        .toFixed(selectedCalculatedAsset?.assetDecimals)
                    : ''
                }
                editable={false}
              />
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <SwipeButton
            onToggle={(isToggled) => {
              if (isToggled) {
                dispatch(
                  convert(
                    userId,
                    selectedAsset?.symbol,
                    selectedCalculatedAsset?.symbol,
                    amount,
                    calculatedAmount,
                  ),
                )
                  .then(() => {
                    webSocketService.requestBalanceUpdate(userId);
                  })
                  .finally(() => {
                    setResetSwipeButton(true);
                  })
                  .catch((error) => {
                    console.error('Error during conversion:', error);
                  });
              }
            }}
            reset={resetSwipeButton}
          />
        </View>
      </ScrollView>
      <RNModal
        isVisible={isModalVisible}
        swipeDirection={['up', 'left', 'right']}
        onSwipeComplete={toggleModal}
        style={styles.modal}
      >
        <View style={styles.modalContentContainer}>
          <TouchableOpacity onPress={toggleModal} style={styles.closeModal}>
            <Ionicons name="close" size={24} color={COLORS.greyLight} />
          </TouchableOpacity>
          {fiatBalances
            .sort((a, b) =>
              new BigNumber(b.calculatedBalance)
                .minus(new BigNumber(a.calculatedBalance))
                .toNumber(),
            )
            .map((fiatWallet) => {
              if (fiatWallet.currencySymbol === selectedAsset?.symbol) {
                return null;
              }

              return (
                <TouchableOpacity
                  style={styles.modalContent}
                  key={fiatWallet?.id}
                  onPress={() => {
                    if (activeAssetType === 'sell') {
                      dispatch(selectAsset(symbolsWithId[fiatWallet?.symbol]));
                    } else {
                      dispatch(selectCalculatedAsset(fiatWallet?.symbol));
                    }
                    toggleModal();
                  }}
                >
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    <Image
                      source={
                        symbolImages[fiatWallet.currencySymbol.toLowerCase()]
                      }
                      style={styles.selectedAssetImage}
                    />
                    <Text style={[styles.assetName, { marginTop: 2 }]}>
                      {fiatWallet.currencySymbol}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    <Text style={[styles.assetBalance, { marginTop: 2 }]}>
                      {new BigNumber(fiatWallet.balance).toFixed(2)}{' '}
                      {fiatWallet.currencySymbol}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          {tokensBalances.map((balance) => {
            return (
              <TouchableOpacity
                style={styles.modalContent}
                key={balance.id}
                onPress={() => {
                  if (activeAssetType === 'sell') {
                    dispatch(selectAsset(symbolsWithId[balance?.symbol]));
                  } else {
                    dispatch(selectCalculatedAsset(balance?.symbol));
                  }
                  toggleModal();
                }}
              >
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  <Image
                    source={symbolImages[balance?.symbol.toLowerCase()]}
                    style={styles.selectedAssetImage}
                  />
                  <Text style={[styles.assetName, { marginTop: 2 }]}>
                    {balance?.symbol}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  <Text style={[styles.assetBalance, { marginTop: 2 }]}>
                    {new BigNumber(balance.balance).toFixed(
                      balance?.assetDecimals,
                    )}{' '}
                    {balance?.symbol}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
          {balances
            .sort((a, b) =>
              new BigNumber(b.calculatedBalance)
                .minus(new BigNumber(a.calculatedBalance))
                .toNumber(),
            )
            .map((balance) => {
              if (balance?.symbol === selectedAsset?.symbol) {
                return null;
              }

              return (
                <TouchableOpacity
                  style={styles.modalContent}
                  key={balance.id}
                  onPress={() => {
                    if (activeAssetType === 'sell') {
                      dispatch(selectAsset(symbolsWithId[balance?.symbol]));
                    } else {
                      dispatch(selectCalculatedAsset(balance?.symbol));
                    }
                    toggleModal();
                  }}
                >
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    <Image
                      source={symbolImages[balance?.symbol.toLowerCase()]}
                      style={styles.selectedAssetImage}
                    />
                    <Text style={[styles.assetName, { marginTop: 2 }]}>
                      {balance?.symbol}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    <Text style={[styles.assetBalance, { marginTop: 2 }]}>
                      {new BigNumber(balance.balance).toFixed(
                        balance?.assetDecimals,
                      )}{' '}
                      {balance?.symbol}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
        </View>
      </RNModal>
    </SafeAreaView>
  );
}

export default Convert;
