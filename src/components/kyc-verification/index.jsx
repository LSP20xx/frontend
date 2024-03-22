import React, { useState } from "react";
import { View, Button, Text, StyleSheet } from "react-native";

import PersonalInformationForm from "./PersonalInformationForm";
import IDVerificationCamera from "./IDVerificationCamera.jsx";
import VideoSelfieCapture from "./VideoSelfieCapture";
import ReviewScreen from "./ReviewScreen";
import { COLORS } from "../../constants/index.js";
import { TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  buttonContainer: {
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: COLORS.primaryMedium,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Uto-Medium",
    fontSize: 16,
    color: COLORS.black,
  },
});

const KYCVerification = () => {
  const [currentStep, setCurrentStep] = useState(1);

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

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInformationForm
            onNext={goToNextStep}
            currentStep={currentStep}
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
      <View style={styles.content}>{renderStepContent()}</View>
      {/* <View style={styles.buttonContainer}>
        {currentStep > 1 && (
          <TouchableOpacity
            // disabled={!formState.isFormValid}
            onPress={goToPreviousStep}
            style={[styles.button]}
          >
            <Text style={styles.buttonText}>Anterior</Text>
          </TouchableOpacity>
        )}
        {currentStep < 4 && (
          <TouchableOpacity
            // disabled={!formState.isFormValid}
            onPress={goToNextStep}
            style={[styles.button]}
          >
            <Text style={styles.buttonText}>Siguiente</Text>
          </TouchableOpacity>
        )}
        {currentStep === 4 && (
          <TouchableOpacity
            // disabled={!formState.isFormValid}
            onPress={goToNextStep}
            style={[styles.button]}
          >
            <Text style={styles.buttonText}>Finalizar</Text>
          </TouchableOpacity>
        )}
      </View> */}
    </View>
  );
};

export default KYCVerification;
