import { StyleSheet } from 'react-native';

import { COLORS } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 35,
  },
  label: {
    color: COLORS.titles,
    fontSize: 14,
    paddingVertical: 5,
  },
  subLabel: {
    color: COLORS.titles,
    fontSize: 12,
    paddingVertical: 5,
  },
});
