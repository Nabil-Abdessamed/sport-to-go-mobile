import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { STGFonts, STGColors } from "stg-ui";

const styles = StyleSheet.create({
  container: {
    margin: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 220,
  },
  day: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2,
    backgroundColor: "#C3C3C3",
    borderRadius: 6,
  },
  daySelected: {
    backgroundColor: STGColors.container,
  },
  dayText: {
    fontFamily: STGFonts.RobotoBold,
    color: "#4E4E4E",
  },
  daySelectedText: {
    color: "#FFF",
  },
});

export class Recurrences extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderDayLetter = (day = "") => {
    return day.substr(0, 1).toUpperCase();
  };

  render() {
    const { days, t } = this.props;
    return (
      <View style={styles.container}>
        <View
          style={[styles.day, days.monday === 1 ? styles.daySelected : null]}
        >
          <Text
            style={[
              styles.dayText,
              days.monday === 1 ? styles.daySelectedText : null,
            ]}
          >
            {this.renderDayLetter(t("common:days.monday"))}
          </Text>
        </View>
        <View
          style={[styles.day, days.tuesday === 1 ? styles.daySelected : null]}
        >
          <Text
            style={[
              styles.dayText,
              days.tuesday === 1 ? styles.daySelectedText : null,
            ]}
          >
            {this.renderDayLetter(t("common:days.tuesday"))}
          </Text>
        </View>
        <View
          style={[styles.day, days.wednesday === 1 ? styles.daySelected : null]}
        >
          <Text
            style={[
              styles.dayText,
              days.wednesday === 1 ? styles.daySelectedText : null,
            ]}
          >
            {this.renderDayLetter(t("common:days.wednesday"))}
          </Text>
        </View>
        <View
          style={[styles.day, days.thursday === 1 ? styles.daySelected : null]}
        >
          <Text
            style={[
              styles.dayText,
              days.thursday === 1 ? styles.daySelectedText : null,
            ]}
          >
            {this.renderDayLetter(t("common:days.thursday"))}
          </Text>
        </View>
        <View
          style={[styles.day, days.friday === 1 ? styles.daySelected : null]}
        >
          <Text
            style={[
              styles.dayText,
              days.friday === 1 ? styles.daySelectedText : null,
            ]}
          >
            {this.renderDayLetter(t("common:days.friday"))}
          </Text>
        </View>
        <View
          style={[styles.day, days.saturday === 1 ? styles.daySelected : null]}
        >
          <Text
            style={[
              styles.dayText,
              days.saturday === 1 ? styles.daySelectedText : null,
            ]}
          >
            {this.renderDayLetter(t("common:days.saturday"))}
          </Text>
        </View>
        <View
          style={[styles.day, days.sunday === 1 ? styles.daySelected : null]}
        >
          <Text
            style={[
              styles.dayText,
              days.sunday === 1 ? styles.daySelectedText : null,
            ]}
          >
            {this.renderDayLetter(t("common:days.sunday"))}
          </Text>
        </View>
      </View>
    );
  }
}
