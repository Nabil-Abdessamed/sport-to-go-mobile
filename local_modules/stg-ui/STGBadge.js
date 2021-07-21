import React, { Component } from "react";
import { Text, View } from "react-native";
import STGColors from "./STGColors";
import PropTypes from "prop-types";

export class STGBadge extends Component {
  static propTypes = {
    backgroundColor: PropTypes.string,
    containerStyle: PropTypes.object
  };
  static defaultProps = {
    backgroundColor: STGColors.badgeDefaultBackground,
    containerStyle: {}
  };
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View
        style={{
          height: 20,
          width: 20,
          borderRadius: 10,
          backgroundColor: this.props.backgroundColor,
          padding: 2,
          justifyContent: "center",
          alignItems: "center",
          ...this.props.containerStyle
        }}
        {...this.props}
      >
        {this.props.children}
      </View>
    );
  }
}

export default STGBadge;
