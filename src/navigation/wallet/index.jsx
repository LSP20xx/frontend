import {
  createNativeStackNavigator,
  cardStyleInterpolator,
} from "@react-navigation/native-stack";
import { Verification } from "../../screens/verification";

import Assets from "../../screens/assets";
import Asset from "../../screens/asset";
import Receive from "../../screens/receive";
import Send from "../../screens/send";
import Confirm from "../../screens/confirm";

import { COLORS } from "../../constants";
import AssetsList from "../../screens/assets-list";
import MarketAsset from "../../screens/market-asset";
import UserConfig from "../../screens/user-config";
import MyInformation from "../../screens/user-my-information";
import LocalCurrency from "../../screens/user-local-currency";
import Notifications from "../../screens/user-notifications";
import Security from "../../screens/user-security";
import Language from "../../screens/user-language";
import KYCStep1 from "../../screens/kyc-step-1";
import KYCStep2 from "../../screens/kyc-step-2";
import KYCStep3 from "../../screens/kyc-step-3";
import KYCStep4 from "../../screens/kyc-step-4";

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
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
      <Stack.Screen name="MarketAsset" component={MarketAsset} />
      <Stack.Screen name="ReceiveList" component={AssetsList} />
      <Stack.Screen name="Receive" component={Receive} />
      <Stack.Screen name="SendList" component={AssetsList} />
      <Stack.Screen name="Send" component={Send} />
      <Stack.Screen name="Confirm" component={Confirm} />
      <Stack.Screen name="Verification" component={Verification} />
      <Stack.Screen name="UserConfig" component={UserConfig} />
      <Stack.Screen name="UserMyInformation" component={MyInformation} />
      <Stack.Screen name="UserLocalCurrency" component={LocalCurrency} />
      <Stack.Screen name="UserNotifications" component={Notifications} />
      <Stack.Screen name="UserSecurity" component={Security} />
      <Stack.Screen name="UserLanguage" component={Language} />
      <Stack.Screen name="KYCStep1" component={KYCStep1} />
      <Stack.Screen name="KYCStep2" component={KYCStep2} />
      <Stack.Screen name="KYCStep3" component={KYCStep3} />
      <Stack.Screen name="KYCStep4" component={KYCStep4} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
