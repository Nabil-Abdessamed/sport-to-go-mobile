import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { STGColors, STGFonts } from "stg-ui";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { navigate } from "@services";

export default function Header({
  remove,
  edit,
  showActions,
  subscribersNumber,
  showSubscribers,
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={() => navigate("Event")}>
        <Ionicons name="ios-arrow-back" size={28} color="#000000" />
      </TouchableOpacity>
      <View style={styles.actions}>
        {showActions && (
          <>
            <TouchableOpacity style={styles.btn} onPress={() => remove()}>
              <FontAwesome5 name="trash-alt" size={24} color="#000000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => edit()}>
              <MaterialIcons name="edit" size={28} color="#000000" />
            </TouchableOpacity>
            {Number(subscribersNumber) > 0 && (
              <TouchableOpacity style={styles.btn} onPress={showSubscribers}>
                <FontAwesome5 name="users" size={24} color="#000000" />
                <View style={styles.subscribers}>
                  <Text style={styles.subscribersText}>{`${
                    Number(subscribersNumber) > 99 ? "+99" : subscribersNumber
                  }`}</Text>
                </View>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    backgroundColor: STGColors.container,
    flexDirection: "row",
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    width: 48,
    marginLeft: 5,
  },
  actions: {
    flex: 1,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  subscribers: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 2,
    right: 2,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  subscribersText: {
    color: "white",
    fontSize: 9,
    fontFamily: STGFonts.RobotoRegular,
  },
});
