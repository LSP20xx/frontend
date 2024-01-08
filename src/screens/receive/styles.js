import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
    paddingTop: 20,
    alignItems: "center",
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    paddingTop: 16,
    backgroundColor: COLORS.black,
    marginHorizontal: 8,
    marginBottom: 0,
    flex: 1,
  },
  titleContainer: {
    alignItems: "center",
  },
  sectionContainer: {
    width: "98%",
    paddingTop: 10,
    backgroundColor: COLORS.greyDark,
    marginTop: 32,
    flex: 1,
  },
  screenTitleContainer: {
    width: "100%",
    backgroundColor: COLORS.greyDark,
  },
  screenTitle: {
    fontSize: 20,
    color: COLORS.white,
    textAlign: "left",
    marginHorizontal: 46,
    marginTop: 50,
    marginBottom: 14,
    backgroundColor: COLORS.greyDark,
  },
  sectionTitle: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "normal",
    color: COLORS.black,
    marginTop: 8,
    marginBottom: 8,
  },
  categoriesContainer: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 0,
  },
  addressContainer: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    maxHeight: 60,
  },
  address: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.white,
    marginTop: 18,
  },
  copyIcon: {
    fontSize: 24,
    color: COLORS.primaryLight,
    marginTop: 15,
    marginLeft: 10,
    transform: [{ scaleX: -1 }],
  },
  warningContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
    maxHeight: 30,
  },
  warning: {
    fontSize: 12,
    color: COLORS.white,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  column: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    flex: 1,
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 36,
    marginRight: 10,
    borderRadius: 5,
  },
  fiatConvertedAmount: {
    fontSize: 36,
    fontWeight: "bold",
    color: COLORS.white,
    textAlign: "center",
    marginVertical: 50,
  },
  cryptoItem: {
    width: "100%",
    paddingBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  rightContainer: {
    alignItems: "flex-end",
  },
  cryptoAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.white,
    marginRight: 10,
  },
  fiatValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.primaryLight,
  },
  cryptoName: {
    margin: 16,
    fontSize: 18,
    fontWeight: "light",
    color: COLORS.white,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.grey,
    marginVertical: 8,
    width: "80%",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: COLORS.black,
    marginBottom: 8,
    borderColor: COLORS.primary,
    marginBottom: 16,
  },
  logo: {
    height: 81,
    width: 81,
    resizeMode: "contain",
    textAlign: "center",
    marginTop: 8,
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  qrCodeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 32,
  },
  qrCode: {
    marginTop: 40,
  },
});
