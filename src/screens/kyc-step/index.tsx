// Security.jsx
import React from 'react';
import { View, Text } from 'react-native';
import { getStyles } from './styles';
import { Header } from '../../components';
import { useTheme } from '../../context/ThemeContext';
import PersonalInformationForm from '@/components/kyc-verification/PersonalInformationForm';
import KYCVerification from '../../components/kyc-verification/index';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

function KYCScreen({ navigation, showBackButton }) {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  return (
    <SafeAreaView style={styles.container}>
      <Header
        navigation={navigation}
        showBackButton={showBackButton !== undefined ? showBackButton : true}
      />

      <View style={styles.sectionContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.sectionTitle}>Verificación KYC</Text>
        </View>
        <KYCVerification />
      </View>
    </SafeAreaView>
  );
}

export default KYCScreen;
