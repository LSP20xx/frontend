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

function DateInput({ value, onChangeText, hasError, error, touched, onBlur }) {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const [isEditing, setIsEditing] = useState(false);

  const dayRef = useRef(null);
  const monthRef = useRef(null);
  const yearRef = useRef(null);

  const handleBlur = (part) => {
    let newValue = value.split('/');
    if (part === 'day' && newValue[0]) {
      if (newValue[0].length === 1) {
        newValue[0] = '0' + newValue[0];
      }
      if (newValue[0] === '00') {
        newValue[0] = '01';
      }
    } else if (part === 'month' && newValue[1]) {
      if (newValue[1].length === 1) {
        newValue[1] = '0' + newValue[1];
      }
      if (newValue[1] === '00') {
        newValue[1] = '01';
      }
    }
    onChangeText(newValue.join('/'));
    onBlur && onBlur(part);
  };

  const handleTextChange = (text, part) => {
    const filteredText = text.replace(/[^0-9]/g, '');
    let newValue = value.split('/');

    switch (part) {
      case 'day':
        newValue[0] = filteredText;
        if (filteredText.length === 2) {
          monthRef.current.focus();
        }
        break;
      case 'month':
        newValue[1] = filteredText;
        if (filteredText.length === 2) {
          yearRef.current.focus();
        }
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

  const splitValue = value.split('/');
  const day = splitValue[0] || '';
  const month = splitValue[1] || '';
  const year = splitValue[2] || '';

  if (!isEditing && !day && !month && !year) {
    return (
      <TouchableOpacity onPress={handleFocus} style={styles.dateInputContainer}>
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
          value={day}
          maxLength={2}
          placeholder="DD"
          placeholderTextColor={theme.placeholder}
          keyboardType="numeric"
          onFocus={handleFocus}
          onBlur={() => handleBlur('day')}
        />
        <Text style={styles.separator}>{'-'}</Text>
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
          onBlur={() => handleBlur('month')}
        />
        <Text style={styles.separator}>{'-'}</Text>
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
          onBlur={() => handleBlur('year')}
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

const styles = StyleSheet.create({
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  separator: {
    fontSize: 18,
    color: 'black',
  },
  errorContainer: {
    marginTop: 5,
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
  },
  datePlaceholder: {
    color: 'gray',
    fontSize: 16,
  },
});
