import {
  createNativeStackNavigator,
  cardStyleInterpolator,
} from "@react-navigation/native-stack";

import Assets from "../../screens/assets";
import Receive from "../../screens/receive";
import Asset from "../../screens/asset";
import Send from "../../screens/send";
import Confirm from "../../screens/confirm";

import { COLORS } from "../../constants";
import AssetsList from "../../screens/assets-list";

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
      <Stack.Screen name="ReceiveList" component={AssetsList} />
      <Stack.Screen name="SendList" component={AssetsList} />
      <Stack.Screen name="Confirm" component={Confirm} />
    </Stack.Navigator>
  );
};

export default WalletNavigator;
