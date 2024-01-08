import { StyleSheet } from "react-native";

import { COLORS } from "../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  placesContainer: {
    width: 160,
    height: 216,
    margin: 2,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  categoriesContainer: {
    flex: 1,
    flexDirection: "column",
    margin: 20,
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  column: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  categoryContainer: {
    width: 160,
    height: 130,
    margin: 10,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  categoryImage: {
    width: 160,
    height: 165,
    resizeMode: "cover",
    borderRadius: 5,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.accent,
    textAlign: "center",
    marginTop: 8,
    marginLeft: 8,
  },
});
