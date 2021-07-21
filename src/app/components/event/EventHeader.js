import React from "react";
import { View, TouchableOpacity } from "react-native";
import gStyles from "../styles";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { setEventModeAction } from "@redux/actions";
import EventHelpers from "./Helpers";

export function EventHeaderRight({ navigation, mode, handleChangeMode }) {
  const { user } = useSelector((state) => state.auth, shallowEqual);
  const dispatch = useDispatch();
  const getEvents = () => {
    dispatch(setEventModeAction("DATA"));
    EventHelpers.getEvents();
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity style={gStyles.headerBtn} onPress={getEvents}>
        <MaterialIcons name="refresh" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={gStyles.headerBtn}
        onPress={() => {
          navigation.navigate("EventSearch");
        }}
      >
        <MaterialIcons name="search" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={gStyles.headerBtn} onPress={handleChangeMode}>
        <MaterialCommunityIcons
          name={mode === "GRID" ? "menu" : "view-grid"}
          size={28}
        />
      </TouchableOpacity>
      {user && user.type === "PARTICULAR" && (
        <TouchableOpacity
          style={gStyles.headerBtn}
          onPress={() => navigation.navigate("EventAdd")}
        >
          <Entypo name="plus" size={30} color="#000000" />
        </TouchableOpacity>
      )}
    </View>
  );
}
