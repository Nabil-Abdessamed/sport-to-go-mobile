import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Picker,
} from "react-native";
import { STGContainer } from "stg-ui";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import gStyles from "@components/styles";
import HeaderStyle from "@components/styles/HeaderStyle";
import { PartnershipType } from "./PartnershipType";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import PostHelpers from "../post/Helpers";

export default function PostSearch() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  // States
  const [partnershipName, setPartnershipName] = useState("");
  const [city, setCity] = useState("");
  const [partnershipType, setPartnershipType] = useState("");
  const [partnershipTypeOther, setPartnershipTypeOther] = useState("");

  const done = () => {
    const activity =
      partnershipType === PartnershipType.OTHER
        ? partnershipTypeOther
        : partnershipType;
    if (partnershipName === "" && city === "" && activity === "") {
      navigation.goBack();
    } else {
      PostHelpers.getPostsBySearch({
        partnershipName,
        city,
        partnershipType: activity,
      });
      navigation.goBack();
    }
  };

  return (
    <>
      <STGContainer>
        <View style={HeaderStyle.header}>
          <TouchableOpacity
            style={HeaderStyle.headerBtnBack}
            onPress={navigation.goBack}
          >
            <Ionicons name="ios-arrow-back" size={30} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity style={HeaderStyle.headerBtnDone} onPress={done}>
            <Text style={HeaderStyle.headerBtnDoneText}>
              {t("common:done")}
            </Text>
            <MaterialIcons name="done" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          keyboardDismissMode={"none"}
          keyboardShouldPersistTaps={"handled"}
          contentContainerStyle={{ paddingHorizontal: 5 }}
        >
          <Text style={gStyles.textInputTitle}>
            {t("post:search.partnershipName")}
          </Text>
          <TextInput
            defaultValue={partnershipName}
            value={partnershipName}
            style={{
              ...gStyles.textInput,
              borderBottomColor: "rgba(0,0,0,0.2)",
            }}
            placeholder={t("common:partnershipNamePlaceholder")}
            placeholderTextColor={"rgba(0,0,0,0.2)"}
            onChangeText={(value) => {
              setPartnershipName(value);
            }}
          />

          <Text style={gStyles.textInputTitle}>
            {t("post:search.activity")}
          </Text>
          <Picker
            selectedValue={partnershipType}
            onValueChange={(type) => {
              setPartnershipType(type);
            }}
            mode="dropdown"
          >
            <Picker.Item label={""} value={""} />
            <Picker.Item
              label={t("common:coach")}
              value={PartnershipType.COACH}
            />
            <Picker.Item
              label={t("common:fitnessClub")}
              value={PartnershipType.FITNESS_CLUB}
            />
            <Picker.Item
              label={t("common:crossfitClub")}
              value={PartnershipType.CROSSFIT_CLUB}
            />
            <Picker.Item
              label={t("common:association")}
              value={PartnershipType.ASSOCIATION}
            />
            <Picker.Item
              label={t("common:other")}
              value={PartnershipType.OTHER}
            />
          </Picker>
          {partnershipType === PartnershipType.OTHER && (
            <TextInput
              defaultValue={partnershipTypeOther}
              value={partnershipTypeOther}
              style={{
                ...gStyles.textInput,
                borderBottomColor: "rgba(0,0,0,0.2)",
              }}
              placeholder={t("post:search.otherActivityPlaceholder")}
              placeholderTextColor={"rgba(0,0,0,0.2)"}
              onChangeText={(value) => setPartnershipTypeOther(value)}
            />
          )}

          <Text style={gStyles.textInputTitle}>{t("common:city")}</Text>
          <TextInput
            defaultValue={city}
            value={city}
            style={{
              ...gStyles.textInput,
              borderBottomColor: "rgba(0,0,0,0.2)",
            }}
            placeholder={t("common:cityPlaceholder")}
            placeholderTextColor={"rgba(0,0,0,0.2)"}
            onChangeText={(value) => {
              setCity(value);
            }}
          />
        </ScrollView>
      </STGContainer>
    </>
  );
}
