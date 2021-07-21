import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Dimensions,
  Modal,
  Platform,
  PermissionsAndroid,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { useTranslation } from "react-i18next";
import styles from "../event-details/style";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";
import { BASE_URL } from "@config";
import {
  STGContainer,
  STGButton,
  STGColors,
  STGImageZoom,
  STGScrollView,
  STGScrollViewBody,
  STGDatePicker,
} from "stg-ui";
import EventService from "@services/EventService";
import MapView, { PROVIDER_DEFAULT, Marker } from "react-native-maps";
import gStyles from "@components/styles";
import _ from "lodash";
import Validation from "../event-add/validation";
import ImagePicker from "react-native-image-picker";
import STGVideo from "stg-ui/STGVideo";
import { useNavigation, useRoute } from "@react-navigation/native";
import EventHelpers from "../event/Helpers";
const { width, height } = Dimensions.get("screen");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function EventEdit() {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const { params } = useRoute();
  // States
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [event, setEvent] = useState({});
  const [tmpFile, setTmpFile] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  const [activityError, setActivityError] = useState(null);
  const [dateError, setDateError] = useState(null);
  const [timeError, setTimeError] = useState(null);
  const [countryError, setCountryError] = useState(null);
  const [cityError, setCityError] = useState(null);
  const [addressError, setAddressError] = useState(null);
  const [removeImageFromEvent, setRemoveImageFromEvent] = useState(false);
  const [changedFile, setChangedFile] = useState(false);

  const { latitude, longitude } = event;
  const filetype = (tmpFile && tmpFile.type.substr(0, 5)) || null;

  const _onMapReady = () => {
    if (Platform.OS === "android") {
      setLoading(true);
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      ).then((granted) => {
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
    const e = _.clone(event);
    e.latitude = latitude;
    e.longitude = longitude;
    setEvent(e);
  };

  const _handleChangeInput = (key, value, callback = () => {}) => {
    const e = _.clone(event);
    e[key] = value;
    setEvent(e);
    callback();
  };

  const showInMap = () => {
    setShowMap(!showMap);
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
          setChangedFile(true);
        }
      }
    );
  };

  const save = async () => {
    const descriptionError = Validation.validateDescription(
      event.description,
      t
    );
    const activityError = Validation.validateAddress(event.activity, t);
    const addressError = Validation.validateAddress(event.address, t);
    const countryError = Validation.validateCountry(event.country, t);
    const cityError = Validation.validateCity(event.city, t);
    const dateError = Validation.validateDate(event.date.toString(), t);
    const timeError = Validation.validateDateDiff(
      event.timeStartAt,
      event.timeEndAt,
      t
    );
    const hasError =
      activityError ||
      descriptionError ||
      countryError ||
      cityError ||
      addressError ||
      dateError ||
      timeError;
    if (hasError) {
      setActivityError(activityError);
      setDescriptionError(descriptionError);
      setDateError(dateError);
      setTimeError(timeError);
      setCountryError(countryError);
      setCityError(cityError);
      setAddressError(addressError);
    } else {
      setLoading(true);
      const formdata = new FormData();
      if (tmpFile && changedFile) {
        formdata.append("file", tmpFile);
      } else {
        if (removeImageFromEvent) {
          formdata.append("removeFile", true);
        } else {
          formdata.append("removeFile", false);
        }
      }
      for (let e in event) {
        if (event[e] !== null) {
          if (e === "date") {
            formdata.append(e, moment(event[e]).format("YYYY-MM-DD"));
          } else if (e === "timeStartAt" || e === "timeEndAt") {
            formdata.append(e, moment(event[e]).format("HH:mm:ss"));
          } else {
            formdata.append(e, event[e]);
          }
        }
      }
      const { data, status } = await EventService.updateEventService(formdata);
      setLoading(false);
      if (_.inRange(status, 200, 300)) {
        EventHelpers.getEvents();
        navigation.navigate("Event");
        Alert.alert(t("event:edit.success"), t("event:edit.successMessage"));
      } else {
        Alert.alert(t("event:edit.error"), t("event:edit.errorMessage"));
      }
    }
  };

  const timeStringToDate = (time) => {
    if (time && typeof time === "string") {
      const hours = time.substr(0, 2);
      const minutes = time.substr(3, 2);
      const date = new Date();
      date.setHours(+hours);
      date.setMinutes(+minutes);
      return date;
    } else {
      return "";
    }
  };

  useEffect(() => {
    const e = { ...params.event };
    const tmpFile =
      (e.image && {
        uri: `${BASE_URL}/upload/events/${e.image}`,
        type: e.filetype,
      }) ||
      null;
    e.date = new Date(e.date);
    e.timeStartAt = timeStringToDate(e.timeStartAt);
    e.timeEndAt = timeStringToDate(e.timeEndAt);
    setTmpFile(tmpFile);
    setEvent(e);
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : undefined}
      >
        <STGContainer loading={loading}>
          <STGScrollView contentContainerStyle={{ paddingTop: 20 }}>
            <STGContainer>
              <STGScrollViewBody>
                <TextInput
                  autoCapitalize="none"
                  multiline
                  defaultValue={event.activity}
                  value={event.activity}
                  placeholder={t("event:add.activityPlaceholder")}
                  onChangeText={(text) => _handleChangeInput("activity", text)}
                  style={[
                    gStyles.textInput,
                    {
                      borderBottomColor: activityError
                        ? "rgba(220,20,60,0.8)"
                        : "rgba(0,0,0,0.2)",
                      marginTop: 20,
                    },
                  ]}
                />
                {activityError && (
                  <Text style={gStyles.helper}>{activityError}</Text>
                )}
                <TextInput
                  autoCapitalize="none"
                  multiline
                  defaultValue={event.description}
                  value={event.description}
                  placeholder={t("event:add.descriptionPlaceholder")}
                  onChangeText={(text) =>
                    _handleChangeInput("description", text)
                  }
                  style={[
                    gStyles.textInput,
                    {
                      borderBottomColor: descriptionError
                        ? "rgba(220,20,60,0.8)"
                        : "rgba(0,0,0,0.2)",
                      marginTop: 20,
                    },
                  ]}
                />
                {descriptionError && (
                  <Text style={gStyles.helper}>{descriptionError}</Text>
                )}
              </STGScrollViewBody>
              {tmpFile ? (
                <View
                  style={[
                    {
                      alignItems: "center",
                      justifyContent: "center",
                    },
                  ]}
                >
                  <TouchableOpacity
                    style={{
                      alignSelf: "flex-end",
                      marginBottom: 10,
                    }}
                    onPress={() => {
                      setTmpFile(null);
                      setRemoveImageFromEvent(true);
                    }}
                  >
                    <FontAwesome name="close" size={28} />
                  </TouchableOpacity>
                  {filetype === "image" && (
                    <STGImageZoom uri={tmpFile.uri} withZoom={true} />
                  )}
                  {filetype === "video" && (
                    <STGVideo source={{ uri: tmpFile.uri }} />
                  )}
                  <TouchableOpacity
                    onPress={imagePicker}
                    style={{ marginVertical: 10 }}
                  >
                    <Text style={styles.eventImageSelectText}>
                      {t("event:add.imageSelect")}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View
                  style={[{ alignItems: "center", justifyContent: "center" }]}
                >
                  <View
                    style={[
                      styles.eventImage,
                      { justifyContent: "center", alignItems: "center" },
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
                    <Text style={styles.eventImageSelectText}>
                      {t("event:add.imageSelect")}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              <STGScrollViewBody>
                <Text style={gStyles.textInputTitle}>
                  {t("event:add.date")}
                </Text>
                <STGDatePicker
                  attr="date"
                  value={event.date}
                  handleChangeInput={_handleChangeInput}
                  t={t}
                />
                {dateError && <Text style={gStyles.helper}>{dateError}</Text>}
                <STGDatePicker
                  attr="timeStartAt"
                  value={event.timeStartAt}
                  handleChangeInput={_handleChangeInput}
                  t={t}
                  dateMode="time"
                  dateFormat="HH:mm"
                />
                <STGDatePicker
                  attr="timeEndAt"
                  value={event.timeEndAt}
                  handleChangeInput={_handleChangeInput}
                  t={t}
                  dateMode="time"
                  locate={i18n.language}
                  dateFormat="HH:mm"
                />
                {timeError && <Text style={gStyles.helper}>{timeError}</Text>}

                <TextInput
                  autoCapitalize="none"
                  defaultValue={event.country}
                  value={event.country}
                  placeholder={t("common:countryPlaceholder")}
                  onChangeText={(text) => _handleChangeInput("country", text)}
                  style={[
                    gStyles.textInput,
                    {
                      borderBottomColor: countryError
                        ? "rgba(220,20,60,0.8)"
                        : "rgba(0,0,0,0.2)",
                      marginTop: 20,
                    },
                  ]}
                />
                {countryError && (
                  <Text style={gStyles.helper}>{countryError}</Text>
                )}
                <TextInput
                  autoCapitalize="none"
                  defaultValue={event.city}
                  value={event.city}
                  placeholder={t("common:cityPlaceholder")}
                  onChangeText={(text) => _handleChangeInput("city", text)}
                  style={[
                    gStyles.textInput,
                    {
                      borderBottomColor: cityError
                        ? "rgba(220,20,60,0.8)"
                        : "rgba(0,0,0,0.2)",
                      marginTop: 20,
                    },
                  ]}
                />
                {cityError && <Text style={gStyles.helper}>{cityError}</Text>}
                <TextInput
                  autoCapitalize="none"
                  defaultValue={event.address}
                  value={event.address}
                  placeholder={t("event:add.addressPlaceholder")}
                  onChangeText={(text) => _handleChangeInput("address", text)}
                  style={[
                    gStyles.textInput,
                    {
                      borderBottomColor: addressError
                        ? "rgba(220,20,60,0.8)"
                        : "rgba(0,0,0,0.2)",
                      marginTop: 20,
                    },
                  ]}
                />
                {addressError && (
                  <Text style={gStyles.helper}>{addressError}</Text>
                )}
                <TouchableOpacity style={styles.card} onPress={showInMap}>
                  <MaterialCommunityIcons
                    name="google-maps"
                    size={28}
                    color="#000000"
                  />
                  <Text style={styles.editMapText}>
                    {t("event:edit.editLocation")}
                  </Text>
                </TouchableOpacity>
              </STGScrollViewBody>
              <STGButton onPress={save} btnText={t("common:save")} />
            </STGContainer>
          </STGScrollView>
        </STGContainer>
      </KeyboardAvoidingView>
      <Modal visible={showMap} transparent onRequestClose={showInMap}>
        <STGContainer>
          <View style={styles.mapHeader}>
            <TouchableOpacity style={styles.btnClose} onPress={showInMap}>
              <FontAwesome name="close" size={30} />
            </TouchableOpacity>
          </View>
          {showMap && (
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
              {latitude && longitude && (
                <Marker
                  coordinate={{
                    latitude,
                    longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                  }}
                  pinColor={STGColors.container}
                />
              )}
              {event.latitude && event.longitude && (
                <Marker
                  coordinate={{
                    latitude: event.latitude,
                    longitude: event.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                  }}
                  draggable={true}
                  pinColor={"green"}
                />
              )}
            </MapView>
          )}
          <View style={styles.mapFooter} />
        </STGContainer>
      </Modal>
    </>
  );
}
