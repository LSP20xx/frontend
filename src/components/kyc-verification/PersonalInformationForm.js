import React, { useReducer, useEffect } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../context/ThemeContext';
import { COLORS } from '../../constants';
import Input from '../input';
import DateInput from '../date-input';
import formReducer, {
  UPDATE_FORM,
  initialState,
} from '../../store/reducers/form.reducer';

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
    backgroundColor: 'rgba(255, 155, 80, 0.3)',
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

const validateCompleteName = (name) => {
  const regex = /^[a-zA-Z]{2,}\s[a-zA-Z]{2,}(\s[a-zA-Z]{2,})*$/;
  return regex.test(name);
};

const validateDate = (date) => {
  const regex = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/(19|20)\d{2}$/;
  if (!regex.test(date)) return { isValid: false, error: 'Fecha inválida' };

  const [day, month, year] = date.split('/').map(Number);
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  const dayDifference = today.getDate() - birthDate.getDate();

  if (
    age > 18 ||
    (age === 18 &&
      (monthDifference > 0 || (monthDifference === 0 && dayDifference >= 0)))
  ) {
    return { isValid: true };
  } else {
    return { isValid: false, error: 'Debe ser mayor de 18 años' };
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

function PersonalInformationForm({ onFormValidChange }) {
  const [formState, dispatchFormState] = useReducer(formReducer, initialState);

  const { completeName, dateOfBirth, isFormValid } = formState;

  useEffect(() => {
    loadFormState(dispatchFormState);
  }, []);

  useEffect(() => {
    const isValid =
      completeName.value &&
      validateCompleteName(completeName.value) &&
      !completeName.hasError &&
      dateOfBirth.value &&
      validateDate(dateOfBirth.value).isValid &&
      !dateOfBirth.hasError;

    dispatchFormState({
      type: UPDATE_FORM,
      data: {
        name: 'isFormValid',
        value: isValid,
        hasError: false,
        error: '',
        touched: false,
        isFormValid: isValid,
      },
    });

    onFormValidChange(isValid);
  }, [completeName, dateOfBirth, onFormValidChange, dispatchFormState]);

  useEffect(() => {
    saveFormState(formState);
  }, [formState]);

  const handleInputChange = (name, value) => {
    let hasError = false;
    let error = '';

    if (name === 'completeName') {
      hasError = !validateCompleteName(value);
      error = hasError ? 'Nombre completo inválido' : '';
    } else if (name === 'dateOfBirth') {
      const validation = validateDate(value);
      hasError = !validation.isValid;
      error = validation.error;
    }

    dispatchFormState({
      type: UPDATE_FORM,
      data: {
        name,
        value,
        hasError,
        error,
        touched: false,
        isFormValid: formState.isFormValid,
      },
    });
  };

  const handleInputBlur = (name) => {
    if (name === 'completeName') {
      const hasError = !validateCompleteName(formState.completeName.value);
      const error = hasError ? 'Nombre completo inválido' : '';

      dispatchFormState({
        type: UPDATE_FORM,
        data: {
          name,
          value: formState.completeName.value,
          hasError,
          error,
          touched: true,
          isFormValid: formState.isFormValid,
        },
      });
    } else if (name === 'dateOfBirth') {
      const validation = validateDate(formState.dateOfBirth.value);
      const hasError = !validation.isValid;
      const error = validation.error;

      dispatchFormState({
        type: UPDATE_FORM,
        data: {
          name,
          value: formState.dateOfBirth.value,
          hasError,
          error,
          touched: true,
          isFormValid: formState.isFormValid,
        },
      });
    }
  };

  const { theme } = useTheme();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      style={styles.flexContainer}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Nombre completo"
            placeholderTextColor={COLORS.darkGray}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(value) => handleInputChange('completeName', value)}
            onBlur={() => handleInputBlur('completeName')}
            value={completeName.value}
            hasError={completeName.hasError && completeName.touched}
            error={completeName.error}
            touched={completeName.touched}
          />
        </View>

        <View style={styles.inputContainer}>
          <DateInput
            value={dateOfBirth.value}
            onChangeText={(value) => handleInputChange('dateOfBirth', value)}
            onBlur={() => handleInputBlur('dateOfBirth')}
            hasError={dateOfBirth.hasError && dateOfBirth.touched}
            error={dateOfBirth.error}
            touched={dateOfBirth.touched}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default PersonalInformationForm;
