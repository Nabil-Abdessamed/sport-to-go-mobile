import React, { Component } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import STGCard from "./STGCard";
import STGText from "./STGText";

class STGInfo extends Component {
  static propTypes = {
    text1: PropTypes.string || PropTypes.number,
    text2: PropTypes.string || PropTypes.number,
    text1Style: PropTypes.object,
    text2Style: PropTypes.object
  };
  static defaultProps = {
    text1: "",
    text2: "",
    text1Style: {},
    text2Style: {}
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <STGCard>
        <STGText weight="500" size={14} text={this.props.text1} />
        <STGText
          textStyle={{ marginTop: 10, marginLeft: 10 }}
          weight="400"
          size={14}
          text={this.props.text2}
        />
      </STGCard>
    );
  }
}

export default STGInfo;
