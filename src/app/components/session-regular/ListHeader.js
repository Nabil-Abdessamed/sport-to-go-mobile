import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import gStyles from "../styles";
import Styles from "./SessionRegularStyles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ListHeader({
  onChangeMode = () => {},
  mode = "GRID",
  buttonAddShow = false,
  onPressAddButton = () => {},
  onPressSearchButton = () => {},
  filter = null,
}) {
  return (
    <>
      <View style={Styles.listHeader}>
        <TouchableOpacity
          style={gStyles.headerBtn}
          onPress={onPressSearchButton}
        >
          <Ionicons name="search" size={30} color={"black"} />
        </TouchableOpacity>
        <TouchableOpacity style={gStyles.headerBtn} onPress={onChangeMode}>
          <MaterialCommunityIcons
            name={mode === "GRID" ? "menu" : "view-grid"}
            size={28}
          />
        </TouchableOpacity>
        {buttonAddShow && (
          <TouchableOpacity
            style={gStyles.headerBtn}
            onPress={onPressAddButton}
          >
            <Entypo name="plus" size={30} color="#000000" />
          </TouchableOpacity>
        )}
      </View>
      {filter !== null && (
        <View style={Styles.listHeader}>
          <Text>{filter.title}</Text>
        </View>
      )}
    </>
  );
}
