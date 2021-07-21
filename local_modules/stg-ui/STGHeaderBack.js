import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./STGStyles";
import PropTypes from "prop-types";

export class STGHeaderBack extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="ios-arrow-back" size={30} color="rgba(0,0,0,0.8)" />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          {this.props.hasOptions && (
            <TouchableOpacity
              style={styles.headerBtn}
              onPress={() => this.props.onPressShowOptions()}
            >
              <MaterialCommunityIcons name="dots-vertical" size={30} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}
STGHeaderBack.propTypes = {
  onPressShowOptions: PropTypes.func,
  hasOptions: PropTypes.bool,
  action: PropTypes.func
};

STGHeaderBack.defaultProps = {
  onPressShowOptions: () => {},
  hasOptions: false,
  action: () => {}
};

export default STGHeaderBack;
