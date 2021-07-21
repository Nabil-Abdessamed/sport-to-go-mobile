import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import FastImage from "react-native-fast-image";
import { BASE_URL, getAuthorization } from "@config";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export class STGAvatarMessage extends Component {
  static propTypes = {
    avatar: PropTypes.any,
    width: PropTypes.number,
    height: PropTypes.number
  };
  static defaultProps = {
    avatar: null,
    width: 48,
    height: 48
  };
  render() {
    const styles = StyleSheet.create({
      container: {
        backgroundColor: "grey",
        borderWidth: 0.5,
        borderColor: "rgba(0,0,0,0.2)",
        marginHorizontal: 10,
        width: this.props.width,
        height: this.props.height,
        borderRadius: this.props.width
      }
    });
    return this.props.avatar ? (
      <FastImage
        source={{
          uri: `${BASE_URL}/images/${this.props.avatar}`,
          priority: FastImage.priority.high,
          headers: { Authorization: getAuthorization() },
          cache: FastImage.cacheControl.immutable
        }}
        style={styles.container}
        resizeMode={FastImage.resizeMode.cover}
        {...this.props}
      />
    ) : (
      <View
        style={{
          ...styles.container,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <MaterialIcons size={40} color="white" name="person" />
      </View>
    );
  }
}

export default STGAvatarMessage;
