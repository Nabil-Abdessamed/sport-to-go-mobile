import React, { Component, useState, useEffect } from "react";
import { Text, KeyboardAvoidingView, TextInput, Platform } from "react-native";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { setCreateSession } from "@redux/actions";
import gStyles from "@components/styles";
import _ from "lodash";
import {
  STGButton,
  STGContainer,
  STGScrollViewBody,
  STGScrollView,
} from "stg-ui";
import { validateCountry, validateCity } from "./validation";
import { useNavigation } from "@react-navigation/native";

class SessionAddress {
  country = "";
  city = "";
  address = "";
}

export default function SessionAddAddress() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth, shallowEqual);
  const { session } = useSelector((state) => state.session, shallowEqual);
  // States
  const [sessionDto, setSessionDto] = useState(new SessionAddress());
  const [countryError, setCountryError] = useState(null);
  const [cityError, setCityError] = useState(null);
  const [addressError, setAddressError] = useState(null);

  const _handleChangeInput = (attr, value) => {
    const s = _.clone(sessionDto);
    s[attr] = value;
    setSessionDto(s);
  };

  const _save = async () => {
    const countryError = validateCountry(sessionDto.country, t);
    const cityError = validateCity(sessionDto.city, t);
    const hasErrors = countryError || cityError;
    if (hasErrors) {
      setCountryError(countryError);
      setCityError(cityError);
    } else {
      const data = {
        ...session,
        ...sessionDto,
      };
      dispatch(setCreateSession(data));
      navigation.navigate("SessionAddMap");
    }
  };

  const prepareSessionDto = () => {
    const s = _.clone(sessionDto);
    s.country = user.country;
    s.city = user.city;
    s.address = user.address;
    setSessionDto(s);
  };

  useEffect(() => {
    prepareSessionDto();
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : undefined}
    >
      <STGScrollView>
        <STGContainer>
          <STGScrollViewBody>
            <Text style={gStyles.textInputTitle}>
              {t("session:add.country")}
            </Text>
            <TextInput
              defaultValue={sessionDto.country}
              value={sessionDto.country}
              style={{
                ...gStyles.textInput,
                borderBottomColor: countryError
                  ? "rgba(220,20,60,0.8)"
                  : "rgba(0,0,0,0.2)",
              }}
              placeholder={t("session:add.countryPlaceholder")}
              placeholderTextColor={"rgba(0,0,0,0.2)"}
              onChangeText={(value) => _handleChangeInput("country", value)}
            />
            {countryError && <Text style={gStyles.helper}>{countryError}</Text>}
            <Text style={gStyles.textInputTitle}>{t("session:add.city")}</Text>
            <TextInput
              defaultValue={sessionDto.city}
              value={sessionDto.city}
              style={{
                ...gStyles.textInput,
                borderBottomColor: cityError
                  ? "rgba(220,20,60,0.8)"
                  : "rgba(0,0,0,0.2)",
              }}
              placeholder={t("session:add.cityPlaceholder")}
              placeholderTextColor={"rgba(0,0,0,0.2)"}
              onChangeText={(value) => _handleChangeInput("city", value)}
            />
            {cityError && <Text style={gStyles.helper}>{cityError}</Text>}
            <Text style={gStyles.textInputTitle}>
              {t("session:add.address")}
            </Text>
            <TextInput
              defaultValue={sessionDto.address}
              value={sessionDto.address}
              style={{
                ...gStyles.textInput,
                borderBottomColor: addressError
                  ? "rgba(220,20,60,0.8)"
                  : "rgba(0,0,0,0.2)",
              }}
              placeholder={t("session:add.addressPlaceholder")}
              placeholderTextColor={"rgba(0,0,0,0.2)"}
              onChangeText={(value) => _handleChangeInput("address", value)}
            />
            {addressError && <Text style={gStyles.helper}>{addressError}</Text>}
          </STGScrollViewBody>
          <STGButton onPress={_save} btnText={t("common:next")} />
        </STGContainer>
      </STGScrollView>
    </KeyboardAvoidingView>
  );
}
