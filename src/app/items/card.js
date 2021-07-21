import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("screen");

export const STGCard = ({ children, style = {} }) => (
  <View style={{ ...styles.constianer, ...style }}>{children}</View>
);

const styles = StyleSheet.create({
  constianer: {
    marginVertical: 10,
    padding: 10,
    width: width,
    minHeight: 48,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 6,
    borderColor: "rgba(255,255,255,0.5)",
    borderWidth: 1
  }
});
