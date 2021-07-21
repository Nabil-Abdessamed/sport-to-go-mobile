import React, { Component } from "react";
import {
  Dimensions,
  Platform,
  PermissionsAndroid,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Alert,
  Linking,
  Text,
} from "react-native";
import MapView, { PROVIDER_DEFAULT, Marker, Callout } from "react-native-maps";
import PropTypes from "prop-types";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import STGColors from "./STGColors";
import STGContainer from "./STGContainer";
import Geolocation from "react-native-geolocation-service";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  mapBtnClose: {
    height: 48,
    width: 48,
    borderColor: "rgba(0,0,0,0.5)",
    borderWidth: 0.5,
    borderRadius: 30,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 10,
    right: 10,
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
  myLocationButton: {
    bottom: 10,
    right: 10,
  },
  centerButton: {
    bottom: 68,
    right: 10,
  },
  openMapsButton: {
    bottom: 128,
    right: 10,
  },
});

export class STGPictoMap extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    regionLatitude: PropTypes.number.isRequired,
    regionLongitude: PropTypes.number.isRequired,
    hideMap: PropTypes.func.isRequired,
    markers: PropTypes.arrayOf(
      PropTypes.exact({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        title: PropTypes.string,
        description: PropTypes.string,
      })
    ),
    onMapPress: PropTypes.func,
  };
  static defaultProps = {
    show: false,
    regionLatitude: 43.133723,
    regionLongitude: 5.922615,
    hideMap: () => {},
    markers: [],
    onMapPress: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      myLocation: null,
    };
  }

  _onMapReady = () => {
    if (Platform.OS === "android") {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      ).then((granted) => {
        if (!granted) {
          this.setState({
            show: false,
          });
        }
      });
    }
  };

  _getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        this.setState(
          {
            myLocation: { latitude, longitude },
          },
          () => {
            this.map.animateCamera(
              {
                center: { latitude, longitude },
              },
              { duration: 2000 }
            );
          }
        );
      },
      (error) => {
        Alert.alert("", "");
      },
      { enableHighAccuracy: true, maximumAge: 2000, timeout: 15000 }
    );
  };

  getInitialRegion = () => {
    this.map.animateToRegion(
      {
        latitude: this.props.regionLatitude,
        longitude: this.props.regionLongitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      2000
    );
  };

  openExternalMaps = () => {
    const { latitude, longitude, title } = this.props.markers[0];
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q=",
    });
    const latLng = `${latitude},${longitude}`;
    const label = title || "";
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    Linking.openURL(url);
  };

  render() {
    return (
      <Modal
        visible={this.props.show}
        transparent
        onRequestClose={this.props.hideMap}
        animated
        animationType="fade"
      >
        <STGContainer>
          <MapView
            ref={(ref) => {
              this.map = ref;
            }}
            provider={PROVIDER_DEFAULT}
            mapType={"standard"}
            initialRegion={{
              latitude: this.props.regionLatitude,
              longitude: this.props.regionLongitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
            onMapReady={this._onMapReady}
            style={styles.container}
            cacheEnabled={false}
            toolbarEnabled={true}
            zoomControlEnabled={true}
            zoomEnabled={true}
            zoomTapEnabled={true}
            loadingEnabled={true}
            onPress={this.props.onMapPress}
            scrollEnabled={true}
          >
            {this.props.markers.length > 0 &&
              this.props.markers.map((item, key) => (
                <Marker
                  key={`map-marker-index-${key}`}
                  coordinate={{
                    latitude: item.latitude,
                    longitude: item.longitude,
                  }}
                  title={item.title !== "" ? item.title : null}
                  description={
                    item.description !== "" ? item.description : null
                  }
                />
              ))}
            {this.state.myLocation && (
              <Marker
                coordinate={{
                  latitude: this.state.myLocation.latitude,
                  longitude: this.state.myLocation.longitude,
                }}
              />
            )}
          </MapView>
          <TouchableOpacity
            style={styles.mapBtnClose}
            onPress={this.props.hideMap}
          >
            <FontAwesome name="close" size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.myLocationButton]}
            onPress={this._getCurrentLocation}
          >
            <MaterialCommunityIcons name="map-marker-radius" size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.centerButton]}
            onPress={this.getInitialRegion}
          >
            <MaterialCommunityIcons name="home-map-marker" size={24} />
          </TouchableOpacity>
          {this.props.latitude && this.props.longitude && (
            <TouchableOpacity
              style={[styles.button, styles.openMapsButton]}
              onPress={this.openExternalMaps}
            >
              <MaterialCommunityIcons name="google-maps" size={24} />
            </TouchableOpacity>
          )}
        </STGContainer>
      </Modal>
    );
  }
}

export default STGPictoMap;
