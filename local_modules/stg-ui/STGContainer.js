import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  ActivityIndicator,
  Text,
} from "react-native";
import PropTypes from "prop-types";
import STGColors from "./STGColors";
import STGFonts from "./STGFonts";

class STGContainer extends Component {
  static propTypes = {
    containerStyle: PropTypes.object,
    bodyStyle: PropTypes.object,
    loading: PropTypes.bool,
    loadingText: PropTypes.string,
  };
  static defaultProps = {
    containerStyle: {},
    bodyStyle: {},
    loading: false,
    loadingText: "",
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      children,
      containerStyle,
      bodyStyle,
      loading,
      loadingText,
    } = this.props;
    return (
      <SafeAreaView
        style={{
          ...styles.container,
          ...containerStyle,
        }}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="rgba(255,255,255,0.6)" />
            {loadingText != null && (
              <Text style={styles.loadingText}>{loadingText}</Text>
            )}
          </View>
        ) : (
          <View
            style={{
              ...styles.body,
              ...bodyStyle,
            }}
          >
            {children}
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: STGColors.container,
  },
  body: {
    flex: 1,
    backgroundColor: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "rgba(rgba(255,255,255,0.6))",
    fontFamily: STGFonts.RobotoLight,
    marginTop: 20,
  },
});

export default STGContainer;
