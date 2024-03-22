import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { COLORS } from "../../constants";
import AssetsList from "../../screens/assets-list";
import { MarketAsset } from "../../screens";
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

const MarketsAssetsListWrapper = ({ navigation }) => {
  return (
    <AssetsList
      navigation={navigation}
      route={{ params: { mode: "markets" } }}
      showBackButton={false}
    />
  );
};

const Stack = createNativeStackNavigator();

const MarketsNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MarketsAssetsListWrapper"
      screenOptions={{
        headerShown: false,
        headerTintColor: COLORS.primaryLight,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="MarketsAssetsListWrapper"
        component={MarketsAssetsListWrapper}
      />
      <Stack.Screen name="MarketAsset" component={MarketAsset} />
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

export default MarketsNavigator;
