import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
    paddingTop: 20,
    alignItems: "center",
  },
  assetAmount: {
    fontSize: 36,
    fontWeight: "bold",
    color: COLORS.primaryLight,
    textAlign: "center",
    marginTop: 50,
    marginBottom: 6,
  },
  convertedAssetAmount: {
    fontSize: 12,
    color: COLORS.white,
    textAlign: "center",
  },
  input: {
    height: 40,
    marginTop: 10,
    paddingHorizontal: 10,
    color: COLORS.white,
    backgroundColor: COLORS.grey,
    borderRadius: 5,
    width: "80%",
  },
  button: {
    backgroundColor: COLORS.primaryLight,
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    width: "80%",
    marginTop: 122,
  },
  buttonText: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: "bold",
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.grey,
    marginTop: 26,
    marginBottom: 8,
    width: "80%",
  },
  recentTransfersContainer: {
    width: "90%",
    backgroundColor: COLORS.greyDark,
    height: 300,
  },
  recentTransfersTitle: {
    fontSize: 16,
    fontWeight: "light",
    color: COLORS.white,
    textAlign: "left",
    marginVertical: 16,
    marginHorizontal: 20,
    backgroundColor: COLORS.greyDark,
  },
  labelContainer: {
    width: "90%",
  },
  label: {
    color: COLORS.white,
    fontSize: 16,
    textAlign: "left",
    marginTop: 16,
    marginBottom: 14,
    marginHorizontal: 20,
  },
  textContainer: {
    width: "90%",
  },
  text: {
    color: COLORS.greyLight,
    fontSize: 14,
    textAlign: "left",
    marginHorizontal: 20,
  },
  rowContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
});
