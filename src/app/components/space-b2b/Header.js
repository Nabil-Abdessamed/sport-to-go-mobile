import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { STGColors } from "stg-ui";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import gStyles from "../styles";
import { useNavigation, StackActions } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    height: 54,
    backgroundColor: STGColors.container,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actions: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  btn: {
    height: 54,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function Header({ handleChangeMode, mode, create }) {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.dispatch(StackActions.popToTop());
  };

  return (
    <View style={gStyles.header}>
      <TouchableOpacity style={gStyles.headerBtn} onPress={goBack}>
        <Ionicons name="ios-arrow-back" size={30} color="#000000" />
      </TouchableOpacity>
      <View style={styles.actions}>
        <TouchableOpacity
          style={gStyles.headerBtn}
          onPress={() => {
            navigation.navigate("SpaceB2BSearch");
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
        <TouchableOpacity style={gStyles.headerBtn} onPress={create}>
          <Entypo name="plus" size={30} color="#000000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
