import React, { Component } from "react";
import { View, Text, Platform, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import STGColors from "./STGColors";

class STGCard extends Component {
  static propTypes = {
    containerStyle: PropTypes.object
  };
  static defaultProps = {
    containerStyle: {}
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{ ...styles.container, ...this.props.containerStyle }}>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 48,
    backgroundColor: STGColors.cardBg,
    padding: 5,
    marginVertical: 10,
    ...Platform.select({
      android: {
        elevation: 2
      },
      ios: {
        shadowColor: "rgba(0,0,0,0.5)",
        shadowOffset: {
          height: 0.5,
          width: 0.5
        },
        shadowOpacity: 0.2,
        shadowRadius: 2
      }
    })
  }
});

export default STGCard;
