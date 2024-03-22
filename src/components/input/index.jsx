import React from "react";
import { View, TextInput, Text } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import Label from "../label";
import { getStyles } from "./styles";

const validateDate = (date) => {
  const regex = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/(19|20)\d{2}$/;
  return regex.test(date);
};

const Input = ({
  editable,
  children,
  value,
  style,
  onChangeText,
  onFocus,
  onBlur,
  maxLength,
  placeholder,
  keyboardType = "default",
  hasError,
  error,
  touched,
  inputType,
  leftIcon,
  ...props
}) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const handleChangeText = (text) => {
    onChangeText(text);
  };

  const inputMaxLength = inputType === "date" ? 10 : maxLength;

  return (
    <View style={styles.container}>
      <Label {...props}>
        <View style={styles.inputWithIcon}>
          {leftIcon}
          <TextInput
            {...props}
            editable={editable}
            value={value}
            style={[styles.input, style]}
            onChangeText={handleChangeText}
            onFocus={onFocus}
            onBlur={onBlur}
            maxLength={inputMaxLength}
            placeholder={placeholder}
            placeholderTextColor={theme.placeholder}
            keyboardType={keyboardType}
          />
        </View>
      </Label>
      {hasError && touched ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorMessage}>{error}</Text>
        </View>
      ) : null}
      {children}
    </View>
  );
};

export default Input;
