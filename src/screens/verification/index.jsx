import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "../../constants";
import {
  clearError,
  clearState,
  sendEmail,
  sendSMS,
  verifySmsCode,
} from "../../store/actions";
import { styles } from "./styles";

export const Verification = ({ navigation }) => {
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
  } = useSelector((state) => state.auth);
  const [code, setCode] = useState(new Array(6).fill(""));
  const [selectedVerificationMethod, setSelectedVerificationMethod] =
    useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const isCodeComplete = code.every((digit) => digit.trim() !== "");

  const inputs = [];

  const handleInput = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    if (text?.length === 1 && index < 5) {
      inputs[index + 1].focus();
    }
  };

  const title = "Verificación de seguridad";
  const buttonTitle = "Verificar";
  const messageText = "¿Necesitás otro método de verificación?";

  const onHandleChangeAuth = () => {};
  const onHandleVerification = () => {
    if (selectedVerificationMethod === "EMAIL") {
    } else if (selectedVerificationMethod === "SMS") {
      dispatch(verifySmsCode(phoneNumber, code.join(""), tempId, isLogin));
    }
  };

  const onHandleButtonModal = () => {
    dispatch(clearError());
  };

  const onHandleForgetPassword = () => {
    navigation.navigate("ForgetPassword");
  };

  const onHandleOnBackPress = () => {
    clearState();
    navigation.goBack();
  };

  const updateSelectedVerificationMethod = (method) => {
    setSelectedVerificationMethod(method);
  };

  const obfuscateEmail = (email) => {
    const [localPart, domain] = email.split("@");
    const obfuscatedLocal =
      localPart?.length > 2
        ? localPart.substring(0, 2) + "*".repeat(localPart?.length - 2)
        : localPart;
    return `${obfuscatedLocal}@${domain}`;
  };

  const obfuscatePhoneNumber = (phoneNumber) => {
    const visibleDigits = 4;
    return (
      "*".repeat(phoneNumber?.length - visibleDigits) +
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
    console.log("llega antes de enviar email o sms");
    if (selectedVerificationMethod === "EMAIL") {
      dispatch(sendEmail(email, "prueba", "hola mundo"));
    } else {
      console.log("llega antes de enviar sms");
      dispatch(sendSMS(phoneNumber));
    }
  }, []);

  useEffect(() => {
    const isCodeComplete = code.every((digit) => digit.trim() !== "");

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
    selectedVerificationMethod === "EMAIL"
      ? `Se enviará un código a ${obfuscateEmail(email)}`
      : `Se enviará un código a ${obfuscatePhoneNumber(phoneNumber)}`;

  return (
    <View style={styles.container}>
      {canResend ? (
        <TouchableOpacity onPress={resendCode} style={styles.resendButton}>
          <Text style={styles.resendButtonText}>Reenviar código</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.timerText}>
          Puede reenviarlo en: {timer} {timer === 1 ? "segundo" : "segundos"}
        </Text>
      )}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={onHandleOnBackPress}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back-outline" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.verificationTitle}>{verificationMessage}</Text>
        <View style={styles.inputContainer}>
          {code?.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.codeInput}
              maxLength={1}
              keyboardType="number-pad"
              onChangeText={(text) => handleInput(text, index)}
              value={digit}
              ref={(ref) => (inputs[index] = ref)}
            />
          ))}
        </View>

        <View style={styles.linkForgetPassword}>
          <TouchableOpacity
            style={styles.link}
            onPress={onHandleForgetPassword}
          >
            <Text style={styles.linkText}>
              ¿Metódo de verificación no disponible?
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.submitContainer}>
          <TouchableOpacity
            disabled={!isCodeComplete || isLoading}
            onPress={onHandleVerification}
            style={[styles.button]}
          >
            <Text style={styles.buttonText}>{buttonTitle}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.linkContainer}>
        <TouchableOpacity style={styles.link} onPress={onHandleChangeAuth}>
          <Text style={styles.linkTextBold}>{messageText}</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={hasError || isLoading} transparent animationType="fade">
        <View style={styles.containerStyle}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{error ? error : "Cargando"}</Text>
            {error ? (
              <Button
                title="OK"
                color={COLORS.primary}
                onPress={onHandleButtonModal}
              />
            ) : (
              <ActivityIndicator size="small" color={COLORS.primary} />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};