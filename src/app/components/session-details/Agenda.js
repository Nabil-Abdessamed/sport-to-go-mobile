import React, { useEffect, useState } from "react";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import moment from "moment";
import { View, Text } from "react-native";
import AgendaStyles from "./AgendaStyles";

export default function SessionAgenda() {
  const getRecurrenceDates = () => {
    const now = new Date("2020-08-28");
    const start = new Date("2020-08-01");
    const end = new Date("2020-09-30");
    const items = {};
    const days = Math.round(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
    for (let i = 1; i <= days; i++) {
      start.setDate(start.getDate() + 1);
      if (start.getDay() === 2 || start.getDay() === 4) {
        const key = moment(start).format("YYYY-MM-DD");
        Object.assign(items, {
          [key]: {
            selected: true,
            marked: true,
            selectedColor: now > start ? "red" : "green",
          },
        });
      }
    }
    return items;
  };

  useEffect(() => {
    getRecurrenceDates();
    return () => {};
  });

  return (
    <>
      <Agenda
        items={{
          "2020-09-12": [{ name: "item 1 - any js object", test: "test" }],
          "2020-09-13": [{ name: "item 2 - any js object", height: 80 }],
          "2020-09-14": [],
          "2020-09-15": [
            { name: "item 3 - any js object" },
            { name: "any js object" },
          ],
        }}
        renderItem={(item, firstItemInDay) => {
          return (
            <View style={AgendaStyles.itemContainer}>
              <View style={AgendaStyles.itemStyle}>
                <Text>{item.name}</Text>
                <Text>{item.test}</Text>
              </View>
            </View>
          );
        }}
        loadItemsForMonth={(month) => {}}
        onCalendarToggled={(calendarOpened) => {}}
        onDayPress={(day) => {}}
        onDayChange={(day) => {}}
        selected={"2020-09-10"}
        minDate={"2020-09-01"}
        maxDate={"2020-09-30"}
        renderDay={(day, item) => {
          return (
            <View style={AgendaStyles.dayContainer}>
              <View style={AgendaStyles.dayStyle}>
                <Text>{moment(day).format("DD")}</Text>
                <Text>{moment(day).format("MMM")}</Text>
              </View>
            </View>
          );
        }}
        renderKnob={() => {
          return <View style={AgendaStyles.knob} />;
        }}
        renderEmptyData={() => {
          return <View />;
        }}
        markedDates={{
          "2020-09-16": { selected: true, marked: true },
          "2020-09-17": { marked: true },
          "2020-09-18": { disabled: true },
        }}
        disabledByDefault={false}
        onRefresh={() => {}}
        refreshing={false}
        refreshControl={null}
      />
    </>
  );
}
