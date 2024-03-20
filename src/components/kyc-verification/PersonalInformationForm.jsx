import React, { useState } from "react";
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Button,
  TextInput,
  Text,
} from "react-native";

const PersonalInformationForm = ({ onNext }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text variant="titleLarge">Información Personal</Text>
        <TextInput
          label="Nombre"
          value={firstName}
          onChangeText={setFirstName}
          mode="outlined"
          style={{ marginBottom: 10 }}
        />
        <TextInput
          label="Apellido"
          value={lastName}
          onChangeText={setLastName}
          mode="outlined"
          style={{ marginBottom: 10 }}
        />
        <TextInput
          label="Fecha de Nacimiento (DD/MM/AAAA)"
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
          mode="outlined"
          style={{ marginBottom: 20 }}
          keyboardType="numeric"
        />
        <Button
          mode="contained"
          onPress={onNext}
          disabled={!firstName || !lastName || !dateOfBirth}
        >
          Siguiente
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PersonalInformationForm;
