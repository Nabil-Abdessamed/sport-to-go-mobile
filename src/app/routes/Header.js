import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import styles from "./style";
import Ionicons from "react-native-vector-icons/Ionicons";
import IconEntypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export const HeaderRightHome = ({ navigation }) => (
  <TouchableOpacity
    style={styles.headerLeftStyle}
    onPress={() => navigation.navigate("Home")}
  >
    <IconEntypo name="home" size={30} color="#000000" />
  </TouchableOpacity>
);

export const HeaderLeftDrawer = ({ navigation }) => (
  <TouchableOpacity
    style={styles.headerLeftStyle}
    onPress={() => navigation.toggleDrawer()}
  >
    <Ionicons name="ios-menu" size={30} color="#000000" />
  </TouchableOpacity>
);

export const HeaderLeft = ({ navigation }) => {
  const onGoBack = navigation.getParam("onGoBack");
  return (
    <TouchableOpacity
      style={styles.headerLeftStyle}
      onPress={() => {
        if (onGoBack !== undefined) {
          onGoBack();
        }
        navigation.goBack();
      }}
    >
      <Ionicons name="ios-arrow-back" size={30} color="#000000" />
    </TouchableOpacity>
  );
};

export const HeaderLeftSearch = ({ navigation }) => (
  <TouchableOpacity style={styles.headerLeftStyle}>
    <MaterialIcons name="search" size={20} color="white" />
  </TouchableOpacity>
);

export const NavigationOptions = (navigation) => ({
  headerStyle: styles.headerStyle,
  headerTitleStyle: styles.headerTitleStyle,
  headerLeft: <HeaderLeft navigation={navigation} />,
  headerRight: <HeaderRightHome navigation={navigation} />,
});

export const NavigationSearchOptions = (navigation) => ({
  headerStyle: styles.headerStyle2,
  headerTitleStyle: styles.headerTitleStyle,
  headerLeft: null,
  headerTitle: null,
  headerRight: (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity
        style={styles.headerLeftStyle}
        onPress={() => navigation.navigate("SearchStack")}
      >
        <MaterialIcons name="search" size={30} color="black" />
      </TouchableOpacity>
      <HeaderRightHome navigation={navigation} />
    </View>
  ),
});

export default {
  HeaderLeft,
  HeaderLeftDrawer,
  HeaderRightHome,
  NavigationOptions,
  NavigationSearchOptions,
};
