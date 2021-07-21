import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  SafeAreaView,
  Dimensions,
  Platform,
  PermissionsAndroid,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import {
  STGContainer,
  STGColors,
  STGButton,
  STGDurationPicker,
  STGDatePicker,
  STGScrollView,
  STGScrollViewBody,
} from "stg-ui";
import gStyles from "@components/styles";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import SessionEditStyle from "../styles/SessionEditStyle";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import IconEntypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MapView, { PROVIDER_DEFAULT, Marker } from "react-native-maps";
import FastImage from "react-native-fast-image";
import { BASE_URL } from "@config";
import Validation from "../session-add/validation";
import { updateSessionService } from "@services";
import ImagePicker from "react-native-image-picker";
import RecurrenceDays from "../session-add/RecurrencesDays";
import { useNavigation, useRoute } from "@react-navigation/native";
import SessionHelpers from "../session/Helpers";

const { width, height } = Dimensions.get("screen");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function SessionEdit() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { params } = useRoute();
  // States
  const [session, setSession] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [showDate, setShowDate] = useState(false);
  const [showAndroidDate, setShowAndroidDate] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [tmpFile, setTmpFile] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [sportError, setSportError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  const [priceError, setPriceError] = useState(null);
  const [countryError, setCountryError] = useState(null);
  const [cityError, setCityError] = useState(null);
  const [addressError, setAddressError] = useState(null);
  const [daysError, setDaysError] = useState(null);

  useEffect(() => {
    const s = params && params.session;
    const tmpFile =
      (s &&
        s.image && {
          uri: `${BASE_URL}/upload/sessions/${s.image}`,
        }) ||
      null;
    const timeStartAt = s.timeStartAt;
    const hours = timeStartAt.substr(0, 2);
    const minutes = timeStartAt.substr(3, 2);
    const seconds = timeStartAt.substr(6, 2);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);
    s.timeStartAt = date;
    setSession(s);
    setTmpFile(tmpFile);
  }, []);

  const _handleChangeInput = (key, value) => {
    const s = _.clone(session);
    s[key] = value;
    setSession(s);
  };

  const _renderDayFormat = (day) => {
    return day.substr(0, 1).toUpperCase();
  };

  const _handleShowMap = () => {
    setShowMap(!showMap);
  };

  const _handleShowDate = () => {
    if (Platform.OS === "android") {
      setShowAndroidDate(!showAndroidDate);
    } else {
      setShowDate(!showDate);
    }
  };

  const setDate = (e, date) => {
    date = date || session.startAt;
    _handleChangeInput("dateStartAt", date);
  };

  const _onMapReady = () => {
    if (Platform.OS === "android") {
      setLoading(true);
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      ).then((granted) => {
        setLoading(false);
        if (!granted) {
          setShowMap(false);
        }
      });
    }
  };

  const onMapPress = ({
    nativeEvent: {
      coordinate: { latitude, longitude },
    },
  }) => {
    const s = _.clone(session);
    s.latitude = latitude;
    s.longitude = longitude;
    setSession(s);
  };

  const imagePicker = async () => {
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
          const tmpFile = {
            name: response.fileName,
            size: response.fileSize,
            type: response.type,
            uri: response.uri,
          };
          setTmpFile(tmpFile);
        }
      }
    );
  };

  const save = async () => {
    const sportError = Validation.validateSport(session.sport, t);
    const priceError = Validation.validatePrice(`${session.price}`, t);
    const startAtError = Validation.validateStartAt(
      session.dateStartAt.toString(),
      t
    );
    const countryError = Validation.validateCountry(session.country, t);
    const cityError = Validation.validateCity(session.city, t);
    const hasErrors =
      sportError || priceError || startAtError || countryError || cityError;
    if (hasErrors) {
      setSportError(sportError);
      setPriceError(priceError);
      setStartAtError(startAtError);
      setCountryError(countryError);
      setCityError(cityError);
    } else {
      setLoading(true);
      setLoadingText(t("session:edit.loadingText"));
      const formdata = new FormData();
      if (tmpFile) {
        formdata.append("file", tmpFile);
      } else {
        if (removeImage) {
          formdata.append("removeFile", true);
        } else {
          formdata.append("removeFile", false);
        }
      }
      const data = _.clone(session);
      data.dateStartAt = moment(data.dateStartAt).format("YYYY-MM-DD");
      data.dateExpireAt = moment(data.dateExpireAt).format("YYYY-MM-DD");
      data.timeStartAt = moment(data.timeStartAt).format("HH:mm:ss");
      data.recurrences =
        (data.hasRecurrence &&
          data.recurrences &&
          JSON.stringify(data.recurrences)) ||
        null;

      for (let s in data) {
        if (data[s] !== null) formdata.append(s, data[s]);
      }
      const { status } = await updateSessionService(formdata);
      setLoading(false);
      if (_.inRange(status, 200, 300)) {
        Alert.alert(
          t("session:edit.success"),
          t("session:edit.successMessage")
        );
        SessionHelpers.getSessionsPagination();
        navigation.navigate("Session");
      } else {
        Alert.alert(t("session:edit.error"), t("session:edit.errorMessage"));
      }
    }
  };

  const _handleDurationHoursChange = (value) => {
    _handleChangeInput("durationHours", Number(value));
  };

  const _handleDurationMinutesChange = (value) => {
    _handleChangeInput("durationMinutes", Number(value));
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : undefined}
      >
        <STGContainer loading={loading} loadingText={loadingText}>
          <STGScrollView>
            <STGContainer>
              <STGScrollViewBody>
                {/* Sport name */}
                <Text style={gStyles.textInputTitle}>
                  {t("session:add.sportName")}
                </Text>
                <TextInput
                  defaultValue={session.sport}
                  value={session.sport}
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
                {/* Description */}
                <Text style={gStyles.textInputTitle}>
                  {t("session:add.description")}
                </Text>
                <TextInput
                  multiline
                  defaultValue={session.description}
                  value={session.description}
                  style={{
                    ...gStyles.textInput,
                    lineHeight: 20,
                    paddingVertical: 10,
                    borderBottomColor: descriptionError
                      ? "rgba(220,20,60,0.8)"
                      : "rgba(0,0,0,0.2)",
                  }}
                  placeholder={t("session:add.descriptionPlaceholder")}
                  placeholderTextColor={"rgba(0,0,0,0.2)"}
                  onChangeText={(value) =>
                    _handleChangeInput("description", value)
                  }
                />
                {descriptionError && (
                  <Text style={gStyles.helper}>{descriptionError}</Text>
                )}
                {/* Price */}
                <Text style={gStyles.textInputTitle}>
                  {t("session:add.pricePlaceholder")}
                </Text>
                <TextInput
                  defaultValue={`${session.price}`}
                  value={`${session.price}`}
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
                {/* Date and Time */}
                <Text style={gStyles.textInputTitle}>
                  {t("session:add.dateStartAt")}
                </Text>
                <STGDatePicker
                  attr="dateStartAt"
                  value={session.dateStartAt}
                  handleChangeInput={_handleChangeInput}
                  t={t}
                  dateMode="date"
                  dateFormat="dddd, DD MMM YYYY"
                />
                {session.hasRecurrence === 1 && (
                  <>
                    <Text style={gStyles.textInputTitle}>
                      {t("session:add.dateExpireAt")}
                    </Text>
                    <STGDatePicker
                      attr="dateExpireAt"
                      value={session.dateExpireAt}
                      handleChangeInput={_handleChangeInput}
                      t={t}
                      dateMode="date"
                      dateFormat="dddd, DD MMM YYYY"
                    />
                  </>
                )}
                <Text style={gStyles.textInputTitle}>
                  {t("session:add.timeStartAt")}
                </Text>
                <STGDatePicker
                  attr="timeStartAt"
                  value={new Date(session.timeStartAt)}
                  handleChangeInput={_handleChangeInput}
                  t={t}
                  dateMode="time"
                  dateFormat="HH:mm"
                />
                {/* duration */}
                <Text style={gStyles.textInputTitle}>
                  {t("common:duration")}
                </Text>
                <STGDurationPicker
                  hoursValue={session.durationHours || 0}
                  minutesValue={session.durationMinutes || 0}
                  hoursText={t("common:hours")}
                  minutesText={t("common:minutes")}
                  onHoursChangeValue={_handleDurationHoursChange}
                  onMinutesChangeValue={_handleDurationMinutesChange}
                />

                {session.hasRecurrence === 1 && (
                  <RecurrenceDays
                    _handleChangeInput={_handleChangeInput}
                    _renderDayFormat={_renderDayFormat}
                    daysError={daysError}
                    session={session}
                    t={t}
                  />
                )}
                {/* Country */}
                <Text style={gStyles.textInputTitle}>
                  {t("session:add.country")}
                </Text>
                <TextInput
                  defaultValue={session.country}
                  value={session.country}
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
                {countryError && (
                  <Text style={gStyles.helper}>{countryError}</Text>
                )}
                {/* City */}
                <Text style={gStyles.textInputTitle}>
                  {t("session:add.city")}
                </Text>
                <TextInput
                  defaultValue={session.city}
                  value={session.city}
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
                {/* Address */}
                <Text style={gStyles.textInputTitle}>
                  {t("session:add.address")}
                </Text>
                <TextInput
                  defaultValue={session.address}
                  value={session.address}
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
                {addressError && (
                  <Text style={gStyles.helper}>{addressError}</Text>
                )}
                {/* Location */}
                <Text style={gStyles.textInputTitle}>
                  {t("session:edit.locationTitle")}
                </Text>
                <TouchableOpacity
                  style={SessionEditStyle.dateContainer}
                  onPress={_handleShowMap}
                >
                  <View style={{ flexDirection: "row" }}>
                    <IconEntypo name="location-pin" size={16} />
                    <Text style={SessionEditStyle.dateEditBtnText}>
                      {t("session:edit.editLocation")}
                    </Text>
                  </View>
                  <MaterialIcons name="edit" size={18} color="#000000" />
                </TouchableOpacity>
                {/* Image */}
                {tmpFile ? (
                  <View style={SessionEditStyle.imageContainer}>
                    <TouchableOpacity
                      style={SessionEditStyle.imageBtnClose}
                      onPress={() => {
                        setTmpFile(null);
                        setRemoveImage(true);
                      }}
                    >
                      <FontAwesome name="close" size={28} />
                    </TouchableOpacity>
                    <FastImage
                      style={SessionEditStyle.image}
                      resizeMode={FastImage.resizeMode.contain}
                      source={{
                        uri: `${tmpFile.uri}`,
                        cache: FastImage.cacheControl.immutable,
                      }}
                    />
                    <TouchableOpacity
                      onPress={imagePicker}
                      style={{ marginVertical: 10 }}
                    >
                      <Text style={SessionEditStyle.imageSelectText}>
                        {t("event:add.imageSelect")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={SessionEditStyle.imageContainer}>
                    <View
                      style={[
                        SessionEditStyle.image,
                        SessionEditStyle.imageContainer,
                      ]}
                    >
                      <MaterialCommunityIcons
                        name="image-size-select-large"
                        size={100}
                        color="rgba(0,0,0,0.6)"
                      />
                    </View>
                    <TouchableOpacity
                      onPress={imagePicker}
                      style={{ marginVertical: 10 }}
                    >
                      <Text style={SessionEditStyle.imageSelectText}>
                        {t("event:add.imageSelect")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                <STGButton onPress={save} btnText={t("common:save")} />
              </STGScrollViewBody>
            </STGContainer>
          </STGScrollView>
        </STGContainer>
      </KeyboardAvoidingView>
      <Modal visible={showDate} transparent onRequestClose={_handleShowDate}>
        <SafeAreaView style={SessionEditStyle.dateModalContainer}>
          <TouchableOpacity
            style={SessionEditStyle.dateModalOut}
            onPressOut={_handleShowDate}
          >
            <TouchableWithoutFeedback>
              <>
                <View style={SessionEditStyle.dateModalBody}>
                  <TouchableOpacity
                    style={SessionEditStyle.dateModalSave}
                    onPress={_handleShowDate}
                  >
                    <Text style={SessionEditStyle.dateModalSaveText}>
                      {t("common:ok")}
                    </Text>
                  </TouchableOpacity>
                  <DateTimePicker
                    value={session.startAt || new Date()}
                    mode={"datetime"}
                    display="spinner"
                    onChange={setDate}
                    minimumDate={new Date()}
                    locale="fr-FR"
                  />
                </View>
                <TouchableOpacity
                  style={SessionEditStyle.dateModalCancel}
                  onPress={_handleShowDate}
                >
                  <Text style={SessionEditStyle.dateModalCancelText}>
                    {t("common:cancel")}
                  </Text>
                </TouchableOpacity>
              </>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
      <Modal visible={showMap} transparent onRequestClose={_handleShowMap}>
        <STGContainer>
          <View style={SessionEditStyle.mapHeader}>
            <TouchableOpacity
              style={SessionEditStyle.btnClose}
              onPress={_handleShowMap}
            >
              <FontAwesome name="close" size={30} />
            </TouchableOpacity>
          </View>
          <MapView
            provider={PROVIDER_DEFAULT}
            mapType={"standard"}
            initialRegion={{
              latitude: 43.133723,
              longitude: 5.922615,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
            onMapReady={_onMapReady}
            style={{
              flex: 1,
            }}
            cacheEnabled={false}
            showsUserLocation={true}
            showsMyLocationButton={true}
            toolbarEnabled={true}
            zoomControlEnabled={true}
            zoomEnabled={true}
            loadingEnabled={true}
            onPress={onMapPress}
            scrollEnabled={true}
          >
            {session.latitude && session.longitude && (
              <Marker
                coordinate={{
                  latitude: session.latitude,
                  longitude: session.longitude,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                }}
                pinColor={STGColors.container}
              />
            )}
          </MapView>
          <View style={SessionEditStyle.mapFooter} />
        </STGContainer>
      </Modal>
    </>
  );
}
