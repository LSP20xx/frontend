import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const getStyles = (theme) =>
  StyleSheet.create({
    aboutContainer: {
      alignItems: 'flex-start',
      backgroundColor: 'transparent',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      bottom: 0,
      left: 0,
      paddingHorizontal: 20,
      paddingVertical: 10,
      position: 'absolute',
      right: 0,
    },
    aboutText: {
      color: theme.text,
      fontFamily: 'Uto-Regular',
      fontSize: 13,
      lineHeight: 14,
      marginLeft: 20,
    },
    aboutTitle: {
      backgroundColor: 'transparent',
      color: theme.text,
      fontFamily: 'Uto-Bold',
      fontSize: 18,
      marginBottom: 6,
      marginLeft: 10,
    },
    actionButtonsContainer: {
      alignSelf: 'center',
      bottom: 60,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 2,
      position: 'absolute',
      width: '85%',
    },
    balanceContainer: {
      bottom: 130,
      flexDirection: 'row',
      justifyContent: 'space-around',
      left: 0,
      paddingHorizontal: 20,
      position: 'absolute',
      right: 0,
    },
    button: {
      alignItems: 'center',
      backgroundColor: COLORS.white,
      borderRadius: 20,
      justifyContent: 'center',
      minWidth: 120,
      paddingHorizontal: 40,
      paddingVertical: 10,
      ...Platform.select({
        ios: {
          shadowColor: theme.text,
          shadowOffset: { width: 10, height: 10 },
          shadowOpacity: 0.5,
          shadowRadius: 5,
        },
        android: {
          elevation: 3,
        },
      }),
    },
    buttonDisabled: {
      alignItems: 'center',
      backgroundColor: COLORS.disabled,
      borderRadius: 20,
      justifyContent: 'center',
      minWidth: 120,
      paddingHorizontal: 40,
      paddingVertical: 10,
    },
    buttonText: {
      color: COLORS.grey,
      fontFamily: 'Uto-ExtraBold',
      fontSize: 16,
    },
    categoriesContainer: {
      flex: 1,
      flexDirection: 'column',
      marginBottom: 20,
      marginLeft: 20,
      marginRight: 20,
      marginTop: 0,
    },
    changeTextNegative: {
      color: COLORS.red,
      fontFamily: 'Uto-Light',
      fontSize: 10,
    },
    changeTextPositive: {
      color: COLORS.green,
      fontFamily: 'Uto-Light',
      fontSize: 10,
    },
    chartContainer: {
      position: 'relative',
      width: '100%',
    },
    column: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
    column: {
      alignItems: 'flex-start',
    },
    container: {
      alignItems: 'center',
      backgroundColor: theme.background,
      flex: 1,
    },
    cryptoAmount: {
      color: theme.text,
      fontSize: 18,
      fontWeight: 'bold',
      marginRight: 10,
    },
    cryptoItem: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: 8,
      width: '100%',
    },
    cryptoName: {
      color: theme.text,
      fontSize: 18,
      fontWeight: 'light',
      margin: 16,
    },
    fiatConvertedAmount: {
      color: theme.text,
      fontSize: 36,
      fontWeight: 'bold',
      marginVertical: 50,
      textAlign: 'center',
    },
    fiatValue: {
      color: COLORS.primaryLight,
      fontSize: 14,
      fontWeight: 'bold',
    },
    leftContainer: {
      alignItems: 'flex-start',
      flexDirection: 'row',
    },

    listContainer: {
      backgroundColor: theme.background,
      flex: 1,
      marginBottom: 0,
      marginHorizontal: 8,
      paddingBottom: 32,
      paddingHorizontal: 16,
      paddingTop: 16,
    },
    logo: {
      fontSize: 24,
      fontWeight: 'bold',
      height: 40,
      marginLeft: 10,
      marginTop: 8,
      resizeMode: 'contain',
      textAlign: 'center',
      width: 40,
    },
    nameText: {
      color: theme.text,
      fontFamily: 'Uto-Medium',
      fontSize: 30,
    },
    priceContainer: {
      alignItems: 'center',
      alignItems: 'flex-start',
      marginLeft: 32,
      top: 20,
      zIndex: 200,
    },
    priceText: {
      color: theme.text,
      fontFamily: 'Uto-Light',
      fontSize: 30,
    },
    rightContainer: {
      alignItems: 'flex-end',
    },
    row: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    screenTitle: {
      backgroundColor: COLORS.greyDark,
      color: COLORS.white,
      fontSize: 22,
      fontWeight: 'light',
      marginHorizontal: 46,
      marginVertical: 16,
      textAlign: 'left',
    },
    scrollContainer: {
      borderRadius: 5,
      flex: 1,
      marginBottom: 36,
      marginLeft: 10,
      marginRight: 10,
      marginTop: 10,
    },
    scrollIndicator: {
      backgroundColor: 'rgba(227, 128, 44, 0.5)',
      borderRadius: 3,
      bottom: 0,
      marginLeft: 4,
      position: 'absolute',
      right: 0,
      top: 0,
      width: 6,
    },
    scrollView: {
      marginLeft: 32,
      marginRight: 10,
    },
    sectionContainer: {
      backgroundColor: COLORS.greyDark,
      flex: 1,
      marginTop: 32,
      paddingTop: 10,
      width: '98%',
    },
    sectionTitle: {
      color: theme.text,
      fontSize: 24,
      fontWeight: 'normal',
      marginBottom: 8,
      marginTop: 8,
      textAlign: 'center',
    },
    separator: {
      backgroundColor: '#ddd',
      height: 1,
      marginVertical: 8,
    },
    symbolText: {
      color: COLORS.greyLight,
      fontFamily: 'Uto-Bold',
      fontSize: 14,
      marginBottom: 2,
    },
    temporalitiesContainer: {
      bottom: 180,
      flexDirection: 'row',
      justifyContent: 'space-between',
      left: 0,
      paddingVertical: 10,
      position: 'absolute',
      right: 0,
      width: '100%',
      zIndex: 20,
    },
    temporalityButton: {
      borderRadius: 5,
      marginHorizontal: 8,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    temporalityButtonSelected: {
      backgroundColor: COLORS.primaryDark,
      borderRadius: 5,
      marginHorizontal: 8,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    temporalityText: {
      color: COLORS.primaryDark,
      fontFamily: 'Uto-Bold',
      fontSize: 11,
    },
    temporalityTextSelected: {
      color: COLORS.black,
      fontFamily: 'Uto-Bold',
      fontSize: 11,
    },
    text: {
      color: theme.text,
      fontFamily: 'Uto-ExtraBold',
      fontSize: 12,
      marginRight: 70,
    },
    titleContainer: {
      alignItems: 'center',
    },
    value: {
      color: theme.text,
      fontFamily: 'Uto-Light',
      fontSize: 11,
    },
  });