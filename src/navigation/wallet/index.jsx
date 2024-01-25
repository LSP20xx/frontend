import {
  createNativeStackNavigator,
  cardStyleInterpolator,
} from "@react-navigation/native-stack";

import Assets from "../../screens/assets";
import Receive from "../../screens/receive";
import Asset from "../../screens/asset";
import Maps from "../../screens/maps";
import Send from "../../screens/send";
import Confirm from "../../screens/confirm";

import { COLORS } from "../../constants";

const Stack = createNativeStackNavigator();

const WalletNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Wallet"
      screenOptions={{
        headerShown: false,
        headerTintColor: COLORS.primaryLight,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="Assets" component={Assets} />
      <Stack.Screen name="Asset" component={Asset} />
      <Stack.Screen name="Receive" component={Receive} />
      <Stack.Screen name="Send" component={Send} />
      <Stack.Screen name="Confirm" component={Confirm} />
    </Stack.Navigator>
  );
};

export default WalletNavigator;
