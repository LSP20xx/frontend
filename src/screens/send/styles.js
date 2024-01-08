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
    color: COLORS.white,
    textAlign: "center",
    marginVertical: 50,
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
    marginTop: 11,
  },
  buttonText: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: "bold",
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
    backgroundColor: COLORS.greyDark,
    height: 240,
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
  screenTitleContainer: {
    width: "100%",
    backgroundColor: COLORS.greyDark,
  },
  screenTitle: {
    fontSize: 20,
    color: COLORS.white,
    textAlign: "left",
    marginHorizontal: 42,
    marginBottom: 14,
    backgroundColor: COLORS.greyDark,
  },
});
