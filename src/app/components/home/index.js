import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./style";
import { useTranslation } from "react-i18next";
import { useSelector, shallowEqual } from "react-redux";
import LayoutAuth from "../layout_auth";
import { useNavigation } from "@react-navigation/native";

const Btn = ({ text, icon, style = {}, onPress = () => {} }) => (
  <View
    style={{
      ...styles.btnContainer,
      ...style,
    }}
  >
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Image source={icon} resizeMode={"contain"} style={styles.btnIcon} />
      <Text style={styles.btnText}>{text.toUpperCase()}</Text>
    </TouchableOpacity>
  </View>
);

export default function Home() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  // Props from Redux
  const { user } = useSelector((state) => state.auth, shallowEqual);
  return (
    <LayoutAuth
      hasTitleBg={false}
      womanBgStyle={{ opacity: 0.8 }}
      mapBgStyle={{ opacity: 0.8 }}
    >
      <View
        style={{
          paddingTop: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("@images/home/logo.png")}
          resizeMode={"contain"}
          style={{
            alignSelf: "center",
            width: 150,
            maxHeight: 150,
          }}
        />
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <Btn
            icon={require("@images/home/qui_sommes_nous.png")}
            text={t("common:aboutAs")}
            onPress={() => navigation.navigate("About")}
          />
          <Btn
            icon={require("@images/home/autour_de_moi.png")}
            text={t("common:aroundMe")}
            onPress={() => navigation.navigate("SessionScreen")}
          />
          <Btn
            icon={require("@images/home/event.png")}
            text={t("common:events")}
            onPress={() => navigation.navigate("Event")}
          />
        </View>
        <View style={{ marginVertical: 10 }} />
        <View style={{ flexDirection: "row" }}>
          <Btn
            icon={require("@images/home/mon_espace.png")}
            text={t("common:mySpace")}
            onPress={() => navigation.navigate("MySpace")}
          />
          <Btn
            icon={require("@images/home/espace_pro.png")}
            text={t("common:spaceB2B")}
            onPress={() => {
              if (user.type === "PRO") {
                navigation.navigate("SpaceB2B");
              } else {
                navigation.navigate("ProSpace");
              }
            }}
          />
          <Btn
            icon={require("@images/home/fil_d_actualites.png")}
            text={t("common:actuality")}
            onPress={() => navigation.navigate("Post")}
          />
        </View>
      </View>
    </LayoutAuth>
  );
}
