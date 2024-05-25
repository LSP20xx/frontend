import React, { useState, useReducer, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { COLORS, UPDATE_PERSONAL_INFORMATION_URL } from '../../constants';
import PersonalInformationForm from './PersonalInformationForm.js';
import IDVerificationCamera from './IDVerificationCamera.js';
import VideoSelfieCapture from './VideoSelfieCapture.js';
import ReviewScreen from './ReviewScreen';
import formReducer, { initialState } from '../../store/reducers/form.reducer';
import { useSelector } from 'react-redux';
import { useTheme } from '../../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
const loadFormState = async () => {
  try {
    const savedFormState = await AsyncStorage.getItem('formState');
    return savedFormState ? JSON.parse(savedFormState) : null;
  } catch (error) {
    console.error('Failed to load form state', error);
    return null;
  }
};

const formatDateToBackend = (date) => {
  const [day, month, year] = date.split('/');
  return `${day}-${month}-${year}`;
};
const submitFormData = async (userId) => {
  try {
    const formState = await loadFormState();

    if (!formState) {
      throw new Error('No form state found in storage');
    }

    // Formatea la fecha de nacimiento al formato esperado por el backend
    const formattedDateOfBirth = formatDateToBackend(
      formState.dateOfBirth.value,
    );

    // Verifica y muestra los valores del formState
    console.log('Complete Name:', formState.completeName.value);
    console.log('Date of Birth:', formattedDateOfBirth);

    const payload = {
      userId: userId,
      completeName: formState.completeName.value,
      dateOfBirth: formattedDateOfBirth,
    };

    console.log('Payload to be sent:', JSON.stringify(payload));

    const response = await fetch(UPDATE_PERSONAL_INFORMATION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(
        `Failed to submit personal information: ${errorDetails.message || response.statusText}`,
      );
    }

    const result = await response.json();
    console.log('Form submission successful', result);
    return true; // Indicar que el envío fue exitoso
  } catch (error) {
    console.error('Error submitting form data', error);
    return false; // Indicar que el envío falló
  }
};

function KYCVerification() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formState, dispatchFormState] = useReducer(formReducer, initialState);
  const [isFormValid, setIsFormValid] = useState(false);
  const { theme } = useTheme();
  const { userId } = useSelector((state) => state.auth);

  const styles = StyleSheet.create({
    buttonContainer: {
      alignItems: 'center',
      borderColor: '#E5E5E5',
      borderWidth: 1,
      justifyContent: 'center',
      padding: 10,
      width: '100%',
      position: 'absolute',
      bottom: 0,
    },
    button: {
      alignItems: 'center',
      backgroundColor: '#F48421',
      borderRadius: 5,
      padding: 10,
      width: '80%',
    },
    buttonDisabled: {
      backgroundColor: theme.disabled,
    },
    buttonText: {
      color: COLORS.white,
      fontFamily: 'Uto-Medium',
      fontSize: 16,
    },
    container: {
      flex: 1,
    },
    content: {
      flexGrow: 1,
      paddingHorizontal: 8,
      paddingBottom: 80, // Ensure there's space for the button container
    },
  });

  useEffect(() => {
    // Función para verificar la validez del formulario
    const validateForm = () => {
      const { completeName, dateOfBirth } = formState;
      const isValid =
        completeName.value &&
        !completeName.hasError &&
        dateOfBirth.value &&
        !dateOfBirth.hasError;
      setIsFormValid(isValid);
    };

    validateForm();
  }, [formState]);

  const goToNextStep = async () => {
    if (currentStep === 1) {
      if (isFormValid) {
        const isSubmissionSuccessful = await submitFormData(userId);
        if (!isSubmissionSuccessful) {
          return; // No avanzar si el envío no fue exitoso
        }
      } else {
        return; // No avanzar si el formulario no es válido
      }
    }
    setCurrentStep(currentStep + 1);
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFormValidChange = (isValid) => {
    setIsFormValid(isValid);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInformationForm onFormValidChange={handleFormValidChange} />
        );
      case 2:
        return (
          <IDVerificationCamera
            onNext={goToNextStep}
            currentStep={currentStep}
          />
        );
      case 3:
        return (
          <VideoSelfieCapture onNext={goToNextStep} currentStep={currentStep} />
        );
      case 4:
        return (
          <ReviewScreen onSubmit={goToNextStep} currentStep={currentStep} />
        );
      default:
        return <Text>Proceso de verificación completado.</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content}>
          {renderStepContent()}
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.buttonContainer}>
        {currentStep > 1 && (
          <TouchableOpacity onPress={goToPreviousStep} style={styles.button}>
            <Text style={styles.buttonText}>ANTERIOR</Text>
          </TouchableOpacity>
        )}
        {currentStep < 4 && (
          <TouchableOpacity
            onPress={goToNextStep}
            style={[
              styles.button,
              currentStep === 1 && !isFormValid && styles.buttonDisabled,
            ]}
            disabled={currentStep === 1 && !isFormValid}
          >
            <Text style={styles.buttonText}>SIGUIENTE</Text>
          </TouchableOpacity>
        )}
        {currentStep === 4 && (
          <TouchableOpacity onPress={goToNextStep} style={styles.button}>
            <Text style={styles.buttonText}>FINALIZAR</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default KYCVerification;
