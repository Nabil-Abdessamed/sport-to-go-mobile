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
import Styles from "../session-add-regular/Styles";
import gStyles from "@components/styles";
import { useTranslation } from "react-i18next";
import SessionTextInput from "../session-add-regular/SessionTextInput";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import HeaderRight from "../session-add-regular/HeaderRight";
import ImagePicker from "react-native-image-picker";
import FastImage from "react-native-fast-image";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SessionMaps from "../session-maps/SessionMaps";
import lodash from "lodash";
import SessionValidator from "../session-add/validation";
import { SessionUniqueService } from "../../services";
import Moment from "moment";
import { shallowEqual, useSelector } from "react-redux";
import AcceptBeforeSave from "../session-add-regular/AcceptBeforeSave";

const { width } = Dimensions.get("screen");
const imageHeight = width * 0.5625;

export default function SessionUniqueAdd() {
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
  const now = new Date();
  const now2 = new Date();
  now2.setHours(now2.getHours() + 1);
  const [date, setDate] = useState(now);
  const [timeStartAt, setTimeStartAt] = useState(now);
  const [timeEndAt, setTimeEndAt] = useState(now2);

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [countryError, setCountryError] = useState(null);
  const [cityError, setCityError] = useState(null);
  const [titleError, setTitleError] = useState(null);
  const [priceError, setPriceError] = useState(null);
  const [placesError, setPlacesError] = useState(null);
  const [dateDiffError, setDateDiffError] = useState(null);

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

  const validateSessionRegular = () => {
    const titleError = SessionValidator.validateTitle(title, t);
    setTitleError(titleError);
    const priceError = SessionValidator.validatePrice(price, t);
    setPriceError(priceError);
    const placesError = SessionValidator.validatePlaces(places, t);
    setPlacesError(placesError);
    const dateDiffError = SessionValidator.validateDiffError(
      timeStartAt,
      timeEndAt,
      t
    );
    setDateDiffError(dateDiffError);
    const countryError = SessionValidator.validateCountry(country, t);
    setCountryError(countryError);
    const cityError = SessionValidator.validateCity(city, t);
    setCityError(cityError);
    if (
      titleError !== null ||
      priceError !== null ||
      placesError !== null ||
      dateDiffError !== null ||
      countryError !== null ||
      cityError !== null
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
    formdata.append("date", Moment(date).format("YYYY-MM-DD"));
    formdata.append("timeStartAt", Moment(timeStartAt).format("HH:mm"));
    formdata.append("timeEndAt", Moment(timeEndAt).format("HH:mm"));
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
      } = await SessionUniqueService.saveSessionUniqueService(formdata);
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

  const handleChangeDate = (_, date) => {
    setDate(date);
  };

  const handleChangeTimeStartAt = (_, date) => {
    setTimeStartAt(date);
  };

  const handleChangeTimeEndAt = (_, date) => {
    setTimeEndAt(date);
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
                attr="date"
                value={date}
                handleChangeInput={handleChangeDate}
                t={t}
                dateMode="date"
                dateFormat="dddd, DD MMM YYYY"
              />
              <STGDatePicker
                attr="timeStartAt"
                value={timeStartAt}
                handleChangeInput={handleChangeTimeStartAt}
                t={t}
                dateMode="time"
                dateFormat="HH:mm"
              />
              <STGDatePicker
                attr="timeEndAt"
                value={timeEndAt}
                handleChangeInput={handleChangeTimeEndAt}
                t={t}
                dateMode="time"
                dateFormat="HH:mm"
              />
              {dateDiffError && (
                <Text style={gStyles.helper}>{dateDiffError}</Text>
              )}
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
