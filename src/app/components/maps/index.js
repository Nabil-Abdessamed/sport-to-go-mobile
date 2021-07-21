import React, { Component } from "react";
import { View, Text, Dimensions, PermissionsAndroid } from "react-native";
import PropsType from "prop-types";
import MapView, { PROVIDER_DEFAULT, Marker } from "react-native-maps";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Loading } from "@components/loading";

const screen = Dimensions.get("screen");

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const defaultProps = {
  style: {},
  onPress: ({ nativeEvent }) => {},
  markers: {} | [],
  cacheEnabled: true,
  showsUserLocation: false,
  showsMyLocationButton: false,
  toolbarEnabled: false,
  zoomControlEnabled: false,
  zoomEnabled: false,
  loadingEnabled: false,
  scrollEnabled: true
};

const propsType = {
  style: PropsType.object,
  onPress: PropsType.func,
  markers: PropsType.object | PropsType.array | PropsType.func,
  cacheEnabled: PropsType.bool,
  showsUserLocation: PropsType.bool,
  showsMyLocationButton: PropsType.bool,
  toolbarEnabled: PropsType.bool,
  zoomControlEnabled: PropsType.bool,
  zoomEnabled: PropsType.bool,
  loadingEnabled: PropsType.bool,
  scrollEnabled: PropsType.bool
};

class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marign: 0
    };
    this._onMapReady = this._onMapReady.bind(this);
  }

  _onMapReady() {
    Platform.OS === "android" &&
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      ).then(granted => {
        this.setState({ margin: 0 });
      });
  }

  render() {
    const {
      style,
      onPress,
      markers,
      initialRegion = null,
      cacheEnabled = true,
      showsUserLocation = true,
      showsMyLocationButton = true,
      toolbarEnabled = true,
      zoomControlEnabled = true,
      zoomEnabled = true,
      loadingEnabled = true,
      scrollEnabled = true
    } = this.props;
    const { marign } = this.state;
    return (
      <MapView
        ref={ref => {
          this.map = ref;
        }}
        provider={PROVIDER_DEFAULT}
        initialRegion={
          initialRegion || {
            latitude: 43.133723,
            longitude: 5.922615,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }
        }
        onMapReady={this._onMapReady}
        style={{
          flex: 1,
          margin: marign,
          ...style
        }}
        cacheEnabled={cacheEnabled}
        showsUserLocation={showsUserLocation}
        showsMyLocationButton={showsMyLocationButton}
        toolbarEnabled={toolbarEnabled}
        zoomControlEnabled={zoomControlEnabled}
        zoomEnabled={zoomEnabled}
        loadingEnabled={loadingEnabled}
        onPress={onPress}
        scrollEnabled={scrollEnabled}
      >
        {markers || null}
      </MapView>
    );
  }
}

Maps.defaultProps = defaultProps;
Maps.propsType = propsType;

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation(["common", "event"], { withRef: true })(Maps));
