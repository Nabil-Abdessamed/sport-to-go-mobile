import React from "react";
import { View, StyleSheet } from "react-native";
import { STGTextInput } from "./text-input";
import Ionicons from "react-native-vector-icons/Ionicons";

export const STBSearchBar = React.forwardRef((props, ref) => (
  <View style={{ ...styles.searchBarContainer, ...props.containerStyle }}>
    <STGTextInput
      styleInput={{ ...styles.searchBar, ...props.textInputStyle }}
      placeholder={props.placeholder}
    />
    <Ionicons
      name="ios-search"
      size={24}
      color={"white"}
      style={{ ...styles.searchBarIcon, ...props.iconStyle }}
    />
  </View>
));

const styles = StyleSheet.create({
  searchBarContainer: {
    flex: 1,
    height: 48,
    paddingHorizontal: 10,
    marginVertical: 10,
    justifyContent: "center"
  },
  searchBar: {
    paddingLeft: 40
  },
  searchBarIcon: {
    position: "absolute",
    left: 20
  }
});
