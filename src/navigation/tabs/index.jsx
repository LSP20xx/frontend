import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeNavigator from "../wallet";
import MarketsNavigator from "../markets";
import WalletNavigator from "../profile";
import CardNavigator from "../card";
import { View } from "react-native";
import { SvgXml } from "react-native-svg";
import { useTheme } from "../../context/ThemeContext";

const getMarketsIconSvg = (isFocused, primaryColor) => {
  console.log("isFocused", isFocused);
  console.log("primaryColor", primaryColor);
  const strokeColor = isFocused ? "#FFFFFF" : primaryColor;
  const fillColor = isFocused ? primaryColor : "transparent";

  return `
  <svg id="Capa_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 83.83 65.09">
    <style>
      .cls-1 {
        fill: ${fillColor};
      }
      .cls-2 {
        stroke: ${strokeColor};
        stroke-linecap: round;
        stroke-width: 3.53px;
      }
    </style>
    <g id="Layer_1" data-name="Layer 1">
      <rect class="cls-1" x="3" y="3" width="77.83" height="59.09" rx="15.28" ry="15.28"/>
      <polyline class="cls-2" points="14.33 50.94 23.16 37.05 28.75 44.09 41.73 22.45 53.63 38.32 70.22 13.61"/>
    </g>
  </svg>`;
};
const getHomeIconSvg = (color) => {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 65.14 69.55"><defs><style>.cls-1{fill:#f08322;stroke:#f08322;stroke-miterlimit:10;stroke-width:2px;}</style></defs><path class="cls-1" d="M15.15,68.55c-.4-.11-.8-.21-1.19-.34a6.67,6.67,0,0,1-4.61-6.53q0-11.08,0-22.16v-.87H8.62c-1.45.05-2.9.08-4.35.14a1.65,1.65,0,0,1-1.42-.68,8.05,8.05,0,0,1-1.49-7.63A6.72,6.72,0,0,1,3.19,27.4Q15.27,15.34,27.34,3.24A8.15,8.15,0,0,1,31.64,1h1.85c2.28.36,3.85,1.81,5.41,3.38q11.4,11.48,22.88,22.9a8.16,8.16,0,0,1,1.29,9.78,8,8,0,0,1-.82,1.12,1.77,1.77,0,0,1-1.52.61c-1.62,0-3.24,0-4.95,0,0,.16,0,.43,0,.71q0,11,0,22a6.73,6.73,0,0,1-4.65,6.71c-.37.12-.75.22-1.12.33H40.22a1.94,1.94,0,0,1-1.22-2c0-4.7,0-9.41,0-14.11a3.51,3.51,0,0,0-3.74-3.77H30a3.55,3.55,0,0,0-3.88,3.89c0,4.66,0,9.33,0,14a1.94,1.94,0,0,1-1.21,2ZM42.2,65.34l.52,0c2.05,0,4.09,0,6.14,0a3.49,3.49,0,0,0,3.68-3.69c0-.48,0-1,0-1.45V37.6c0-1.4.4-1.86,1.76-2.07a7.44,7.44,0,0,1,1.05-.09c1.43,0,2.86,0,4.28.12a.85.85,0,0,0,1-.64,5,5,0,0,0-1.07-5.36q-12-12-24-24a3.86,3.86,0,0,0-5.92,0c-8,8-16,16-24,24a5.24,5.24,0,0,0-1.06,5.43.9.9,0,0,0,1,.65c1.67-.06,3.34-.14,5,0s2,.61,2,2.19V61.46a3.56,3.56,0,0,0,3.88,3.91h6.51v-.85c0-4.09,0-8.18,0-12.27a6.63,6.63,0,0,1,6.73-6.79c1.92,0,3.83,0,5.74,0a6.66,6.66,0,0,1,6.8,6.81c0,3.28,0,6.56,0,9.83Z"/></svg>`;
};

const getCardIconSvg = (color) => {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 83.83 65.09" style="enable-background:new 0 0 83.83 65.09;" xml:space="preserve">
<style type="text/css">
	.st0{fill:none;stroke:#F08322;stroke-width:6;stroke-miterlimit:10;}
	.st1{fill:none;stroke:#F08322;stroke-width:5;stroke-miterlimit:10;}
</style>
<g>
	<path class="st0" d="M65.55,62.09H18.28C9.84,62.09,3,55.25,3,46.81V18.28C3,9.84,9.84,3,18.28,3h47.27   c8.44,0,15.28,6.84,15.28,15.28v28.53C80.83,55.25,73.99,62.09,65.55,62.09z"/>
	<line class="st1" x1="4.11" y1="23.54" x2="78.21" y2="23.54"/>
</g>
</svg>`;
};

const getWalletIconSvg = (color) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 64.38 85.66" style="enable-background:new 0 0 64.38 85.66;" xml:space="preserve">
  <style type="text/css">
    .st0{fill:#ED8423;}
  </style>
  <g>
    <path class="st0" d="M46.15,53.44c0,2.35-1.94,4.24-4.33,4.22c-2.3-0.01-4.19-1.88-4.2-4.16c-0.02-2.33,1.9-4.23,4.23-4.21   C44.25,49.32,46.15,51.14,46.15,53.44z"/>
    <path class="st0" d="M64.25,36.85c-0.04-2.86-1.34-5.28-3.7-7.09c-2.01-1.54-4.35-1.97-6.8-2.11c-0.01,0-0.01,0-0.01-0.01   c-0.27-0.3-0.17-0.67-0.17-1.02c-0.02-2.14,0.08-4.28-0.05-6.41c-0.33-5.71-4.3-9.11-9.35-9.19c-2.54-0.04-5.09-0.07-7.63-0.08   c-0.01,0-0.02-0.01-0.02-0.02V2.27c0-1.25-1.04-2.27-2.32-2.27h-3.8c-1.28,0-2.32,1.02-2.32,2.27v8.65c0,0.01-0.01,0.02-0.02,0.02   c-1.69,0-3.37,0.01-5.06,0.02c-0.01,0-0.02-0.01-0.02-0.02V2.27c0-1.25-1.04-2.27-2.32-2.27h-3.8c-1.28,0-2.32,1.02-2.32,2.27v8.71   c0,0.01-0.01,0.02-0.02,0.02c-0.81,0-1.62,0.01-2.44,0.01c-1.8,0.01-3.54,0.51-5.13,1.35c-4.61,2.47-6.9,6.33-6.94,11.45   C-0.02,30.34,0,36.87,0.01,43.39c0,6.79-0.03,13.59,0.05,20.38c0.04,3.13,1.17,5.91,3.38,8.23c2.52,2.75,5.7,4.02,9.42,4.05   c0.56,0.01,1.12,0.01,1.68,0.01c0.01,0,0.02,0.01,0.02,0.02v7.31c0,1.25,1.04,2.27,2.32,2.27h3.8c1.28,0,2.32-1.02,2.32-2.27v-7.27   c0-0.01,0.01-0.02,0.02-0.02c1.69,0,3.37,0,5.06,0c0.01,0,0.02,0.01,0.02,0.02v7.27c0,1.25,1.04,2.27,2.32,2.27h3.8   c1.28,0,2.32-1.02,2.32-2.27v-7.27c0-0.01,0.01-0.02,0.02-0.02c6.03,0,12.07,0,18.1-0.02c5.31-0.02,9.56-3.96,9.63-9.06   C64.43,56.96,64.4,46.9,64.25,36.85z M11.14,20.11c1.04-0.44,2.08-0.66,3.23-0.66c9.48,0.01,18.97-0.02,28.45-0.04   c0.27,0,0.55,0,0.82,0.03c0.78,0.07,1.28,0.39,1.28,1.26c-0.01,2.14,0.01,4.27,0.02,6.41c0,0.37-0.19,0.54-0.55,0.56   c-0.45,0.02-0.91,0.05-1.36,0.05c-4.91,0-8.79,0.05-13.69,0.05c0,0-0.01,0-0.01,0c-0.07,0.01-0.95-0.02-1.02,0c0,0-0.01,0-0.01,0   c-5.03,0-10.06,0-15.08,0c-1.74,0-3.2-0.55-4.07-2.15C7.86,23.25,8.62,21.18,11.14,20.11z M55.65,65.54c0,1.73-0.59,2.13-2.59,2.11   c-4.88-0.04-9.75-0.04-14.63-0.04c-8.18,0-16.36,0-24.54,0.02c-1.39,0-2.67-0.12-3.84-0.92c0,0,0,0,0,0L9.81,66.5c0,0,0,0,0,0   c-0.06-0.09-0.12-0.17-0.18-0.25c-0.77-1.06-0.99-2.27-0.98-3.54c0.01-3.5,0-7,0-10.5c0-5.01-0.01-10.01,0-15.02   c0-1.47-0.17-1.34,1.39-1.27c12.44,0.55,24.89,0.18,37.33,0.25c2.18,0.01,4.36,0.02,6.54,0.04c1.44,0.01,1.74,0.28,1.74,1.65   C55.65,47.08,55.66,56.31,55.65,65.54z"/>
    <path class="st0" d="M41.85,49.32c-2.33-0.02-4.24,1.88-4.23,4.21c0.01,2.27,1.9,4.14,4.2,4.16c2.4,0.02,4.34-1.87,4.33-4.22   C46.15,51.16,44.26,49.34,41.85,49.32z"/>
  </g>
  </svg>
`;
};

const BottomTab = createBottomTabNavigator();

const TabsNavigator = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.background,
          fontSize: 20,
          height: 60,
        },
        tabBarActiveTintColor: theme.primaryLight,
        tabBarInactiveTintColor: theme.primary,
        tabBarInactiveBackgroundColor: theme.background,
        tabBarLabelStyle: {
          fontSize: 12,
          color: theme.black,
          fontFamily: "Uto-Medium",
          marginBottom: 2,
        },
      }}
    >
      <BottomTab.Screen
        name="HomeTab"
        component={HomeNavigator}
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: {
            color: theme.text,
            fontSize: 12,
            fontFamily: "Uto-Medium",
            marginBottom: 2,
          },
          tabBarIcon: ({ focused, color, size }) => (
            <SvgXml
              xml={getHomeIconSvg(color)}
              width={45}
              height={35}
              stroke={theme.primaryLight}
              strokeWidth={4}
              fill={theme.background}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="MarketsTab"
        component={MarketsNavigator}
        options={{
          tabBarLabel: "Mercado",
          tabBarLabelStyle: {
            color: theme.text,
            fontSize: 12,
            fontFamily: "Uto-Medium",
            marginBottom: 2,
          },
          tabBarIcon: ({ focused, color, size }) => (
            <SvgXml
              xml={getMarketsIconSvg(focused, color)}
              width={45}
              height={45}
              stroke={focused ? theme.background : theme.primaryLight}
              strokeWidth={6}
              fill={focused ? theme.primaryLight : theme.background}
            />
          ),
        }}
      />

      <BottomTab.Screen
        name="WalletTab"
        component={WalletNavigator}
        options={{
          tabBarLabel: "Wallet",
          tabBarLabelStyle: {
            color: theme.text,
            fontSize: 12,
            fontFamily: "Uto-Medium",
            marginBottom: 2,
          },
          tabBarIcon: ({ focused, color, size }) => (
            <SvgXml
              xml={getWalletIconSvg(color)}
              width={40}
              height={40}
              stroke={theme.white}
              fill={theme.primaryLight}
            />
          ),
          // tabBarButton: (props) => <View {...props} enabled={true} />,
        }}
      />

      <BottomTab.Screen
        name="CardTab"
        component={CardNavigator}
        options={{
          tabBarLabel: "Tarjeta",
          tabBarLabelStyle: {
            color: theme.text,
            fontSize: 12,
            fontFamily: "Uto-Medium",
            marginBottom: 2,
          },
          tabBarIcon: ({ focused, color }) => (
            <SvgXml
              xml={getCardIconSvg(color)}
              width={45}
              height={45}
              stroke={theme.primaryLight}
              strokeWidth={6}
              fill={theme.background}
            />
          ),
          tabBarButton: (props) => <View {...props} enabled={true} />,
        }}
      />
    </BottomTab.Navigator>
  );
};

export default TabsNavigator;
