import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Place from "../../screens/place";
import Places from "../../screens/market-asset";

import { COLORS } from "../../constants";
import AssetsList from "../../screens/assets-list";

const Stack = createNativeStackNavigator();

const MarketsNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="AssetsList"
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primaryLight,
        },
        headerTintColor: COLORS.white,
      }}
    >
      <Stack.Screen name="AssetsList" component={AssetsList} />
    </Stack.Navigator>
  );
};

export default MarketsNavigator;
