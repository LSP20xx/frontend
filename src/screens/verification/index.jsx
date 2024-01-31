import { useEffect, useReducer, useState } from "react";
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
  checkEmailAuthData,
  checkPhoneNumberAuthData,
  clearError,
  clearState,
} from "../../store/actions";
import { UPDATE_FORM, onInputChange } from "../../utils/forms";
import { styles } from "./styles";

const initialState = {
  email: { value: "", error: "", touched: false, hasError: true },
  password: { value: "", error: "", touched: false, hasError: true },
  isFormValid: false,
};

const formatEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const formatPhoneNumber = /^[0-9]{7,20}$/;

const identifyInputType = (value) => {
  const formatValue = value.trim();
  if (formatEmail.test(formatValue)) {
    return "email";
  } else if (formatPhoneNumber.test(formatValue)) {
    return "phoneNumber";
  } else {
    return "unknown";
  }
};

const formReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_FORM:
      const { name, value, hasError, error, touched, isFormValid } =
        action.data;
      return {
        ...state,
        [name]: {
          ...state[name],
          value,
          hasError,
          error,
          touched,
        },
        isFormValid,
      };
  }
};

export const Verification = ({ navigation }) => {
  const dispatch = useDispatch();
  const { error, isLoading, hasError, token } = useSelector(
    (state) => state.auth
  );
  const [isLogin, setIsLogin] = useState(true);
  const [formState, dispatchFormState] = useReducer(formReducer, initialState);
  const [code, setCode] = useState(new Array(6).fill(""));
  const inputs = [];

  const handleInput = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    if (text.length === 1 && index < 5) {
      inputs[index + 1].focus();
    }
  };

  const title = isLogin ? "Verificación de seguridad" : "Registrarse";
  const buttonTitle = isLogin ? "Verificar" : "Registrarse";
  const messageText = isLogin
    ? "¿Necesitás otro método de verificación?"
    : "¿Ya creaste una cuenta?";

  const onHandleChangeAuth = () => {
    setIsLogin(!isLogin);
  };
  const onHandleAuth = () => {
    if (inputType === "phoneNumber") {
      const phoneNumberWithCode = `+${callingCode}${formState.email.value}`;
      dispatch(
        checkPhoneNumberAuthData({
          phoneNumber: phoneNumberWithCode,
          password: formState.password.value,
          isLogin,
        })
      );
    } else if (inputType === "email") {
      dispatch(
        checkEmailAuthData({
          email: formState.email.value,
          password: formState.password.value,
          isLogin,
        })
      );
    }
  };

  const onHandleButtonModal = () => {
    dispatch(clearError());
  };

  const onHandlerInputChange = ({ value, name }) => {
    if (name === "email") {
      const type = identifyInputType(value);
      setInputType(type);
    }
    onInputChange({ name, value, dispatch: dispatchFormState, formState });
  };

  const onHandleForgetPassword = () => {
    navigation.navigate("ForgetPassword");
  };

  const onEmailInputFocus = () => {
    if (formatPhoneNumber.test(formState.email.value.trim())) {
      setInputType("phoneNumber");
    }
  };

  const onHandleOnBackPress = () => {
    clearState();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
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
        <View style={styles.inputContainer}>
          {code.map((digit, index) => (
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
            disabled={!formState.isFormValid}
            onPress={onHandleAuth}
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
