import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";
import STGColors from "./STGColors";
import PropTypes from "prop-types";
import STGFonts from "./STGFonts";

class STGText extends Component {
  static propTypes = {
    textStyle: PropTypes.object,
    size: PropTypes.number,
    text: PropTypes.string,
    color: PropTypes.string,
    weight: PropTypes.string
  };
  static defaultProps = {
    textStyle: {},
    size: 14,
    text: "",
    color: STGColors.text,
    weight: "200"
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const styles = {
      color: this.props.color,
      fontSize: this.props.size,
      fontFamily: STGFonts.RobotoRegular,
      fontWeight: this.props.weight
    };
    return (
      <Text
        style={{ ...styles, ...this.props.textStyle }}
        {...this.props}
      >
        {this.props.text}
      </Text>
    );
  }
}

export default STGText;
