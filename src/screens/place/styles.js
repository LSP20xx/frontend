import { StyleSheet } from 'react-native';

import { COLORS } from '../../constants';

export const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: COLORS.white,
        },
        textContainer: {
            flex: 1,
            paddingVertical: 16,
            paddingHorizontal: 24,
        },
        headerTextContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 16,
        },
        button: {
            width: 150,
        },
        image: {
            width: "100%",
            height: 260,
        },
        title: {
            fontSize: 24,
            fontWeight: 'normal',
            color: COLORS.texts,
        },
        address: {
            fontSize: 14,
            marginTop: 4,
            color: COLORS.texts,
        },
        noLocationText: {
            fontSize: 14,
            marginTop: "25%",
            color: COLORS.texts,
        },
        mapPreviewContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          },
          loading: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }
    }
);