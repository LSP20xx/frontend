import React, { useState, useReducer } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

import { COLORS } from '../../constants';
import PersonalInformationForm from './PersonalInformationForm.js';
import IDVerificationCamera from './IDVerificationCamera.js';
import VideoSelfieCapture from './VideoSelfieCapture.js';
import ReviewScreen from './ReviewScreen';
import formReducer, {
  initialState,
  UPDATE_FORM,
} from '../../store/reducers/form.reducer';

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

function KYCVerification() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formState, dispatchFormState] = useReducer(formReducer, initialState);
  const [isFormValid, setIsFormValid] = useState(false);

  const goToNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
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
          <PersonalInformationForm
            onNext={goToNextStep}
            currentStep={currentStep}
            onFormValidChange={handleFormValidChange}
            formState={formState}
            dispatchFormState={dispatchFormState}
          />
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
            style={styles.button}
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
