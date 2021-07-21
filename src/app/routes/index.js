import React from "react";
import Logout from "@components/logout";
import AuthLoading from "./auth-loading";
import BottomMenuRoute from "./BottomMenuRoute";
import AuthRoute from "./AuthRoute";
import { createStackNavigator } from "@react-navigation/stack";
import {
  EventStack,
  PostStack,
  B2BSpaceStack,
  MySpaceStack,
} from "./HomeRoute";
import { STGColors } from "stg-ui";
import ChatMessage from "@components/chat-message";
import About from "@components/about";
import AboutProfessional from "@components/about/Professional";
import AboutParticular from "@components/about/Particular";
import Cgv from "@components/cgv-cgu/CGV";
import Cgu from "@components/cgv-cgu/CGU";
import ProSpace from "@components/pro-space";
import ProfileShow from "@components/profile-show";
// Sessions imports
import SessionAddRegular from "@components/session-add-regular/SessionAddRegular";
import SessionRegularDetails from "@components/session-regular-details/SessionRegularDetails";
import SessionRegularEdit from "@components/session-regular-edit";
import SessionSearch from "@components/session-search";
import {
  SessionAddInfo,
  SessionAddAddress,
  SessionAddMap,
  SessionAddFile,
  SessionAddDate,
} from "@SessionAdd";
import SessionDetails from "@components/session-details";
import SessionEdit from "@components/session-edit";
import SessionPaymentStripe from "@components/session-payment-stripe";
import SessionRegularSearch from "@components/session-regular-search/SessionRegularSearch";
import SessionsUser from "../components/sessions-user";
import SessionUniqueAdd from "@components/session-unique-add/SessionUniqueAdd";
import SessionUniqueEdit from "@components/session-unique-edit/SessionUniqueEdit";
import SessionUniqueDetails from "@components/session-unique-details/SessionUniqueDetails";
import SessionUniqueSearch from "@components/session-unique-search/SessionUniqueSearch";
import SessionUniqueSubscribesUsers from "@components/session-subscribed-users/SessionUniqueSubscribesUsers";
import SessionRegularSubscribesUsers from "@components/session-subscribed-users/SessionRegularSubscribesUsers";

const Stack = createStackNavigator();

const screenOptions = {
  gestureEnabled: false,
  headerBackTitleVisible: false,
  headerTitle: null,
  headerStyle: { backgroundColor: STGColors.container },
  headerTintColor: "#000",
};

function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={screenOptions}
      initialRouteName="BottomMenuStack"
    >
      <Stack.Screen
        name="BottomMenuStack"
        component={BottomMenuRoute}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="Session"
        component={SessionStack}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="Event"
        component={EventStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Post"
        component={PostStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SpaceB2B"
        component={B2BSpaceStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProSpace"
        component={ProSpace}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ProfileShow" component={ProfileShow} />
      <Stack.Screen
        name="MySpace"
        component={MySpaceStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MessageScreen"
        component={ChatMessage}
        // options={{ headerShown: false }}
      />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="AboutProfessional" component={AboutProfessional} />
      <Stack.Screen name="AboutParticular" component={AboutParticular} />
      <Stack.Screen
        name="Cgu"
        component={Cgu}
        options={{ headerTitle: "CGU" }}
      />
      <Stack.Screen
        name="Cgv"
        component={Cgv}
        options={{ headerTitle: "CGV" }}
      />
      {/* Session Screens */}
      <Stack.Screen
        name="SessionSearch"
        component={SessionSearch}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="SessionAddInfo" component={SessionAddInfo} />
      <Stack.Screen name="SessionAddAddress" component={SessionAddAddress} />
      <Stack.Screen name="SessionAddMap" component={SessionAddMap} />
      <Stack.Screen name="SessionAddFile" component={SessionAddFile} />
      <Stack.Screen name="SessionAddDate" component={SessionAddDate} />
      <Stack.Screen name="SessionDetails" component={SessionDetails} />
      <Stack.Screen name="SessionEdit" component={SessionEdit} />
      <Stack.Screen name="SessionAddRegular" component={SessionAddRegular} />
      {/*  */}
      <Stack.Screen name="SessionUser" component={SessionsUser} />
      <Stack.Screen
        name="SessionPaymentStripe"
        component={SessionPaymentStripe}
      />
      <Stack.Screen
        name="SessionRegularDetails"
        component={SessionRegularDetails}
      />
      <Stack.Screen
        name="SessionRegularSearch"
        component={SessionRegularSearch}
      />
      <Stack.Screen
        name="SessionRegularEdit"
        component={SessionRegularEdit}
        initialParams={{
          fields: "",
          sessionId: null,
          data: {},
        }}
      />
      {/* Session Unique */}
      <Stack.Screen name="SessionUniqueAdd" component={SessionUniqueAdd} />
      <Stack.Screen name="SessionUniqueEdit" component={SessionUniqueEdit} />
      <Stack.Screen
        name="SessionUniqueDetails"
        component={SessionUniqueDetails}
      />
      <Stack.Screen
        name="SessionUniqueSearch"
        component={SessionUniqueSearch}
      />
      <Stack.Screen
        name="SessionUniqueSubscribesUsers"
        component={SessionUniqueSubscribesUsers}
      />
      <Stack.Screen
        name="SessionRegularSubscribesUsers"
        component={SessionRegularSubscribesUsers}
      />
    </Stack.Navigator>
  );
}
function AppSwitchNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="AuthLoading"
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Stack.Screen name="AuthLoading" component={AuthLoading} />
      <Stack.Screen name="AuthStack" component={AuthRoute} />
      <Stack.Screen name="HomeStack" component={MainStack} />
      <Stack.Screen name="Logout" component={Logout} />
    </Stack.Navigator>
  );
}

export default function AppContainer() {
  return (
    <Stack.Navigator initialRouteName="AppSwitchNavigator">
      <Stack.Screen
        name="AppSwitchNavigator"
        component={AppSwitchNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainStack"
        component={MainStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
