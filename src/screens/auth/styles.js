import { StyleSheet } from "react-native";

import { COLORS } from "../../constants/";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  content: {
    width: "95%",
    maxWidth: 400,
    padding: 15,
    margin: 15,
    backgroundColor: COLORS.white,
    minHeight: 340,
  },
  title: {
    fontFamily: "Uto-Bold",
    fontSize: 24,
    textAlign: "center",
    color: COLORS.grey,
  },
  linkContainer: {
    justifyContent: "end",
    alignItems: "center",
    paddingVertical: 10,
  },
  link: {
    borderBottomColor: COLORS.primaryDark,
    borderBottomWidth: 1,
    textAlign: "center",
  },
  linkText: {
    fontSize: 14,
    borderBottomColor: COLORS.primaryDark,
    borderBottomWidth: 1,
    color: COLORS.primaryDark,
    textAlign: "center",
  },
  submitContainer: {
    paddingVertical: 5,
  },
  containerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "75%",
    minHeight: 110,
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.white,
  },
  modalTitle: {
    fontSize: 14,
    textAlign: "center",
  },
  inputField: {
    fontSize: 14,
    borderBottomColor: COLORS.primary,
    borderBottomWidth: 1,
    width: "100%",
    paddingVertical: 5,
  },
});
