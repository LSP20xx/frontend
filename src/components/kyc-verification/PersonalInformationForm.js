import React, { useReducer, useEffect } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../context/ThemeContext';
import { COLORS } from '../../constants';
import Input from '../input';
import DateInput from '../date-input';
import { UPDATE_FORM, initialState } from '../../store/reducers/form.reducer';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: COLORS.primaryMedium,
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: '50%',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  buttonContainer: {
    alignSelf: 'stretch',
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
  },
  buttonDisabled: {
    alignItems: 'center',
    backgroundColor: 'rgba(255155, 80, 0.3)',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  buttonText: {
    color: COLORS.black,
    fontFamily: 'Uto-Medium',
    fontSize: 16,
  },
  content: {
    padding: 5,
  },
  flexContainer: {
    flex: 1,
  },
});

const validateDate = (date) => {
  const regex = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/(19|20)\d{2}$/;
  return regex.test(date);
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
          value: value !== undefined ? value : state[name].value,
          hasError,
          error,
          touched,
        },
        isFormValid,
      };
    default:
      return state;
  }
};

const loadFormState = async (dispatchFormState) => {
  try {
    const savedFormState = await AsyncStorage.getItem('formState');
    if (savedFormState) {
      dispatchFormState({
        type: 'LOAD_FORM_STATE',
        data: JSON.parse(savedFormState),
      });
    }
  } catch (error) {
    console.error('Failed to load form state', error);
  }
};

const saveFormState = async (formState) => {
  try {
    await AsyncStorage.setItem('formState', JSON.stringify(formState));
  } catch (error) {
    console.error('Failed to save form state', error);
  }
};

function PersonalInformationForm({ onNext, currentStep, onFormValidChange }) {
  const [formState, dispatchFormState] = useReducer(formReducer, initialState);

  const { firstName, lastName, dateOfBirth, isFormValid } = formState;

  useEffect(() => {
    loadFormState(dispatchFormState);
  }, []);

  useEffect(() => {
    const isValid =
      firstName.value &&
      !firstName.hasError &&
      lastName.value &&
      !lastName.hasError &&
      dateOfBirth.value &&
      validateDate(dateOfBirth.value) &&
      !dateOfBirth.hasError;

    dispatchFormState({
      type: UPDATE_FORM,
      data: {
        name: 'isFormValid',
        value: '',
        hasError: false,
        error: '',
        touched: false,
        isFormValid: isValid,
      },
    });

    onFormValidChange(isValid);
  }, [firstName, lastName, dateOfBirth, onFormValidChange, dispatchFormState]);

  useEffect(() => {
    saveFormState(formState);
  }, [formState]);

  const handleInputChange = (name, value) => {
    let hasError = false;
    let error = '';

    if (name === 'dateOfBirth' && !validateDate(value)) {
      hasError = true;
      error = 'Fecha inválida';
    }

    dispatchFormState({
      type: UPDATE_FORM,
      data: {
        name,
        value,
        hasError,
        error,
        touched: true,
        isFormValid: formState.isFormValid,
      },
    });
  };

  const handleNext = () => {
    if (isFormValid) {
      onNext();
    }
  };

  const { theme } = useTheme();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      style={styles.flexContainer}
    >
      <View style={styles.inputContainer}>
        <Input
          placeholder="Nombre"
          placeholderTextColor={COLORS.darkGray}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(value) => handleInputChange('firstName', value)}
          value={firstName.value}
        />
      </View>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Apellido"
          placeholderTextColor={COLORS.darkGray}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(value) => handleInputChange('lastName', value)}
          value={lastName.value}
        />
      </View>
      <View style={styles.inputContainer}>
        <DateInput
          value={dateOfBirth.value}
          onChangeText={(value) => handleInputChange('dateOfBirth', value)}
          hasError={dateOfBirth.hasError}
          error={dateOfBirth.error}
          touched={dateOfBirth.touched}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

export default PersonalInformationForm;
