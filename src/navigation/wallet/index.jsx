import {
  createNativeStackNavigator,
  cardStyleInterpolator,
} from "@react-navigation/native-stack";
import { Verification } from "../../screens/verification";

import Assets from "../../screens/assets";
import Receive from "../../screens/receive";
import Send from "../../screens/send";
import Confirm from "../../screens/confirm";

import { COLORS } from "../../constants";
import AssetsList from "../../screens/assets-list";
import MarketAsset from "../../screens/market-asset";
import UserConfig from "../../screens/user-config";

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
      <Stack.Screen name="MarketAsset" component={MarketAsset} />
      <Stack.Screen name="ReceiveList" component={AssetsList} />
      <Stack.Screen name="Receive" component={Receive} />
      <Stack.Screen name="SendList" component={AssetsList} />
      <Stack.Screen name="Send" component={Send} />
      <Stack.Screen name="Confirm" component={Confirm} />
      <Stack.Screen name="Verification" component={Verification} />
      <Stack.Screen name="UserConfig" component={UserConfig} />
    </Stack.Navigator>
  );
};

export default WalletNavigator;
