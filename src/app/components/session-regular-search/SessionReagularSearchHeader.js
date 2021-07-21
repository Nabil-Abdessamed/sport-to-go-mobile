import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const HeaderRight = (props) => {
  return (
    <View style={styles.container}>
      {props.searchMode === 0 ? (
        <TouchableOpacity
          style={styles.button}
          onPress={props.onPressSearchButton}
        >
          <Ionicons name="search" size={30} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={props.changeSearchMode}
        >
          <Text style={styles.buttonText}>{props.t("session:editSearchFilter")}</Text>
          <FontAwesome name="edit" size={30} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HeaderRight;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 2,
    alignItems: "center",
  },
  button: {
    marginRight: 5,
    padding: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    marginRight: 5,
  },
});
