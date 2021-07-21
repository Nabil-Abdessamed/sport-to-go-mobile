import React from "react";
import { TextInput, StyleSheet } from "react-native";

export const STGTextInput = React.forwardRef((props, ref) => (
  <TextInput
    returnKeyType={"done"}
    ref={ref}
    autoCapitalize={"none"}
    selectionColor={"white"}
    style={{ ...styles.textInput, ...props.styleInput }}
    placeholder={""}
    placeholderTextColor={"rgba(255,255,255,0.7)"}
    {...props}
  />
));

const styles = StyleSheet.create({
  textInput: {
    width: "100%",
    height: 48,
    borderColor: "rgba(255,255,255,0.5)",
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: "rgba(0,0,0,0.8)",
    color: "white",
    paddingHorizontal: 10
  }
});
