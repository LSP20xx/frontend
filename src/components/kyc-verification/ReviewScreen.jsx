import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const ReviewScreen = ({ userInfo, idImageUri, videoUri, onSubmit }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Revisión de la Verificación KYC</Text>

      {/* Información Personal */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Información Personal</Text>
        <Text style={styles.infoText}>
          Nombre: {userInfo.firstName} {userInfo.lastName}
        </Text>
        <Text style={styles.infoText}>
          Fecha de Nacimiento: {userInfo.dateOfBirth}
        </Text>
      </View>

      {/* Imagen del ID */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Imagen del ID</Text>
        {idImageUri && (
          <Image source={{ uri: idImageUri }} style={styles.imagePreview} />
        )}
      </View>

      {/* Video Selfie - Aquí solo mostramos un placeholder o descripción */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Video Selfie</Text>
        {videoUri && <Text>Video grabado con éxito.</Text>}
      </View>

      <TouchableOpacity onPress={onSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Enviar para Revisión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 50, // Espacio adicional para scrolling
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    backgroundColor: "#eaeaea",
  },
  submitButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 18,
  },
});

export default ReviewScreen;
