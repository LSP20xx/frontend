import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: 80,
    alignItems: 'center',
  },
  profileContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  headerTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  textContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: COLORS.primary,
    borderWidth: 3,
    marginTop: 40,
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.accent,
    padding: 5,
    borderRadius: 10,
  },
  cameraIcon: {
    color: COLORS.white,
    fontSize: 20,
  },
  title: {
    color: COLORS.black,
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 60,
  },
  label: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    color: COLORS.black,
    fontSize: 16,
  },
  nameContainer: {
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  buttonContainer: {
    width: 100,
    alignSelf: 'center',

    },
  });