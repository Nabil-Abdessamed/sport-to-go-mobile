import React, { useCallback, useEffect, useRef } from "react";
import {
  Dimensions,
  Platform,
  PermissionsAndroid,
  StyleSheet,
} from "react-native";
import MapView, { PROVIDER_DEFAULT, Marker } from "react-native-maps";
import * as Animatable from "react-native-animatable";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const { width } = Dimensions.get("window");
const defaultHeight = width * 0.5625;

const ASPECT_RATIO = width / defaultHeight;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const styles = StyleSheet.create({
  container: {
    width,
    height: defaultHeight,
    marginVertical: 10,
  },
  emptyContainer: {
    width,
    height: defaultHeight,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 0.2,
    borderRadius: 4,
  },
  fullscreenBtn: {
    position: "absolute",
    bottom: 15,
    right: 5,
  },
  closeBtn: {
    position: "absolute",
    top: 15,
    right: 5,
  },
});

export default function STGPictoMap({
  regionLatitude = null,
  regionLongitude = null,
  latitude = null,
  longitude = null,
  onPressFullscreen = null,
  onPressCloseButton = null,
}) {
  const mapRef = useRef(null);

  const _onMapReady = () => {
    if (Platform.OS === "android") {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
    }
  };

  useEffect(
    useCallback(() => {
      if (latitude && longitude) {
        mapRef.current.setCamera({
          center: { latitude, longitude },
        });
      }
    }, [latitude, longitude])
  );

  return latitude && longitude ? (
    <Animatable.View
      duration={1000}
      easing="ease-in-back"
      animation="fadeIn"
      style={styles.container}
    >
      <MapView
        ref={mapRef}
        provider={PROVIDER_DEFAULT}
        mapType={"standard"}
        initialRegion={{
          latitude: regionLatitude || latitude,
          longitude: regionLongitude || longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        onMapReady={_onMapReady}
        style={[styles.container]}
        scrollEnabled={false}
      >
        {latitude && longitude && (
          <Marker
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
          />
        )}
      </MapView>
      {onPressFullscreen && (
        <MaterialIcons
          name={"zoom-out-map"}
          size={30}
          onPress={onPressFullscreen}
          style={styles.fullscreenBtn}
        />
      )}
      {onPressCloseButton && (
        <MaterialIcons
          name={"close"}
          size={30}
          onPress={onPressCloseButton}
          style={styles.closeBtn}
        />
      )}
    </Animatable.View>
  ) : null;
}
