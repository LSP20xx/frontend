import React, { useState, useEffect } from 'react';
import { View, Image, Text, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  requestCameraPermissionsAsync,
  launchCameraAsync,
} from 'expo-image-picker';
import { readAsStringAsync, EncodingType } from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { setUserImage } from '../../store/actions';

function Profile({ navigation }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [pickedUrl, setPicked] = useState(null);
  const date = new Date(user.datetimeSignUp);
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  useEffect(() => {
    const saveUserImage = async () => {
      if (pickedUrl) {
        const base64Image = await readAsStringAsync(pickedUrl, {
          encoding: EncodingType.Base64,
        });
        dispatch(setUserImage(user.userId, base64Image));
      }
    };

    saveUserImage();
  }, [pickedUrl]);

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

export default Profile;
