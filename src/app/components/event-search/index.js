import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import { STGContainer, STGDatePicker, STGColors } from "stg-ui";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import gStyles from "@components/styles";
import HeaderStyle from "@components/styles/HeaderStyle";
import moment from "moment";
import * as Animatable from "react-native-animatable";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import EventHelpers from "../event/Helpers";

export default function EventSearch() {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  // States
  const [activity, setActivity] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState(new Date());
  const [withDate, setWithDate] = useState(false);

  const done = () => {
    const dateOnly = withDate ? moment(date).format(`YYYY-MM-DD`) : "";
    if (
      activity === "" &&
      country === "" &&
      city === "" &&
      address === "" &&
      !withDate
    ) {
      navigation.goBack();
    } else {
      EventHelpers.getEventsBySearch({
        activity,
        country,
        city,
        address,
        date: dateOnly,
      });
      navigation.goBack();
    }
  };

  const handleShowdate = (value) => {
    setWithDate(value);
  };

  const handleChangeDate = (_, value) => {
    setDate(value);
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
          <Text style={gStyles.textInputTitle}>{t("event:add.activity")}</Text>
          <TextInput
            defaultValue={activity}
            value={activity}
            style={{
              ...gStyles.textInput,
              borderBottomColor: "rgba(0,0,0,0.2)",
            }}
            placeholder={t("event:add.activityPlaceholder")}
            placeholderTextColor={"rgba(0,0,0,0.2)"}
            onChangeText={(value) => setActivity(value)}
          />
          <Text style={gStyles.textInputTitle}>{t("common:country")}</Text>
          <TextInput
            defaultValue={country}
            value={country}
            style={{
              ...gStyles.textInput,
              borderBottomColor: "rgba(0,0,0,0.2)",
            }}
            placeholder={t("common:countryPlaceholder")}
            placeholderTextColor={"rgba(0,0,0,0.2)"}
            onChangeText={(value) => setCountry(value)}
          />
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
            onChangeText={(value) => setCity(value)}
          />
          <Text style={gStyles.textInputTitle}>{t("common:address")}</Text>
          <TextInput
            defaultValue={address}
            value={address}
            style={{
              ...gStyles.textInput,
              borderBottomColor: "rgba(0,0,0,0.2)",
            }}
            placeholder={t("common:addressPlaceholder")}
            placeholderTextColor={"rgba(0,0,0,0.2)"}
            onChangeText={(value) => setAddress(value)}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <Text style={gStyles.textInputTitle}>{t("common:date")}</Text>
            <Switch
              value={withDate}
              onValueChange={handleShowdate}
              style={{ marginTop: 20 }}
            />
          </View>
          {withDate && (
            <Animatable.View
              duration={500}
              animation="fadeIn"
              easing="ease-in-out"
            >
              <STGDatePicker
                attr="date"
                value={date}
                handleChangeInput={handleChangeDate}
                t={t}
                locate={i18n.language}
                dateMode="date"
                dateFormat="DD MMM YYYY"
              />
            </Animatable.View>
          )}
        </ScrollView>
      </STGContainer>
    </>
  );
}
