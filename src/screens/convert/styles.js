import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

export const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      justifyContent: "space-between",
    },
    buttonContainer: {
      alignItems: "center",
      justifyContent: "center",
      height: "20%",
      marginHorizontal: 16,
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
      marginTop: 6,
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
      height: "50%",
    },
    assetAmount: {
      fontSize: 52,
      fontFamily: "Uto-Regular",
      color: theme.text,
      textAlign: "left",
    },
    selectedAssetSymbol: {
      fontFamily: "Uto-Medium",
      color: COLORS.greyLight,
      textAlign: "center",
      marginHorizontal: 8,
      marginTop: 8,
    },
    calculatedAssetAmountContainer: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "flex-end",
      marginRight: 45,
      height: "50%",
    },
    calculatedAssetAmountColumn: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      height: 20,
    },
    calculatedAssetAmount: {
      fontSize: 14,
      fontFamily: "Uto-Medium",
      color: COLORS.greyLight,
      textAlign: "left",
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
      backgroundColor: theme.input,
      marginLeft: 20,
      marginTop: 28,
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
      backgroundColor: "#F48421",
      padding: 10,
      alignItems: "center",
      borderRadius: 5,
      width: "80%",
      marginTop: 20,
    },
    buttonText: {
      color: COLORS.white,
      fontSize: 16,
      fontFamily: "Uto-Medium",
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
    separator: {
      height: 20,
      width: 2,
      backgroundColor: "black",
      marginLeft: 26,
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
      paddingHorizontal: 20,
      paddingVertical: 5,
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
      width: 80,
    },

    maxButtonPressed: {
      paddingHorizontal: 20,
      paddingVertical: 5,
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
      width: 80,
    },
    maxButtonText: {
      color: theme.text,
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
      backgroundColor: theme.input,
      justifyContent: "space-between",
      flexDirection: "row",
      borderRadius: 16,
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
    selectedAsetSymbol: {
      fontFamily: "Uto-Regular",
      color: COLORS.greyLight,
      marginLeft: 2,
    },
    assetSendSetup: {
      paddingTop: 20,
      paddingLeft: 20,
    },
    assetSendSetupRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    assetSendSetupColumn: {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 16,
      backgroundColor: theme.input,
      padding: 5,
    },
    walletIconContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.input,
      width: 30,
      height: 30,
      marginLeft: 12,
      marginTop: 4,
      marginRight: 6,
      borderRadius: 15,
      paddingLeft: 2,
    },
    walletRow: {
      marginTop: 8,
      flexDirection: "row",
    },
    toTitle: {
      fontFamily: "Uto-Medium",
    },
    toAddress: {
      fontFamily: "Uto-Light",
    },
    networkLabel: {
      fontSize: 16,
      color: COLORS.black,
      marginHorizontal: 6,
      fontFamily: "Uto-Regular",
    },
    networkName: {
      fontSize: 16,
      fontFamily: "Uto-Bold",
      color: COLORS.black,
    },
    dropdownIcon: {
      marginLeft: 4,
    },
    forwardIcon: {
      marginLeft: 8,
    },
    infoIcon: {
      marginLeft: 4,
    },
    availableBalanceContainer: {
      justifyContent: "space-between",
      alignItems: "center",
      padding: 10,
    },
    amount: {
      fontSize: 12,
      fontFamily: "Uto-Bold",
      color: "#000",
    },
    symbol: {
      marginLeft: 2,
      fontSize: 12,
      fontFamily: "Uto-Bold",
    },
    available: {
      fontSize: 12,
      color: "#666",
      fontFamily: "Uto-Medium",
    },
    icon: {
      fontSize: 24,
      color: "#000",
      marginLeft: 4,
    },
    row: {
      flexDirection: "row",
    },
    columnOne: {
      width: "70%",
    },
    columnTwo: {
      width: "30%",
    },
    maxButtonTextOnPressed: {
      color: theme.primaryLight,
      fontSize: 14,
      fontFamily: "Uto-Medium",
    },
    convertContainer: {
      borderWidth: 1,
      borderColor: "#E5E5E5",
      borderTopLeftRadius: 16,
      borderTopEndRadius: 16,
      borderBottomLeftRadius: 16,
      borderBottomEndRadius: 16,
      height: "80%",
      marginHorizontal: 20,
      marginTop: 16,
    },
    firstAssetContainer: {
      height: "40%",
    },
    balanceRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    secondAssetContainer: {
      height: "40%",
    },
    convertTitle: {
      marginLeft: 16,
      marginTop: 16,
      fontSize: 14,
      fontFamily: "Uto-Medium",
      color: COLORS.greyLight,
    },
    selectAsset: {
      width: 160,
      height: 50,
      marginLeft: 16,
      borderRadius: 16,
      backgroundColor: theme.input,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingRight: 8,
    },
    assetName: {
      fontFamily: "Uto-Medium",
      fontSize: 20,
    },
    assetBalance: {
      fontFamily: "Uto-Regular",
      fontSize: 16,
      paddingTop: 4,
    },
    inputContainer: {
      height: "50%",
      justifyContent: "flex-end",
      marginTop: 8,
    },
    textInput: {
      height: "100%",
      textAlign: "right",
      fontSize: 40,
      fontFamily: "Uto-Medium",
      marginRight: 20,
      color: COLORS.greyLight,
      paddingBottom: 32,
    },
    messageContainer: {
      borderTopColor: COLORS.black,
      borderTopWidth: 1,
      height: "20%",
    },
    modal: {
      justifyContent: "flex-end",
      margin: 0,
    },
    modalContent: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 8,
      marginVertical: 16,
    },
    modalContentContainer: {
      backgroundColor: theme.background,
      backgroundColor: theme.background,
      padding: 32,
      marginHorizontal: 8,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    },
    closeModal: {
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    swapLineContainer: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
    },
    line: {
      flex: 1,
      height: 1,
      borderColor: "#E5E5E5",
      borderWidth: 1,
    },
    iconContainer: {
      width: 40,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: 32,
    },
  });
