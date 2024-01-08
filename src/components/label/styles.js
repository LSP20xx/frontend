import { StyleSheet } from "react-native";

import { COLORS } from "../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 35,
  },
  label: {
    fontSize: 14,
    paddingVertical: 5,
    color: COLORS.titles,
  },
  subLabel: {
    fontSize: 12,
    paddingVertical: 5,
    color: COLORS.titles,
  },
});