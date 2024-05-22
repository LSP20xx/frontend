import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../../context/ThemeContext';
import TermsAndConditions from '../../screens/terms-and-conditions';

const Stack = createNativeStackNavigator();

function TermsNavigator() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="TermsAndConditions"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
    </Stack.Navigator>
  );
}

export default TermsNavigator;
