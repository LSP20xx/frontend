import { useTheme } from "../../context/ThemeContext";
import TermsAndConditions from "../../screens/terms-and-conditions";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

const TermsNavigator = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="TermsAndConditions"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
    </Stack.Navigator>
  );
};

export default TermsNavigator;
