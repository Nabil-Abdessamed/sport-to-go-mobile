import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Platform,
} from "react-native";
import { EventDto } from "../../dto";
import _ from "lodash";
import {
  STGContainer,
  STGButton,
  STGColors,
  STGDatePicker,
  STGDurationPicker,
  STGScrollView,
  STGScrollViewBody,
} from "stg-ui";
import gStyles from "@components/styles";
import Validation from "./validation";
import { Switch } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";
import { useSelector, shallowEqual } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

export default function EventAdd() {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  // Props from Redux
  const { user } = useSelector((state) => state.auth, shallowEqual);
  // States
  const [event, setEvent] = useState(new EventDto());
  const [unlimited, setUnlimited] = useState(true);
  const [descriptionError, setDescriptionError] = useState(null);
  const [dateError, setDateError] = useState(null);
  const [timeError, setTimeError] = useState(null);
  const [countryError, setCountryError] = useState(null);
  const [cityError, setCityError] = useState(null);
  const [addressError, setAddressError] = useState(null);
  const [placesError, setPlacesError] = useState(null);
  const [activityError, setActivityError] = useState(null);

  const _handleChangeEvent = (key, value) => {
    const e = _.clone(event);
    e[key] = value;
    setEvent(e);
  };

  const next = () => {
    const descriptionError = Validation.validateDescription(
      event.description,
      t
    );
    const placesError = !unlimited
      ? Validation.validatePlaces(`${event.places}`, t)
      : null;
    const addressError = Validation.validateAddress(event.address, t);
    const countryError = Validation.validateCountry(event.country, t);
    const cityError = Validation.validateCity(event.city, t);
    const dateError = Validation.validateDate(event.date.toString(), t);
    const timeError = Validation.validateDateDiff(
      event.timeStartAt,
      event.timeEndAt,
      t
    );
    const activityError = Validation.validateActivity(event.activity, t);
    const hasError =
      activityError ||
      descriptionError ||
      countryError ||
      cityError ||
      addressError ||
      dateError ||
      timeError ||
      placesError;
    if (hasError) {
      setActivityError(activityError);
      setDescriptionError(descriptionError);
      setDateError(dateError);
      setTimeError(timeError);
      setCountryError(countryError);
      setCityError(cityError);
      setAddressError(addressError);
      setPlacesError(placesError);
    } else {
      if (unlimited) {
        _handleChangePlacesValue("places", 0);
      }
      navigation.navigate("EventAddOne", {
        event: JSON.stringify(event),
      });
    }
  };

  const _handleUnlimited = (value) => {
    if (value) {
      setUnlimited(value);
    } else {
      setUnlimited(value);
    }
  };

  const _handleChangePlacesValue = (value) => {
    const e = _.clone(event);
    if (value) {
      e["places"] = Number(value);
    } else {
      e["places"] = 0;
    }
    setEvent(e);
  };

  const _renderHoursMinutes = (item) => {
    return item < 10 ? `0${item}` : item;
  };

  useEffect(() => {
    const e = _.clone(event);
    const time1 = new Date();
    const time2 = new Date(time1.getTime());
    time2.setHours(time2.getHours() + 1);
    e.date = time1;
    e.timeStartAt = time1;
    e.timeEndAt = time2;
    e.country = user.country || "";
    e.city = user.city || "";
    e.address = user.address || "";
    setEvent(e);
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : undefined}
      >
        <STGScrollView>
          <STGContainer>
            <STGScrollViewBody>
              <Text style={gStyles.textInputTitle}>
                {t("event:add.activity")}
              </Text>
              <TextInput
                defaultValue={event.activity}
                value={event.activity}
                style={{
                  ...gStyles.textInput,
                  borderBottomColor: activityError
                    ? "rgba(220,20,60,0.8)"
                    : "rgba(0,0,0,0.2)",
                }}
                placeholder={t("event:add.activityPlaceholder")}
                placeholderTextColor={"rgba(0,0,0,0.2)"}
                onChangeText={(value) => _handleChangeEvent("activity", value)}
              />
              {activityError && (
                <Text style={gStyles.helper}>{activityError}</Text>
              )}
              {/*  */}
              <Text style={gStyles.textInputTitle}>
                {t("event:add.description")}
              </Text>
              <TextInput
                multiline={true}
                defaultValue={event.description}
                value={event.description}
                style={{
                  ...gStyles.textInput,
                  borderBottomColor: descriptionError
                    ? "rgba(220,20,60,0.8)"
                    : "rgba(0,0,0,0.2)",
                }}
                placeholder={t("event:add.descriptionPlaceholder")}
                placeholderTextColor={"rgba(0,0,0,0.2)"}
                onChangeText={(value) =>
                  _handleChangeEvent("description", value)
                }
              />
              {descriptionError && (
                <Text style={gStyles.helper}>{descriptionError}</Text>
              )}
              <Text style={gStyles.textInputTitle}>{t("common:country")}</Text>
              <TextInput
                defaultValue={event.country}
                value={event.country}
                style={{
                  ...gStyles.textInput,
                  borderBottomColor: countryError
                    ? "rgba(220,20,60,0.8)"
                    : "rgba(0,0,0,0.2)",
                }}
                placeholder={t("common:countryPlaceholder")}
                placeholderTextColor={"rgba(0,0,0,0.2)"}
                onChangeText={(value) => _handleChangeEvent("country", value)}
              />
              {countryError && (
                <Text style={gStyles.helper}>{countryError}</Text>
              )}
              <Text style={gStyles.textInputTitle}>{t("common:city")}</Text>
              <TextInput
                defaultValue={event.city}
                value={event.city}
                style={{
                  ...gStyles.textInput,
                  borderBottomColor: cityError
                    ? "rgba(220,20,60,0.8)"
                    : "rgba(0,0,0,0.2)",
                }}
                placeholder={t("common:cityPlaceholder")}
                placeholderTextColor={"rgba(0,0,0,0.2)"}
                onChangeText={(value) => _handleChangeEvent("city", value)}
              />
              {cityError && <Text style={gStyles.helper}>{cityError}</Text>}
              <Text style={gStyles.textInputTitle}>
                {t("event:add.address")}
              </Text>
              <TextInput
                defaultValue={event.address}
                value={event.address}
                style={{
                  ...gStyles.textInput,
                  borderBottomColor: addressError
                    ? "rgba(220,20,60,0.8)"
                    : "rgba(0,0,0,0.2)",
                }}
                placeholder={t("event:add.addressPlaceholder")}
                placeholderTextColor={"rgba(0,0,0,0.2)"}
                onChangeText={(value) => _handleChangeEvent("address", value)}
              />
              {addressError && (
                <Text style={gStyles.helper}>{addressError}</Text>
              )}
              <Text style={gStyles.textInputTitle}>{t("event:add.date")}</Text>
              <STGDatePicker
                attr="date"
                value={event.date}
                handleChangeInput={_handleChangeEvent}
                t={t}
              />
              {dateError && <Text style={gStyles.helper}>{dateError}</Text>}
              <STGDatePicker
                attr="timeStartAt"
                value={event.timeStartAt}
                handleChangeInput={_handleChangeEvent}
                t={t}
                dateMode="time"
                dateFormat="HH:mm"
              />
              <STGDatePicker
                attr="timeEndAt"
                value={event.timeEndAt}
                handleChangeInput={_handleChangeEvent}
                t={t}
                dateMode="time"
                locate={i18n.language}
                dateFormat="HH:mm"
              />

              {timeError && <Text style={gStyles.helper}>{timeError}</Text>}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={gStyles.textInputTitle}>
                  {t("event:add.unlimited")}
                </Text>
                <Switch
                  value={unlimited}
                  trackColor={STGColors.container}
                  onValueChange={_handleUnlimited}
                />
              </View>
              {unlimited === false && (
                <Animatable.View
                  duration={1000}
                  animation="fadeIn"
                  easing="ease"
                >
                  <Text style={gStyles.textInputTitle}>
                    {t("event:add.places")}
                  </Text>
                  <TextInput
                    defaultValue={`${event.places}`}
                    value={`${event.places}`}
                    style={{
                      ...gStyles.textInput,
                      borderBottomColor: placesError
                        ? "rgba(220,20,60,0.8)"
                        : "rgba(0,0,0,0.2)",
                    }}
                    placeholder={t("event:add.placesPlaceholder")}
                    placeholderTextColor={"rgba(0,0,0,0.2)"}
                    onChangeText={_handleChangePlacesValue}
                  />
                  {placesError && (
                    <Text style={gStyles.helper}>{placesError}</Text>
                  )}
                </Animatable.View>
              )}
            </STGScrollViewBody>
            <STGButton onPress={next} btnText={t("common:next")} />
          </STGContainer>
        </STGScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
