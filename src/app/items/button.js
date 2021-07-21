import React from "react";
import {
  TouchableOpacity,
  ImageBackground,
  Text,
  StyleSheet,
  Dimensions
} from "react-native";
import { STGFonts } from "stg-ui";
const { width } = Dimensions.get("screen");

export const STGButton = ({
  onPress = () => {},
  isValide = true,
  btnText = "",
  btnTextStyle = {},
  btnContainerStyle = {},
  style = {}
}) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={!isValide}
    style={{ opacity: isValide ? 1 : 0.6, ...style }}
  >
    <ImageBackground
      style={{ ...styles.btnContainer, ...btnContainerStyle }}
      source={require("@images/landing/btn_bg.png")}
      imageStyle={styles.btnBg}
      resizeMode={"stretch"}
    >
      <Text style={{ ...styles.btnText, ...btnTextStyle }}>{btnText}</Text>
    </ImageBackground>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btnContainer: {
    width: width - 30,
    height: 48,
    justifyContent: "center",
    alignItems: "center"
  },
  btnBg: {
    width: width - 30,
    height: 60
  },
  btnText: {
    color: "white",
    fontFamily: STGFonts.RobotoRegular,
    fontWeight: "bold",
    fontSize: 18
  }
});
