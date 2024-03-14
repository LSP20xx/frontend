import Navigator from "./navigation";
import { Provider } from "react-redux";
import store from "./store/index";
import { init } from "./db";
import { useFonts } from "expo-font";
import { ActivityIndicator } from "react-native";
import { COLORS } from "./constants";
import { ThemeProvider } from "./context/ThemeContext";

init()
  .then(() => {
    console.log("Database initialized");
  })
  .catch((err) => {
    console.log("Database failed to connect");
    console.log(err);
  });

export default function App() {
  const [loaded] = useFonts({
    "Uto-Regular": require("../assets/fonts/Uto/Uto-Regular.otf"),
    "Uto-SemiBold": require("../assets/fonts/Uto/Uto-Semibold.otf"),
    "Uto-ExtraBold": require("../assets/fonts/Uto/Uto-Extrabold.otf"),
    "Uto-Bold": require("../assets/fonts/Uto/Uto-Bold.otf"),
    "Uto-Light": require("../assets/fonts/Uto/Uto-Light.otf"),
    "Uto-Medium": require("../assets/fonts/Uto/Uto-Medium.otf"),
  });

  if (!loaded) {
    return (
      <ActivityIndicator
        size={"large"}
        color={COLORS.primaryLight}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
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
