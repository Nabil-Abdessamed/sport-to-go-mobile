import React from "react";
import { View, Platform } from "react-native";
import HomeScreen from "@components/home";
import MenuScreen from "@components/menu";
import { ChatStack } from "./ChatRoute";
import { SessionStack } from "./SessionRoute";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { STGColors, STGBadge, STGText } from "stg-ui";
import { useSelector, shallowEqual } from "react-redux";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const HomeIcon = ({ color = "black" }) => (
  <MaterialIcons name="home" size={28} color={color} />
);
const ChatIcon = ({ color = "black" }) => (
  <MaterialIcons name="message" size={28} color={color} />
);
const SessionIcon = ({ color = "black" }) => (
  <FontAwesome5 name="football-ball" size={26} color={color} />
);
const SettingIcon = ({ color = "black" }) => (
  <MaterialIcons name="menu" size={28} color={color} />
);

function ChatIconComponent({ color }) {
  const { messagesCount } = useSelector((state) => state.chat, shallowEqual);
  return (
    <View>
      <ChatIcon color={color} />
      {messagesCount > 0 && (
        <STGBadge
          backgroundColor={STGColors.error}
          containerStyle={{ position: "absolute", top: -5, right: -5 }}
        >
          <STGText
            color="white"
            size={10}
            text={`${messagesCount}`}
            weight="300"
          />
        </STGBadge>
      )}
    </View>
  );
}

export default function BottomMenuRoute() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      tabBarOptions={{
        keyboardHidesTabBar: Platform.select({ ios: false, android: true }),
        showLabel: false,
        activeTintColor: "ghostwhite",
        inactiveTintColor: "black",
        style: {
          backgroundColor: STGColors.container,
          height: 48,
        },
      }}
      backBehavior="initialRoute"
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="SessionScreen"
        component={SessionStack}
        options={{
          tabBarIcon: ({ color }) => <SessionIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="ChatScreen"
        component={ChatStack}
        options={{
          tabBarIcon: ({ color }) => <ChatIconComponent color={color} />,
        }}
      />
      <Tab.Screen
        name="SettingScreen"
        component={MenuScreen}
        options={{
          tabBarIcon: ({ color }) => <SettingIcon color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
