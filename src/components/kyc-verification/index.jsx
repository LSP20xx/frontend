import React, { useState } from "react";
import { View, Button, Text } from "react-native";

import PersonalInformationForm from "./PersonalInformationForm";
import IDVerificationCamera from "./IDVerificationCamera.jsx";
import VideoSelfieCapture from "./VideoSelfieCapture";
import ReviewScreen from "./ReviewScreen";

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
        return <PersonalInformationForm onNext={goToNextStep} />;
      case 2:
        return <IDVerificationCamera onNext={goToNextStep} />;
      case 3:
        return <VideoSelfieCapture onNext={goToNextStep} />;
      case 4:
        return <ReviewScreen onSubmit={goToNextStep} />;
      default:
        return <Text>Proceso de verificación completado.</Text>;
    }
  };

  return (
    <View>
      {renderStepContent()}
      {currentStep > 1 && (
        <Button title="Anterior" onPress={goToPreviousStep} />
      )}
      {currentStep < 4 && <Button title="Siguiente" onPress={goToNextStep} />}
      {currentStep === 4 && (
        <Button title="Enviar para Revisión" onPress={goToNextStep} />
      )}
    </View>
  );
};

export default KYCVerification;
