import { useTheme } from "../../context/ThemeContext";
import TermsAndConditions from "../../screens/terms-and-conditions";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

const TermsNavigator = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TermsAndConditions"
        component={TermsAndConditions}
        options={{ title: "Accept Terms" }}
      />
    </Stack.Navigator>
  );
};

export default TermsNavigator;
