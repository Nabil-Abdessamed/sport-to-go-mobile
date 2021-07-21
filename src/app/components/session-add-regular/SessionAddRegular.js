import React, { useCallback, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  TouchableOpacity,
  View,
  Text,
  Alert,
} from "react-native";
import {
  STGContainer,
  STGDatePicker,
  STGFullMap,
  STGPictoMap,
  STGScrollView,
} from "stg-ui";
import Styles from "./Styles";
import gStyles from "@components/styles";
import { useTranslation } from "react-i18next";
import SessionTextInput from "./SessionTextInput";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import HeaderRight from "./HeaderRight";
import ImagePicker from "react-native-image-picker";
import FastImage from "react-native-fast-image";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SessionMaps from "../session-maps/SessionMaps";
import RecurrenceDays from "../session-add/RecurrencesDays";
import SelectedDays from "./SelectedDays";
import { Days } from "./Days";
import lodash from "lodash";
import SessionValidator from "../session-add/validation";
import { SessionRegularService } from "../../services";
import Moment from "moment";
import { shallowEqual, useSelector } from "react-redux";
import AcceptBeforeSave from "./AcceptBeforeSave";

const { width } = Dimensions.get("screen");
const imageHeight = width * 0.5625;

export default function SessionAddRegular() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  navigation.setOptions({
    headerRight: () => (
      <HeaderRight
        onImageButtonPress={onImageButtonPress}
        onSaveButtonPress={onSaveButtonPress}
        onMapButtonPress={handleMapVisible}
      />
    ),
  });
  const { user } = useSelector((state) => state.auth, shallowEqual);
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [fileDimensions, setFileDimensions] = useState({});
  const [fileInfo, setFileInfo] = useState(null);
  const [location, setLocation] = useState(null);
  const [mapVisible, setMapVisible] = useState(false);
  const [mapFullscreen, setMapFullscreen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [places, setPlaces] = useState("");
  const date = new Date();
  const date2 = new Date();
  date2.setDate(date2.getDate() - 1);
  date2.setMonth(date2.getMonth() + 1);
  const [dateStartAt, setDateStartAt] = useState(date);
  const [dateExpireAt, setDateExpireAt] = useState(date2);

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [countryError, setCountryError] = useState(null);
  const [cityError, setCityError] = useState(null);

  const [sessionDays, setSessionsDays] = useState(new Days());
  const [titleError, setTitleError] = useState(null);
  const [priceError, setPriceError] = useState(null);
  const [placesError, setPlacesError] = useState(null);
  const [dateDiffError, setDateDiffError] = useState(null);
  const [sessionDaysSelectedError, setSessionDaysSelectedError] = useState(
    false
  );

  const onPressAccept = () => {
    setAccepted(!accepted);
  };

  const renderImageDimensions = (data) => {
    if (data.isVertical) {
      if (data.width > width) {
        const percent = (((data.width - width) * 100) / data.width) * 0.01;
        setFileDimensions({
          width,
          height: data.height - data.height * percent,
        });
      }
    } else {
      setFileDimensions({
        width,
        height: imageHeight,
      });
    }
  };

  const onImageButtonPress = () => {
    ImagePicker.showImagePicker(
      {
        noData: true,
        title: t("imagePicker:title"),
        takePhotoButtonTitle: t("imagePicker:takePhotoButtonTitle"),
        chooseFromLibraryButtonTitle: t(
          "imagePicker:chooseFromLibraryButtonTitle"
        ),
        cancelButtonTitle: t("imagePicker:cancelButtonTitle"),
        mediaType: "mixed",
      },
      (response) => {
        if (response.didCancel) {
          return null;
        } else {
          const file = {
            name: response.fileName,
            size: response.fileSize,
            type: response.type,
            uri: response.uri,
          };
          const fileInfo = {
            height: response.height,
            width: response.width,
            isVertical: response.isVertical,
          };
          setFile(file);
          setFileInfo(fileInfo);
          renderImageDimensions(fileInfo);
        }
      }
    );
  };

  const handleChangeDayError = (key, value) => {
    const data = lodash.clone(sessionDays);
    data[key].error = value;
    setSessionsDays(data);
  };

  const validateSelectedDays = () => {
    Object.entries(sessionDays).forEach((day) => {
      if (day[1].timeStartAt > day[1].timeEndAt) {
        handleChangeDayError(day[0], true);
      } else {
        handleChangeDayError(day[0], false);
      }
    });
  };

  const validateSessionRegular = () => {
    const titleError = SessionValidator.validateTitle(title, t);
    setTitleError(titleError);
    const priceError = SessionValidator.validatePrice(price, t);
    setPriceError(priceError);
    const placesError = SessionValidator.validatePlaces(places, t);
    setPlacesError(placesError);
    const dateDiffError = SessionValidator.validateDiffError(
      dateStartAt,
      dateExpireAt,
      t
    );
    setDateDiffError(dateDiffError);
    validateSelectedDays();
    const sessionDaysErrors = Object.values(sessionDays).some(
      (item) => item.error
    );
    const sessionDaysSelectedError = Object.values(sessionDays).some(
      (item) => !item.value
    );
    const countryError = SessionValidator.validateCountry(country, t);
    setCountryError(countryError);
    const cityError = SessionValidator.validateCity(city, t);
    setCityError(cityError);
    setSessionDaysSelectedError(sessionDaysSelectedError);
    if (
      titleError !== null ||
      priceError !== null ||
      placesError !== null ||
      dateDiffError !== null ||
      countryError !== null ||
      cityError !== null ||
      sessionDaysErrors ||
      !sessionDaysSelectedError
    ) {
      return false;
    }
    return true;
  };

  const beforeSaveSessionRegular = () => {
    const formdata = new FormData();
    if (file && fileInfo && fileDimensions) {
      formdata.append("file", file);
      formdata.append("fileInfo", JSON.stringify(fileInfo));
    }
    formdata.append("location", JSON.stringify(location));
    formdata.append("title", title);
    formdata.append("description", description);
    formdata.append("price", price);
    formdata.append("places", places);
    formdata.append("country", country);
    formdata.append("city", city);
    formdata.append("address", address);
    formdata.append("dateStartAt", Moment(dateStartAt).format("YYYY-MM-DD"));
    formdata.append("dateExpireAt", Moment(dateExpireAt).format("YYYY-MM-DD"));
    const recurrences = Object.entries(sessionDays).map((item) => {
      return {
        day: item[0],
        value: item[1].value,
        timeStartAt: Moment(item[1].timeStartAt).format("HH:mm:ss"),
        timeEndAt: Moment(item[1].timeEndAt).format("HH:mm:ss"),
      };
    });
    formdata.append("recurrences", JSON.stringify(recurrences));
    return formdata;
  };

  const onSaveButtonPress = async () => {
    const valid = validateSessionRegular();
    if (!accepted) {
      Alert.alert(t("session:acceptBeforeSave2"));
      return;
    }
    if (valid && accepted) {
      const formdata = beforeSaveSessionRegular();
      setLoading(true);
      const {
        data,
        status,
      } = await SessionRegularService.saveSessionRegularService(formdata);
      setLoading(false);
      if (status < 300) {
        Alert.alert(t("session:add.success"), t("session:add.successMessage"));
        navigation.goBack();
      } else {
        Alert.alert(t("session:add.error"), t("session:add.errorMessage"));
      }
    }
  };

  const onImageButtonCloseClick = () => {
    setFile(null);
    setFileInfo(null);
    setFileDimensions(null);
  };

  const handleMapVisible = () => {
    setMapVisible(!mapVisible);
  };

  const onPressMap = (location) => {
    setLocation(location);
  };

  const onPressMapFullscreen = () => {
    setMapFullscreen(!mapFullscreen);
  };

  const onPressCloseButton = () => {
    setLocation(null);
  };

  const handleChangeDateStartAt = (_, date) => {
    setDateStartAt(date);
  };

  const handleChangeDateExpireAt = (_, date) => {
    setDateExpireAt(date);
  };

  const renderDayFormat = (day) => {
    return day[0].toUpperCase();
  };

  const handleSelectDay = (day) => {
    const data = lodash.clone(sessionDays);
    data[day].value = !sessionDays[day].value;
    setSessionsDays(data);
  };

  const handleChangeTimeStartAt = (_, date, day) => {
    const data = lodash.clone(sessionDays);
    data[day].timeStartAt = date;
    setSessionsDays(data);
  };

  const handleChangeTimeEndAt = (_, date, day) => {
    const data = lodash.clone(sessionDays);
    data[day].timeEndAt = date;
    setSessionsDays(data);
  };

  useFocusEffect(
    useCallback(() => {
      const { country, city, address } = user;
      setCountry(country || "");
      setCity(city || "");
      setAddress(address || "");
    }, [])
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : undefined}
    >
      <STGContainer loading={loading}>
        <STGScrollView>
          <STGContainer>
            <View style={Styles.card}>
              <SessionTextInput
                value={title}
                setValue={setTitle}
                title={t("session:add.sportName")}
                placeholder={t("session:add.sportNamePlaceholder")}
                error={titleError}
              />
              <SessionTextInput
                value={description}
                setValue={setDescription}
                title={t("session:add.description")}
                placeholder={t("session:add.descriptionPlaceholder")}
                multiline={true}
              />
              <SessionTextInput
                value={price}
                setValue={setPrice}
                title={t("session:add.pricePlaceholder")}
                placeholder={t("session:add.pricePlaceholder")}
                error={priceError}
                keyboardType="decimal-pad"
              />
              <SessionTextInput
                value={places}
                setValue={setPlaces}
                title={t("session:add.placesPlaceholder")}
                placeholder={t("session:add.placesPlaceholder")}
                error={placesError}
                keyboardType="decimal-pad"
                helper={"0: Nombre de places illimité"}
              />
              <SessionTextInput
                value={country}
                setValue={setCountry}
                title={t("session:add.countryPlaceholder")}
                placeholder={t("session:add.countryPlaceholder")}
                error={countryError}
              />
              <SessionTextInput
                value={city}
                setValue={setCity}
                title={t("session:add.cityPlaceholder")}
                placeholder={t("session:add.cityPlaceholder")}
                error={cityError}
              />
              <SessionTextInput
                value={address}
                setValue={setAddress}
                title={t("session:add.addressPlaceholder")}
                placeholder={t("session:add.addressPlaceholder")}
              />
              <STGDatePicker
                attr="dateStartAt"
                value={dateStartAt}
                handleChangeInput={handleChangeDateStartAt}
                t={t}
                dateMode="date"
                dateFormat="dddd, DD MMM YYYY"
              />
              <STGDatePicker
                attr="dateExpireAt"
                value={dateExpireAt}
                handleChangeInput={handleChangeDateExpireAt}
                t={t}
                dateMode="date"
                dateFormat="dddd, DD MMM YYYY"
              />
              {dateDiffError && (
                <Text style={gStyles.helper}>{dateDiffError}</Text>
              )}
            </View>
            <RecurrenceDays
              _handleChangeInput={handleSelectDay}
              _renderDayFormat={renderDayFormat}
              daysError={null}
              session={sessionDays}
              t={t}
            />
            {sessionDaysSelectedError && (
              <View style={Styles.card}>
                <Text style={gStyles.helper}>
                  {t("validation:selectedDays")}
                </Text>
              </View>
            )}
            <View style={Styles.card}>
              <SelectedDays
                data={sessionDays}
                t={t}
                handleChangeTimeStartAt={handleChangeTimeStartAt}
                handleChangeTimeEndAt={handleChangeTimeEndAt}
              />
            </View>
            {file && (
              <View style={Styles.imageContainer}>
                <FastImage
                  source={{ uri: file.uri }}
                  style={{
                    ...fileDimensions,
                  }}
                  resizeMode="contain"
                />
                <TouchableOpacity
                  style={Styles.imageButtonClose}
                  onPress={onImageButtonCloseClick}
                >
                  <MaterialCommunityIcons
                    accessibilityRole="text"
                    name="close"
                    size={32}
                  />
                </TouchableOpacity>
              </View>
            )}
            {location && (
              <STGPictoMap
                latitude={location.latitude}
                longitude={location.longitude}
                regionLatitude={location.latitude}
                regionLongitude={location.longitude}
                onPressFullscreen={onPressMapFullscreen}
                onPressCloseButton={onPressCloseButton}
              />
            )}
            {location && (
              <STGFullMap
                show={mapFullscreen}
                hideMap={onPressMapFullscreen}
                latitude={location.latitude}
                longitude={location.longitude}
                regionLatitude={location.latitude}
                regionLongitude={location.longitude}
                markers={[
                  {
                    latitude: location.latitude,
                    longitude: location.longitude,
                  },
                ]}
              />
            )}
            <SessionMaps
              visible={mapVisible}
              location={location}
              onPressMap={onPressMap}
              onRequestClose={handleMapVisible}
            />
          </STGContainer>
        </STGScrollView>
        <AcceptBeforeSave accepted={accepted} onPressAccept={onPressAccept} />
      </STGContainer>
    </KeyboardAvoidingView>
  );
}
