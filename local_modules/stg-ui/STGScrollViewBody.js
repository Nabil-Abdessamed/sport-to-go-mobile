import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

export class STGScrollViewBody extends Component {
  render() {
    return (
      <View style={{ paddingHorizontal: 10, ...this.props.style }}>
        {this.props.children}
      </View>
    );
  }
}

STGScrollViewBody.propTypes = {
  style: PropTypes.object,
};
STGScrollViewBody.defaultProps = {
  style: {},
};

export default STGScrollViewBody;
