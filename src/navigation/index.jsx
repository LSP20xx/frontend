import { NavigationContainer } from "@react-navigation/native";
import TabsNavigator from "./tabs";
import AuthNavigator from "./auth";
// import { useSelector } from "react-redux";
const Navigation = () => {
  // const userId = useSelector(state => state.auth.userId);
  return (
    <NavigationContainer>
      {
        // userId ? <TabsNavigator /> : <AuthNavigator />
        <TabsNavigator />
      }
    </NavigationContainer>
  );
};

export default Navigation;
