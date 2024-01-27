import { useEffect, useReducer, useState } from "react";
import {
  View,
  Text,
  Modal,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { styles } from "./styles";
import { Input } from "../../components";
import { COLORS } from "../../constants";
import {
  clearError,
  signInWithEmail,
  signUpWithEmail,
  signInWithPhoneNumber,
  signUpWithPhoneNumber,
} from "../../store/actions";
import { UPDATE_FORM, onInputChange } from "../../utils/forms";
import CountryPicker from "react-native-country-picker-modal";

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

const Auth = () => {
  const dispatch = useDispatch();
  const { error, isLoading, hasError } = useSelector((state) => state.auth);
  const [isLogin, setIsLogin] = useState(true);
  const [formState, dispatchFormState] = useReducer(formReducer, initialState);
  const [inputType, setInputType] = useState("unknown");
  const [countryCode, setCountryCode] = useState("AR");
  const [callingCode, setCallingCode] = useState("");
  const { userId } = useSelector((state) => state.auth);
  const title = isLogin ? "Iniciar sesión" : "Registrarse";
  const buttonTitle = isLogin ? "Iniciar sesión" : "Registrar";
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
    /*  let authData;
    if (inputType === "phoneNumber") {
      const phoneNumberWithCode = `+${callingCode}${formState.email.value}`;
      authData = {
        email: "",
        phoneNumber: phoneNumberWithCode,
        password: formState.password.value,
      };
    } else {
      authData = {
        email: formState.email.value,
        phoneNumber: "",
        password: formState.password.value,
      };
    }
 */

    console.log(callingCode);

    if (inputType === "phoneNumber") {
      const phoneNumberWithCode = `+${callingCode}${formState.email.value}`;
      dispatch(
        isLogin
          ? signInWithPhoneNumber({
              phoneNumber: phoneNumberWithCode,
              password: formState.password.value,
            })
          : signUpWithPhoneNumber({
              phoneNumber: phoneNumberWithCode,
              password: formState.password.value,
            })
      );
    } else {
      dispatch(
        isLogin
          ? signInWithEmail({
              email: formState.email.value,
              password: formState.password.value,
            })
          : signUpWithEmail({
              email: formState.email.value,
              password: formState.password.value,
            })
      );
    }
    /* 
    dispatch(
      isLogin
        ? signIn({
            email: formState.email.value,
            phoneNumber: formState.phoneNumber.value,
            password: formState.password.value,
          })
        : signUp({
            email: formState.email.value,
            phoneNumber: formState.phoneNumber.value,
            password: formState.password.value,
          })
    ); */
  };

  const onHandleButtonModal = () => {
    dispatch(clearError());
  };

  const onHandlerInputChange = ({ value, name }) => {
    const type = identifyInputType(value);
    setInputType(type);
    onInputChange({ name, value, dispatch: dispatchFormState, formState });
  };

  const onEmailInputFocus = () => {
    if (formatPhoneNumber.test(formState.email.value.trim())) {
      setInputType("phoneNumber");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        <Input
          placeholder="Tu email/Tu número de teléfono"
          placeholderTextColor={COLORS.darkGray}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) =>
            onHandlerInputChange({ value: text, name: "email" })
          }
          onFocus={onEmailInputFocus}
          value={formState.email.value}
          label="Correo/número de teléfono"
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
              />
            )
          }
        />
        <Input
          placeholder="********"
          placeholderTextColor={COLORS.darkGray}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) =>
            onHandlerInputChange({ value: text, name: "password" })
          }
          value={formState.password.value}
          label="Contraseña"
          error={formState.password.error}
          touched={formState.password.touched}
          hasError={formState.password.hasError}
        />
        <View style={styles.linkContainer}>
          <TouchableOpacity style={styles.link} onPress={onHandleChangeAuth}>
            <Text style={styles.linkText}>{messageText}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.submitContainer}>
          <Button
            disabled={!formState.isFormValid}
            title={buttonTitle}
            color={COLORS.primary}
            onPress={onHandleAuth}
          />
        </View>
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

export default Auth;
