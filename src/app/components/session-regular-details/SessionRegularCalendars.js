import React, { useEffect, useState } from "react";
import { CalendarList } from "react-native-calendars";
import Moment from "moment";
import { STGColors } from "stg-ui";

const initialProps = {
  session: null,
  onDayPress: () => {},
};

export default function SessionRegularCalendars(props = initialProps) {
  const { session } = props;
  const [markedDates, setMarkedDates] = useState(null);

  const getDaysIndexes = () => {
    const indexes = [];
    if (session.sunday) indexes.push(0);
    if (session.monday) indexes.push(1);
    if (session.tuesday) indexes.push(2);
    if (session.wednesday) indexes.push(3);
    if (session.thursday) indexes.push(4);
    if (session.friday) indexes.push(5);
    if (session.saturday) indexes.push(6);
    return indexes;
  };

  const getRecurrenceDates = () => {
    const start = new Date(session.dateStartAt);
    const end = new Date(session.dateExpireAt);
    const items = {};
    const days = Math.round(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
    const indexes = getDaysIndexes();
    const tmp = start;
    for (let i = 0; i < days; i++) {
      tmp.setDate(tmp.getDate() + 1);
      if (indexes.includes(tmp.getDay())) {
        const key = Moment(start).format("YYYY-MM-DD");
        Object.assign(items, {
          [key]: {
            selected: true,
            selectedColor: STGColors.container,
          },
        });
      }
    }
    setMarkedDates(items);
  };

  const onDayPress = (day) => {
    const markedDate = markedDates[day.dateString];
    if (markedDate && markedDate.selected) {
      props.onDayPress(day);
    } else {
      props.onDayPress(null);
    }
  };

  useEffect(() => {
    getRecurrenceDates();
  }, [session]);

  const renderDateFormat = (d = undefined) => {
    return Moment(d ? new Date(d) : new Date()).format("YYYY-MM-DD");
  };

  return markedDates ? (
    <CalendarList
      horizontal={true}
      pagingEnabled={true}
      current={renderDateFormat(session.dateStartAt)}
      minDate={renderDateFormat(session.dateStartAt)}
      maxDate={renderDateFormat(session.dateExpireAt)}
      selected={renderDateFormat()}
      onDayPress={onDayPress}
      markedDates={markedDates}
      monthFormat={"MMMM yyyy"}
      hideArrows={false}
      hideExtraDays={true}
      firstDay={1}
      enableSwipeMonths={true}
      theme={{
        backgroundColor: "#ffffff",
        calendarBackground: "#ffffff",
        textSectionTitleColor: "#000",
        textSectionTitleDisabledColor: "#d9e1e8",
        selectedDayBackgroundColor: "#00adf5",
        selectedDayTextColor: "#ffffff",
        todayTextColor: "#00adf5",
        dayTextColor: "#2d4150",
        textDisabledColor: "#d9e1e8",
        dotColor: "#FFF",
        selectedDotColor: "#FFF",
        arrowColor: "#000000",
        disabledArrowColor: "#d9e1e8",
        monthTextColor: "#000",
        indicatorColor: "blue",
        textDayFontWeight: "300",
        textMonthFontWeight: "bold",
        textDayHeaderFontWeight: "300",
        textDayFontSize: 16,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 14,
      }}
    />
  ) : null;
}
