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
    minHeight: 350,
  },
  title: {
    fontFamily: "Uto-Bold",
    fontSize: 24,
    textAlign: "center",
    color: COLORS.grey,
  },
  linkContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    paddingVertical: 10,
  },
  link: {
    textAlign: "center",
  },
  linkText: {
    fontFamily: "Uto-Regular",
    fontSize: 14,
  },
  linkTextBold: {
    fontFamily: "Uto-Bold",
    fontSize: 14,
  },
  linkForgetPassword: {
    fontFamily: "Uto-Bold",
    fontSize: 14,
    color: COLORS.secondary,
    justifyContent: "center",
    alignItems: "flex-end",
    marginBottom: 16,
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
  button: {
    backgroundColor: COLORS.primaryMedium,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Uto-Medium",
    fontSize: 16,
    color: COLORS.black,
  },
  buttonDisabled: {
    backgroundColor: "grey",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  codeInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.primaryDark,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 22,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingTop: 24,
    paddingHorizontal: 16,
    backgroundColor: COLORS.white,
  },
  backButton: {
    marginRight: 8,
    zIndex: 10,
  },
  title: {
    flex: 1,
    fontFamily: "Uto-Bold",
    fontSize: 24,
    textAlign: "center",
    color: COLORS.grey,
    marginRight: 24,
  },
  backIcon: {
    fontSize: 24,
    color: COLORS.black,
  },
  verificationTitle: {
    fontFamily: "Uto-Light",
    fontSize: 14,
    color: COLORS.grey,
    marginBottom: 10,
  },
  timerText: {
    fontFamily: "Uto-SemiBold",
    fontSize: 16,
    color: COLORS.primaryDark,
  },
  resendButtonText: {
    fontFamily: "Uto-Bold",
    fontSize: 16,
    color: COLORS.secondary,
  },
});
