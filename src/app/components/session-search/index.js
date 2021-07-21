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
import SessionHelpers from "../session/Helpers";

export default function SessionSearch() {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  // States
  const [sport, setSport] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState(new Date());
  const [withDate, setWithDate] = useState(false);

  const done = () => {
    const dateOnly = withDate ? moment(date).format(`YYYY-MM-DD`) : "";
    if (sport === "" && country === "" && city === "" && dateOnly === "") {
      navigation.goBack();
    } else {
      SessionHelpers.getSessionsBySearch({
        sport,
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

  return (
    <STGContainer>
      <View style={HeaderStyle.header}>
        <TouchableOpacity
          style={HeaderStyle.headerBtnBack}
          onPress={navigation.goBack}
        >
          <Ionicons name="ios-arrow-back" size={30} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity style={HeaderStyle.headerBtnDone} onPress={done}>
          <Text style={HeaderStyle.headerBtnDoneText}>{t("common:done")}</Text>
          <MaterialIcons name="done" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        keyboardDismissMode={"none"}
        keyboardShouldPersistTaps={"handled"}
        contentContainerStyle={{ paddingHorizontal: 5 }}
      >
        <Text style={gStyles.textInputTitle}>{t("session:add.sportName")}</Text>
        <TextInput
          defaultValue={sport}
          value={sport}
          style={{
            ...gStyles.textInput,
            borderBottomColor: "rgba(0,0,0,0.2)",
          }}
          placeholder={t("session:add.sportNamePlaceholder")}
          placeholderTextColor={"rgba(0,0,0,0.2)"}
          onChangeText={setSport}
        />
        <Text style={gStyles.textInputTitle}>{t("session:add.country")}</Text>
        <TextInput
          defaultValue={country}
          value={country}
          style={{
            ...gStyles.textInput,
            borderBottomColor: "rgba(0,0,0,0.2)",
          }}
          placeholder={t("session:add.countryPlaceholder")}
          placeholderTextColor={"rgba(0,0,0,0.2)"}
          onChangeText={setCountry}
        />
        <Text style={gStyles.textInputTitle}>{t("session:add.city")}</Text>
        <TextInput
          defaultValue={city}
          value={city}
          style={{
            ...gStyles.textInput,
            borderBottomColor: "rgba(0,0,0,0.2)",
          }}
          placeholder={t("session:add.cityPlaceholder")}
          placeholderTextColor={"rgba(0,0,0,0.2)"}
          onChangeText={setCity}
        />
        <Text style={gStyles.textInputTitle}>{t("session:add.address")}</Text>
        <TextInput
          defaultValue={address}
          value={address}
          style={{
            ...gStyles.textInput,
            borderBottomColor: "rgba(0,0,0,0.2)",
          }}
          placeholder={t("session:add.addressPlaceholder")}
          placeholderTextColor={"rgba(0,0,0,0.2)"}
          onChangeText={setAddress}
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
            trackColor={{
              true: STGColors.container,
            }}
            thumbColor={"white"}
          />
        </View>
        {withDate && (
          <Animatable.View animation="fadeIn">
            <STGDatePicker
              t={t}
              attr="date"
              value={date}
              handleChangeInput={(_, v) => setDate(v)}
              dateFormat="DD MMMM YYYY"
              locate={i18n.language}
            />
          </Animatable.View>
        )}
      </ScrollView>
    </STGContainer>
  );
}
