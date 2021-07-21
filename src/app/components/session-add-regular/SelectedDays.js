import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { STGDatePicker } from "stg-ui";

const Styles = StyleSheet.create({
  dayConatiner: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderTopColor: "rgba(0,0,0,0.5)",
    borderTopWidth: 0.5,
    minHeight: 50,
  },
  dayText: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
  },
  dayError: {
    fontFamily: "Roboto-Regular",
    fontSize: 12,
    color: "rgba(220,20,60,0.8)"
  }
});

export default function SelectedDays({
  t,
  data,
  handleChangeTimeStartAt,
  handleChangeTimeEndAt,
}) {
  return (
    <>
      {data &&
        Object.entries(data).map((item, key) =>
          item[1].value ? (
            <View style={Styles.dayConatiner} key={`selected-day-${key}`}>
              <Text style={Styles.dayText}>{t(`common:days.${item[0]}`)}</Text>
              <View
                style={{ flexDirection: "row", justifyContent: "space-evenly" }}
              >
                <STGDatePicker
                  attr="timeStartAt"
                  value={item[1].timeStartAt}
                  handleChangeInput={(_, date) =>
                    handleChangeTimeStartAt(_, date, item[0])
                  }
                  t={t}
                  dateMode="time"
                  dateFormat="HH:mm"
                />
                <STGDatePicker
                  attr="timeEndAt"
                  value={item[1].timeEndAt}
                  handleChangeInput={(_, date) =>
                    handleChangeTimeEndAt(_, date, item[0])
                  }
                  t={t}
                  dateMode="time"
                  dateFormat="HH:mm"
                  minimumDate={item[1].timeStartAt}
                />
              </View>
              {item[1].error && <Text style={Styles.dayError}>{t("validation:timeDiff")}</Text>}
            </View>
          ) : null
        )}
    </>
  );
}
