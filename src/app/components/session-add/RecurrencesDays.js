import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import gStyles from "@components/styles";
import styles from "./style";
import * as Animatable from "react-native-animatable";

const RecurrenceDays = ({
  session,
  _renderDayFormat,
  _handleChangeInput,
  daysError,
  t,
}) => {
  return (
    <Animatable.View animation="fadeIn" duration={500} easing="ease-in-out">
      <View style={styles.viewPadding}>
        <Text style={gStyles.textInputTitle}>
          {t("session:add.chooseDays")}
        </Text>
      </View>

      <View style={styles.days}>
        <TouchableOpacity
          style={[styles.day, session.monday.value ? styles.daySelected : null]}
          onPress={() => _handleChangeInput("monday", !session.monday.value)}
        >
          <Text
            style={[
              styles.dayText,
              session.monday.value ? styles.dayTextSelected : null,
            ]}
          >
            {_renderDayFormat(t("common:days.monday"))}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.day, session.tuesday.value ? styles.daySelected : null]}
          onPress={() => _handleChangeInput("tuesday", !session.tuesday.value)}
        >
          <Text
            style={[
              styles.dayText,
              session.tuesday.value ? styles.dayTextSelected : null,
            ]}
          >
            {_renderDayFormat(t("common:days.tuesday"))}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.day, session.wednesday.value ? styles.daySelected : null]}
          onPress={() => _handleChangeInput("wednesday", !session.wednesday.value)}
        >
          <Text
            style={[
              styles.dayText,
              session.wednesday.value ? styles.dayTextSelected : null,
            ]}
          >
            {_renderDayFormat(t("common:days.wednesday"))}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.day, session.thursday.value ? styles.daySelected : null]}
          onPress={() => _handleChangeInput("thursday", !session.thursday.value)}
        >
          <Text
            style={[
              styles.dayText,
              session.thursday.value ? styles.dayTextSelected : null,
            ]}
          >
            {_renderDayFormat(t("common:days.thursday"))}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.day, session.friday.value ? styles.daySelected : null]}
          onPress={() => _handleChangeInput("friday", !session.friday.value)}
        >
          <Text
            style={[
              styles.dayText,
              session.friday.value ? styles.dayTextSelected : null,
            ]}
          >
            {_renderDayFormat(t("common:days.friday"))}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.day, session.saturday.value ? styles.daySelected : null]}
          onPress={() => _handleChangeInput("saturday", !session.saturday.value)}
        >
          <Text
            style={[
              styles.dayText,
              session.saturday.value ? styles.dayTextSelected : null,
            ]}
          >
            {_renderDayFormat(t("common:days.saturday"))}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.day, session.sunday.value ? styles.daySelected : null]}
          onPress={() => _handleChangeInput("sunday", !session.sunday.value)}
        >
          <Text
            style={[
              styles.dayText,
              session.sunday.value ? styles.dayTextSelected : null,
            ]}
          >
            {_renderDayFormat(t("common:days.sunday"))}
          </Text>
        </TouchableOpacity>
      </View>
      {daysError && <Text style={gStyles.helper}>{daysError}</Text>}
    </Animatable.View>
  );
};

export default RecurrenceDays;
