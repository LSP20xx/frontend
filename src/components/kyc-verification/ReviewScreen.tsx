import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

function ReviewScreen({ userInfo, idImageUri, videoUri, onSubmit }) {
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
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 50,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imagePreview: {
    backgroundColor: '#eaeaea',
    height: 200,
    resizeMode: 'contain',
    width: '100%',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  submitButton: {
    alignItems: 'center',
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 15,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
  },
});

export default ReviewScreen;
