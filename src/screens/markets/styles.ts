import { StyleSheet } from 'react-native';

import { COLORS } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    paddingTop: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  emptyMessage: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: 'normal',
    marginBottom: 8,
    marginTop: 8,
    textAlign: 'center',
  },
  sectionTitle: {
    color: COLORS.black,
    fontSize: 24,
    fontWeight: 'normal',
    marginBottom: 8,
    marginTop: 8,
    textAlign: 'center',
  },
});
