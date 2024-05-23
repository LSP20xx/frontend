import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  Image,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import {
  requestCameraPermissionsAsync,
  launchCameraAsync,
} from 'expo-image-picker';
import { readAsStringAsync, EncodingType } from 'expo-file-system';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from '@expo/vector-icons/Ionicons';

function IDVerificationCamera({ onCapture }) {
  const [camera, setCamera] = useState(null);

  const { theme } = useTheme();
  const styles = getStyles(theme);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [pickedUrl, setPicked] = useState(null);
  const date = new Date(user.datetimeSignUp);
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  const takePicture = async () => {
    if (camera) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.takePictureAsync(options);
      onCapture(data.uri);
    }
  };

  const verifyPermissions = async () => {
    const { status } = await requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permisos insuficientes',
        'Necesitas dar permisos para usar la cámara',
        [{ text: 'Ok' }],
      );
      return false;
    }
    return true;
  };

  const onHandleTakeImage = async () => {
    const isCameraPermissionGranted = await verifyPermissions();
    if (!isCameraPermissionGranted) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.7,
    });

    const imageUri = image.assets[0].uri;

    setPicked(imageUri);
  };

  useEffect(() => {
    const saveUserImage = async () => {
      if (pickedUrl) {
        const base64Image = await readAsStringAsync(pickedUrl, {
          encoding: EncodingType.Base64,
        });
        //dispatch(setUserImage(user.userId, base64Image));
      }
    };

    saveUserImage();
  }, [pickedUrl]);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {!pickedUrl ? (
          <Image
            style={styles.image}
            resizeMode="center"
            source={require('../../../assets/user.png')}
          />
        ) : (
          <Image
            style={styles.image}
            source={{ uri: pickedUrl }}
            resizeMode="center"
          />
        )}
        <View style={styles.cameraIconContainer}>
          <Ionicons
            name="camera"
            size={20}
            style={styles.cameraIcon}
            onPress={onHandleTakeImage}
          />
        </View>
      </View>
      <View style={styles.headerTextContainer}>
        <Text style={styles.title}>{user.email}</Text>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.label}>Fecha de registro: </Text>
        <Text style={styles.value}>{formattedDate}</Text>
      </View>
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

export default IDVerificationCamera;
