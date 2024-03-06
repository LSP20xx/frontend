import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { COLORS } from "../../constants";
import Card from "../../screens/card";
import UserConfig from "../../screens/user-config";

const Stack = createNativeStackNavigator();

const CardNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Tarjeta"
      screenOptions={{
        headerShown: false,
        headerTintColor: COLORS.primaryLight,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="Tarjeta" component={Card} />
      <Stack.Screen name="UserConfig" component={UserConfig} />
    </Stack.Navigator>
  );
};

export default CardNavigator;
