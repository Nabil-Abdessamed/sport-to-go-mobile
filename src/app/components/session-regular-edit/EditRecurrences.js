import React, { useEffect, useState } from "react";
import {
  Switch,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import lodash from "lodash";
import Moment from "moment";
import EditFormContainer from "./EditFormContainer";
import { STGDatePicker } from "stg-ui";

const Styles = StyleSheet.create({
  body: { padding: 10 },
  container: {
    padding: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0,0,0,0.5)",
    marginBottom: 32,
  },
  dayContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dayText: {
    fontFamily: "Roboto-Bold",
    fontSize: 24,
    textTransform: "capitalize",
  },
  daySwitch: {},
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  dayError: {
    fontFamily: "Roboto-Regular",
    fontSize: 12,
    color: "rgba(220,20,60,0.8)",
  },
});

const RecurrenceItem = ({
  dayName,
  dayValue,
  timeStartAt,
  timeEndAt,
  handleChangeTime,
  handleChangeValue,
  t,
  error,
}) => (
  <View style={Styles.container}>
    <View style={Styles.dayContainer}>
      <Text style={Styles.dayText}>{t(`common:days.${dayName}`)}</Text>
      <Switch
        value={dayValue}
        style={Styles.daySwitch}
        onValueChange={(value) => handleChangeValue(dayName, value)}
      />
    </View>
    <View style={Styles.timeContainer}>
      <STGDatePicker
        attr="timeStartAt"
        value={timeStartAt}
        handleChangeInput={(_, date) =>
          handleChangeTime(_, date, dayName, "timeStartAt")
        }
        t={t}
        dateMode="time"
        dateFormat="HH:mm"
      />
      <STGDatePicker
        attr="timeEndAt"
        value={timeEndAt}
        handleChangeInput={(_, date) =>
          handleChangeTime(_, date, dayName, "timeEndAt")
        }
        t={t}
        dateMode="time"
        dateFormat="HH:mm"
      />
    </View>
    {error && <Text style={Styles.dayError}>{t("validation:timeDiff")}</Text>}
  </View>
);

const initialProps = {
  data: null,
  t: () => {},
  navigation: {},
};

export default function SessionRegularEditRecurrence(props = initialProps) {
  const [data, setData] = useState(
    (props.data && JSON.parse(props.data)) || null
  );

  const handleChangeTime = (_, date, dayName, attr) => {
    const items = lodash.clone(data);
    const itemIndex = items.findIndex((i, k) => i.day === dayName);
    const item = items[itemIndex];
    item[attr] = date;
    setData(items);
  };

  const handleChangeValue = (dayName, value) => {
    const items = lodash.clone(data);
    const itemIndex = items.findIndex((i) => i.day === dayName);
    const item = items[itemIndex];
    item.value = value;
    setData(items);
  };

  const validate = () => {
    let errorsCount = 0;
    const validation = data.map((item, key) => {
      if (new Date(item.timeStartAt) > new Date(item.timeEndAt)) {
        errorsCount++;
        return { ...item, error: true };
      } else {
        return { ...item, error: false };
      }
    });
    setData(validation);
    return errorsCount;
  };

  const validateSelectedDay = () => {
    return data.some((item) => item.value);
  };

  const save = () => {
    const hasSelectedDay = validateSelectedDay();
    if (!hasSelectedDay) {
      Alert.alert("Oops !", props.t("validation:selectedDays"));
    } else {
      const hasError = validate();
      if (hasError === 0) {
        const formdata = data.map((item) => {
          return {
            day: item.day,
            value: item.value,
            timeStartAt: Moment(item.timeStartAt).format("HH:mm:ss"),
            timeEndAt: Moment(item.timeEndAt).format("HH:mm:ss"),
          };
        });
        props.onSaveButtonPress({ recurrences: formdata });
      }
    }
  };

  const renderValidTime = (time) => {
    return typeof time !== "object" ? new Date(time) : time;
  };

  return (
    <EditFormContainer navigation={props.navigation} onSaveButtonPress={save}>
      <ScrollView contentContainerStyle={Styles.body}>
        {data &&
          data.map((item, key) => (
            <RecurrenceItem
              key={`edit-recurrence-${key}`}
              dayName={item.day}
              dayValue={item.value}
              timeStartAt={renderValidTime(item.timeStartAt)}
              timeEndAt={renderValidTime(item.timeEndAt)}
              t={props.t}
              handleChangeTime={handleChangeTime}
              handleChangeValue={handleChangeValue}
              error={item.error}
            />
          ))}
      </ScrollView>
    </EditFormContainer>
  );
}
