import React from "react";
import Event from "@components/event";
import EventSearch from "@components/event-search";
import EventAdd from "@components/event-add";
import EventAddOne from "@components/event-add/EventAddOne";
import EventAddTwo from "@components/event-add/EventAddTwo";
import EventDetails from "@components/event-details";
import EventEdit from "@components/event-edit";

import Post from "@components/post";
import PostSearch from "@components/post-search";
import PostAdd from "@components/post-add";
import PostAddOne from "@components/post-add/PostAddOne";
import PostAddTwo from "@components/post-add/PostAddTwo";
import PostDetails from "@components/post-details";
import PostEdit from "@components/post-edit";
import LikesUsers from "@components/post-likes-users/LikesUsers";

import SpaceB2B from "@components/space-b2b";
import SpaceB2BCreate from "@components/space-b2b/Create";
import SpaceB2BDetails from "@components/space-b2b/Details";
import SpaceB2BSearch from "@components/space-b2b/Search";
import Profile from "@components/profile";
import UserFollowers from "@components/profile/followers/Followers";
import Structure from "@components/structure";
import MySpace from "@components/my-space";
import GalleryShow from "@components/my-space/gallery-show";
import GalleryCreate from "@components/my-space/gallery-create";
import ChangePassword from "@components/change-password";
import Contracts from "@components/contracts";
import ContractShow from "@components/contracts/Show";

import { createStackNavigator } from "@react-navigation/stack";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
} from "@react-navigation/material-top-tabs";

import { STGColors, STGFonts } from "stg-ui";

const screenOptions = {
  gestureEnabled: false,
  headerBackTitleVisible: false,
  headerTitle: null,
  headerStyle: { backgroundColor: STGColors.container },
  headerTintColor: "#000",
};

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

export const EventStack = () => (
  <Stack.Navigator initialRouteName="Event" screenOptions={screenOptions}>
    <Stack.Screen name="Event" component={Event} />
    <Stack.Screen
      name="EventSearch"
      component={EventSearch}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="EventAdd" component={EventAdd} />
    <Stack.Screen name="EventAddOne" component={EventAddOne} />
    <Stack.Screen name="EventAddTwo" component={EventAddTwo} />
    <Stack.Screen
      name="EventDetails"
      component={EventDetails}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="EventEdit" component={EventEdit} />
  </Stack.Navigator>
);

export const PostStack = () => (
  <Stack.Navigator initialRouteName="Post" screenOptions={screenOptions}>
    <Stack.Screen name="Post" component={Post} />
    <Stack.Screen
      name="PostSearch"
      component={PostSearch}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="PostAdd" component={PostAdd} />
    <Stack.Screen name="PostAddOne" component={PostAddOne} />
    <Stack.Screen name="PostAddTwo" component={PostAddTwo} />
    <Stack.Screen
      name="PostDetails"
      component={PostDetails}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="PostEdit" component={PostEdit} />
    <Stack.Screen name="LikesUsers" component={LikesUsers} />
  </Stack.Navigator>
);

export const B2BSpaceStack = () => (
  <Stack.Navigator initialRouteName="SpaceB2B" screenOptions={screenOptions}>
    <Stack.Screen
      name="SpaceB2B"
      component={SpaceB2B}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="SpaceB2BCreate" component={SpaceB2BCreate} />
    <Stack.Screen
      name="SpaceB2BDetails"
      component={SpaceB2BDetails}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="SpaceB2BSearch" component={SpaceB2BSearch} />
  </Stack.Navigator>
);

export const MySpaceStack = () => (
  <Stack.Navigator initialRouteName="MySpace" screenOptions={screenOptions}>
    <Stack.Screen name="MySpace" component={MySpace} />
    <Stack.Screen name="Structure" component={Structure} />
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="UserFollowers" component={UserFollowers} />
    <Stack.Screen name="ChangePassword" component={ChangePassword} />
    <Stack.Screen
      name="GalleryShow"
      component={GalleryShow}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="GalleryCreate" component={GalleryCreate} />
    <Stack.Screen name="Contracts" component={Contracts} />
    <Stack.Screen name="ContractShow" component={ContractShow} />
  </Stack.Navigator>
);
