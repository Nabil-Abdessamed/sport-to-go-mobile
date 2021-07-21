import React, { Component } from "react";
import { Text, View, Picker, StyleSheet, Dimensions } from "react-native";
import STGFonts from "./STGFonts";
import PropTypes from "prop-types";

const subItemWidth = Dimensions.get("screen").width / 2 - 40;

function range(from, to) {
  return Array.from(Array(to), (_, i) => {
    return i + from < 10 ? `0${i + from}` : `${i + from}`;
  });
}

function renderNumberItem(item) {
  return item < 10 ? `0${item}` : `${item}`;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginTop: 20
  },
  itemTitle: {
    fontFamily: STGFonts.RobotoBold,
    fontSize: 12
  },
  itemContainer: {
    width: subItemWidth,
    borderBottomColor: "rgba(rgba(0,0,0,0.2))",
    borderBottomWidth: 0.5
  }
});

export class STGNumberPicker extends Component {
  constructor(props) {
    super(props);
  }

  _handleSelectItemValue = value => {
    this.setState({ itemValue: Number(value) }, () => {
      this.props.onChangeValue(Number(value));
    });
  };

  _renderSubItem = () => {
    const data = range(this.props.from, this.props.to);
    const items = data.map((item, key) => (
      <Picker.Item key={`item-${key}`} label={item} value={item} />
    ));
    return (
      <Picker
        selectedValue={renderNumberItem(this.props.itemValue)}
        onValueChange={this._handleSelectItemValue}
        mode="dropdown"
      >
        {items}
      </Picker>
    );
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

STGNumberPicker.propTypes = {
  itemValue: PropTypes.number.isRequired,
  onChangeValue: PropTypes.func,
  from: PropTypes.number,
  to: PropTypes.number,
  itemText: PropTypes.string,
  containerStyles: PropTypes.object,
  itemContainerStyles: PropTypes.object,
  itemTitleStyle: PropTypes.object
};

STGNumberPicker.defaultProps = {
  itemValue: 0,
  onChangeValue: () => {},
  from: 0,
  to: 99,
  itemText: "",
  containerStyles: {},
  itemContainerStyles: {},
  itemTitleStyle: {}
};

export default STGNumberPicker;
