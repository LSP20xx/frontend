import { StyleSheet } from 'react-native';

import { COLORS } from '../../constants';

export const getStyles = (theme) =>
  StyleSheet.create({
    button: {
      alignItems: 'center',
      backgroundColor: '#F48421',
      borderRadius: 8,
      justifyContent: 'center',
      paddingHorizontal: 20,
      paddingVertical: 15,
    },
    buttonDisabled: {
      backgroundColor: 'grey',
    },
    buttonText: {
      color: COLORS.white,
      fontFamily: 'Uto-Medium',
      fontSize: 16,
    },
    centerContainer: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 60,
    },
    container: {
      alignItems: 'center',
      backgroundColor: theme.background,
      flex: 1,
      justifyContent: 'center',
    },
    containerStyle: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
    content: {
      margin: 15,
      maxWidth: 400,
      minHeight: 350,
      padding: 15,
      width: '95%',
    },
    inputField: {
      borderBottomColor: COLORS.primary,
      borderBottomWidth: 1,
      fontSize: 14,
      paddingVertical: 5,
      width: '100%',
    },
    link: {
      textAlign: 'center',
    },
    linkContainer: {
      alignItems: 'flex-end',
      justifyContent: 'center',
      paddingVertical: 10,
    },
    linkForgetPassword: {
      alignItems: 'flex-end',
      color: theme.text,
      fontFamily: 'Uto-Bold',
      fontSize: 14,
      justifyContent: 'center',
      marginBottom: 16,
    },
    linkText: {
      color: theme.text,
      fontFamily: 'Uto-Regular',
      fontSize: 14,
    },
    linkTextBold: {
      color: theme.text,
      fontFamily: 'Uto-Bold',
      fontSize: 14,
    },
    logo: {
      color: COLORS.primaryDark,
      fontFamily: 'Uto-Medium',
      fontSize: 42,
      left: 0,
      marginTop: 4,
      right: 0,
      textAlign: 'center',
      width: 150,
    },
    modalButton: {
      alignItems: 'center',
      backgroundColor: COLORS.primaryMedium,
      borderRadius: 8,
      justifyContent: 'center',
      paddingVertical: 10,
    },
    modalContainer: {
      alignItems: 'center',
      backgroundColor: theme.modal,
      borderRadius: 10,
      justifyContent: 'space-around',
      minHeight: 110,
      padding: 20,
      width: '75%',
    },
    modalTitle: {
      color: theme.text,
      fontFamily: 'Uto-Medium',
      fontSize: 14,
      textAlign: 'center',
    },
    submitContainer: {
      paddingVertical: 5,
    },
    title: {
      color: theme.text,
      fontFamily: 'Uto-Bold',
      fontSize: 24,
      textAlign: 'center',
    },
  });
