import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  View
} from "react-native";
import { STGFonts } from "stg-ui";
const { width } = Dimensions.get("screen");

export const STGSimpleButton = ({
  onPress = () => {},
  isValid = false,
  btnText = "",
  btnTextStyle = {},
  style = {},
  icon = null
}) => (
  <TouchableOpacity
    disabled={isValid}
    style={{ ...styles.btnSave, ...style }}
    onPress={onPress}
  >
    {icon}
    {icon && <View style={{ marginHorizontal: 5 }} />}
    <Text style={{ ...styles.btnSaveText, ...btnTextStyle }}>
      {btnText || ""}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btnSave: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    width: width - 20,
    borderRadius: 6,
    borderColor: "white",
    borderWidth: 0.5
  },
  btnSaveText: {
    color: "white",
    fontSize: 16,
    fontFamily: STGFonts.RobotoRegular
  }
});
