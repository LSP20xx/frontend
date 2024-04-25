import { StyleSheet } from "react-native";

import { COLORS } from "../../constants/";

export const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.background,
    },
    content: {
      width: "95%",
      maxWidth: 400,
      padding: 15,
      margin: 15,
      minHeight: 350,
    },
    title: {
      fontFamily: "Uto-Bold",
      fontSize: 24,
      textAlign: "center",
      color: theme.text,
      paddingVertical: 24,
    },
    text: {
      fontFamily: "Uto-Regular",
      lineHeight: 24,
      marginBottom: 16,
    },
    linkContainer: {
      justifyContent: "center",
      alignItems: "flex-end",
      paddingVertical: 10,
    },
    link: {
      textAlign: "center",
    },
    linkText: {
      fontFamily: "Uto-Regular",
      fontSize: 14,
      color: theme.text,
    },
    linkTextBold: {
      fontFamily: "Uto-Bold",
      fontSize: 14,
      color: theme.text,
    },
    linkForgetPassword: {
      fontFamily: "Uto-Bold",
      fontSize: 14,
      color: theme.text,
      justifyContent: "center",
      alignItems: "flex-end",
      marginBottom: 16,
    },
    submitContainer: {
      paddingVertical: 8,
    },
    containerStyle: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalContainer: {
      width: "75%",
      minHeight: 110,
      justifyContent: "space-around",
      alignItems: "center",
      padding: 20,
      borderRadius: 10,
      backgroundColor: theme.modal,
    },
    modalTitle: {
      fontSize: 14,
      textAlign: "center",
      color: theme.text,
      fontFamily: "Uto-Medium",
    },
    inputField: {
      fontSize: 14,
      borderBottomColor: COLORS.primary,
      borderBottomWidth: 1,
      width: "100%",
      paddingVertical: 5,
    },
    button: {
      backgroundColor: "#F48421",
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
    },
    rejectButton: {
      backgroundColor: COLORS.red,
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 8,
    },

    modalButton: {
      backgroundColor: COLORS.primaryMedium,
      paddingVertical: 10,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      fontFamily: "Uto-Medium",
      fontSize: 16,
      color: COLORS.white,
    },
    buttonDisabled: {
      backgroundColor: "grey",
    },
    centerContainer: {
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 60,
      display: "flex",
      flexDirection: "row",
    },
    logo: {
      left: 0,
      right: 0,
      color: COLORS.primaryDark,
      width: 150,
      textAlign: "center",
      marginTop: 4,
      fontSize: 42,
      fontFamily: "Uto-Medium",
    },
    scrollContent: {
      marginHorizontal: 16,
    },
  });
