import React from "react";
import { useTranslation } from "react-i18next";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { STGColors } from "stg-ui";
import SessionRegular from "@components/session-regular/SessionRegular";
import SessionUnique from "@components/session-unique/SessionUnique";
import SessionRandom from "@components/session-random/SessionRandom";

const Tab = createMaterialTopTabNavigator();

export const SessionStack = () => {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#FFF",
        inactiveTintColor: "#000",
        tabStyle: { backgroundColor: STGColors.container },
        allowFontScaling: true,
        pressOpacity: 0.8,
        labelStyle: { fontFamily: "Roboto-Medium" },
      }}
      initialRouteName="SessionRegular"
    >
      <Tab.Screen
        name="SessionRegular"
        component={SessionRegular}
        options={{
          tabBarLabel: t("session:tabs.regular"),
        }}
      />
      <Tab.Screen
        name="SessionUnique"
        component={SessionUnique}
        options={{
          tabBarLabel: t("session:tabs.unique"),
        }}
      />
      {/* <Tab.Screen
        name="SessionRandom"
        component={SessionRandom}
        options={{
          tabBarLabel: t("session:tabs.random"),
        }}
      /> */}
    </Tab.Navigator>
  );
};
