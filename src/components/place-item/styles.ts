import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const styles = StyleSheet.create({
  address: {
    color: COLORS.titles,
    fontSize: 14,
    marginTop: 4,
  },
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    elevation: 2,
    flexDirection: 'row',
    height: 180,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    flex: 1,
  },
  link: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
  linkContainer: {
    bottom: -42,
    position: 'absolute',
    right: 24,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  title: {
    color: COLORS.titles,
    fontSize: 22,
    fontWeight: 'normal',
  },
});
