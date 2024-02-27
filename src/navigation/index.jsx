import { NavigationContainer } from "@react-navigation/native";
import TabsNavigator from "./tabs";
import AuthNavigator from "./auth";
import { useEffect } from "react";
import webSocketService from "../services/websocketService";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchBlockchains } from "../store/actions";

const Navigation = () => {
  const userId = useSelector((state) => state.auth.userId);
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
    if (userId) {
      let interval = setInterval(
        () => webSocketService.requestBalanceUpdate(userId),
        3000
      );
      return () => clearInterval(interval);
    }
    return () => {
      webSocketService.disconnect();
    };
  }, [dispatch, userId]);

  useEffect(() => {
    if (userId) {
      fetchBlockchains()(dispatch);

      let interval = setInterval(() => fetchBlockchains()(dispatch), 60000);
      return () => clearInterval(interval);
    }
  }, [dispatch, userId]);

  return (
    <NavigationContainer>
      {userId ? <TabsNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default Navigation;
