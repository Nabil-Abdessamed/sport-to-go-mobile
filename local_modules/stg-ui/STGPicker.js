import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginTop: 20,
  },
  itemTitle: {
    fontFamily: STGFonts.RobotoBold,
    fontSize: 12,
  },
  itemContainer: {
    width: subItemWidth,
    borderBottomColor: "rgba(rgba(0,0,0,0.2))",
    borderBottomWidth: 0.5,
  },
});

export class STGPicker extends Component {
  static propTypes = {
    value: PropTypes.string,
    data: PropTypes.oneOfType(
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.objectOf(PropTypes.string)
    ),
  };
  static defaultProps = {
    value: "",
    data: [],
  };
  render() {
    return (
      <View style={[styles.container, this.props.containerStyles]}>
        <View style={[styles.itemContainer, this.props.itemContainerStyles]}>
          <Text style={[styles.itemTitle, this.props.itemTitleStyle]}>
            {this.props.itemText}
          </Text>
          {this._renderSubItem()}
        </View>
      </View>
    );
  }
}

export default STGPicker;
