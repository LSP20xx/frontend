import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

export const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      justifyContent: "space-between", // Alinea el contenido al principio y el botón al final.
    },
    scrollContainer: {
      flex: 1,
    },
    buttonContainer: {
      padding: 10,
      borderTopWidth: 1,
      borderColor: COLORS.primaryLight,
      alignItems: "center",
      justifyContent: "center",
    },
    contactsContainer: {
      width: "100%",
    },
    contactsTitleContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    favoritesTitle: {
      textAlign: "left",
      marginLeft: 30,
      fontFamily: "Uto-Bold",
    },
    addressesContainer: {
      marginVertical: 20,
    },
    addressContainer: {
      flexDirection: "row",
      marginLeft: 30,
      marginVertical: 10,
    },
    address: {
      fontFamily: "Uto-Light",
    },
    favoriteAddressName: {
      fontFamily: "Uto-Medium",
    },
    addToFavoritesButton: {
      fontFamily: "Uto-Medium",
      marginTop: 6,
    },

    addToFavoritesContainer: {
      flexDirection: "row",
      marginLeft: 30,
      marginVertical: 10,
    },
    addToFavoritesButton: {
      fontFamily: "Uto-Bold",
      color: COLORS.primaryDark,
      marginTop: 6,
      marginRight: 4,
    },
    addToFavoritesBackgroundCircle: {
      borderRadius: 12,
      backgroundColor: COLORS.greyBackground,
    },
    addToFavoritesIcon: {
      marginLeft: 1,
    },
    addToFavoritesButton: {
      marginLeft: 6,

      marginTop: 3,
      fontFamily: "Uto-Bold",
    },
    showAllButton: {
      fontFamily: "Uto-Bold",
      color: COLORS.primaryDark,
      marginRight: 30,
    },
    assetConversionContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      height: 140,
      marginVertical: 20,
    },
    assetAmountContainerTop: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      height: "50%",
    },
    assetAmount: {
      fontSize: 52,
      fontFamily: "Uto-Light",
      color: theme.text,
      width: "100%",
      textAlign: "right",
    },
    selectedAssetSymbol: {
      fontSize: 16,
      fontFamily: "Uto-Medium",
      color: COLORS.greyLight,
      textAlign: "center",
      marginHorizontal: 8,
      marginTop: 8,
    },
    calculatedAssetAmountContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      paddingLeft: 20,
      height: "50%",
    },
    calculatedAssetAmountColumn: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: 20,
    },
    calculatedAssetAmount: {
      fontSize: 14,
      fontFamily: "Uto-Medium",
      color: COLORS.primaryDark,
      textAlign: "center",
    },
    withdrawFeeContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      height: 20,
    },
    changeAssetIcon: {
      color: COLORS.primaryDark,
    },
    feeContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      height: 20,
    },
    feeTitle: {
      fontSize: 14,
      fontFamily: "Uto-Light",
      color: theme.text,
      textAlign: "center",
    },
    feeValue: {
      fontSize: 14,
      fontFamily: "Uto-Medium",
      color: COLORS.primaryDark,
      textAlign: "center",
      marginTop: 4,
      marginLeft: 4,
    },
    selectedAssetImageContainer: {
      width: 65,
      height: 55,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: COLORS.greyLight,
      backgroundColor: theme.background,
      marginLeft: 20,
      flexDirection: "row",
      alignItems: "center",
    },
    selectedAssetImage: {
      width: 30,
      height: 30,
      marginLeft: 8,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderRadius: 5,
    },
    input: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      backgroundColor: theme.input,
      borderRadius: 16,
      paddingVertical: 5,
      paddingHorizontal: 15,
      marginTop: 10,
      marginHorizontal: 24,

      height: 50,
      color: theme.text,
      fontFamily: "Uto-Light",
    },
    inputError: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      backgroundColor: theme.input,
      borderColor: COLORS.error,
      borderRadius: 16,
      paddingVertical: 5,
      paddingHorizontal: 15,
      marginTop: 10,
      marginHorizontal: 24,
      height: 50,
      color: theme.text,
      fontFamily: "Uto-Light",
    },
    pasteButton: {
      padding: 10,
    },
    mainContainer: {
      flex: 1,
    },
    button: {
      backgroundColor: "#F8911A",
      padding: 10,
      alignItems: "center",
      borderRadius: 5,
      width: "80%",
    },
    buttonText: {
      color: COLORS.black,
      fontSize: 16,
      fontFamily: "Uto-Medium",
    },
    separator: {
      height: 1,
      backgroundColor: theme.disabled,
      marginBottom: 8,
      marginHorizontal: 20,
      width: "100%",
    },
    recentTransfersContainer: {
      width: "90%",
      backgroundColor: theme.background,
      height: 240,
    },
    recentTransfersTitle: {
      fontSize: 16,
      fontFamily: "Uto-Light",
      color: theme.text,
      textAlign: "left",
      marginVertical: 16,
      marginHorizontal: 8,
      backgroundColor: theme.background,
    },
    screenTitleContainer: {
      width: "100%",
      backgroundColor: theme.background,
    },
    screenTitle: {
      fontSize: 20,
      color: theme.text,
      textAlign: "left",
      marginHorizontal: 23,
      marginTop: 30,
      backgroundColor: theme.background,
      fontFamily: "Uto-Medium",
      marginBottom: 10,
    },
    exampleAddressText: {
      fontFamily: "Uto-Light",
      fontSize: 12,
      color: COLORS.grey,
      paddingBottom: 30,
      marginHorizontal: 28,
    },
    maxButton: {
      backgroundColor: COLORS.greyLight,
      paddingHorizontal: 20,
      paddingVertical: 5,
      borderRadius: 5,
      marginLeft: 12,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 26,
      width: 80,
    },

    maxButtonPressed: {
      backgroundColor: COLORS.primary,
      paddingHorizontal: 20,
      paddingVertical: 5,
      borderRadius: 5,
      marginLeft: 12,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 26,
      width: 80,
    },
    maxButtonText: {
      color: COLORS.white,
      fontSize: 14,
      fontFamily: "Uto-Medium",
    },
    pickerContainer: {
      borderRadius: 16,
      marginBottom: 20,
      width: "90%",
      backgroundColor: theme.input,
    },
    pickerStyle: {
      width: "100%",
      height: 50,
      color: theme.placeholder,
      fontFamily: "Uto-Light",
    },
    pickerItemNull: {
      fontSize: 16,
      color: "#777C87",
      fontFamily: "Uto-Medium",
      fontSize: 14,
    },
    pickerItemNotNull: {
      fontSize: 16,
      color: COLORS.black,
      fontFamily: "Uto-Medium",
      fontSize: 14,
    },
    errorContainer: {
      width: "90%",
      backgroundColor: theme.background,
      height: 50,
    },
    errorText: {
      fontFamily: "Uto-Light",
      fontSize: 12,
      color: COLORS.error,
      paddingBottom: 30,
      marginHorizontal: 4,
    },
    validText: {
      fontFamily: "Uto-Light",
      fontSize: 12,
      color: COLORS.green,
      paddingBottom: 30,
      marginHorizontal: 4,
    },
    validationContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    assetConversionContainerFirstColumn: {
      flex: 1,
      width: "70%",
      marginLeft: 20,
    },
    assetConversionContainerSecondColumn: {
      width: "30%",
      height: "85%",
    },
    availableBalanceContainer: {
      width: "100%",
      backgroundColor: theme.background,
      paddingHorizontal: 72,
      marginBottom: 20,
      justifyContent: "space-between",
      flexDirection: "row",
    },
    availableBalanceLeftContainer: {
      flexDirection: "column",
      alignItems: "center",
    },
    availableBalanceRightContainer: {
      flexDirection: "column",
      alignItems: "center",
    },
    availableBalanceText: {
      fontSize: 14,
      color: theme.text,
      textAlign: "left",
      marginBottom: 20,
      backgroundColor: theme.background,
      fontFamily: "Uto-Light",
    },
    feeText: {
      fontSize: 14,
      color: COLORS.primaryDark,
      textAlign: "left",
      marginBottom: 16,
      fontFamily: "Uto-Light",
    },
    totalText: {
      fontSize: 14,
      color: theme.text,
      textAlign: "left",
      fontFamily: "Uto-Light",
    },
    addressAndNameContainer: {
      marginLeft: 8,
    },
    titleContainer: {
      alignItems: "flex-start",
    },
    subtitleContainer: {
      alignItems: "flex-start",
    },
    sectionTitle: {
      fontSize: 20,
      color: theme.text,
      fontFamily: "Uto-Bold",
      textAlign: "left",
      marginTop: 20,
      paddingTop: 10,
      marginLeft: 8,
    },
    sectionSubtitle: {
      fontSize: 14,
      color: theme.text,
      fontFamily: "Uto-Regular",
      textAlign: "left",
      paddingTop: 10,
      marginLeft: 8,
      marginBottom: 20,
    },
    verifiedIcon: {
      marginBottom: 28,
      paddingLeft: 24,
    },
  });
