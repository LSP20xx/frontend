import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Navigator from './navigation';
import store from './store/index';
import { init } from './db';
import { COLORS } from './constants';
import { ThemeProvider } from './context/ThemeContext';

init()
  .then(() => {
    console.log('Database initialized');
  })
  .catch((err) => {
    console.log('Database failed to connect');
    console.log(err);
  });

export default function App() {
  const [loaded] = useFonts({
    'Uto-Regular': require('../assets/fonts/Uto/Uto-Regular.otf'),
    'Uto-SemiBold': require('../assets/fonts/Uto/Uto-Semibold.otf'),
    'Uto-ExtraBold': require('../assets/fonts/Uto/Uto-Extrabold.otf'),
    'Uto-Bold': require('../assets/fonts/Uto/Uto-Bold.otf'),
    'Uto-Light': require('../assets/fonts/Uto/Uto-Light.otf'),
    'Uto-Medium': require('../assets/fonts/Uto/Uto-Medium.otf'),
  });

  if (!loaded) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={COLORS.primaryLight} />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <ThemeProvider>
        <Navigator />
      </ThemeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
