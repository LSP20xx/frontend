import React, { useRef, useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { getStyles } from './styles';

function DateInput({ value, onChangeText, hasError, error, touched }) {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const [isEditing, setIsEditing] = useState(false);

  const dayRef = useRef(null);
  const monthRef = useRef(null);
  const yearRef = useRef(null);

  const handleBlur = () => {
    if (!day && !month && !year) {
      setIsEditing(false);
    }
  };

  const splitValue = value.split('/');
  const day = splitValue[0] || '';
  const month = splitValue[1] || '';
  const year = splitValue[2] || '';

  const handleTextChange = (text, part) => {
    const filteredText = text.replace(/[^0-9]/g, '');

    const newValue = value.split('/');
    switch (part) {
      case 'day':
        newValue[0] = filteredText;
        if (filteredText.length === 2) monthRef.current.focus();
        break;
      case 'month':
        newValue[1] = filteredText;
        if (filteredText.length === 2) yearRef.current.focus();
        break;
      case 'year':
        newValue[2] = filteredText;
        break;
    }
    onChangeText(newValue.join('/'));
  };

  const handleFocus = () => {
    setIsEditing(true);
  };

  if (!isEditing && !day && !month && !year) {
    return (
      <TouchableOpacity
        onPress={handleFocus}
        onBlur={() => {
          handleBlur();
          console.log('onBlur');
        }}
        style={styles.dateInputContainer}
      >
        <Text style={styles.datePlaceholder}>Fecha de nacimiento</Text>
      </TouchableOpacity>
    );
  }

  return (
    <>
      <View style={styles.dateInputContainer}>
        <TextInput
          ref={dayRef}
          style={styles.dateInput}
          onChangeText={(text) => handleTextChange(text, 'day')}
          onLayout={() => {
            dayRef.current.focus();
          }}
          value={day}
          maxLength={2}
          placeholder="DD"
          placeholderTextColor={theme.placeholder}
          keyboardType="numeric"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <Text style={styles.separator}>{'-  '}</Text>
        <TextInput
          ref={monthRef}
          style={styles.dateInput}
          onChangeText={(text) => handleTextChange(text, 'month')}
          value={month}
          maxLength={2}
          placeholder="MM"
          placeholderTextColor={theme.placeholder}
          keyboardType="numeric"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <Text style={styles.separator}>{'- '}</Text>
        <TextInput
          ref={yearRef}
          style={styles.dateInput}
          onChangeText={(text) => handleTextChange(text, 'year')}
          value={year}
          maxLength={4}
          placeholder="AAAA"
          placeholderTextColor={theme.placeholder}
          keyboardType="numeric"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </View>
      {hasError && touched ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorMessage}>{error}</Text>
        </View>
      ) : null}
    </>
  );
}

export default DateInput;
