import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  DatePickerIOS,
  DatePickerAndroid,
  TimePickerAndroid
} from "react-native";
import moment from "moment";
import { STGFonts } from "stg-ui";

function renderDateFormat(date) {
  return moment(date).format("DD/MM/YYYY");
}

function renderTimeFormat(time) {
  return moment(time).format("HH:mm");
}

export const STGDateTimePicketIOS = ({
  attr,
  date = new Date(),
  onDateChange = () => {},
  minimumDate = null
}) => (
  <DatePickerIOS
    date={date}
    onDateChange={newDate => onDateChange(newDate, attr)}
    locale={"fr"}
    mode={"datetime"}
    style={styles.iosContainer}
    minimumDate={minimumDate}
  />
);

export async function openSTGDatePickerAndroid({
  handleDateSelected = () => {},
  attr
}) {
  try {
    const { action, year, month, day } = await DatePickerAndroid.open({
      date: new Date(),
      mode: "calendar"
    });
    if (action !== DatePickerAndroid.dismissedAction) {
      handleDateSelected({ year, month, day, attr });
      return { year, month, day };
    }
  } catch (error) {
    return error;
  }
}

export async function openSTGTimePickerAndroid({ handleTimeSelected, attr }) {
  try {
    const { action, hour, minute } = await TimePickerAndroid.open({
      hour: 12,
      minute: 0,
      is24Hour: true,
      mode: "clock"
    });
    if (action !== TimePickerAndroid.dismissedAction) {
      handleTimeSelected({ hour, minute, attr });
      return { hour, minute };
    }
  } catch (error) {
    return error;
  }
}

export const STGDateDateTimePickerAndroid = ({
  dateSelected = null,
  handleDateSelected = () => {},
  handleTimeSelected = () => {},
  attr
}) => (
  <View style={styles.androidContainer}>
    <TouchableOpacity
      onPress={() =>
        openSTGDatePickerAndroid({
          handleDateSelected,
          attr
        })
      }
      style={{
        flex: 2,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Text style={styles.text}>
        {(dateSelected && renderDateFormat(dateSelected)) || "--/--/----"}
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => openSTGTimePickerAndroid({ handleTimeSelected, attr })}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Text style={styles.text}>
        {(dateSelected && renderTimeFormat(dateSelected)) || "--:--"}
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  androidContainer: {
    flex: 1,
    height: 48,
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.8)",
    borderColor: "rgba(255,255,255,0.5)",
    borderWidth: 1,
    borderRadius: 6
  },
  iosContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderColor: "rgba(255,255,255,0.5)",
    borderWidth: 1,
    borderRadius: 6
  },
  text: {
    fontFamily: STGFonts.RobotoRegular,
    fontSize: 16,
    color: "white"
  }
});
