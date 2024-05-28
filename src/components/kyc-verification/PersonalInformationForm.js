import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const PersonalInformationForm = ({ onDocumentUpload }) => {
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [cameraRef, setCameraRef] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const pickImage = async (setImage, documentType) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
      onDocumentUpload(result.uri, documentType);
    }
  };

  const takePhoto = async (setImage, documentType) => {
    if (cameraRef) {
      let photo = await cameraRef.takePictureAsync({
        quality: 1,
        base64: true,
      });
      setImage(photo.uri);
      onDocumentUpload(photo.uri, documentType);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Text style={styles.imageLabel}>Foto del Frente del ID</Text>
        {frontImage ? (
          <Image source={{ uri: frontImage }} style={styles.image} />
        ) : (
          <Camera
            style={styles.camera}
            type={cameraType}
            ref={(ref) => {
              setCameraRef(ref);
            }}
          >
            <View style={styles.cameraContainer} />
          </Camera>
        )}
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => takePhoto(setFrontImage, 'ID_PHOTO_FRONT')}
          >
            <Ionicons name="camera" size={30} color="#000" />
            <Text style={styles.buttonText}>
              {frontImage ? 'Otra Foto' : 'Tomar Foto'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => pickImage(setFrontImage, 'ID_PHOTO_FRONT')}
          >
            <Ionicons name="images" size={30} color="#000" />
            <Text style={styles.buttonText}>Seleccionar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.imageContainer}>
        <Text style={styles.imageLabel}>Foto del Dorso del ID</Text>
        {backImage ? (
          <Image source={{ uri: backImage }} style={styles.image} />
        ) : (
          <Camera
            style={styles.camera}
            type={cameraType}
            ref={(ref) => {
              setCameraRef(ref);
            }}
          >
            <View style={styles.cameraContainer} />
          </Camera>
        )}
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => takePhoto(setBackImage, 'ID_PHOTO_BACK')}
          >
            <Ionicons name="camera" size={30} color="#000" />
            <Text style={styles.buttonText}>
              {backImage ? 'Otra Foto' : 'Tomar Foto'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => pickImage(setBackImage, 'ID_PHOTO_BACK')}
          >
            <Ionicons name="images" size={30} color="#000" />
            <Text style={styles.buttonText}>Seleccionar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    margin: 5,
    padding: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  buttonText: {
    color: '#000',
    fontFamily: 'Uto-Regular',
    fontSize: 14,
  },
  camera: {
    borderRadius: 10,
    height: 200,
    marginBottom: 10,
    width: '80%',
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
  },
  iconButton: {
    alignItems: 'center',
    marginHorizontal: 16,
  },
  image: {
    borderRadius: 10,
    height: 200,
    marginBottom: 10,
    width: '80%',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  imageLabel: {
    fontFamily: 'Uto-Light',
    fontSize: 16,
    marginBottom: 10,
  },
  placeholder: {
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    height: 200,
    justifyContent: 'center',
    marginBottom: 10,
    width: '80%',
  },
});

export default PersonalInformationForm;
