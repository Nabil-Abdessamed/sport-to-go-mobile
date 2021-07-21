import React, { useCallback, useEffect, useState } from "react";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { STGContainer } from "stg-ui";
import gStyles from "../styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import SessionsUserUnique from "./Unique";
import SessionsUserRegular from "./Regular";

const HeaderRight = ({ mode, onChangeMode }) => (
  <View>
    <TouchableOpacity style={gStyles.headerBtn} onPress={onChangeMode}>
      <MaterialCommunityIcons
        name={mode === "GRID" ? "menu" : "view-grid"}
        size={28}
      />
    </TouchableOpacity>
  </View>
);

export default function SessionsUser() {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  navigation.setOptions({
    headerRight: () => (
      <HeaderRight mode={mode} onChangeMode={handleChangeMode} />
    ),
  });
  const { params } = useRoute();
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState("GRID");
  const [routes] = useState([
    { key: "unique", title: t("session:tabs.unique") },
    { key: "regular", title: t("session:tabs.regular") },
  ]);

  useFocusEffect(
    useCallback(() => {
      if (params && params.user) {
        navigation.setOptions({
          headerTitle: params.user.partnershipName || "",
        });
      }
    }, [])
  );

  const handleChangeMode = () => {
    setMode(mode === "GRID" ? "LIST" : "GRID");
  };

  const numColumns = mode === "GRID" ? 2 : 1;

  const renderScene = SceneMap({
    unique: () => (
      <SessionsUserUnique
        t={t}
        i18n={i18n}
        navigation={navigation}
        userId={params.user.id}
        numColumns={numColumns}
        mode={mode}
      />
    ),
    regular: () => (
      <SessionsUserRegular
        t={t}
        i18n={i18n}
        navigation={navigation}
        userId={params.user.id}
        numColumns={numColumns}
        mode={mode}
      />
    ),
  });

  return (
    <STGContainer>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: "#000" }}
            style={{ backgroundColor: "#F2F2F2" }}
            labelStyle={{ fontFamily: "Roboto-Medium", color: "#000" }}
            activeColor={"#000"}
            inactiveColor={"#FFF"}
          />
        )}
      />
    </STGContainer>
  );
}
