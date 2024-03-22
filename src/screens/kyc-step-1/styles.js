import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";
import { Platform } from "react-native";

export const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingTop: 20,
      alignItems: "center",
      position: "relative",
    },
    listContainer: {
      paddingHorizontal: 16,
      paddingBottom: 32,
      paddingTop: 16,
      backgroundColor: COLORS.white,
      marginHorizontal: 8,
      marginBottom: 0,
      flex: 1,
    },
    separator: {
      height: 1,
      backgroundColor: "#ddd",
      marginVertical: 8,
    },
    titleContainer: {
      alignItems: "flex-start",
    },
    subtitleContainer: {
      alignItems: "flex-start",
      flexDirection: "row",
    },
    titleStyle: {
      fontSize: 24,
      fontFamily: "Uto-Medium",
      color: COLORS.black,
      textAlign: "left",
      marginHorizontal: 8,
      marginVertical: 16,
    },
    sectionSubtitle: {
      fontSize: 16,
      color: theme.text,
      fontFamily: "Uto-Regular",
      textAlign: "left",
      paddingTop: 10,
      marginLeft: 8,
      marginBottom: 20,
    },
    scrollView: {
      flex: 1,
    },
    listScrolLView: {
      flex: 1,
      marginRight: 10,
      marginLeft: 32,
    },
    scrollIndicator: {
      position: "absolute",
      right: 0,
      top: 0,
      bottom: 0,
      width: 6,
      marginLeft: 4,
      backgroundColor: "rgba(227, 128, 44, 0.5)",
      borderRadius: 3,
    },
    sectionComponent: {
      height: 90,
      maxHeight: 90,
      paddingTop: 10,
      backgroundColor: COLORS.white,
      marginTop: 28,
      marginHorizontal: 12,
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 10,
      borderRadius: 16,
      ...Platform.select({
        ios: {
          shadowColor: COLORS.black,
          shadowOffset: { width: 10, height: 10 },
          shadowOpacity: 0.5,
          shadowRadius: 5,
        },
        android: {
          elevation: 10,
        },
      }),
    },
    sectionContainer: {
      width: "98%",
      backgroundColor: theme.background,
      flex: 1,
      marginTop: 16,
    },

    balanceTitle: {
      fontSize: 12,
      fontFamily: "Uto-Medium",
      color: COLORS.greyLight,
      textAlign: "left",
      marginTop: 20,
      paddingTop: 10,
    },
    sectionTitle: {
      fontSize: 20,
      color: theme.text,
      fontFamily: "Uto-Bold",
      textAlign: "left",
      marginTop: 20,
      paddingTop: 10,
      marginLeft: 8,
    },
  });
