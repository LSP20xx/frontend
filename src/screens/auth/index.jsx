import { useEffect, useReducer, useState } from "react";
import {
  View,
  Text,
  Modal,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { getStyles, styles } from "./styles";
import { Input } from "../../components";
import { COLORS } from "../../constants";
import {
  clearError,
  checkEmailAuthData,
  checkPhoneNumberAuthData,
  clearState,
} from "../../store/actions";
import { UPDATE_FORM, onInputChange } from "../../utils/forms";
import CountryPicker from "react-native-country-picker-modal";
import { useTheme } from "../../context/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";

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

const Auth = ({ navigation }) => {
  const dispatch = useDispatch();
  const { error, isLoading, hasError, preVerificationToken } = useSelector(
    (state) => state.auth
  );
  const [isLogin, setIsLogin] = useState(true);
  const [formState, dispatchFormState] = useReducer(formReducer, initialState);
  const [inputType, setInputType] = useState("unknown");
  const [countryCode, setCountryCode] = useState("AR");
  const [callingCode, setCallingCode] = useState("54");
  const [isLogoVisible, setIsLogoVisible] = useState(true);

  const { theme } = useTheme();
  const styles = getStyles(theme);

  const title = isLogin ? "Iniciar sesión" : "Registrarse";
  const buttonTitle = isLogin ? "CONFIRMAR" : "CONFIRMAR";
  const messageText = isLogin
    ? "¿No creaste una cuenta?"
    : "¿Ya creaste una cuenta?";

  const onSelectCountry = (country) => {
    setCountryCode(country.cca2);
    if (country.callingCode) {
      const callingCode = country.callingCode[0];
      setCallingCode(callingCode);
    }
  };

  const onHandleChangeAuth = () => {
    setIsLogin(!isLogin);
  };
  const onHandleAuth = () => {
    if (inputType === "phoneNumber") {
      const phoneNumberWithCode = `+${callingCode}${formState.email.value}`;
      console.log("llegar antes de checkPhoneNumberAuthData");
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
    console.log("value: ", value, "name: ", name, "formState: ", formState);
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

  useEffect(() => {
    // clearState();
  }, []);

  useEffect(() => {
    if (preVerificationToken) {
      navigation.navigate("Verification");
    }
  }, [preVerificationToken, navigation]);

  const overlayStyle = {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 100,
  };

  return (
    <>
      {isLoading && <View style={overlayStyle} />}
      <SafeAreaView style={styles.container}>
        {isLogoVisible && (
          <View style={styles.centerContainer}>
            <Image
              source={require("../../../assets/icons/billete-logo.png")}
              style={styles.categoryImage}
              resizeMode="stretch"
            />
            <Text style={styles.logo}>Billete</Text>
          </View>
        )}
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Input
            placeholder="Email/Número de teléfono"
            placeholderTextColor={COLORS.darkGray}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) =>
              onHandlerInputChange({ value: text, name: "email" })
            }
            onFocus={onEmailInputFocus}
            value={formState.email.value}
            error={formState.email.error}
            touched={formState.email.touched}
            hasError={formState.email.hasError}
            leftIcon={
              inputType === "phoneNumber" && (
                <CountryPicker
                  withFilter
                  withFlag
                  withCallingCode
                  withCallingCodeButton
                  withEmoji
                  countryCode={countryCode}
                  onSelect={onSelectCountry}
                  onClose={() => {
                    setIsLogoVisible(true);
                  }}
                  onOpen={() => {
                    setIsLogoVisible(false);
                  }}
                  containerButtonStyle={{
                    paddingTop: 0,
                  }}
                  theme={{
                    fontFamily: "Uto-Light",
                    backgroundColor: theme.background,
                    filterPlaceholderTextColor: theme.placeholder,
                    primaryColorVariant: theme.text,
                    onBackgroundTextColor: theme.text,
                  }}
                />
              )
            }
          />
          <Input
            placeholder="Contraseña"
            placeholderTextColor={COLORS.darkGray}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) =>
              onHandlerInputChange({ value: text, name: "password" })
            }
            value={formState.password.value}
            error={formState.password.error}
            touched={formState.password.touched}
            hasError={formState.password.hasError}
          />
          <View style={styles.linkForgetPassword}>
            <TouchableOpacity
              style={styles.link}
              onPress={onHandleForgetPassword}
            >
              <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
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
              <Text style={styles.modalTitle}>
                {error ? error : "Cargando"}
              </Text>
              {error ? (
                <TouchableOpacity
                  onPress={onHandleButtonModal}
                  style={[styles.modalButton]}
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
};

export default Auth;
