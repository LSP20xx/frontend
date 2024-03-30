import { NavigationContainer } from "@react-navigation/native";
import TabsNavigator from "./tabs";
import AuthNavigator from "./auth";
import { useEffect, useState } from "react";
import webSocketService from "../services/websocketService";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchBlockchains, getUserInfoById } from "../store/actions";

const Navigation = () => {
  const { userId } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // const useIntervalEffect = (callback, delay) => {
  //   const savedCallback = useRef();

  //   useEffect(() => {
  //     savedCallback.current = callback;
  //   }, [callback]);

  //   useEffect(() => {
  //     function tick() {
  //       savedCallback.current();
  //     }
  //     if (delay !== null) {
  //       let id = setInterval(tick, delay);
  //       return () => clearInterval(id);
  //     }
  //   }, [delay]);
  // };

  // useEffect(() => {
  //   const balanceFetchInterval = setInterval(() => {
  //     if (userId) {
  //       dispatch(getBalance(userId));
  //     }
  //   }, 30000);

  //   return () => clearInterval(balanceFetchInterval);
  // }, [userId, dispatch]);

  // useEffect(() => {
  //   const handleAppStateChange = (nextAppState) => {
  //     if (appState.match(/inactive|background/) && nextAppState === "active") {
  //       console.log("App has come to the foreground!");
  //       webSocketService.connect(dispatch);
  //     } else if (nextAppState.match(/inactive|background/)) {
  //       console.log("App has gone to the background!");
  //       webSocketService.disconnect();
  //     }
  //     setAppState(nextAppState);
  //   };

  //   AppState.addEventListener("change", handleAppStateChange);

  //   return () => {
  //     AppState.removeEventListener("change", handleAppStateChange);
  //   };
  // }, [appState, dispatch]);

  useEffect(() => {
    webSocketService.connect(dispatch);

    return () => {
      webSocketService.disconnect();
    };
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      webSocketService.subscribeToBalanceUpdate(userId);
      dispatch(getUserInfoById(userId));
    }
  }, [userId]);

  useEffect(() => {
    if (user) {
      console.log("user: ", user);
    }
  }, [user]);

  // useEffect(() => {
  //   webSocketService.connect(dispatch);
  //   return () => {
  //     webSocketService.disconnect();
  //   };
  // }, [dispatch]);

  useEffect(() => {
    if (userId) {
      let interval = setInterval(
        () => webSocketService.requestBalanceUpdate(userId),
        30000
      );
      return () => clearInterval(interval);
    }
  }, [userId]);

  // useEffect(() => {
  //   dispatch(getBalance(userId));
  //   const interval = setInterval(() => dispatch(getBalance(userId)), 30000);

  //   return () => clearInterval(interval);
  // }, [dispatch, userId]);

  // useEffect(() => {
  //   const subscription = AppState.addEventListener("change", (nextAppState) => {
  //     if (appState.match(/inactive|background/) && nextAppState === "active") {
  //       console.log("App has come to the foreground!");
  //       webSocketService.connect(dispatch);
  //     } else if (nextAppState.match(/inactive|background/)) {
  //       console.log("App has gone to the background!");
  //       webSocketService.disconnect();
  //     }
  //     setAppState(nextAppState);
  //   });

  //   return () => {
  //     subscription.remove();
  //   };
  // }, [appState, dispatch]);

  // useEffect(() => {
  //   if (userId) {
  //     console.log("userId: ", userId);
  //     let interval = setInterval(
  //       () => webSocketService.requestBalanceUpdate(userId),
  //       3000
  //     );
  //     return () => {
  //       clearInterval(interval);
  //       webSocketService.disconnect();
  //     };
  //   }
  // }, [userId]);

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
