import { NavigationContainer } from "@react-navigation/native";
import TabsNavigator from "./tabs";
import AuthNavigator from "./auth";
import { useEffect, useState } from "react";
import webSocketService from "../services/websocketService";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchBlockchains } from "../store/actions";
import { AppState } from "react-native";

const Navigation = () => {
  const userId = "c7dda908-ccff-485e-94a1-697fd183847c";
  const dispatch = useDispatch();
  const [appState, setAppState] = useState(AppState.currentState);

  const useIntervalEffect = (callback, delay) => {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };

  // useEffect(() => {
  //   dispatch(getBalance(userId));
  //   const interval = setInterval(() => dispatch(getBalance(userId)), 30000);

  //   return () => clearInterval(interval);
  // }, [dispatch, userId]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        console.log("App has come to the foreground!");
        webSocketService.connect(dispatch);
      } else if (nextAppState.match(/inactive|background/)) {
        console.log("App has gone to the background!");
        webSocketService.disconnect();
      }
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, [appState, dispatch]);

  useEffect(() => {
    if (userId) {
      console.log("Setting up interval for balance updates");
      let interval = setInterval(() => {
        console.log("Requesting balance update");
        webSocketService.requestBalanceUpdate(userId);
      }, 3000);
      return () => {
        console.log("Clearing interval and disconnecting WebSocket");
        clearInterval(interval);
        webSocketService.disconnect();
      };
    }
  }, [userId]);

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
