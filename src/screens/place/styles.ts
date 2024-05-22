import { StyleSheet } from 'react-native';

import { COLORS } from '../../constants';

export const styles = StyleSheet.create({
  address: {
    color: COLORS.text,
    fontSize: 14,
    marginTop: 4,
  },
  button: {
    width: 150,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  headerTextContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    height: 260,
    width: '100%',
  },
  loading: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  mapPreviewContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  noLocationText: {
    color: COLORS.text,
    fontSize: 14,
    marginTop: '25%',
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: 'normal',
  },
});
