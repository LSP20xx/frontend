import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components/index';

import { getStyles } from './styles';
import { COLORS } from '../../constants';
import { useTheme } from '../../context/ThemeContext';

function UserConfig({ navigation, showBackButton }) {
  const { verified } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };

  const options = [
    {
      id: 1,
      name: 'Mi información',
      disabled: true,
      screen: 'UserMyInformation',
      rightComponent: verified ? null : (
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.verifyButton}>Verificar</Text>
        </TouchableOpacity>
      ),
    },
    {
      id: 2,
      name: 'Seguridad',
      disabled: true,
      screen: 'UserSecurity',
      rightComponent: null,
    },
    {
      id: 3,
      name: 'Notificaciones',
      disabled: true,
      screen: 'UserNotifications',
      rightComponent: null,
    },
    {
      id: 4,
      name: 'Moneda local',
      disabled: true,
      screen: 'UserLocalCurrency',
      rightComponent: (
        <TouchableOpacity
          onPress={() => navigation.navigate('UserLocalCurrency')}
        >
          <Text style={styles.localCurrency}>{user.localCurrency}</Text>
        </TouchableOpacity>
      ),
    },
    {
      id: 5,
      name: 'Idioma',
      disabled: true,
      screen: 'UserLanguage',
      rightComponent: (
        <TouchableOpacity onPress={() => navigation.navigate('UserLanguage')}>
          <Text style={styles.language}>{user.language}</Text>
        </TouchableOpacity>
      ),
    },
  ];

  // useEffect(() => {
  //   checkVerificationStatus();
  // }, []);

  // const checkVerificationStatus = () => {
  //   if (!verified) {
  //     Alert.alert(
  //       "Verificación KYC necesaria",
  //       'Por favor, completa la verificación en "Mi información".',
  //       [
  //         {
  //           text: "Ir a verificar",
  //           onPress: () => navigation.navigate("UserMyInformation"),
  //         },
  //         {
  //           text: "Cancelar",
  //           style: "cancel",
  //         },
  //       ]
  //     );
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        navigation={navigation}
        showBackButton={showBackButton !== undefined ? showBackButton : true}
        isUserConfig
      />
      <View style={styles.sectionContainer}>
        <View style={styles.titleContainer}>
          {verified ? (
            <Text style={styles.sectionTitle}>Nombre del usuario</Text>
          ) : (
            <Text style={styles.sectionTitle}>Usuario no verificado</Text>
          )}
        </View>
        <View style={styles.subtitleContainer}>
          {verified ? (
            <>
              <Text style={styles.sectionSubtitle}>Usuario verificado</Text>
              <Ionicons
                name="shield-checkmark"
                size={32}
                color={COLORS.green}
                style={styles.verifiedIcon}
              />
            </>
          ) : (
            <>
              <Text style={styles.sectionSubtitle}>
                Verificación KYC pendiente
              </Text>
              <Ionicons
                name="close-circle"
                size={32}
                color={COLORS.error}
                style={styles.unverifiedIcon}
              />
            </>
          )}
        </View>
        <ScrollView style={styles.listScrolLView}>
          {options.map((item) => {
            // const assetChartData = assetsLittleLineCharts.find(
            //   (chartData) =>
            //     chartData.assetName.toLowerCase() === item.name.toLowerCase()
            // );

            return (
              <View key={item.id} style={styles.optionItem}>
                <View style={styles.leftContainer}>
                  <TouchableOpacity
                    style={styles.textContainer}
                    onPress={() => handleNavigation(item.screen)}
                    disabled={item.disabled}
                  >
                    <Text
                      style={
                        item.disabled
                          ? [styles.optionText, { color: theme.disabledText }]
                          : styles.optionText
                      }
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.rightContainer}>{item.rightComponent}</View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default UserConfig;
