import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  PermissionsAndroid,
  Button,
  Switch,
} from "react-native";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import styles from "./style";
import gStyles from "@components/styles";
import _ from "lodash";
import JwtDecode from "jwt-decode";
import { updateUserProfileService, updateUserAvatarService } from "@services";
import { getToken, getUserInfo } from "@redux/actions";
import { BASE_URL } from "@config";
import {
  STGContainer,
  STGButton,
  STGColors,
  STGDatePicker,
  STGAvatar,
  STGScrollView,
  STGScrollViewBody,
} from "stg-ui";
import moment from "moment";
import { ProfileDto } from "./profile.dto";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import IconEntypo from "react-native-vector-icons/Entypo";
import {
  validateFullname,
  validatePhone,
  validateBirthdate,
} from "./validation";
import {
  validateCountry,
  validateCity,
  validateAddress,
  validatePoste,
} from "../structure/validation";
import MapView, { PROVIDER_DEFAULT, Marker } from "react-native-maps";
import SessionEditStyle from "../styles/SessionEditStyle";
import MapProfile from "./map";
import ImagePicker from "react-native-image-picker";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import HeaderRight from "./HeaderRight";
import SwitchComponent from "./SwitchComponent";

const { width, height } = Dimensions.get("screen");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function Profile() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  navigation.setOptions({
    headerRight: () => <HeaderRight save={save} title={t("common:save")} />,
  });
  // Props from Redux
  const { user } = useSelector((state) => state.auth, shallowEqual);
  // States
  const [avatar, setAvatar] = useState(null);
  const [avatarHasChanged, setAvatarHasChanged] = useState(false);
  const [tmpFile, setTmpFile] = useState(null);
  const [profile, setProfile] = useState({});
  const [fullnameError, setFullnameError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const [birthdateError, setBirthdateError] = useState(null);
  const [countryError, setCountryError] = useState(null);
  const [cityError, setCityError] = useState(null);
  const [addressError, setAddressError] = useState(null);
  const [postalCodeError, setPostalCodeError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [showModalMap, setShowModalMap] = useState(false);
  const [changed, setChanged] = useState(false);

  const _handleTextInputChange = (property, value) => {
    const p = _.clone(profile);
    p[property] = value;
    setProfile(p);
    if (changed) {
      setChanged(true);
    }
  };

  const save = async () => {
    const fullnameError = validateFullname(profile.fullname, t);
    const phoneError = validatePhone(profile.phone, t);
    const birthdateError = validateBirthdate(profile.birthdate.toString(), t);
    const countryError = validateCountry(profile.country, t);
    const cityError = validateCity(profile.city, t);
    const addressError = validateAddress(profile.address, t);
    const postalCodeError = validatePoste(profile.postalCode, t);
    const hasError =
      fullnameError ||
      phoneError ||
      birthdateError ||
      countryError ||
      cityError ||
      addressError ||
      postalCodeError ||
      null;
    if (hasError !== null) {
      setFullnameError(fullnameError);
      setPhoneError(phoneError);
      setBirthdateError(birthdateError);
      setCountryError(countryError);
      setCityError(cityError);
      setAddressError(addressError);
      setPostalCodeError(postalCodeError);
    } else {
      setFullnameError(null);
      setPhoneError(null);
      setBirthdateError(null);
      setCountryError(null);
      setCityError(null);
      setAddressError(null);
      setPostalCodeError(null);
      setLoading(true);
      setLoadingText(t("mySpace:editProfile.loadingText"));
      const requestData = {
        ...profile,
        birthdate: moment(profile.birthdate).format("YYYY-MM-DD"),
      };
      delete requestData.iat;
      const { data, status } = await updateUserProfileService(requestData);
      setLoading(false);
      setLoadingText("");
      if (_.inRange(status, 200, 300)) {
        dispatch(getToken(data.token));
        const user = JwtDecode(data.token);
        dispatch(getUserInfo(user));
        Alert.alert(
          t("mySpace:editProfile.success"),
          t("mySpace:editProfile.successMessage"),
          [
            {
              text: "Ok",
            },
          ]
        );
      } else {
        Alert.alert(
          t("mySpace:editProfile.error"),
          t("mySpace:editProfile.errorMessage"),
          [{ text: t("common:cancel") }, { text: t("common:tryAgain") }]
        );
      }
    }
  };

  const saveAvatar = async () => {
    setLoading(true);
    setLoadingText(t("mySpace:avatar.loadingText"));
    if (!tmpFile) return null;
    const formdata = new FormData();
    formdata.append("file", tmpFile);
    const { data, status } = await updateUserAvatarService(formdata);
    setLoading(false);
    setLoadingText("");
    if (_.inRange(status, 200, 300)) {
      dispatch(getToken(data.token));
      const user = JwtDecode(data.token);
      dispatch(getUserInfo(user));
      setAvatarHasChanged(false);
      setAvatar(user.avatar);
      Alert.alert(
        t("mySpace:avatar.success"),
        t("mySpace:avatar.successMessage"),
        [
          {
            text: t("common:ok"),
          },
        ]
      );
    } else {
      Alert.alert(t("mySpace:avatar.error"), t("mySpace:avatar.errorMessage"), [
        {
          text: t("common:ok"),
        },
      ]);
    }
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
          if (!avatarHasChanged) {
            setAvatarHasChanged(true);
          }
        }
      }
    );
  };

  const _onMapReady = () => {
    if (Platform.OS === "android") {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
    }
  };

  const handleShowModalMap = () => {
    setShowModalMap(!showModalMap);
  };

  const handleChangeLocation = (latitude, longitude, callback) => {
    const p = _.clone(profile);
    p.latitude = latitude;
    p.longitude = longitude;
    setProfile(p);
    if (callback) {
      callback();
    }
  };

  const onFieldVisibleValueChange = (key, value) => {
    _handleTextInputChange(key, value);
  };

  useFocusEffect(
    useCallback(() => {
      const profile = new ProfileDto({
        ...user,
        birthdate:
          (user.birthdate && new Date(user.birthdate)) ||
          new Date("2000-01-01"),
        emailVisible: user.emailVisible === 1 ? true : false,
        phoneVisible: user.phoneVisible === 1 ? true : false,
        birthdateVisible: user.birthdateVisible === 1 ? true : false,
        countryVisible: user.countryVisible === 1 ? true : false,
        cityVisible: user.cityVisible === 1 ? true : false,
        addressVisible: user.addressVisible === 1 ? true : false,
        postalCodeVisible: user.postalCodeVisible === 1 ? true : false,
        locationVisible: user.locationVisible === 1 ? true : false,
      });
      setAvatar(user.avatar);
      setProfile(profile);
    }, [])
  );

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
                <View style={styles.avatarContainer}>
                  <TouchableOpacity onPress={imagePicker}>
                    <View>
                      {avatarHasChanged && tmpFile ? (
                        <STGAvatar uri={tmpFile.uri} size={100} />
                      ) : (
                        <STGAvatar
                          uri={`${BASE_URL}/upload/avatars/${avatar}`}
                          size={100}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                  {!avatarHasChanged && (
                    <MaterialIcons
                      style={styles.cameraIcon}
                      name={"photo-camera"}
                      size={32}
                    />
                  )}
                  {avatarHasChanged && (
                    <Button title={t("common:save")} onPress={saveAvatar} />
                  )}
                </View>
                <Text style={styles.sectionTitle}>
                  {t("common:myInformation")}
                </Text>
                <Text style={styles.textInputTitle}>
                  {t("mySpace:editProfile.name")}
                </Text>
                <TextInput
                  defaultValue={profile.fullname}
                  value={profile.fullname}
                  style={{
                    ...gStyles.textInput,
                    borderBottomColor: fullnameError
                      ? "rgba(220,20,60,0.8)"
                      : "rgba(0,0,0,0.2)",
                  }}
                  placeholder={t("mySpace:editProfile.namePlaceholder")}
                  onChangeText={(value) =>
                    _handleTextInputChange("fullname", value)
                  }
                  textContentType="name"
                />
                {fullnameError && (
                  <Text style={gStyles.helper}>{fullnameError}</Text>
                )}
                <Text style={styles.textInputTitle}>{t("common:email")}</Text>
                <TextInput
                  defaultValue={profile.email}
                  value={profile.email}
                  style={{
                    ...gStyles.textInput,
                    borderBottomColor: "rgba(0,0,0,0.2)",
                  }}
                  editable={false}
                />
                <SwitchComponent
                  fieldName="emailVisible"
                  fieldValue={profile.emailVisible}
                  onFieldVisibleValueChange={onFieldVisibleValueChange}
                  title={t("mySpace:visibility.email")}
                />
                <Text style={styles.textInputTitle}>
                  {t("mySpace:editProfile.phoneNumber")}
                </Text>
                <TextInput
                  defaultValue={profile.phone}
                  value={profile.phone}
                  style={{
                    ...gStyles.textInput,
                    borderBottomColor: phoneError
                      ? "rgba(220,20,60,0.8)"
                      : "rgba(0,0,0,0.2)",
                  }}
                  placeholder={t("mySpace:editProfile.phoneNumberPlaceholder")}
                  onChangeText={(value) =>
                    _handleTextInputChange("phone", value)
                  }
                  textContentType="telephoneNumber"
                  keyboardType="phone-pad"
                  autoCompleteType="tel"
                />
                <SwitchComponent
                  fieldName="phoneVisible"
                  fieldValue={profile.phoneVisible}
                  onFieldVisibleValueChange={onFieldVisibleValueChange}
                  title={t("mySpace:visibility.phone")}
                />
                {phoneError && <Text style={gStyles.helper}>{phoneError}</Text>}
                <Text style={styles.textInputTitle}>
                  {t("mySpace:editProfile.birthdate")}
                </Text>
                <STGDatePicker
                  attr="birthdate"
                  value={profile.birthdate}
                  handleChangeInput={_handleTextInputChange}
                  t={t}
                  dateFormat="DD MMMM YYYY"
                  locate={i18n.language}
                />
                <SwitchComponent
                  fieldName="birthdateVisible"
                  fieldValue={profile.birthdateVisible}
                  onFieldVisibleValueChange={onFieldVisibleValueChange}
                  title={t("mySpace:visibility.birthdate")}
                />
                {birthdateError && (
                  <Text style={gStyles.helper}>{birthdateError}</Text>
                )}
                <Text style={styles.sectionTitle}>{t("common:aboutMe")}</Text>
                <Text style={styles.textInputTitle}>
                  {t("mySpace:editProfile.description")}
                </Text>
                <TextInput
                  multiline={true}
                  defaultValue={profile.description}
                  value={profile.description}
                  style={{
                    ...gStyles.textInput,
                    height: 96,
                    borderBottomColor: "rgba(0,0,0,0.2)",
                  }}
                  placeholder={t("mySpace:editProfile.descriptionPlaceholder")}
                  onChangeText={(value) =>
                    _handleTextInputChange("description", value)
                  }
                />
                <Text style={styles.sectionTitle}>{t("common:myAddress")}</Text>
                {/* Country  */}
                <Text style={gStyles.textInputTitle}>
                  {t("common:country")}
                </Text>
                <TextInput
                  defaultValue={profile.country || ""}
                  value={profile.country || ""}
                  style={{
                    ...gStyles.textInput,
                    borderBottomColor: countryError
                      ? "rgba(220,20,60,0.8)"
                      : "rgba(0,0,0,0.2)",
                  }}
                  placeholder={t("common:countryPlaceholder")}
                  onChangeText={(value) => {
                    _handleTextInputChange("country", value);
                    const countryError = validateCountry(value, t);
                    setCountryError(countryError);
                  }}
                />
                <SwitchComponent
                  fieldName="countryVisible"
                  fieldValue={profile.countryVisible}
                  onFieldVisibleValueChange={onFieldVisibleValueChange}
                  title={t("mySpace:visibility.country")}
                />
                {countryError && (
                  <Text style={gStyles.helper}>{countryError}</Text>
                )}
                {/* City  */}
                <Text style={gStyles.textInputTitle}>{t("common:city")}</Text>
                <TextInput
                  defaultValue={profile.city || ""}
                  value={profile.city || ""}
                  style={{
                    ...gStyles.textInput,
                    borderBottomColor: cityError
                      ? "rgba(220,20,60,0.8)"
                      : "rgba(0,0,0,0.2)",
                  }}
                  placeholder={t("common:cityPlaceholder")}
                  onChangeText={(value) => {
                    _handleTextInputChange("city", value);
                    const cityError = validateCity(value, t);
                    setCityError(cityError);
                  }}
                />
                <SwitchComponent
                  fieldName="cityVisible"
                  fieldValue={profile.cityVisible}
                  onFieldVisibleValueChange={onFieldVisibleValueChange}
                  title={t("mySpace:visibility.city")}
                />
                {cityError && <Text style={gStyles.helper}>{cityError}</Text>}
                {/* Address  */}
                <Text style={gStyles.textInputTitle}>
                  {t("common:address")}
                </Text>
                <TextInput
                  defaultValue={profile.address || ""}
                  value={profile.address || ""}
                  style={{
                    ...gStyles.textInput,
                    borderBottomColor: addressError
                      ? "rgba(220,20,60,0.8)"
                      : "rgba(0,0,0,0.2)",
                  }}
                  placeholder={t("common:addressPlaceholder")}
                  onChangeText={(value) => {
                    _handleTextInputChange("address", value);
                    const addressError = validateAddress(value, t);
                    setAddressError(addressError);
                  }}
                />
                <SwitchComponent
                  fieldName="addressVisible"
                  fieldValue={profile.addressVisible}
                  onFieldVisibleValueChange={onFieldVisibleValueChange}
                  title={t("mySpace:visibility.address")}
                />
                {addressError && (
                  <Text style={gStyles.helper}>{addressError}</Text>
                )}
                <Text style={gStyles.textInputTitle}>
                  {t("common:postalCode")}
                </Text>
                <TextInput
                  defaultValue={profile.postalCode || ""}
                  value={profile.postalCode || ""}
                  style={{
                    ...gStyles.textInput,
                    borderBottomColor: addressError
                      ? "rgba(220,20,60,0.8)"
                      : "rgba(0,0,0,0.2)",
                  }}
                  placeholder={t("common:postalCodePlaceholder")}
                  onChangeText={(value) => {
                    _handleTextInputChange("postalCode", value);
                    const postalCodeError = validatePoste(value, t);
                    setPostalCodeError(postalCodeError);
                  }}
                />
                <SwitchComponent
                  fieldName="postalCodeVisible"
                  fieldValue={profile.postalCodeVisible}
                  onFieldVisibleValueChange={onFieldVisibleValueChange}
                  title={t("mySpace:visibility.postalCode")}
                />
                {postalCodeError && (
                  <Text style={gStyles.helper}>{postalCodeError}</Text>
                )}
                <Text style={gStyles.sectionTitle}>
                  {t("common:myLocation")}
                </Text>
                <TouchableOpacity
                  style={SessionEditStyle.dateContainer}
                  onPress={handleShowModalMap}
                >
                  <View style={{ flexDirection: "row" }}>
                    <IconEntypo name="location-pin" size={16} />
                    <Text style={SessionEditStyle.dateEditBtnText}>
                      {t("common:editLocation")}
                    </Text>
                  </View>
                  <MaterialIcons name="edit" size={18} color="#000000" />
                </TouchableOpacity>
                {profile.latitude && profile.longitude && (
                  <View style={{ height: 200, marginBottom: 100 }}>
                    <MapView
                      provider={PROVIDER_DEFAULT}
                      mapType={"standard"}
                      initialRegion={{
                        latitude: profile.latitude,
                        longitude: profile.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                      }}
                      onMapReady={_onMapReady}
                      style={{
                        flex: 1,
                      }}
                    >
                      {profile.latitude && profile.longitude && (
                        <Marker
                          coordinate={{
                            latitude: profile.latitude,
                            longitude: profile.longitude,
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGITUDE_DELTA,
                          }}
                          pinColor={STGColors.container}
                        />
                      )}
                    </MapView>
                    <SwitchComponent
                      fieldName="locationVisible"
                      fieldValue={profile.locationVisible}
                      onFieldVisibleValueChange={onFieldVisibleValueChange}
                      title={t("mySpace:visibility.location")}
                    />
                  </View>
                )}
              </STGScrollViewBody>
            </STGContainer>
          </STGScrollView>
        </STGContainer>
      </KeyboardAvoidingView>
      <MapProfile
        t={t}
        handleShowModalMap={handleShowModalMap}
        showModalMap={showModalMap}
        handleChangeLocation={handleChangeLocation}
        latitude={profile.latitude}
        longitude={profile.longitude}
      />
    </>
  );
}
