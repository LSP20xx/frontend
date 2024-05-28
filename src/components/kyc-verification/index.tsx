import React, { useState, useReducer, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { COLORS, UPLOAD_USER_DOCUMENT_URL } from '../../constants';
import PersonalInformationForm from './PersonalInformationForm.js';
import IDVerificationCamera from './IDVerificationCamera.js';
import VideoSelfieCapture from './VideoSelfieCapture.js';
import ReviewScreen from './ReviewScreen';
import { useSelector } from 'react-redux';
import { useTheme } from '../../context/ThemeContext';
import { uploadDocument } from '../../store/thunks/documents.thunks';

function KYCVerification() {
  const [currentStep, setCurrentStep] = useState(1);
  const { theme } = useTheme();
  const { userId } = useSelector((state) => state.auth);

  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      backgroundColor: '#F48421',
      borderRadius: 5,
      padding: 10,
      width: '80%',
    },
    buttonContainer: {
      alignItems: 'center',
      backgroundColor: '#F5F5F5',
      borderColor: '#E5E5E5',
      borderWidth: 1,
      bottom: 0,
      justifyContent: 'center',
      padding: 10,
      position: 'absolute',
      width: '100%',
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
      paddingBottom: 80,
      paddingHorizontal: 8, // Ensure there's space for the button container
    },
  });

  const goToNextStep = async () => {
    setCurrentStep(currentStep + 1);
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDocumentUpload = (imageUri, documentType) => {
    uploadDocument(imageUri, documentType, userId);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInformationForm onDocumentUpload={handleDocumentUpload} />
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
          <TouchableOpacity onPress={goToNextStep} style={styles.button}>
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
