import { StyleSheet } from "react-native";
import { COLORS } from '../../constants';

export const styles = StyleSheet.create(
    {
        container: {
          backgroundColor: COLORS.white,
          borderRadius: 8,
          shadowColor: COLORS.black,
          shadowOpacity: 0.2,
          shadowOffset: { width: 0, height: 6 },
          shadowRadius: 4,
          elevation: 2,
          marginHorizontal: 16,
          marginVertical: 8,
          flexDirection: 'row',
          alignItems: 'center',
          height: 180,
        },
        image: {
          width: "100%",
          height: "100%",
          borderTopLeftRadius: 8,
          borderBottomLeftRadius: 8,
        },
        imageContainer: {
          flex: 1,
        },
        textContainer: {
          flex: 1,
          paddingVertical: 8,
          paddingHorizontal: 12,
        },
        linkContainer: {
          position: 'absolute',
          bottom: -42,
          right: 24,
        },
        title: {
          fontSize: 22,
          fontWeight: 'normal',
          color: COLORS.titles,
        },
        address: {
          fontSize: 14,
          marginTop: 4,
          color: COLORS.titles,
        },
        link: {
          fontSize: 14,
          fontWeight: 'bold',
          marginTop: 8,
          color: COLORS.primary,
        }
      }
);