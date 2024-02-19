import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: 20,
    alignItems: "center",
  },
  assetAmount: {
    fontSize: 36,
    fontWeight: "bold",
    color: COLORS.black,
    textAlign: "center",
    marginVertical: 50,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: COLORS.input,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    width: "90%",
    height: 50,
    marginBottom: 50,
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
});
