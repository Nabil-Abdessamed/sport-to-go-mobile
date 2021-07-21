import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import STGFonts from "./STGFonts";
import PropTypes from "prop-types";
import { Picker } from "@react-native-community/picker";

function range(from, to) {
  return Array.from(Array(to), (_, i) => {
    return i + from < 10 ? `0${i + from}` : `${i + from}`;
  });
}

function renderNumberItem(item) {
  return item < 10 ? `0${item}` : `${item}`;
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", marginVertical: 20 },
  durationTitle: {
    fontFamily: STGFonts.RobotoBold,
    fontSize: 12,
  },
  durationContainer: { flex: 1 },
  itemStyle: {
    fontFamily: "Roboto-Bold",
    fontSize: 18,
  },
});

export class STGDurationPicker extends Component {
  _handleSelectHours = (value) => {
    this.setState({ hours: Number(value) }, () => {
      this.props.onHoursChangeValue(Number(value));
    });
  };

  _handleSelectMinutes = (value) => {
    this.setState({ minutes: Number(value) }, () => {
      this.props.onMinutesChangeValue(Number(value));
    });
  };

  _renderHours = () => {
    const hours = range(this.props.hoursFrom, this.props.hoursTo);
    const items = hours.map((item, key) => (
      <Picker.Item key={`hours-item-${key}`} label={item} value={item} />
    ));
    return (
      <Picker
        selectedValue={renderNumberItem(this.props.hoursValue)}
        onValueChange={this._handleSelectHours}
        mode="dropdown"
        itemStyle={styles.itemStyle}
      >
        {items}
      </Picker>
    );
  };

  _renderMinutes = () => {
    const minutes = range(this.props.minutesFrom, this.props.minutesTo);
    const items = minutes.map((item, key) => (
      <Picker.Item key={`minutes-item-${key}`} label={item} value={item} />
    ));
    return (
      <Picker
        selectedValue={renderNumberItem(this.props.minutesValue)}
        onValueChange={this._handleSelectMinutes}
        mode="dropdown"
        itemStyle={styles.itemStyle}
      >
        {items}
      </Picker>
    );
  };

  render() {
    return (
      <View style={[styles.container, this.props.containerStyles]}>
        <View style={[styles.durationContainer, this.props.hoursContainer]}>
          <Text style={styles.durationTitle}>{this.props.hoursText}</Text>
          {this._renderHours()}
        </View>
        <View style={styles.durationContainer}>
          <Text style={styles.durationTitle}>{this.props.minutesText}</Text>
          {this._renderMinutes()}
        </View>
      </View>
    );
  }
}

STGDurationPicker.propTypes = {
  hoursValue: PropTypes.number.isRequired,
  minutesValue: PropTypes.number.isRequired,
  onHoursChangeValue: PropTypes.func,
  onMinutesChangeValue: PropTypes.func,
  hoursFrom: PropTypes.number,
  hoursTo: PropTypes.number,
  minutesFrom: PropTypes.number,
  minutesTo: PropTypes.number,
  hoursText: PropTypes.string,
  minutesText: PropTypes.string,
  containerStyles: PropTypes.object,
  hoursContainer: PropTypes.object,
  minutesContainer: PropTypes.object,
};

STGDurationPicker.defaultProps = {
  hoursValue: 0,
  minutesValue: 0,
  onHoursChangeValue: () => {},
  onMinutesChangeValue: () => {},
  hoursFrom: 0,
  hoursTo: 24,
  minutesFrom: 0,
  minutesTo: 60,
  hoursText: "Heures",
  minutesText: "Minutes",
  containerStyles: {},
  hoursContainer: {},
  minutesContainer: {},
};

export default STGDurationPicker;
