import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  Platform,
  PermissionsAndroid,
} from "react-native";
import { useSelector, shallowEqual } from "react-redux";
import { useTranslation } from "react-i18next";
import { STGContainer, STGButton } from "stg-ui";
import gStyles from "@components/styles";
import MapView, { PROVIDER_DEFAULT, Marker } from "react-native-maps";
import { useNavigation, useRoute } from "@react-navigation/native";
import _ from "lodash";

const { width, height } = Dimensions.get("screen");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function EventAddOne() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { params } = useRoute();
  // Props from Redux
  const { user } = useSelector((state) => state.auth, shallowEqual);
  // States
  const [event, setEvent] = useState({});
  const [showMap, setShowMap] = useState(false);

  const _onMapReady = () => {
    if (Platform.OS === "android") {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
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

  const next = () => {
    navigation.navigate("EventAddTwo", {
      event,
    });
  };

  useEffect(() => {
    const e = params && params.event && JSON.parse(params.event);
    e.latitude = user.latitude;
    e.longitude = user.longitude;
    setEvent(e);
    setTimeout(() => setShowMap(true), 1000);
  }, []);

  return (
    <STGContainer>
      <Text style={gStyles.sectionTitle}>{t("event:add.mapSelect")}</Text>
      {showMap ? (
        <MapView
          provider={PROVIDER_DEFAULT}
          mapType={"standard"}
          initialRegion={{
            latitude: event.latitude || 43.133723,
            longitude: event.longitude || 5.922615,
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
          {event.latitude && event.longitude && (
            <Marker
              coordinate={{
                latitude: event.latitude,
                longitude: event.longitude,
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
