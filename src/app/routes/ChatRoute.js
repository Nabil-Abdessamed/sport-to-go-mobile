import React from "react";
import { SafeAreaView } from "react-native";
import ChatUsers from "@components/chat-users";
import ChatConversation from "@components/chat-conversation";
import { STGColors, STGFonts } from "stg-ui";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
} from "@react-navigation/material-top-tabs";
import { useTranslation } from "react-i18next";
const Tab = createMaterialTopTabNavigator();

export const SafeAreaMaterialTopTabBar = ({ ...props }) => (
  <SafeAreaView style={{ backgroundColor: STGColors.container }}>
    <MaterialTopTabBar {...props} />
  </SafeAreaView>
);

export const ChatStack = () => {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#FFF",
        inactiveTintColor: "#000",
        tabStyle: { backgroundColor: STGColors.container },
        allowFontScaling: true,
        pressOpacity: 0.8,
        labelStyle: { fontFamily: STGFonts.RobotoBold },
      }}
    >
      <Tab.Screen
        name="ConversationScreen"
        component={ChatConversation}
        options={{
          tabBarLabel: t("chat:conversations"),
        }}
      />
      <Tab.Screen
        name="UsersScreen"
        component={ChatUsers}
        options={{ tabBarLabel: t("chat:online") }}
      />
    </Tab.Navigator>
  );
};
