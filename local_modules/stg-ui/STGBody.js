import React, { Component } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import STGColors from "./STGColors";
import STGFonts from "./STGFonts";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    backgroundColor: "#fff"
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: STGColors.container,
    justifyContent: "center",
    alignItems: "center"
  },
  loadingText: {
    fontFamily: STGFonts.RobotoMedium,
    fontSize: 14,
    color: "rgba(rgba(255,255,255,0.6))"
  }
});

export class STGBody extends Component {
  render() {
    return this.props.loading ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="rgba(255,255,255,0.6)" />
        {this.props.loadingText !== "" && (
          <Text style={styles.loadingText}>{this.props.loadingText}</Text>
        )}
      </View>
    ) : (
      <View style={styles.bodyContainer}>{this.props.children}</View>
    );
  }
}

STGBody.propTypes = {
  loading: PropTypes.bool,
  loadingText: PropTypes.string
};

STGBody.defaultProps = {
  loading: false,
  loadingText: ""
};

export default STGBody;
