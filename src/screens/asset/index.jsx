import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { Header } from "../../components/index";
import { styles } from "./styles";
import BigLineChart from "../../components/big-line-chart";

const Asset = ({ navigation }) => {
  const { selectedAsset, currencies } = useSelector((state) => state.assets);

  console.log("currency", currencies);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} showBackButton={true} />
      <View style={styles.chartContainer}>
        <BigLineChart symbol={selectedAsset.symbol} />
        <View style={styles.priceContainer}>
          <Text style={styles.symbolText}>{selectedAsset.symbol}</Text>
          <Text style={styles.nameText}>{selectedAsset.name}</Text>
          <Text style={styles.priceText}>$44,062.80</Text>
          <Text style={styles.changeText}>+740.73 (1.68%)</Text>
        </View>
      </View>
      <View style={styles.temporalitiesContainer}>
        {["● LIVE", "1D", "1W", "1M", "3M", "1Y", "5Y"].map((temporality) => (
          <TouchableOpacity key={temporality} style={styles.temporalityButton}>
            <Text style={styles.temporalityText}>{temporality}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.balanceContainer}>
        <View style={styles.column}>
          <Text style={styles.text}>Balance</Text>
          <Text style={styles.value}>0.00024665 BTC</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.text}>Valor</Text>
          <Text style={styles.value}>$10.86</Text>
        </View>
      </View>
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Comprar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Vender</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.aboutContainer}>
        <Text style={styles.aboutTitle}>Acerca</Text>
        <Text style={styles.aboutText}>
          Bitcoin, la primera criptomoneda lanzada en 2009, es una moneda
          digital descentralizada que elimina la necesidad de intermediarios
          financieros. Con un suministro finito de 21 millones de monedas, su
          sistema está diseñado para reducir su emisión diaria a la mitad cada
          cuatro años.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Asset;
