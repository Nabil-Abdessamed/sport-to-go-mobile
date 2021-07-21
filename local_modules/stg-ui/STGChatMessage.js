import React, { Component } from "react";
import { Text, View, Dimensions } from "react-native";
import PropTypes from "prop-types";
const { width } = Dimensions.get("screen");

export class STGChatMessage extends Component {
  static propTypes = {
    avatar: PropTypes.any,
    isLeft: PropTypes.bool,
    text: PropTypes.string,
    headers: PropTypes.object
  };
  static defaultProps = {
    avatar: "",
    isLeft: false,
    text: "",
    haeders: {}
  };
  render() {
    return (
      <View
        style={{
          flexDirection: this.props.isLeft ? "row" : "row-reverse",
          marginVertical: 5
        }}
      >
        <View
          style={{
            backgroundColor: this.props.isLeft
              ? "rgba(236, 121, 38, 0.1)"
              : "white",
            borderRadius: 10,
            borderColor: "rgba(0,0,0,0.2)",
            borderWidth: 0.5,
            padding: 10,
            justifyContent: "center",
            maxWidth: width - 78
          }}
        >
          <Text
            style={{
              color: "black",
              fontSize: 14,
              fontWeight: "500",
              letterSpacing: 1
            }}
          >
            {this.props.text}
          </Text>
        </View>
      </View>
    );
  }
}

export default STGChatMessage;
