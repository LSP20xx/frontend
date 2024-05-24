import { StyleSheet } from 'react-native';

import { COLORS } from '../../constants';

export const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    errorContainer: {
      flex: 1,
      height: 24,
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
  });
