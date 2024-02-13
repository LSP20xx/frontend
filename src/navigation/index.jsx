import { NavigationContainer } from "@react-navigation/native";
import TabsNavigator from "./tabs";
import AuthNavigator from "./auth";
import { useEffect } from "react";
import webSocketService from "../services/websocketService";
import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
const Navigation = () => {
  const userId = "c7dda908-ccff-485e-94a1-697fd183847c";
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getBalance(userId));
  //   const interval = setInterval(() => dispatch(getBalance(userId)), 30000);

  //   return () => clearInterval(interval);
  // }, [dispatch, userId]);

  useEffect(() => {
    webSocketService.connect(dispatch);
    return () => {
      webSocketService.disconnect();
    };
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(
      () => webSocketService.requestBalanceUpdate(userId),
      10000
    );

    return () => clearInterval(interval);
  }, [dispatch, userId]);

  return (
    <NavigationContainer>
      {userId ? <TabsNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default Navigation;
