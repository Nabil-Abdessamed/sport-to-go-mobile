import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  Linking,
} from "react-native";
import styles from "./style";
import { withTranslation, useTranslation } from "react-i18next";
import { connect } from "react-redux";
import LayoutAuth from "../layout_auth";
import { useNavigation } from "@react-navigation/native";

const Btn = ({ text1 = null, text2 = null, onPress = () => {} }) => (
  <TouchableOpacity onPress={onPress}>
    <ImageBackground
      style={styles.btnContainer}
      source={require("@images/landing/btn_bg.png")}
      imageStyle={styles.btnBg}
      resizeMode={"stretch"}
    >
      <Text style={[styles.btnText, styles.btnTextSize1]}>{text1 || ""}</Text>
      {text2 && (
        <Text style={[styles.btnText, styles.btnTextSize2]}>{text2 || ""}</Text>
      )}
    </ImageBackground>
  </TouchableOpacity>
);

const SocialBtn = ({ source, onPress = () => {} }) => (
  <TouchableOpacity onPress={onPress}>
    <Image source={source} resizeMode={"contain"} style={styles.socialBtn} />
  </TouchableOpacity>
);

export default function Landing() {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const goTo = (url) => {
    Linking.openURL(url);
  };

  return (
    <LayoutAuth>
      <ScrollView contentInsetAdjustmentBehavior={"automatic"}>
        <Image
          source={require("@images/landing/logo.png")}
          resizeMode={"contain"}
          style={styles.logo}
        />
        <View style={{ marginVertical: 20 }} />
        <View style={styles.btnGroup}>
          <Btn
            text1={t("landing:youarePro")}
            text2={t("landing:createAccount")}
            onPress={() =>
              navigation.navigate("Register", {
                title: "Professionnel",
                type: "PRO",
              })
            }
          />
          <View style={{ marginVertical: 5 }} />
          <Btn
            text1={t("landing:youarePracticing")}
            text2={t("landing:createAccount")}
            onPress={() =>
              navigation.navigate("Register", {
                title: "Pratiquant",
                type: "PARTICULAR",
              })
            }
          />
          <View style={{ marginVertical: 5 }} />
          <Btn
            text1={t("landing:subscribed")}
            onPress={() => navigation.navigate("Login")}
          />
        </View>
        <View style={{ marginVertical: 10 }} />
        <View style={styles.btnSocialGroup}>
          <Text style={styles.socialText}>
            {t("landing:followAs").toUpperCase()}
          </Text>
          <View style={{ marginVertical: 5 }} />
          <View style={{ flexDirection: "row" }}>
            <SocialBtn
              source={require("@images/landing/fb.png")}
              onPress={() => goTo("https://www.facebook.com")}
            />
            <View style={{ marginHorizontal: 5 }} />
            <SocialBtn
              source={require("@images/landing/instagram.png")}
              onPress={() => goTo("https://www.instagram.com")}
            />
          </View>
        </View>
        <Image
          source={require("@images/landing/img_bottom.png")}
          resizeMode={"contain"}
          style={styles.imgBottom}
        />
      </ScrollView>
    </LayoutAuth>
  );
}
