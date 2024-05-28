import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const PersonalInformationForm = ({ onDocumentUpload }) => {
  const { theme } = useTheme();
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [frontUploadMode, setFrontUploadMode] = useState(null);
  const [backUploadMode, setBackUploadMode] = useState(null);

  const pickImage = async (setImage, setUploadMode, documentType) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
      setUploadMode('gallery');
      onDocumentUpload(result.assets[0], documentType);
    }
  };

  const takePhoto = async (setImage, setUploadMode, documentType) => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
      setUploadMode('camera');
      onDocumentUpload(result.assets[0], documentType);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Text style={styles.imageLabel}>Foto del Frente del ID</Text>

        {frontImage ? (
          <Image source={{ uri: frontImage.uri }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Ionicons name="image-outline" size={100} color={theme.disabled} />
          </View>
        )}
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() =>
              takePhoto(setFrontImage, setFrontUploadMode, 'ID_PHOTO_FRONT')
            }
          >
            <Ionicons
              name={
                frontUploadMode === 'camera' && frontImage ? 'reload' : 'camera'
              }
              size={30}
              color="#000"
            />
            <Text style={styles.buttonText}>
              {frontUploadMode === 'camera' && frontImage
                ? 'Otra Foto'
                : 'Tomar Foto'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() =>
              pickImage(setFrontImage, setFrontUploadMode, 'ID_PHOTO_FRONT')
            }
          >
            <Ionicons
              name={
                frontUploadMode === 'gallery' && frontImage
                  ? 'reload'
                  : 'images'
              }
              size={30}
              color="#000"
            />
            <Text style={styles.buttonText}>
              {frontUploadMode === 'gallery' && frontImage
                ? 'Seleccionar Otra'
                : 'Seleccionar'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.imageContainer}>
        <Text style={styles.imageLabel}>Foto del Dorso del ID</Text>

        {backImage ? (
          <Image source={{ uri: backImage.uri }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Ionicons name="image-outline" size={100} color={theme.disabled} />
          </View>
        )}
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() =>
              takePhoto(setBackImage, setBackUploadMode, 'ID_PHOTO_BACK')
            }
          >
            <Ionicons
              name={
                backUploadMode === 'camera' && backImage ? 'reload' : 'camera'
              }
              size={30}
              color="#000"
            />
            <Text style={styles.buttonText}>
              {backUploadMode === 'camera' && backImage
                ? 'Otra Foto'
                : 'Tomar Foto'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() =>
              pickImage(setBackImage, setBackUploadMode, 'ID_PHOTO_BACK')
            }
          >
            <Ionicons
              name={
                backUploadMode === 'gallery' && backImage ? 'reload' : 'images'
              }
              size={30}
              color="#000"
            />
            <Text style={styles.buttonText}>
              {backUploadMode === 'gallery' && backImage
                ? 'Seleccionar Otra'
                : 'Seleccionar'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10, // Moved to be above the placeholder
  },
  iconButton: {
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 16,
    padding: 10,
  },
  buttonText: {
    color: '#000',
    fontFamily: 'Uto-Regular',
    fontSize: 14,
    marginTop: 5,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    borderRadius: 10,
    height: 200,
    marginBottom: 10,
    width: '90%',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  imageLabel: {
    fontFamily: 'Uto-Bold',
    fontSize: 16,
    marginBottom: 10,
  },
  placeholder: {
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    height: 200,
    justifyContent: 'center',
    width: '90%',
  },
});

export default PersonalInformationForm;
