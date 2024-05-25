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
import axios from 'axios';

function IDVerificationCamera({ onCapture }) {
  const [pickedUrl, setPicked] = useState(null);
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const getSumsubToken = async () => {
    try {
      const response = await axios.get('https://your-backend-url/get-sumsub-token');
      return response.data.token;
    } catch (error) {
      Alert.alert('Error', 'No se pudo obtener el token de Sumsub.');
      return null;
    }
  };

  const takePicture = async () => {
    const token = await getSumsubToken();
    if (!token) return;

    try {
      const result = await SumSubSDK.startCamera({ type: 'id', token });
      setPicked(result.uri);
      onCapture(result.uri);
    } catch (error) {
      Alert.alert('Error', 'No se pudo tomar la foto.');
    }
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
          <TouchableOpacity onPress={takePicture}>
            <Text style={styles.cameraIcon}>📷</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      flex: 1,
      flexDirection: 'column',
    },
    profileContainer: {
      alignItems: 'center',
      marginVertical: 20,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    cameraIconContainer: {
      position: 'absolute',
      bottom: 0,
      right: 0,
    },
    cameraIcon: {
      fontSize: 30,
    },
  });

export default IDVerificationCamera;

