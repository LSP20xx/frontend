import { StyleSheet } from "react-native";

import { COLORS } from "../../constants";

export const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    errorContainer: {
      flex: 1,
      marginTop: 10,
    },
    errorMessage: {
      fontSize: 12,
      paddingVertical: 5,
      color: COLORS.error,
      fontFamily: "Uto-Regular",
      marginLeft: 8,
    },
    inputWithIcon: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      backgroundColor: theme.input,
      borderRadius: 16,
      paddingVertical: 5,
      paddingHorizontal: 15,
    },
    input: {
      fontSize: 16,
      flex: 1,
      paddingVertical: 5,
      color: theme.text,
      fontFamily: "Uto-Light",
    },
  });
