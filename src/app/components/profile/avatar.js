import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import FastImage from "react-native-fast-image";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const defaultProps = {
  imageSource: "",
  hasCameraIcon: false,
  containerStyle: {},
  imageStyle: {},
  iconStyle: {}
};
const propTypes = {
  imageSource: PropTypes.string,
  hasCameraIcon: PropTypes.bool,
  containerStyle: PropTypes.object,
  imageStyle: PropTypes.object,
  iconStyle: PropTypes.object
};

class Avatar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      imageSource,
      hasCameraIcon,
      containerStyle,
      imageStyle,
      iconStyle
    } = this.props;
    return (
      <View style={{ ...styles.container, ...containerStyle }}>
        {imageSource && (
          <FastImage
            source={{ uri: imageSource }}
            style={{ ...styles.image, ...imageStyle }}
            resizeMode={"cover"}
          />
        )}
        {hasCameraIcon && (
          <MaterialIcons
            name={"photo-camera"}
            size={32}
            style={{ ...styles.icon, ...iconStyle }}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 20
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 120,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 0.5
  },
  icon: {
    position: "absolute",
    bottom: -5,
    right: -5
  }
});

Avatar.defaultProps = defaultProps;
Avatar.propTypes = propTypes;

export default Avatar;
