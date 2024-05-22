import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { Alert, Clipboard, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import QRCode from 'react-qr-code';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components/index';
import { useTheme } from '../../context/ThemeContext';
import { getStyles } from './styles';

function Receive({ navigation }) {
  const { selectedAsset, balances } = useSelector((state) => state.assets);
  const assetBalance = balances.find(
    (balance) => balance.symbol === selectedAsset.symbol,
  );
  const address = assetBalance ? assetBalance.address : '';

  const { theme } = useTheme();
  const styles = getStyles(theme);

  const handlePress = () => {
    Clipboard.setString(address);
    Alert.alert('Address copied', 'Address copied to clipboard.', [
      { text: 'OK' },
    ]);
  };

  useEffect(() => {
    console.log('address', address);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} showBackButton />
      <View style={styles.screenTitleContainer}>
        <Text style={styles.sectionTitle}>Recibir {selectedAsset?.symbol}</Text>
      </View>
      <View style={styles.subtitleContainer}>
        <Text style={styles.sectionSubtitle}>Escanea o copia la dirección</Text>
      </View>
      <View style={styles.qrCodeContainer}>
        {address && <QRCode value={address} size={250} />}
      </View>
      <View style={styles.addressContainer} onPress={handlePress}>
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.address}>{address}</Text>
        </TouchableOpacity>
        <Ionicons
          name="copy-sharp"
          style={styles.copyIcon}
          onPress={handlePress}
        />
      </View>
      <View style={styles.warningContainer}>
        <Text style={styles.warning}>
          Envía solo {selectedAsset.name} {`(${selectedAsset.symbol})`} a esta
          dirección.
        </Text>
        <Text style={styles.warning}>
          Si envías cualquier otro activo, podrías perderlo.
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default Receive;
