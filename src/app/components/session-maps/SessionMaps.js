import React, { useRef, useState } from "react";
import {
  Dimensions,
  Modal,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import STGContainer from "stg-ui/STGContainer";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Geolocation from "react-native-geolocation-service";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  button: {
    height: 48,
    width: 48,
    borderColor: "rgba(0,0,0,0.6)",
    borderWidth: 0.5,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  locationButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});

const types = {
  visible: false,
  onRequestClose: () => {},
  location: { latitude: null, longitude: null },
  regionLatitude: 43.133723,
  regionLongitude: 5.922615,
  onPressMap: () => {},
};

export default function SessionMaps(Props = types) {
  const mapRef = useRef();

  const onMapReady = () => {
    if (Platform.OS === "android") {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      )
        .then((granted) => {
          if (!granted) {
            Props.onRequestClose();
          }
        })
        .catch(() => {
          Props.onRequestClose();
        });
    }
  };

  const onPressMap = ({ nativeEvent: { coordinate } }) => {
    Props.onPressMap(coordinate);
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        Props.onPressMap(position.coords);
        mapRef.current.animateCamera(
          {
            center: position.coords,
          },
          { duration: 2000 }
        );
      },
      (_) => {},
      { enableHighAccuracy: true, maximumAge: 2000, timeout: 15000 }
    );
  };

  return (
    <Modal
      visible={Props.visible}
      onRequestClose={Props.onRequestClose}
      animationType="fade"
      transparent
    >
      <STGContainer>
        <MapView
          ref={mapRef}
          provider={PROVIDER_DEFAULT}
          mapType={"standard"}
          initialRegion={{
            latitude: Props.regionLatitude || 43.133723,
            longitude: Props.regionLongitude || 5.922615,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          onMapReady={onMapReady}
          style={Styles.container}
          cacheEnabled={false}
          toolbarEnabled={true}
          zoomControlEnabled={true}
          zoomEnabled={true}
          zoomTapEnabled={true}
          loadingEnabled={true}
          onPress={onPressMap}
          scrollEnabled={true}
        >
          {Props.location && (
            <Marker
              coordinate={{
                ...Props.location,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}
            />
          )}
        </MapView>
        <TouchableOpacity
          style={[Styles.button, Styles.closeButton]}
          onPress={Props.onRequestClose}
        >
          <MaterialCommunityIcons name="close" size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[Styles.button, Styles.locationButton]}
          onPress={getCurrentLocation}
        >
          <MaterialCommunityIcons name="map-marker-radius" size={24} />
        </TouchableOpacity>
      </STGContainer>
    </Modal>
  );
}
