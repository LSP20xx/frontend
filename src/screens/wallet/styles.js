import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";
import { Platform } from "react-native";

export const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      alignItems: "center",
      position: "relative",
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
    titleStyle: {
      fontSize: 16,
      fontFamily: "Uto-Bold",
      color: COLORS.primaryDark,
      textAlign: "left",
    },
    scrollView: {
      flex: 1,
    },
    popularScrolLView: {
      flex: 1,
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
    sectionComponent: {
      height: 220,
      maxHeight: 220,
      paddingTop: 10,
      backgroundColor: theme.background,
      marginTop: 14,
      marginHorizontal: 12,
      paddingLeft: 20,
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 10,
      borderRadius: 16,
      ...Platform.select({
        ios: {
          shadowColor: theme.shadow,
          shadowOffset: { width: 10, height: 10 },
          shadowOpacity: 0.5,
          shadowRadius: 5,
        },
        android: {
          elevation: 10,
          shadowColor: theme.shadow,
        },
      }),
    },
    sectionContainer: {
      width: "98%",
      backgroundColor: theme.background,
      flex: 1,
    },
    priceRow: {
      flexDirection: "row",
      alignItems: "baseline",
    },
    variation: {
      fontSize: 12,
      fontFamily: "Uto-Light",
      marginVertical: 0,
    },
    balanceTitle: {
      fontSize: 12,
      fontFamily: "Uto-Light",
      color: COLORS.greyLight,
      textAlign: "left",
      paddingTop: 10,
    },
    sectionTitle: {
      fontSize: 16,
      color: theme.text,
      fontFamily: "Uto-Regular",
      textAlign: "left",
      marginTop: 20,
      paddingTop: 10,
      marginLeft: 8,
    },
    sectionTitleTimeframe: {
      fontSize: 12,
      fontFamily: "Uto-Light",
      color: COLORS.grey,
      textAlign: "left",
      marginTop: 26,
      paddingTop: 6,
      marginLeft: 6,
    },
    balanceDetails: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.background,
      height: 100,
      paddingBottom: 20,
      marginLeft: 20,
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
    fiatSymbol: {
      fontSize: 70,
      fontFamily: "Uto-Light",
      color: theme.text,
      textAlign: "center",
    },
    fiatTicker: {
      fontSize: 12,
      fontFamily: "Uto-Light",
      color: theme.text,
      textAlign: "center",
      marginTop: 52,
    },
    fiatConvertedAmount: {
      fontSize: 70,
      fontFamily: "Uto-Medium",
      color: theme.text,
      textAlign: "center",
      marginTop: 0,
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
      alignItems: "center",
      flex: 1,
    },
    middleContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
    rightContainer: {
      alignItems: "center",
      flexDirection: "column",
    },
    priceFiatAmount: {
      fontSize: 16,
      fontFamily: "Uto-Light",
      color: theme.text,
      marginRight: 1,
      marginTop: 10,
    },
    price: {
      fontSize: 16,
      fontFamily: "Uto-Light",
      color: theme.text,
      marginVertical: 0,
    },
    fiatValue: {
      fontSize: 14,
      fontFamily: "Uto-Bold",
      color: COLORS.primaryLight,
    },
    amountStyle: {
      fontSize: 24,
      fontFamily: "Uto-Light",
      color: theme.text,
      marginRight: 4,
    },
    cryptoName: {
      marginTop: 16,
      marginHorizontal: 16,
      fontSize: 16,
      fontFamily: "Uto-Medium",
      color: theme.text,
    },
    cryptoSymbol: {
      marginTop: 2,
      fontSize: 12,
      color: COLORS.greyLight,
      fontFamily: "Uto-Medium",
      textTransform: "uppercase",
      marginHorizontal: 16,
    },
    textContainer: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
    logo: {
      height: 40,
      width: 40,
      resizeMode: "contain",
      marginTop: 8,
    },
    categoryImage: {
      width: 55,
      height: 55,
      resizeMode: "contain",
      marginLeft: 8,
    },
    percentageStyle: {
      fontSize: 12,
      fontFamily: "Uto-Light",
      color: COLORS.greyLight,
      marginRight: 4,
    },
    liquidityBalance: {
      fontSize: 18,
      color: theme.text,
      fontFamily: "Uto-Regular",
    },
    liquidityBalanceAndFiatSymbolContainer: {
      flexDirection: "row",
    },
    liquidityFiatSymbol: {
      fontFamily: "Uto-Regular",
      fontSize: 12,
      color: theme.greyLight,
      marginTop: 6,
    },
    liquiditySymbol: {
      fontFamily: "Uto-Bold",
      fontSize: 18,
      marginLeft: 8,
      marginTop: 8,
    },
    liquidityInterest: {
      fontSize: 12,
      fontFamily: "Uto-Light",
      color: COLORS.green,
      marginTop: 10,
      marginLeft: 6,
    },
  });
