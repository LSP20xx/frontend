import React, { useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
// import { RNCamera } from "react-native-camera";

const KYCStep3 = ({ onVideoCapture }) => {
  const cameraRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    if (cameraRef.current && !isRecording) {
      setIsRecording(true);
      const videoData = await cameraRef.current.recordAsync();
      onVideoCapture(videoData.uri);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (cameraRef.current && isRecording) {
      cameraRef.current.stopRecording(); // This will trigger the recordAsync promise to resolve
    }
  };

  return (
    <View style={styles.container}>
      {/* <RNCamera
        ref={cameraRef}
        style={styles.preview}
        type={RNCamera.Constants.Type.front} // Use the front camera
        flashMode={RNCamera.Constants.FlashMode.off} // Flash off for selfies
        androidCameraPermissionOptions={{
          title: "Permiso para usar la cámara",
          message:
            "Necesitamos tu permiso para usar tu cámara para grabar un video selfie",
          buttonPositive: "Ok",
          buttonNegative: "Cancelar",
        }}
        captureAudio={true} // Ensure audio is captured
      />
      {!isRecording && (
        <TouchableOpacity onPress={startRecording} style={styles.capture}>
          <Text style={styles.captureText}> Iniciar Grabación </Text>
        </TouchableOpacity>
      )}
      {isRecording && (
        <TouchableOpacity onPress={stopRecording} style={styles.capture}>
          <Text style={styles.captureText}> Detener Grabación </Text>
        </TouchableOpacity>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20,
  },
  captureText: {
    fontSize: 14,
    color: "black",
  },
});

export default KYCStep3;
