import React, { useState } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { COLORS } from '../../constants';
import Input from '../input';
import DateInput from '../date-input';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: COLORS.primaryMedium,
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: '50%',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  buttonContainer: {
    alignSelf: 'stretch',
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
  },
  buttonDisabled: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 155, 80, 0.3)',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  buttonText: {
    color: COLORS.black,
    fontFamily: 'Uto-Medium',
    fontSize: 16,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 5,
  },
  flexContainer: {
    flex: 1,
  },
});

const validateDate = (date) => {
  const regex = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/(19|20)\d{2}$/;
  return regex.test(date);
};

function PersonalInformationForm({ onNext, currentStep }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  const { theme } = useTheme();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      style={styles.flexContainer}
    >
      <ScrollView contentContainerStyle={styles.content}>
        {/* <Text
            style={{ fontSize: 14, fontFamily: "Uto-Light", color: theme.text }}
          >
            Paso {currentStep}/4: Información personal
          </Text>
 */}
        <Input
          placeholder="Nombre"
          placeholderTextColor={COLORS.darkGray}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setFirstName}
        />
        <Input
          placeholder="Apellido"
          placeholderTextColor={COLORS.darkGray}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setLastName}
        />
        <DateInput
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
          hasError={!validateDate(dateOfBirth) && dateOfBirth.length === 10}
          error="Fecha inválida"
          touched={dateOfBirth.length > 0}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onNext} style={styles.button}>
            <Text style={styles.buttonText}>Siguiente</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default PersonalInformationForm;
