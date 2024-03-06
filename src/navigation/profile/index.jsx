import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { COLORS } from "../../constants";
import { Profile } from "../../screens";
import UserConfig from "../../screens/user-config";

const Stack = createNativeStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Perfil"
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primaryLight,
        },
        headerTintColor: COLORS.white,
      }}
    >
      <Stack.Screen name="Perfil" component={Profile} />
      <Stack.Screen name="UserConfig" component={UserConfig} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
