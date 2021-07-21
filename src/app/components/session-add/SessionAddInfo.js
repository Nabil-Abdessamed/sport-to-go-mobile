import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Switch,
  Platform,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import gStyles from "@components/styles";
import { SessionDto } from "./session.dto";
import _ from "lodash";
import { setCreateSession } from "@redux/actions";
import {
  STGButton,
  STGContainer,
  STGScrollView,
  STGScrollViewBody,
} from "stg-ui";
import { validateSport, validatePrice, validatePlaces } from "./validation";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

export default function SessionAddInfo() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigation = useNavigation();
  // States
  const [sessionDto, setSessionDto] = useState({});
  const [sportError, setSportError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  const [priceError, setPriceError] = useState(null);
  const [placesError, setPlacesError] = useState(null);
  const [unlimited, setUnlimited] = useState(true);

  const _handleChangeInput = (attr, value) => {
    const s = _.clone(sessionDto);
    s[attr] = value;
    setSessionDto(s);
  };

  const _save = () => {
    const sportError = validateSport(sessionDto.sport, t);
    const priceError = validatePrice(sessionDto.price, t);
    const placesError = !unlimited
      ? validatePlaces(sessionDto.places.toString(), t)
      : null;
    const hasErrors = sportError || priceError || placesError;
    if (hasErrors) {
      setSportError(sportError);
      setPriceError(priceError);
      setPlacesError(placesError);
    } else {
      if (unlimited) {
        _handleChangeInput("places", "0");
      }
      dispatch(setCreateSession(sessionDto));
      navigation.navigate("SessionAddDate");
    }
  };

  const handleChangePlaces = (value) => {
    setUnlimited(value);
    if (value) {
      _handleChangeInput("places", 0);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const session = new SessionDto();
      dispatch(setCreateSession(session));
      setSessionDto(session);
    }, [])
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : undefined}
    >
      <STGContainer>
        <STGScrollView>
          <STGScrollViewBody>
            <Text style={gStyles.textInputTitle}>
              {t("session:add.sportName")}
            </Text>
            <TextInput
              defaultValue={sessionDto.sport}
              value={sessionDto.sport}
              style={{
                ...gStyles.textInput,
                borderBottomColor: sportError
                  ? "rgba(220,20,60,0.8)"
                  : "rgba(0,0,0,0.2)",
              }}
              placeholder={t("session:add.sportNamePlaceholder")}
              placeholderTextColor={"rgba(0,0,0,0.2)"}
              onChangeText={(value) => _handleChangeInput("sport", value)}
            />
            {sportError && <Text style={gStyles.helper}>{sportError}</Text>}
            <Text style={gStyles.textInputTitle}>
              {t("session:add.description")}
            </Text>
            <TextInput
              multiline
              defaultValue={sessionDto.description}
              value={sessionDto.description}
              style={{
                ...gStyles.textInput,
                paddingVertical: 10,
                lineHeight: 20,
                borderBottomColor: descriptionError
                  ? "rgba(220,20,60,0.8)"
                  : "rgba(0,0,0,0.2)",
              }}
              placeholder={t("session:add.descriptionPlaceholder")}
              placeholderTextColor={"rgba(0,0,0,0.2)"}
              onChangeText={(value) => _handleChangeInput("description", value)}
            />
            {descriptionError && (
              <Text style={gStyles.helper}>{descriptionError}</Text>
            )}

            <Text style={gStyles.textInputTitle}>
              {t("session:add.pricePlaceholder")}
            </Text>
            <TextInput
              defaultValue={sessionDto.price}
              value={sessionDto.price}
              style={{
                ...gStyles.textInput,
                borderBottomColor: priceError
                  ? "rgba(220,20,60,0.8)"
                  : "rgba(0,0,0,0.2)",
              }}
              placeholder={t("session:add.pricePlaceholder")}
              placeholderTextColor={"rgba(0,0,0,0.2)"}
              onChangeText={(value) => _handleChangeInput("price", value)}
              keyboardType="decimal-pad"
            />
            {priceError && <Text style={gStyles.helper}>{priceError}</Text>}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={gStyles.textInputTitle}>
                {t("session:add.unlimited")}
              </Text>
              <Switch value={unlimited} onValueChange={handleChangePlaces} />
            </View>
            {!unlimited && (
              <>
                <Text style={gStyles.textInputTitle}>
                  {t("session:add.places")}
                </Text>
                <TextInput
                  defaultValue={`${sessionDto.places}`}
                  value={`${sessionDto.places}`}
                  style={{
                    ...gStyles.textInput,
                    borderBottomColor: placesError
                      ? "rgba(220,20,60,0.8)"
                      : "rgba(0,0,0,0.2)",
                  }}
                  placeholder={t("session:add.placesPlaceholder")}
                  placeholderTextColor={"rgba(0,0,0,0.2)"}
                  onChangeText={(value) => {
                    const s = _.clone(sessionDto);
                    if (value) {
                      s["places"] = parseInt(value, 10);
                    } else {
                      s["places"] = parseInt(0, 10);
                    }
                    setSessionDto(s);
                  }}
                  keyboardType="decimal-pad"
                />
                {placesError && (
                  <Text style={gStyles.helper}>{placesError}</Text>
                )}
              </>
            )}
          </STGScrollViewBody>
          <STGButton onPress={_save} btnText={t("common:next")} />
        </STGScrollView>
      </STGContainer>
    </KeyboardAvoidingView>
  );
}
