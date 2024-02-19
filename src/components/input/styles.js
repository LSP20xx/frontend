import { StyleSheet } from "react-native";

import { COLORS } from "../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  errorContainer: {
    flex: 1,
    marginTop: 20,
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
    backgroundColor: COLORS.input,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  input: {
    fontSize: 16,
    flex: 1,
    paddingVertical: 5,
    color: COLORS.black,
  },
});
