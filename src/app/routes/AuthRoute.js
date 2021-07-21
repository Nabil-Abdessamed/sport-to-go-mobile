import React from "react";
import Landing from "@components/landing";
import Login from "@components/login";
import Activation from "@components/activation";
import Register from "@components/register";
import RegisterTwo from "@components/register/register2";
import RegisterThree from "@components/register/register3";
import RegisterFour from "@components/register/register4";
import RegisterFive from "@components/register/register5";
import RegisterSix from "@components/register/register6";
import RegisterSeven from "@components/register/register7";
import ResetPassword from "@components/reset-password";
import RequestResetPassword from "@components/request-reset-password";

import { createStackNavigator } from "@react-navigation/stack";
import { STGColors } from "stg-ui";

const Stack = createStackNavigator();

export default function AuthRoute() {
  return (
    <Stack.Navigator
      initialRouteName="Landing"
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitle: null,
        gestureEnabled: false,
        headerBackTitleVisible: false,
        headerTitle: null,
        headerStyle: { backgroundColor: STGColors.container },
        headerTintColor: "#000",
      }}
    >
      <Stack.Screen
        name="Landing"
        component={Landing}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="RegisterTwo" component={RegisterTwo} />
      <Stack.Screen name="RegisterThree" component={RegisterThree} />
      <Stack.Screen name="RegisterFour" component={RegisterFour} />
      <Stack.Screen name="RegisterFive" component={RegisterFive} />
      <Stack.Screen name="RegisterSix" component={RegisterSix} />
      <Stack.Screen name="RegisterSeven" component={RegisterSeven} />
      <Stack.Screen name="Activation" component={Activation} />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RequestResetPassword"
        component={RequestResetPassword}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
