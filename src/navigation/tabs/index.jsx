import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeNavigator from "../wallet";
import MarketsNavigator from "../markets";
import WalletNavigator from "../profile";
import CardNavigator from "../card";
import { View } from "react-native";
import { SvgXml } from "react-native-svg";
import { useTheme } from "../../context/ThemeContext";

const getMarketsIconSvg = (isFocused, primaryColor) => {
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
  <svg id="Capa_2" data-name="Capa 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58.76 63.22">
    <defs>
      <style>
        .cls-1 {
          fill: ${color};
          stroke: ${color};
          stroke-miterlimit: 10;
          stroke-width: 3.53px;
        }
      </style>
    </defs>
    <g id="Layer_1" data-name="Layer 1">
      <path class="cls-1" d="m39,62.18c.23.01.37.03.52.03,2.04,0,4.09.01,6.13,0,2.22-.02,3.65-1.46,3.68-3.69,0-.48,0-.97,0-1.45,0-7.54,0-15.08,0-22.62,0-1.39.4-1.86,1.76-2.07.35-.05.7-.09,1.05-.08,1.43.02,2.86.04,4.28.12.55.03.78-.18.96-.64.74-1.86.33-3.96-1.07-5.36-8.01-8.01-16.01-16.01-24.02-24.02-1.84-1.84-4.09-1.84-5.92-.01-7.99,7.99-15.96,16-23.99,23.96-1.56,1.54-1.65,3.95-1.05,5.43.2.5.47.67,1.02.65,1.67-.06,3.34-.15,5.01-.05,1.59.1,1.96.61,1.96,2.2,0,7.92,0,15.83,0,23.75,0,2.47,1.43,3.9,3.88,3.91,1.76,0,3.52,0,5.28,0,.39,0,.78,0,1.24,0,0-.33,0-.59,0-.85,0-4.09-.01-8.18,0-12.27.02-3.87,2.87-6.75,6.74-6.79,1.91-.02,3.83-.02,5.74,0,3.91.04,6.77,2.91,6.79,6.81.02,3.28,0,6.55,0,9.83,0,1.05,0,2.11,0,3.24Z"/>
    </g>
  </svg>`;
};

const getCardIconSvg = (color) => {
  return `
  <svg id="Capa_2" data-name="Capa 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 83.83 65.09">
  <defs>
    <style>
      .cls-1 {
        stroke-width: 6px;
      }

      .cls-1, .cls-2 {
        fill: none;
        stroke: ${color};
        stroke-miterlimit: 10;
      }

      .cls-2 {
        stroke-width: 5px;
      }
    </style>
  </defs>
  <g id="Layer_1" data-name="Layer 1">
    <g>
      <rect class="cls-1" x="3" y="3" width="77.83" height="59.09" rx="15.28" ry="15.28"/>
      <line class="cls-2" x1="4.11" y1="23.54" x2="78.21" y2="23.54"/>
    </g>
  </g>
</svg>`;
};

const getWalletIconSvg = (color) => {
  return `<svg id="Capa_2" data-name="Capa 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66.49 68.73">
  <defs>
    <style>
      .cls-1 {
        fill: ${color};
        stroke-width: 0px;
      }
    </style>
  </defs>
  <g id="Capa_1-2" data-name="Capa 1">
    <g>
      <path class="cls-1" d="M66.36,27.3c-.05-3.02-1.38-5.57-3.82-7.48-2.07-1.63-4.5-2.07-7.02-2.22,0,0-.01,0-.01,0-.28-.32-.18-.71-.18-1.07-.02-2.25.08-4.51-.05-6.75C54.93,3.75,50.84.17,45.62.09c-2.63-.04-5.25-.07-7.88-.09L15.04.03s0,.02-.02.02c-.84,0-1.68,0-2.52.01-1.86,0-3.66.53-5.3,1.43C2.44,4.09.07,8.17.03,13.56-.02,20.44,0,27.32,0,34.21c0,7.16-.03,14.33.05,21.49.04,3.3,1.2,6.23,3.49,8.67,2.6,2.89,5.88,4.23,9.73,4.27.58,0,.73.02,1.31.02.01,0,.19,0,.57.02l1.9.04c.39,0,.35,0,1.67,0h1.18c1.32,0,1.34,0,2.29,0h1.45c.12,0,.14,0,.15,0,1.74,0,3.33.01,5.03,0,.06,0,.13,0,.19,0h2.29c.42,0-.04,0,1.28,0h.95c1,0,1,0,2.17,0h1.97s.09,0,.1,0c6.23,0,12.41-.04,18.65-.06,5.49-.02,9.87-4.17,9.95-9.55.15-10.6.13-21.21-.03-31.81ZM11.51,9.67c1.07-.46,2.15-.7,3.33-.7,9.8,0,19.59-.02,29.39-.04.28,0,.56,0,.84.03.81.08,1.32.41,1.32,1.33-.01,2.25.01,4.5.02,6.75,0,.39-.2.57-.57.59-.47.02-.94.06-1.41.06-5.07,0-9.08.06-14.14.06,0,0,0,0,0,0-.07.01-.99-.02-1.05,0,0,0,0,0,0,0-5.19,0-10.39,0-15.58,0-1.8,0-3.31-.58-4.2-2.26-1.33-2.5-.54-4.68,2.07-5.81ZM53.81,59.79c-5.04-.05-10.08-.05-15.11-.05-8.45,0-16.9,0-25.35.02-1.44,0-2.76-.12-3.97-.97,0,0,0,0,0,0l-.24-.23s0,0,0,0c-.07-.09-.12-.18-.19-.27-.8-1.12-1.02-2.39-1.02-3.73,0-3.69,0-7.38,0-11.07,0-5.28-.01-10.56,0-15.83,0-1.55-.18-1.41,1.43-1.34,12.85.58,25.7.19,38.55.26,2.25.01,4.51.02,6.76.04,1.48.01,1.8.3,1.8,1.74.01,9.73.02,19.46.01,29.2,0,1.82-.61,2.25-2.68,2.23Z"/>
      <circle class="cls-1" cx="43.37" cy="45.56" r="4.5"/>
    </g>
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
              strokeWidth={6}
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
              xml={getMarketsIconSvg(color)}
              width={45}
              height={45}
              stroke={theme.primaryLight}
              strokeWidth={6}
              fill={theme.background}
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
              strokeWidth={4}
              fill={theme.primaryLight}
            />
          ),
          tabBarButton: (props) => <View {...props} enabled={true} />,
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
        }}
      />
    </BottomTab.Navigator>
  );
};

export default TabsNavigator;
