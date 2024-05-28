import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../context/ThemeContext';
import PersonalInformationForm from './PersonalInformationForm';
import IDVerificationCamera from './IDVerificationCamera';
import VideoSelfieCapture from './VideoSelfieCapture';
import ReviewScreen from './ReviewScreen';
import { COLORS } from '../../constants';
import { uploadDocument } from '../../store/thunks/documents.thunks';

function KYCVerification() {
  const [currentStep, setCurrentStep] = useState(1);
  const { theme } = useTheme();
  const { userId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

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
    sectionSubtitle: {
      color: theme.text,
      fontFamily: 'Uto-Regular',
      fontSize: 16,
      marginBottom: 20,
      paddingTop: 10,
      textAlign: 'left',
    },
  });

  const goToNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDocumentUpload = (file, documentType) => {
    dispatch(uploadDocument(file, documentType, userId));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <Text style={styles.sectionSubtitle}>
              Sube fotos claras de tu ID
            </Text>
            <PersonalInformationForm onDocumentUpload={handleDocumentUpload} />
          </>
        );

      case 2:
        return (
          <IDVerificationCamera
            onNext={goToNextStep}
            currentStep={currentStep}
            onDocumentUpload={handleDocumentUpload}
          />
        );
      case 3:
        return (
          <VideoSelfieCapture
            onNext={goToNextStep}
            currentStep={currentStep}
            onDocumentUpload={handleDocumentUpload}
          />
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
