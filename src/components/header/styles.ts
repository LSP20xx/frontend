import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const getStyles = (theme) =>
  StyleSheet.create({
    alertIndicator: {
      backgroundColor: COLORS.error,
      borderRadius: 10,
      bottom: 0,
      height: 20,
      left: 60,
      position: 'absolute',
      width: 20,
    },
    alertIndicatorText: {
      color: theme.background,
      fontSize: 16,
      marginLeft: 5.5,
      marginTop: -1,
    },
    backIcon: {
      color: theme.text,
      fontSize: 36,
      left: -24,
      position: 'absolute',
      top: -20,
    },
    balance: {
      color: theme.text,
      fontFamily: 'Uto-Bold',
      fontSize: 14,
      textAlign: 'center',
    },
    centerContainer: {
      alignItems: 'center',
      width: '33%',
    },
    headerContainer: {
      alignItems: 'center',
      backgroundColor: theme.background,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 32,
      width: '100%',
    },
    icon: {
      color: theme.text,
      fontSize: 36,
      marginHorizontal: 20,
    },
    leftContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      width: '33%',
    },
    logo: {
      color: COLORS.primaryDark,
      fontFamily: 'Uto-Medium',
      fontSize: 34,
      left: 0,
      right: 0,
      textAlign: 'center',
      width: 150,
    },
    qrIcon: {
      color: theme.text,
      fontSize: 36,
      position: 'absolute',
      right: 22,
      top: -20,
    },
    rightContainer: {
      alignItems: 'flex-end',
      width: '33%',
    },
    totalBalance: {
      color: COLORS.primaryDark,
      fontFamily: 'Uto-Medium',
      fontSize: 12,
      marginTop: 16,
      textAlign: 'center',
    },
    userIcon: {
      color: theme.text,
      fontSize: 36,
      left: 22,
      position: 'absolute',
      top: -20,
    },
  });
