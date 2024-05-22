import { StyleSheet, Platform } from 'react-native';
import { COLORS } from '../../constants';

export const getStyles = (theme) =>
  StyleSheet.create({
    balanceTitle: {
      color: COLORS.greyLight,
      fontFamily: 'Uto-Medium',
      fontSize: 12,
      marginTop: 20,
      paddingTop: 10,
      textAlign: 'left',
    },
    container: {
      alignItems: 'center',
      backgroundColor: theme.background,
      flex: 1,
      paddingTop: 20,
      position: 'relative',
    },
    listContainer: {
      backgroundColor: COLORS.white,
      flex: 1,
      marginBottom: 0,
      marginHorizontal: 8,
      paddingBottom: 32,
      paddingHorizontal: 16,
      paddingTop: 16,
    },
    listScrolLView: {
      flex: 1,
      marginLeft: 32,
      marginRight: 10,
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
      flex: 1,
    },
    sectionComponent: {
      alignItems: 'center',
      backgroundColor: COLORS.white,
      borderRadius: 16,
      flex: 1,
      flexDirection: 'row',
      height: 90,
      justifyContent: 'space-between',
      marginHorizontal: 12,
      marginTop: 28,
      maxHeight: 90,
      paddingTop: 10,
      padding: 10,
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
      backgroundColor: theme.background,
      flex: 1,
      marginTop: 16,
      width: '98%',
    },
    sectionSubtitle: {
      color: theme.text,
      fontFamily: 'Uto-Regular',
      fontSize: 16,
      marginBottom: 20,
      marginLeft: 8,
      paddingTop: 10,
      textAlign: 'left',
    },
    sectionTitle: {
      color: theme.text,
      fontFamily: 'Uto-Bold',
      fontSize: 20,
      marginLeft: 8,
      marginTop: 20,
      paddingTop: 10,
      textAlign: 'left',
    },
    separator: {
      backgroundColor: '#ddd',
      height: 1,
      marginVertical: 8,
    },
    subtitleContainer: {
      alignItems: 'flex-start',
      flexDirection: 'row',
    },

    titleContainer: {
      alignItems: 'flex-start',
    },
    titleStyle: {
      color: COLORS.black,
      fontFamily: 'Uto-Medium',
      fontSize: 24,
      marginHorizontal: 8,
      marginVertical: 16,
      textAlign: 'left',
    },
  });
