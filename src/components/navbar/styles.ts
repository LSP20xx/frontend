import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const getStyles = (theme) =>
  StyleSheet.create({
    icon: {
      color: theme.iconContent,
      fontSize: 72,
    },
    navItem: {
      alignItems: 'center',
      backgroundColor: COLORS.primaryDark,
      borderRadius: 50,
      height: 76,
      justifyContent: 'center',
      marginBottom: 5,
      marginHorizontal: 17,
      width: 76,
    },
    navItemContainer: {
      alignItems: 'center',
      marginBottom: 12,
    },
    navItemDisabled: {
      alignItems: 'center',
      backgroundColor: theme.disabledText,
      borderRadius: 50,
      height: 76,
      justifyContent: 'center',
      marginBottom: 5,
      marginHorizontal: 17,
      width: 76,
    },
    navText: {
      color: theme.text,
      fontFamily: 'Uto-ExtraBold',
      fontSize: 14,
      marginTop: 5,
    },
    navbar: {
      alignItems: 'center',
      backgroundColor: theme.background,
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginHorizontal: 8,
    },
  });
