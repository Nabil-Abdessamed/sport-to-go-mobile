import React from "react";
import { StyleSheet, View } from "react-native";

export const STGDivider = ({ style = {} }) => (
  <View style={{ ...styles.container, ...style }} />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 1,
    borderColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 2,
    borderWidth: 1,
    marginVertical: 10
  }
});
