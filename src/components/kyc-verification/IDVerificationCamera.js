import React, { useState } from 'react';
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
import SNSMobileSDK from '@sumsub/react-native-mobilesdk-module';
import { GET_KYC_TOKEN_URL } from '../../constants';
import { useSelector } from 'react-redux';

function IDVerificationCamera({ onCapture }) {
  const [pickedUrl, setPicked] = useState(null);
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const [sdkInstance, setSdkInstance] = useState(null);
  const [accessToken, setAccessToken] = useState(null); // Nuevo estado para almacenar el token
  const { userId } = useSelector((state) => state.auth);

  const getKYCToken = async () => {
    try {
      console.log('Fetching KYC token for userId:', userId);
      const response = await axios.get(GET_KYC_TOKEN_URL, {
        params: { userId: userId },
      });
      console.log('Response status:', response.status);
      console.log('Response data:', response.data);
      return response.data.token;
    } catch (error) {
      console.error('Error fetching KYC token:', error);
      Alert.alert('Error', 'No se pudo obtener el token de Sumsub.');
      return null;
    }
  };

  const launchSNSMobileSDK = async () => {
    if (sdkInstance) {
      console.log('An instance of the SDK is already running.');
      Alert.alert('Error', 'Una instancia del SDK ya está en uso.');
      return;
    }

    const token = await getKYCToken();
    if (!token) return;
    setAccessToken(token); // Almacena el token en el estado

    try {
      let snsMobileSDK = SNSMobileSDK.init(token, async () => {
        const newToken = await getKYCToken();
        setAccessToken(newToken); // Actualiza el token en el estado
        return newToken;
      })
        .withHandlers({
          onStatusChanged: (event) => {
            console.log(
              'onStatusChanged: [' +
                event.prevStatus +
                '] => [' +
                event.newStatus +
                ']',
            );
          },
          onLog: (event) => {
            console.log('onLog: [Idensic] ' + event.message);
          },
        })
        .withDebug(true)
        .withLocale('en') // Optional, for cases when you need to override the system locale
        .build();

      setSdkInstance(snsMobileSDK);

      if (snsMobileSDK) {
        snsMobileSDK
          .launch()
          .then((result) => {
            console.log('SumSub SDK State: ' + JSON.stringify(result));
            setSdkInstance(null); // Reset SDK instance after use
          })
          .catch((err) => {
            console.error('SumSub SDK Error: ', err);
            setSdkInstance(null); // Reset SDK instance on error
            Alert.alert(
              'Error',
              'Error al lanzar el SDK de Sumsub. Revisa los logs para más detalles.',
            );
          });
      } else {
        console.error('SumSub SDK initialization failed.');
      }
    } catch (error) {
      console.error('Error initializing SumSub SDK:', error);
      Alert.alert('Error', 'No se pudo iniciar el SDK de Sumsub.');
    }
  };

  const takePicture = async () => {
    // if (!accessToken) {
    //   const token = await getKYCToken();
    //   if (!token) return;
    //   setAccessToken(token);
    // }

    try {
      const result = await SNSMobileSDK.startCamera({
        type: 'id',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjNzEyNzdlZS04NmJiLTRhODctOWQyMi1mMDMxNmRlYzY4Y2QiLCJsZXZlbE5hbWUiOiJiYXNpYy1reWMtbGV2ZWwiLCJpYXQiOjE3MTY2MjY2OTAsImV4cCI6MTcxNjYzMDI5MH0.YUcFKznygswH141CVFVoO1F2bmgMN263QblDhrDyW4M',
      });
      console.log('Camera result:', result);
      setPicked(result.uri);
      onCapture(result.uri);
    } catch (error) {
      console.error('Error taking picture:', error);
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
        <View style={styles.launchIconContainer}>
          <TouchableOpacity onPress={launchSNSMobileSDK}>
            <Text style={styles.cameraIcon}>🚀</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const getStyles = (theme) =>
  StyleSheet.create({
    cameraIcon: {
      fontSize: 30,
    },
    cameraIconContainer: {
      bottom: 0,
      position: 'absolute',
      right: 0,
    },
    container: {
      backgroundColor: theme.background,
      flex: 1,
      flexDirection: 'column',
    },
    image: {
      borderRadius: 50,
      height: 100,
      width: 100,
    },
    launchIconContainer: {
      bottom: 20,
      position: 'absolute',
      right: 20,
    },
    profileContainer: {
      alignItems: 'center',
      marginVertical: 20,
    },
  });

export default IDVerificationCamera;
