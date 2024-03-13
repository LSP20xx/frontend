import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

export const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: COLORS.white,
    marginHorizontal: 8,
  },
  navItemContainer: {
    alignItems: "center",
    marginBottom: 12,
  },
  navItem: {
    width: 76,
    height: 76,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primaryDark,
    marginBottom: 5,
    marginHorizontal: 17,
  },
  navItemDisabled: {
    width: 76,
    height: 76,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.disabled,
    marginBottom: 5,
    marginHorizontal: 17,
  },
  navText: {
    marginTop: 5,
    color: COLORS.black,
    fontFamily: "Uto-ExtraBold",
    fontSize: 14,
  },
  icon: {
    color: COLORS.white,
    fontSize: 72,
  },
});
