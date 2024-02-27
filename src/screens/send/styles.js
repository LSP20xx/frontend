import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: 20,
    alignItems: "center",
  },

  assetConversionContainer: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 140,
    width: "100%",
    maxWidth: "60%",
  },
  assetAmountContainerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  assetAmount: {
    fontSize: 52,
    fontFamily: "Uto-Light",
    color: COLORS.black,
    textAlign: "center",
    paddingBottom: 0,
    minWidth: 100,
  },
  selectedAssetSymbol: {
    fontSize: 16,
    fontFamily: "Uto-Medium",
    color: COLORS.greyLight,
    textAlign: "center",
    marginHorizontal: 8,
    marginTop: 4,
  },
  calculatedAssetAmountContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  calculatedAssetAmount: {
    fontSize: 14,
    fontFamily: "Uto-Medium",
    color: COLORS.primaryDark,
    textAlign: "center",
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
    color: COLORS.black,
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
    width: 80,
    height: 50,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.greyLight,
    backgroundColor: COLORS.white,
    marginLeft: 8,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  selectedAssetImage: {
    width: 40,
    height: 40,
    marginLeft: 8,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: COLORS.input,
    borderRadius: 16,
    paddingVertical: 5,
    paddingHorizontal: 15,
    width: "90%",
    height: 50,
    marginBottom: 50,
    color: COLORS.black,
  },
  button: {
    backgroundColor: COLORS.primaryLight,
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    width: "80%",
    marginTop: 11,
  },
  buttonText: {
    color: COLORS.black,
    fontSize: 16,
    fontFamily: "Uto-Medium",
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.grey,
    marginTop: 16,
    marginBottom: 8,
    width: "80%",
  },
  recentTransfersContainer: {
    width: "90%",
    backgroundColor: COLORS.white,
    height: 240,
  },
  recentTransfersTitle: {
    fontSize: 16,
    fontFamily: "Uto-Light",
    color: COLORS.black,
    textAlign: "left",
    marginVertical: 16,
    marginHorizontal: 8,
    backgroundColor: COLORS.white,
  },
  screenTitleContainer: {
    width: "100%",
    backgroundColor: COLORS.white,
  },
  screenTitle: {
    fontSize: 20,
    color: COLORS.black,
    textAlign: "left",
    marginHorizontal: 23,
    marginTop: 50,
    marginBottom: 20,
    backgroundColor: COLORS.white,
    fontFamily: "Uto-Medium",
  },
  maxButton: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  maxButtonText: {
    color: COLORS.black,
    fontSize: 14,
    fontFamily: "Uto-Medium",
  },
  pickerContainer: {
    borderRadius: 16,
    marginBottom: 20,
    width: "90%",
    backgroundColor: COLORS.input,
  },
  pickerStyle: {
    width: "100%",
    height: 50,
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
    backgroundColor: COLORS.white,
    height: 50,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 14,
    fontFamily: "Uto-Medium",
    textAlign: "center",
  },
});
