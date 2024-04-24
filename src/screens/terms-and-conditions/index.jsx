import React from "react";
import { View, Text, ScrollView, Button, StyleSheet } from "react-native";

const TermsAndConditions = ({ navigation }) => {
  const handleAcceptTerms = () => {
    navigation.navigate("Home");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Términos y Condiciones</Text>
      <Text style={styles.termsText}>
        Aquí van los términos y condiciones de tu aplicación. Asegúrate de
        incluir toda la información legal necesaria que los usuarios deben
        conocer y aceptar. Esto puede incluir, pero no se limita a, privacidad,
        uso de datos, derechos del usuario, responsabilidades y más.
      </Text>
      <Button
        title="Aceptar Términos y Condiciones"
        onPress={handleAcceptTerms}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  termsText: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default TermsAndConditions;
