import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: 'center',
    width: 100,
  },
  cameraIcon: {
    color: COLORS.white,
    fontSize: 20,
  },
  cameraIconContainer: {
    backgroundColor: COLORS.accent,
    borderRadius: 10,
    bottom: 0,
    padding: 5,
    position: 'absolute',
    right: 0,
  },
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    flex: 1,
    paddingTop: 80,
  },
  headerTextContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  image: {
    borderColor: COLORS.primary,
    borderRadius: 50,
    borderWidth: 3,
    height: 100,
    marginTop: 40,
    width: 100,
  },
  input: {
    borderColor: COLORS.primary,
    borderRadius: 5,
    borderWidth: 1,
    height: 40,
    marginBottom: 10,
    paddingLeft: 10,
  },
  label: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  nameContainer: {
    width: '80%',
  },
  profileContainer: {
    marginBottom: 20,
    position: 'relative',
  },
  textContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  textContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 60,
  },
  title: {
    color: COLORS.black,
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  value: {
    color: COLORS.black,
    fontSize: 16,
  },
});
