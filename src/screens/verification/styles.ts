import { StyleSheet } from 'react-native';

import { COLORS } from '../../constants';

export const getStyles = (theme) =>
  StyleSheet.create({
    backButton: {
      marginRight: 8,
      zIndex: 10,
    },
    backIcon: {
      color: theme.text,
      fontSize: 24,
    },
    button: {
      alignItems: 'center',
      backgroundColor: COLORS.primaryMedium,
      borderRadius: 8,
      justifyContent: 'center',
      paddingHorizontal: 20,
      paddingVertical: 15,
    },
    buttonDisabled: {
      backgroundColor: 'grey',
    },
    buttonText: {
      color: COLORS.black,
      fontFamily: 'Uto-Medium',
      fontSize: 16,
    },
    codeInput: {
      borderColor: COLORS.primaryDark,
      borderRadius: 10,
      borderWidth: 1,
      color: theme.text,
      fontSize: 22,
      height: 50,
      textAlign: 'center',
      width: 50,
    },
    container: {
      alignItems: 'center',
      backgroundColor: theme.background,
      flex: 1,
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
    headerContainer: {
      alignItems: 'center',
      backgroundColor: theme.background,
      flexDirection: 'row',
      paddingHorizontal: 16,
      paddingTop: 24,
      width: '100%',
    },
    inputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
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
      alignItems: 'center',
      color: COLORS.secondary,
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
    resendButtonText: {
      color: COLORS.primaryDark,
      fontFamily: 'Uto-Bold',
      fontSize: 16,
    },
    submitContainer: {
      paddingVertical: 5,
    },
    timerText: {
      color: COLORS.primaryDark,
      fontFamily: 'Uto-Light',
      fontSize: 16,
    },
    title: {
      color: theme.text,
      fontFamily: 'Uto-Bold',
      fontSize: 24,
      textAlign: 'center',
    },
    title: {
      color: theme.text,
      flex: 1,
      fontFamily: 'Uto-Bold',
      fontSize: 24,
      marginRight: 24,
      textAlign: 'center',
    },
    titleContainer: {},
    verificationTitle: {
      color: theme.text,
      fontFamily: 'Uto-Light',
      fontSize: 14,
      marginBottom: 10,
    },
    withdrawContainer: {
      backgroundColor: '#f2f2f2',
      borderRadius: 16,
      marginHorizontal: 10,
      marginTop: 40,
      padding: 20,
    },
    withdrawDetails: {
      color: theme.text,
      fontFamily: 'Uto-Light',
      fontSize: 16,
      marginBottom: 5,
    },
    withdrawSubtitle: {
      color: theme.text,
      fontFamily: 'Uto-Bold',
      fontSize: 14,
    },
    withdrawTitle: {
      color: theme.text,
      fontFamily: 'Uto-Bold',
      fontSize: 18,
      marginBottom: 10,
    },
  });
