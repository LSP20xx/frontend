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
    </Stack.Navigator>
  );
};

export default MarketsNavigator;
