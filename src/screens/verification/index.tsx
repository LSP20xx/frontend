import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants';
import {
  clearError,
  clearState,
  sendEmail,
  sendSMS,
  verifyEmailCode,
  verifySmsCode,
  verifySmsCodeOnWithdraw,
} from '../../store/actions';
import { useTheme } from '../../context/ThemeContext';
import { getStyles } from './styles';

export function Verification({ navigation, route }) {
  const {
    toAddress,
    fromAddress,
    amount,
    coin,
    selectedBlockchain,
    verificationType,
    blockchainId,
  } = route.params || {};
  const dispatch = useDispatch();
  const {
    error,
    isLoading,
    isLogin,
    hasError,
    verificationMethods,
    email,
    phoneNumber,
    tempId,
    userId,
  } = useSelector((state) => state.auth);
  const [code, setCode] = useState(new Array(6).fill(''));
  const [selectedVerificationMethod, setSelectedVerificationMethod] =
    useState('');
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputsRef = useRef([]);
  const isCodeComplete = code.every((digit) => digit.trim() !== '');
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const handleInput = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyPress = ({ nativeEvent: { key } }, index) => {
    if (key === 'Backspace' && index > 0) {
      if (!code[index] || code[index] === '') {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  const title = 'Verificación de seguridad';
  const buttonTitle = 'Verificar';
  const messageText = '¿Necesitás otro método de verificación?';

  const onHandleChangeAuth = () => {};
  const onHandleVerification = () => {
    if (verificationType === 'send') {
      dispatch(
        verifySmsCodeOnWithdraw(
          phoneNumber,
          code.join(''),
          fromAddress,
          toAddress,
          amount,
          coin,
          userId,
          blockchainId,
        ),
      );
    } else if (selectedVerificationMethod === 'EMAIL') {
      dispatch(verifyEmailCode(email, code.join(''), tempId, isLogin));
    } else if (selectedVerificationMethod === 'SMS') {
      dispatch(verifySmsCode(phoneNumber, code.join(''), tempId, isLogin));
    }
    console.log(
      'Inicio de verificación. Método:',
      selectedVerificationMethod,
      'Código:',
      code.join(''),
      'Email:',
      email,
      'PhoneNumber:',
      phoneNumber,
      'tempId:',
      tempId,
      'isLogin:',
      isLogin,
    );
  };

  const onHandleButtonModal = () => {
    dispatch(clearError());
  };

  const onHandleForgetPassword = () => {
    navigation.navigate('ForgetPassword');
  };

  const onHandleOnBackPress = () => {
    clearState();
    navigation.goBack();
  };

  const updateSelectedVerificationMethod = (method) => {
    setSelectedVerificationMethod(method);
  };

  const obfuscateEmail = (email) => {
    if (!email) {
      return '';
    }

    const [localPart, domain] = email.split('@');
    const obfuscatedLocal =
      localPart?.length > 2
        ? localPart.substring(0, 2) + '*'.repeat(localPart?.length - 2)
        : localPart;
    return `${obfuscatedLocal}@${domain}`;
  };

  const obfuscatePhoneNumber = (phoneNumber) => {
    const visibleDigits = 4;
    return (
      '*'.repeat(phoneNumber?.length - visibleDigits) +
      phoneNumber?.slice(-visibleDigits)
    );
  };

  const resendCode = () => {
    setTimer(60);
    setCanResend(false);
  };

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((currentTimer) => currentTimer - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    console.log('email: ', email, 'phoneNumber: ', phoneNumber);
    console.log('selectedVerificationMethod: ', selectedVerificationMethod);
    if ((email || phoneNumber) && selectedVerificationMethod) {
      console.log(
        'Intentando enviar código. Método seleccionado:',
        selectedVerificationMethod,
        'Email:',
        email,
        'PhoneNumber:',
        phoneNumber,
      );
      if (selectedVerificationMethod === 'EMAIL') {
        dispatch(sendEmail(email, 'Verificación de seguridad', 'verification'));
      } else if (selectedVerificationMethod === 'SMS') {
        dispatch(sendSMS(phoneNumber));
      }
    }
  }, [selectedVerificationMethod, email, phoneNumber]);

  useEffect(() => {
    const isCodeComplete = code.every((digit) => digit.trim() !== '');

    if (isCodeComplete) {
      onHandleVerification();
    }
  }, [code]);

  useEffect(() => {
    if (verificationMethods && verificationMethods?.length > 0) {
      updateSelectedVerificationMethod(verificationMethods[0]);
    }
  }, [verificationMethods]);

  const verificationMessage =
    selectedVerificationMethod === 'EMAIL'
      ? `Se enviará un código a ${obfuscateEmail(email)}`
      : `Se enviará un código a ${obfuscatePhoneNumber(phoneNumber)}`;

  useEffect(() => {
    console.log('tempId: ', tempId);
    console.log('isLogin: ', isLogin);
  }, [tempId, isLogin]);

  const overlayStyle = {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 100,
  };

  return (
    <>
      {isLoading && <View style={overlayStyle} />}
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={onHandleOnBackPress}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back-outline" style={styles.backIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>

          <Text style={styles.verificationTitle}>{verificationMessage}</Text>
          <View style={styles.inputContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.codeInput}
                maxLength={1}
                keyboardType="number-pad"
                onChangeText={(text) => handleInput(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                value={digit}
                ref={(el) => (inputsRef.current[index] = el)}
              />
            ))}
          </View>

          <View style={styles.linkForgetPassword}>
            {canResend ? (
              <TouchableOpacity
                onPress={resendCode}
                style={styles.resendButton}
              >
                <Text style={styles.resendButtonText}>Reenviar código</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.timerText}>
                Puede reenviarlo en: {timer}{' '}
                {timer === 1 ? 'segundo' : 'segundos'}
              </Text>
            )}
          </View>
          {/* <View style={styles.submitContainer}>
            <TouchableOpacity
              disabled={!isCodeComplete}
              onPress={onHandleVerification}
              style={[styles.button]}
            >
              <Text style={styles.buttonText}>{buttonTitle}</Text>
            </TouchableOpacity>
          </View> */}
          {verificationType === 'send' && (
            <View style={styles.withdrawContainer}>
              <Text style={styles.withdrawTitle}>
                Envío de {amount} {coin}
              </Text>
              <Text style={styles.withdrawSubtitle}>
                Dirección de destino
                <View style={styles.separator} />
              </Text>

              <Text style={styles.withdrawDetails}>{toAddress}</Text>

              <Text style={styles.withdrawSubtitle}>
                Red
                <View style={styles.separator} />
              </Text>
              <Text style={styles.withdrawDetails}>{selectedBlockchain}</Text>
            </View>
          )}
        </View>
        <View style={styles.linkContainer}>
          <TouchableOpacity style={styles.link} onPress={onHandleChangeAuth}>
            <Text style={styles.linkTextBold}>{messageText}</Text>
          </TouchableOpacity>
        </View>
        <Modal visible={hasError} transparent animationType="fade">
          <View style={styles.containerStyle}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>{error || 'Cargando'}</Text>
              {error ? (
                <TouchableOpacity
                  onPress={onHandleButtonModal}
                  style={styles.modalButton}
                >
                  <Text style={styles.buttonText}>Ok</Text>
                </TouchableOpacity>
              ) : (
                <ActivityIndicator size="small" color={COLORS.primary} />
              )}
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
}
