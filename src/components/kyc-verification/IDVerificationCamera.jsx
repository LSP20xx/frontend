import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
// import { RNCamera } from "react-native-camera";

const IDVerificationCamera = ({ onCapture }) => {
  const [camera, setCamera] = useState(null);

  const takePicture = async () => {
    if (camera) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.takePictureAsync(options);
      onCapture(data.uri);
    }
  };

  return (
    <View style={styles.container}>
      {/* <RNCamera
        ref={(ref) => setCamera(ref)}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.auto}
        androidCameraPermissionOptions={{
          title: "Permiso para usar la cámara",
          message: "Necesitamos tu permiso para usar tu cámara",
          buttonPositive: "Ok",
          buttonNegative: "Cancelar",
        }}
      />
      <View style={{ flex: 0, flexDirection: "row", justifyContent: "center" }}>
        <TouchableOpacity onPress={takePicture} style={styles.capture}>
          <Text style={styles.captureText}> Capturar </Text>
        </TouchableOpacity>
      </View> */}
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

export default IDVerificationCamera;
