import React from "react";
import { SafeAreaView, Image } from "react-native";
import styles from "./style";

const LayoutAuth = ({
  children,
  style = {},
  womanBgStyle = {},
  mapBgStyle = {},
  titleBgStyle = {},
  hasWomanBg = true,
  hasMapBg = true,
  hasTitleBg = true
}) => (
  <SafeAreaView style={{ ...styles.container, ...style }}>
    {hasMapBg && (
      <Image
        source={require("@images/landing/map.png")}
        resizeMode={"contain"}
        style={{ ...styles.mapImage, ...mapBgStyle }}
      />
    )}
    {hasWomanBg && (
      <Image
        source={require("@images/landing/woman-x.png")}
        resizeMode={"stretch"}
        style={{ ...styles.womanImage, ...womanBgStyle }}
      />
    )}
    {hasTitleBg && (
      <Image
        source={require("@images/landing/title.png")}
        resizeMode={"contain"}
        style={{ ...styles.title, ...titleBgStyle }}
      />
    )}
    {children}
  </SafeAreaView>
);

export default LayoutAuth;
