import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Modal,
} from "react-native";
import IconEntypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./style";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "@config";
import OneSignal from "react-native-onesignal";
import { STGContainer, STGAvatar } from "stg-ui";
import { getCurrentLanguage } from "@redux/actions";

const Item = ({ text, onPress = () => {}, style = {} }) => (
  <TouchableOpacity style={{ ...styles.item, ...style }} onPress={onPress}>
    <Text style={styles.itemText} ellipsizeMode={"tail"} numberOfLines={1}>
      {text}
    </Text>
    <IconEntypo name="chevron-right" size={18} style={{ fontWeight: "bold" }} />
  </TouchableOpacity>
);

export default function Menu({ navigation }) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth, shallowEqual);
  const setting = useSelector((state) => state.setting, shallowEqual);
  // States
  const [selectLanguagesShow, setSelectLanguagesShow] = useState(false);
  const [changedLanguage, setChangedLanguage] = useState("fr");

  const handleSelectLanguagesShow = () => {
    setSelectLanguagesShow(!selectLanguagesShow);
  };

  const handleChangeLanguage = (language) => {
    setChangedLanguage(language);
  };

  const renderLanguageText = (language) => {
    switch (language) {
      case "fr":
        return "Français";
      case "en":
      case "it":
      case "de":
        return "English";
      default:
        return "English";
    }
  };

  useEffect(() => {
    setChangedLanguage(i18n.language);
  }, []);

  return (
    <STGContainer>
      {user && (
        <TouchableOpacity
          style={styles.profileInfoContainer}
          onPress={() => navigation.navigate("MySpace")}
        >
          <STGAvatar uri={`${BASE_URL}/upload/avatars/${user.avatar || ""}`} />
          <View style={styles.profileInfo}>
            <Text
              style={styles.profileName}
              ellipsizeMode={"tail"}
              numberOfLines={1}
            >
              {`${user.type === "PRO" ? user.partnershipName : user.fullname}`}
            </Text>
            <Text
              style={styles.profileShow}
              ellipsizeMode={"tail"}
              numberOfLines={1}
            >
              {t("menu:showProfile")}
            </Text>
          </View>
        </TouchableOpacity>
      )}

      <View style={styles.itemsContainer}>
        <ScrollView contentInsetAdjustmentBehavior={"automatic"}>
          <Text style={styles.sectionTitle}>{t("menu:languages")}</Text>
          <TouchableOpacity
            style={styles.item}
            onPress={handleSelectLanguagesShow}
          >
            <Text style={styles.itemText}>{t("menu:currentLanguage")}</Text>
            <Text style={[styles.itemText, styles.itemSecondText]}>
              {renderLanguageText(setting.language)}
            </Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>{t("menu:about")}</Text>
          <Item text={"CGU"} onPress={() => navigation.navigate("Cgu")} />
          <Item text={"CGV"} onPress={() => navigation.navigate("Cgv")} />
          <Item
            text={t("menu:aboutAs")}
            onPress={() => navigation.navigate("About")}
          />
          <Item
            text={t("menu:aboutPro")}
            onPress={() => navigation.navigate("AboutProfessional")}
          />
          <Item
            text={t("menu:aboutPra")}
            onPress={() => navigation.navigate("AboutParticular")}
          />
          <Text style={styles.sectionTitle}>{t("menu:logout")}</Text>
          <Item
            text={t("menu:logout")}
            onPress={() => navigation.navigate("Logout")}
          />
        </ScrollView>
      </View>
      <Modal
        visible={selectLanguagesShow}
        animated={true}
        animationType="fade"
        transparent={true}
        onRequestClose={handleSelectLanguagesShow}
      >
        <STGContainer>
          <View style={styles.languageModalHeader}>
            <TouchableOpacity
              style={styles.languageModalHeaderBtn}
              onPress={handleSelectLanguagesShow}
            >
              <Text style={styles.languageModalHeaderBtnText}>
                {t("common:cancel")}
              </Text>
            </TouchableOpacity>
            <Text style={styles.languageModalHeaderTitle}>
              {t("menu:currentLanguage")}
            </Text>
            <TouchableOpacity
              style={styles.languageModalHeaderBtn}
              onPress={() => {
                if (setting.language !== changedLanguage) {
                  i18n.changeLanguage(changedLanguage);
                  dispatch(getCurrentLanguage(changedLanguage));
                  setChangedLanguage(changedLanguage);
                  handleSelectLanguagesShow();
                }
              }}
              disabled={changedLanguage === setting.language}
            >
              <Text
                style={[
                  styles.languageModalHeaderBtnText,
                  changedLanguage === setting.language
                    ? styles.languageModalHeaderBtnTextCnahge
                    : {},
                ]}
              >
                {t("common:ok")}
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={{
              padding: 20,
            }}
          >
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleChangeLanguage("fr")}
            >
              <Text style={styles.itemText}>Français</Text>
              {changedLanguage === "fr" ? (
                <Ionicons name="ios-checkmark" size={24} />
              ) : (
                <View />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleChangeLanguage("en")}
            >
              <Text style={styles.itemText}>English</Text>
              {changedLanguage === "en" ? (
                <Ionicons name="ios-checkmark" size={24} />
              ) : (
                <View />
              )}
            </TouchableOpacity>
          </ScrollView>
        </STGContainer>
      </Modal>
    </STGContainer>
  );
}
