import React, { Component, useState, useEffect } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  PermissionsAndroid,
  Alert,
} from "react-native";
import { withTranslation, useTranslation } from "react-i18next";
import { connect, useSelector, shallowEqual, useDispatch } from "react-redux";
import gStyles from "@components/styles";
import _ from "lodash";
import MapView, { PROVIDER_DEFAULT, Marker } from "react-native-maps";
import { STGButton, STGContainer, STGHeaderBack } from "stg-ui";
import { setCreateSession } from "@redux/actions";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("screen");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function SessionAddMap() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // Props form redux
  const { session } = useSelector((state) => state.session, shallowEqual);
  const { user } = useSelector((state) => state.auth, shallowEqual);
  // States
  const [showMap, setShowMap] = useState(false);
  const [mapMargin, setMapMargin] = useState(0);
  const [position, setPosition] = useState({
    latitude: null,
    longitude: null,
  });

  const next = () => {
    const { latitude, longitude } = position;
    if (latitude && longitude) {
      const s = session;
      s.latitude = latitude;
      s.longitude = longitude;
      dispatch(setCreateSession(s));
    }
    navigation.navigate("SessionAddFile");
  };

  const _onMapReady = () => {
    if (Platform.OS === "android") {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      ).then((granted) => {
        if (granted) {
          setMapMargin(5);
        }
      });
    }
  };

  const onMapPress = ({
    nativeEvent: {
      coordinate: { latitude, longitude },
    },
  }) => {
    const p = _.clone(position);
    p.latitude = latitude;
    p.longitude = longitude;
    setPosition(p);
  };

  useEffect(() => {
    const p = _.clone(position);
    const { latitude, longitude } = user;
    if (latitude !== null && longitude !== null) {
      p.latitude = latitude || null;
      p.longitude = longitude || null;
      setPosition(p);
    }
    setTimeout(() => setShowMap(true), 1000);
  }, []);

  const { latitude, longitude } = position;

  return (
    <STGContainer>
      <Text style={gStyles.sectionTitle}>{t("session:add.locationTitle")}</Text>
      {showMap ? (
        <MapView
          provider={PROVIDER_DEFAULT}
          mapType={"standard"}
          initialRegion={{
            latitude: latitude || 43.133723,
            longitude: longitude || 5.922615,
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
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}
            />
          )}
        </MapView>
      ) : (
        <View style={{ flex: 1 }} />
      )}
      <STGButton onPress={next} btnText={t("common:next")} />
    </STGContainer>
  );
}
