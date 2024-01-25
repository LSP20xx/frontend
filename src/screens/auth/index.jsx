import { useReducer, useState } from "react";
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
import { clearError, signIn, signUp } from "../../store/actions";
import { UPDATE_FORM, onInputChange } from "../../utils/forms";

const initialState = {
  email: { value: "", error: "", touched: false, hasError: true },
  password: { value: "", error: "", touched: false, hasError: true },
  phoneNumber: { value: "", error: "", touched: false, hasError: true },
  isFormValid: false,
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
  const title = isLogin ? "Iniciar sesión" : "Registrarse";
  const buttonTitle = isLogin ? "Iniciar sesión" : "Registrar";
  const messageText = isLogin
    ? "¿No creaste una cuenta?"
    : "¿Ya creaste una cuenta?";

  const onHandleChangeAuth = () => {
    setIsLogin(!isLogin);
  };

  const onHandleAuth = () => {
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
    );
  };

  const onHandleButtonModal = () => {
    dispatch(clearError());
  };

  const onHandlerInputChange = ({ value, name }) => {
    onInputChange({ name, value, dispatch: dispatchFormState, formState });
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Input
          placeholder="Tu email"
          placeholderTextColor={COLORS.darkGray}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) =>
            onHandlerInputChange({ value: text, name: "email" })
          }
          value={formState.email.value}
          label="Correo/número de teléfono"
          error={formState.email.error}
          touched={formState.email.touched}
          hasError={formState.email.hasError}
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
