import React from "react";
import { View, Text } from "react-native";
import { STGColors } from "stg-ui";
import Styles from "./SessionRegularStyles";

const initialProps = {
  item: null,
  t: () => {},
  isGrid: false,
};

const Day = ({ day = "", selected = false, isGrid = false }) => (
  <View
    style={[
      Styles.dayRecurrence,
      { backgroundColor: selected ? STGColors.container : "#C3C3C3" },
      isGrid ? { height: 20, width: 20 } : null,
    ]}
  >
    <Text
      style={[
        Styles.dayRecurrenceText,
        { color: selected ? "#FFF" : "#000" },
        isGrid ? { fontSize: 12 } : null,
      ]}
    >
      {day[0].toUpperCase()}
    </Text>
  </View>
);

export default function SessionRegularItemRecurrences(props = initialProps) {
  const { item, t } = props;
  return (
    <View style={Styles.dayRecurrenceContainer}>
      {item ? (
        <>
          {Object.entries(item).map((day, key) => (
            <Day
              day={t(`common:days.${day[0]}`)}
              selected={day[1]}
              key={`day-recurrence-key-${key}`}
              isGrid={props.isGrid}
            />
          ))}
        </>
      ) : null}
    </View>
  );
}
