import React from "react";
import { View, TouchableOpacity } from "react-native";
import gStyles from "../styles";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useSelector, shallowEqual } from "react-redux";
import Constants from "./Constants";
import { useNavigation, StackActions } from "@react-navigation/native";

export default function SessionHeader({
  mode = "GRID",
  sessionDataMode = Constants.SessionAllData,
  changeSessionDataMode = () => {},
  onPressSearchButton = () => {},
  handleChangeMode = () => {},
  handleAddSessionVisible = () => {},
}) {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth, shallowEqual);

  const goBack = () => {
    navigation.dispatch(StackActions.popToTop());
  };

  return (
    <View style={gStyles.header}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end", flex: 1 }}>
        {/* <TouchableOpacity style={gStyles.headerBtn} onPress={goBack}>
          <Ionicons name="ios-arrow-back" size={30} />
        </TouchableOpacity> */}
        <TouchableOpacity
          style={gStyles.headerBtn}
          onPress={() => {
            changeSessionDataMode(Constants.SessionAllData);
          }}
        >
          <MaterialCommunityIcons
            name="view-dashboard"
            size={30}
            color={
              sessionDataMode === Constants.SessionAllData ? "white" : "black"
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={gStyles.headerBtn}
          onPress={() => {
            changeSessionDataMode(Constants.SessionWithoutRecurrence);
          }}
        >
          <MaterialCommunityIcons
            name="view-day"
            size={30}
            color={
              sessionDataMode === Constants.SessionWithoutRecurrence
                ? "white"
                : "black"
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={gStyles.headerBtn}
          onPress={() => {
            changeSessionDataMode(Constants.SessionWithRecurrence);
          }}
        >
          <MaterialCommunityIcons
            name="repeat"
            size={30}
            color={
              sessionDataMode === Constants.SessionWithRecurrence
                ? "white"
                : "black"
            }
          />
        </TouchableOpacity>
      </View>
      {/* <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={gStyles.headerBtn}
          onPress={() => {
            onPressSearchButton();
          }}
        >
          <MaterialIcons
            name="search"
            size={30}
            color={
              sessionDataMode === Constants.SessionSearch ? "white" : "black"
            }
          />
        </TouchableOpacity>
        <TouchableOpacity style={gStyles.headerBtn} onPress={handleChangeMode}>
          <MaterialCommunityIcons
            name={mode === "GRID" ? "menu" : "view-grid"}
            size={28}
          />
        </TouchableOpacity>
        {user && user.type === "PRO" && (
          <TouchableOpacity
            style={gStyles.headerBtn}
            onPress={handleAddSessionVisible}
          >
            <Entypo name="plus" size={30} color="#000000" />
          </TouchableOpacity>
        )}
      </View> */}
    </View>
  );
}
