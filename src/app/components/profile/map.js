import React, { Component } from "react";
import {
  View,
  Text,
  PermissionsAndroid,
  Platform,
  Modal,
  Dimensions,
  TouchableOpacity
} from "react-native";
import MapView, { PROVIDER_DEFAULT, Marker } from "react-native-maps";
import { STGColors, STGContainer, STGButton } from "stg-ui";
import Ionicons from "react-native-vector-icons/Ionicons";
const { width, height } = Dimensions.get("screen");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapMargin: 2,
      latitude: null,
      longitude: null
    };
  }

  _onMapReady = () => {
    if (Platform.OS === "android") {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      ).then(granted => {
        if (granted) {
          this.setState({ mapMargin: 0 });
        }
      });
    }
  };

  _onMapPress = ({
    nativeEvent: {
      coordinate: { latitude, longitude }
    }
  }) => {
    this.setState({ latitude, longitude });
  };

  componentDidMount() {}

  render() {
    const { t } = this.props;
    return (
      <Modal
        visible={this.props.showModalMap}
        animated
        animationType="fade"
        transparent
        onRequestClose={() => {
          this.setState({ latitude: null, longitude: null }, () => {
            this.props.handleShowModalMap();
          });
        }}
      >
        <STGContainer>
          <View
            style={{
              height: 54,
              width,
              backgroundColor: STGColors.container
            }}
          >
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: 54,
                width: 54
              }}
              onPress={() => {
                this.setState({ latitude: null, longitude: null }, () => {
                  this.props.handleShowModalMap();
                });
              }}
            >
              <Ionicons name="ios-arrow-back" size={30} />
            </TouchableOpacity>
          </View>
          <MapView
            ref={ref => {
              this.map = ref;
            }}
            provider={PROVIDER_DEFAULT}
            mapType={"standard"}
            initialRegion={{
              latitude: this.props.latitude || this.state.latitude || 43.133723,
              longitude:
                this.props.longitude || this.state.longitude || 5.922615,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA
            }}
            onMapReady={this._onMapReady}
            onPress={this._onMapPress}
            style={{
              flex: 1,
              margin: this.state.mapMargin
            }}
            followsUserLocation={true}
            showsMyLocationButton={true}
            showsUserLocation={true}
            zoomControlEnabled={true}
            zoomEnabled={true}
            zoomTapEnabled={true}
          >
            {this.props.latitude && this.props.longitude && (
              <Marker
                coordinate={{
                  latitude: this.props.latitude,
                  longitude: this.props.longitude,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA
                }}
                pinColor={STGColors.container}
              />
            )}
            {this.state.latitude && this.state.longitude && (
              <Marker
                coordinate={{
                  latitude: this.state.latitude,
                  longitude: this.state.longitude,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA
                }}
                pinColor={STGColors.success}
              />
            )}
          </MapView>
          <STGButton
            btnText={t("common:ok")}
            onPress={() => {
              if (this.state.latitude && this.state.longitude) {
                this.props.handleChangeLocation(
                  this.state.latitude,
                  this.state.longitude,
                  this.props.handleShowModalMap
                );
              } else {
                this.props.handleShowModalMap();
              }
            }}
          />
        </STGContainer>
      </Modal>
    );
  }
}

export default MapProfile;
