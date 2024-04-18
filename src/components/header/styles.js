import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

export const getStyles = (theme) =>
  StyleSheet.create({
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      paddingHorizontal: 32,
      backgroundColor: theme.background,
    },
    logo: {
      left: 0,
      right: 0,
      color: COLORS.primaryDark,
      width: 150,
      textAlign: "center",
      marginTop: 4,
      fontSize: 34,
      fontFamily: "Uto-Medium",
    },
    icon: {
      fontSize: 36,
      color: theme.text,
      marginHorizontal: 20,
    },
    backIcon: {
      fontSize: 36,
      color: theme.text,
      position: "absolute",
      left: -24,
      top: -20,
    },
    userIcon: {
      fontSize: 36,
      color: theme.text,
      position: "absolute",
      left: 22,
      top: -20,
    },
    qrIcon: {
      fontSize: 36,
      color: theme.text,
      position: "absolute",
      right: 22,
      top: -20,
    },
    leftContainer: {
      width: "33%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    centerContainer: {
      width: "33%",
      alignItems: "center",
    },
    rightContainer: {
      width: "33%",
      alignItems: "flex-end",
    },
    totalBalance: {
      fontSize: 12,
      fontFamily: "Uto-Medium",
      color: COLORS.primaryDark,
    },
    balance: {
      fontSize: 14,
      fontFamily: "Uto-Bold",
      textAlign: "center",
      color: theme.text,
    },
    alertIndicator: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: COLORS.error,
      position: "absolute",
      bottom: 0,
      left: 60,
    },
    alertIndicatorText: {
      fontSize: 16,
      marginLeft: 5.5,
      marginTop: -1,
      color: theme.background,
    },
  });
