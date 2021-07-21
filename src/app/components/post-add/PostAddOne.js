import React, { Component } from "react";
import {
  View,
  Text,
  PermissionsAndroid,
  Platform,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import gStyles from "@components/styles";
import { STGContainer, STGHeaderBack, STGButton, STGColors } from "stg-ui";
import MapView, { PROVIDER_DEFAULT, Marker } from "react-native-maps";

const { width, height } = Dimensions.get("screen");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export class PostAddOne extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    showMap: false,
    mapMargin: 0,
    post: {}
  };

  _onMapReady = () => {
    if (Platform.OS === "android") {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      ).then(granted => {
        if (granted) {
          this.setState({ mapMargin: 2 });
        }
      });
    }
  };

  onMapPress = ({
    nativeEvent: {
      coordinate: { latitude, longitude }
    }
  }) => {
    const post = this.state.post;
    post.latitude = latitude;
    post.longitude = longitude;
    this.setState({ post });
  };

  next = () => {
    const { navigation } = this.props;
    navigation.navigate("PostAddTwo", {
      post: this.state.post,
      onGoBack: navigation.getParam("onGoBack")
    });
  };

  componentDidMount() {
    const post = this.props.navigation.getParam("post", {});
    this.setState({ post });
    setTimeout(() => this.setState({ showMap: true }), 1000);
  }

  render() {
    const {
      navigation,
      screenProps: { t }
    } = this.props;
    const { showMap, post } = this.state;
    const { latitude, longitude } = post;
    return (
      <STGContainer>
        <STGHeaderBack
          navigation={navigation}
          title={t("post:add.headerTitle")}
        />

        <Text style={gStyles.sectionTitle}>{t("post:add.mapSelect")}</Text>
        {showMap ? (
          <MapView
            ref={ref => {
              this.map = ref;
            }}
            provider={PROVIDER_DEFAULT}
            mapType={"standard"}
            initialRegion={{
              latitude: 43.133723,
              longitude: 5.922615,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA
            }}
            onMapReady={this._onMapReady}
            style={{
              flex: 1
            }}
            cacheEnabled={false}
            showsUserLocation={true}
            showsMyLocationButton={true}
            toolbarEnabled={true}
            zoomControlEnabled={true}
            zoomEnabled={true}
            loadingEnabled={true}
            onPress={this.onMapPress}
            scrollEnabled={true}
          >
            {latitude && longitude && (
              <Marker
                coordinate={{
                  latitude,
                  longitude,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA
                }}
              />
            )}
          </MapView>
        ) : (
          <View style={{ flex: 1 }} />
        )}
        <STGButton onPress={this.next} btnText={t("common:next")} />
      </STGContainer>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation([])(PostAddOne));
