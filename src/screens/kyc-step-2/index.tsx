import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
// import { RNCamera } from "react-native-camera";

function KYCStep2({ onCapture }) {
  const [camera, setCamera] = useState(null);

  const { theme } = useTheme();
  const styles = getStyles(theme);

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
}

const getStyles = (theme) =>
  StyleSheet.create({
    capture: {
      alignSelf: 'center',
      backgroundColor: '#fff',
      borderRadius: 5,
      flex: 0,
      margin: 20,
      padding: 15,
      paddingHorizontal: 20,
    },
    captureText: {
      color: 'black',
      fontSize: 14,
    },
    container: {
      backgroundColor: theme.background,
      flex: 1,
      flexDirection: 'column',
    },
    preview: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'flex-end',
    },
  });

export default KYCStep2;
