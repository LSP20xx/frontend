import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TabsNavigator from './tabs';
import AuthNavigator from './auth';
import TermsNavigator from './terms';
import webSocketService from '../services/websocketService';

import {
  fetchBlockchains,
  getTransactions,
  getUserInfoById,
} from '../store/actions';

function Navigation() {
  const { userId, termsAndConditionsAccepted } = useSelector(
    (state) => state.auth,
  );
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
      dispatch(getTransactions(userId));
    }
  }, [userId]);

  useEffect(() => {
    if (user) {
      console.log('user: ', user);
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
      const interval = setInterval(
        () => webSocketService.requestBalanceUpdate(userId),
        30000,
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

      const interval = setInterval(() => fetchBlockchains()(dispatch), 60000);
      return () => clearInterval(interval);
    }
  }, [dispatch, userId]);

  return (
    <NavigationContainer>
      {userId ? (
        termsAndConditionsAccepted ? (
          <TabsNavigator />
        ) : (
          <TermsNavigator />
        )
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}

export default Navigation;
