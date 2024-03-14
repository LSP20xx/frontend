import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { COLORS } from "../../constants";
import Card from "../../screens/card";
import UserConfig from "../../screens/user-config";
import Language from "../../screens/user-language";
import MyInformation from "../../screens/user-my-information";
import LocalCurrency from "../../screens/user-local-currency";
import Notifications from "../../screens/user-notifications";
import Security from "../../screens/user-security";

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
      <Stack.Screen name="UserMyInformation" component={MyInformation} />
      <Stack.Screen name="UserLocalCurrency" component={LocalCurrency} />
      <Stack.Screen name="UserNotifications" component={Notifications} />
      <Stack.Screen name="UserSecurity" component={Security} />
      <Stack.Screen name="UserLanguage" component={Language} />
    </Stack.Navigator>
  );
};

export default CardNavigator;
