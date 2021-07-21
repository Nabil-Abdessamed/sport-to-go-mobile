import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import gStyles from "../styles";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { shallowEqual, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function PostHeaderRight({
  onPressButtonSearch = () => {},
  handleChangeMode = () => {},
  mode = "LIST",
}) {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth, shallowEqual);
  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity style={gStyles.headerBtn} onPress={onPressButtonSearch}>
        <MaterialIcons name="search" size={30} color="black" />
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
          onPress={() => navigation.navigate("PostAdd")}
        >
          <Entypo name="plus" size={30} color="#000000" />
        </TouchableOpacity>
      )}
    </View>
  );
}
