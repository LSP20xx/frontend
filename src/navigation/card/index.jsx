import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Place from "../../screens/place";
import Places from "../../screens/asset";

import { COLORS } from "../../constants";
import { Favorites } from "../../screens";

const Stack = createNativeStackNavigator();

const CardNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Tarjeta"
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primaryLight,
        },
        headerTintColor: COLORS.white,
      }}
    >
      <Stack.Screen name="Tarjeta" component={Favorites} />
    </Stack.Navigator>
  );
};

export default CardNavigator;
