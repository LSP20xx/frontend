import { StyleSheet } from "react-native";

import { COLORS } from "../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    fontSize: 13,
    width: "90%",
    color: COLORS.text,
    paddingVertical: 5,
  },
  errorContainer: {
    flex: 1,
    marginVertical: 5,
  },
  errorMessage: {
    fontSize: 12,
    paddingVertical: 5,
    color: COLORS.error,
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  input: {
    fontSize: 16,
    flex: 1,
    paddingVertical: 5,
    color: COLORS.black,
  },
});
