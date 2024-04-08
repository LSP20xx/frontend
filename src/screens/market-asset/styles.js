import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

export const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingTop: 20,
      alignItems: "center",
    },
    listContainer: {
      paddingHorizontal: 16,
      paddingBottom: 32,
      paddingTop: 16,
      backgroundColor: theme.background,
      marginHorizontal: 8,
      marginBottom: 0,
      flex: 1,
    },
    separator: {
      height: 1,
      backgroundColor: "#ddd",
      marginVertical: 8,
    },
    titleContainer: {
      alignItems: "center",
    },
    sectionContainer: {
      width: "98%",
      paddingTop: 10,
      backgroundColor: COLORS.greyDark,
      marginTop: 32,
      flex: 1,
    },
    screenTitle: {
      fontSize: 22,
      fontWeight: "light",
      color: COLORS.white,
      textAlign: "left",
      marginHorizontal: 46,
      marginVertical: 16,
      backgroundColor: COLORS.greyDark,
    },
    symbolText: {
      fontSize: 14,
      fontFamily: "Uto-Bold",
      color: COLORS.greyLight,
      marginBottom: 2,
    },
    nameText: {
      fontSize: 30,
      fontFamily: "Uto-Medium",
      color: theme.text,
    },
    sectionTitle: {
      textAlign: "center",
      fontSize: 24,
      fontWeight: "normal",
      color: theme.text,
      marginTop: 8,
      marginBottom: 8,
    },
    categoriesContainer: {
      flex: 1,
      flexDirection: "column",
      marginBottom: 20,
      marginLeft: 20,
      marginRight: 20,
      marginTop: 0,
    },
    row: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    column: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    scrollContainer: {
      flex: 1,
      marginTop: 10,
      marginLeft: 10,
      marginBottom: 36,
      marginRight: 10,
      borderRadius: 5,
    },
    fiatConvertedAmount: {
      fontSize: 36,
      fontWeight: "bold",
      color: theme.text,
      textAlign: "center",
      marginVertical: 50,
    },
    cryptoItem: {
      width: "100%",
      paddingBottom: 8,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    leftContainer: {
      flexDirection: "row",
      alignItems: "flex-start",
    },
    rightContainer: {
      alignItems: "flex-end",
    },
    cryptoAmount: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.text,
      marginRight: 10,
    },
    fiatValue: {
      fontSize: 14,
      fontWeight: "bold",
      color: COLORS.primaryLight,
    },
    cryptoName: {
      margin: 16,
      fontSize: 18,
      fontWeight: "light",
      color: theme.text,
    },
    logo: {
      height: 40,
      width: 40,
      resizeMode: "contain",
      textAlign: "center",
      marginTop: 8,
      fontSize: 24,
      fontWeight: "bold",
      marginLeft: 10,
    },

    chartContainer: {
      position: "relative",
      width: "100%",
      height: 200,
    },
    priceContainer: {
      position: "absolute",
      marginLeft: 32,
      top: 20,
      alignItems: "center",
      alignItems: "flex-start",
    },
    priceText: {
      fontSize: 30,
      fontFamily: "Uto-Light",
      color: theme.text,
    },
    changeTextPositive: {
      fontSize: 10,
      fontFamily: "Uto-Light",
      color: COLORS.green,
    },
    changeTextNegative: {
      fontSize: 10,
      fontFamily: "Uto-Light",
      color: COLORS.red,
    },
    column: {
      alignItems: "flex-start",
    },
    actionButtonsContainer: {
      position: "absolute",
      bottom: 130,
      flexDirection: "row",
      justifyContent: "space-between",
      width: "85%",
      alignSelf: "center",
      marginBottom: 2,
    },
    button: {
      paddingHorizontal: 40,
      paddingVertical: 10,
      borderRadius: 20,
      backgroundColor: COLORS.white,
      minWidth: 120,
      justifyContent: "center",
      alignItems: "center",
      ...Platform.select({
        ios: {
          shadowColor: theme.text,
          shadowOffset: { width: 10, height: 10 },
          shadowOpacity: 0.5,
          shadowRadius: 5,
        },
        android: {
          elevation: 3,
        },
      }),
    },
    buttonDisabled: {
      paddingHorizontal: 40,
      paddingVertical: 10,
      borderRadius: 20,
      backgroundColor: COLORS.disabled,
      minWidth: 120,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      color: COLORS.grey,
      fontFamily: "Uto-ExtraBold",
      fontSize: 16,
    },
    aboutContainer: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: "transparent",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      alignItems: "flex-start",
    },
    aboutTitle: {
      fontSize: 18,
      color: theme.text,
      fontFamily: "Uto-Bold",
      marginLeft: 10,
      marginBottom: 6,
      backgroundColor: "transparent",
    },
    aboutText: {
      fontSize: 13,
      color: theme.text,
      marginLeft: 20,
      fontFamily: "Uto-Regular",
      lineHeight: 14,
    },
    temporalitiesContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 10,
      width: "80%",
      position: "absolute",
      bottom: 220,
      left: 0,
      right: 0,
    },
    temporalityButton: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5,
      marginHorizontal: 8,
    },
    temporalityButtonSelected: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5,
      backgroundColor: COLORS.primaryDark,
      marginHorizontal: 8,
    },
    temporalityTextSelected: {
      fontSize: 11,
      color: COLORS.black,
      fontFamily: "Uto-Bold",
    },
    temporalityText: {
      fontSize: 11,
      color: COLORS.primaryDark,
      fontFamily: "Uto-Bold",
    },
    balanceContainer: {
      position: "absolute",
      bottom: 180,
      left: 0,
      right: 0,
      flexDirection: "row",
      justifyContent: "space-around",
      paddingHorizontal: 20,
    },
    text: {
      fontSize: 12,
      color: theme.text,
      fontFamily: "Uto-ExtraBold",
      marginRight: 70,
    },
    value: {
      fontSize: 11,
      color: theme.text,
      fontFamily: "Uto-Light",
    },
    scrollView: {
      marginRight: 10,
      marginLeft: 32,
    },
    scrollIndicator: {
      position: "absolute",
      right: 0,
      top: 0,
      bottom: 0,
      width: 6,
      marginLeft: 4,
      backgroundColor: "rgba(227, 128, 44, 0.5)",
      borderRadius: 3,
    },
  });
