import { StyleSheet } from 'react-native';

import { COLORS } from '../../constants';

export const styles = StyleSheet.create({
  categoriesContainer: {
    flex: 1,
    flexDirection: 'column',
    margin: 20,
  },
  categoryContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    elevation: 2,
    height: 130,
    margin: 10,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    width: 160,
  },
  categoryImage: {
    borderRadius: 5,
    height: 165,
    resizeMode: 'cover',
    width: 160,
  },
  categoryTitle: {
    color: COLORS.accent,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
    marginTop: 8,
    textAlign: 'center',
  },
  column: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },

  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  placesContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    elevation: 2,
    height: 216,
    margin: 2,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    width: 160,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
});
