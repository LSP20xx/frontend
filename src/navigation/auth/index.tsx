import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Auth } from '../../screens';
import { Verification } from '../../screens/verification';

const Stack = createNativeStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Auth"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="Verification" component={Verification} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
