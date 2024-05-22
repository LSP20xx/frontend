import { StyleSheet } from 'react-native';

import { COLORS } from '../../constants';

export const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    dateInput: {
      color: theme.text,
      fontFamily: 'Uto-Light',
      fontSize: 16,
      minWidth: 46,
      paddingHorizontal: 0,
      textAlignVertical: 'center',
    },
    dateInputContainer: {
      alignItems: 'center',
      backgroundColor: theme.input,
      borderRadius: 16,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginTop: 30,
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    datePlaceholder: {
      color: theme.text,
      color: theme.placeholder,
      fontFamily: 'Uto-Light',
      fontSize: 16,
      minWidth: 46,
      paddingVertical: 2.5,
    },
    errorContainer: {
      flex: 1,
    },
    errorMessage: {
      color: COLORS.error,
      fontFamily: 'Uto-Regular',
      fontSize: 12,
      marginLeft: 8,
      paddingVertical: 5,
    },
    input: {
      color: theme.text,
      flex: 1,
      fontFamily: 'Uto-Light',
      fontSize: 16,
      paddingVertical: 5,
    },
    inputWithIcon: {
      alignItems: 'center',
      backgroundColor: theme.input,
      borderRadius: 16,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      paddingHorizontal: 15,
      paddingVertical: 5,
    },
    separator: {
      paddingRight: 12,
    },
  });
