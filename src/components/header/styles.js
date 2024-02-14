import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

export const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingTop: 24,
    paddingHorizontal: 32,
    backgroundColor: COLORS.white,
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
    color: COLORS.black,
    marginHorizontal: 20,
  },
  backIcon: {
    fontSize: 36,
    color: COLORS.black,
    position: "absolute",
    left: -24,
    top: -20,
  },
  userIcon: {
    fontSize: 36,
    color: COLORS.black,
    position: "absolute",
    left: 22,
    top: -20,
  },
  qrIcon: {
    fontSize: 36,
    color: COLORS.black,
    position: "absolute",
    right: 22,
    top: -20,
  },
  leftContainer: {
    width: "33%",
    flexDirection: "row",
    alignItems: "center",
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
    fontWeight: "bold",
    textAlign: "center",
  },
});
