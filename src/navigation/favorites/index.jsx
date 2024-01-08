import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Place from "../../screens/place";
import Places from "../../screens/asset";

import { COLORS } from "../../constants";
import { Favorites } from "../../screens";

const Stack = createNativeStackNavigator();

const FavoritesNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Favoritos"
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primaryLight,
        },
        headerTintColor: COLORS.white,
      }}
    >
      <Stack.Screen name="Favoritos" component={Favorites} />
    </Stack.Navigator>
  );
};

export default FavoritesNavigator;
