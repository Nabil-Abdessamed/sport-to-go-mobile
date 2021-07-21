import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import gStyles from "@components/styles";
import styles from "./style";
import { SessionDto } from "./session.dto";
import _ from "lodash";
import { setCreateSession } from "@redux/actions";
import {
  STGButton,
  STGContainer,
  STGDatePicker,
  STGScrollView,
  STGScrollViewBody,
  STGDurationPicker,
} from "stg-ui";
import Validation from "./validation";
import Ionicons from "react-native-vector-icons/Ionicons";
import Foundation from "react-native-vector-icons/Foundation";
import * as Animatable from "react-native-animatable";
import RecurrenceDays from "./RecurrencesDays";
import { useNavigation } from "@react-navigation/native";

const days = [
  "sunday",
  "monday",
  "truesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export default function SessionAddDate() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { t } = useTranslation();
  // Props from redux
  const sessionProps = useSelector(
    (state) => state.session.session,
    shallowEqual
  );
  // States
  const [dateStartAtError, setDateStartAtError] = useState(null);
  const [dateExpireAtError, setDateExpireAtError] = useState(null);
  const [timeStartAtError, setTimeStartAtError] = useState(null);
  const [daysError, setDaysError] = useState(null);
  const [hasRecurrence, setHasRecurrence] = useState(false);
  const [session, setSession] = useState({});

  const _renderDayFormat = (day) => {
    return day.substr(0, 1).toUpperCase();
  };

  const _renderHoursMinutes = (item) => {
    return item < 10 ? `0${item}` : item;
  };

  const _handleDurationHoursChange = (value) => {
    _handleChangeInput("durationHours", Number(value));
  };

  const _handleDurationMinutesChange = (value) => {
    _handleChangeInput("durationMinutes", Number(value));
  };

  const next = () => {
    const dateStartAtError = Validation.validateStartAt(
      session.dateStartAt.toString(),
      t
    );
    let dateExpireAtError = null;
    let daysError = null;
    if (session.hasRecurrence) {
      dateExpireAtError = Validation.validateExpireAt(
        session.dateExpireAt.toString(),
        session.dateStartAt.toString(),
        t
      );
      daysError = Validation.valiadteDays(session, t);
    }
    const timeStartAtError = Validation.validateStartAt(
      session.timeStartAt.toString(),
      t
    );
    const hasError =
      dateStartAtError !== null ||
      dateExpireAtError !== null ||
      daysError !== null ||
      timeStartAtError !== null;
    if (hasError) {
      setDateStartAtError(dateStartAtError);
      setDateExpireAtError(dateExpireAtError);
      setDaysError(daysError);
      setTimeStartAtError(timeStartAtError);
    } else {
      dispatch(setCreateSession(session));
      navigation.navigate("SessionAddAddress");
    }
  };

  const handleChangeRecurrence = (value) => {
    if (session.hasRecurrence !== value) {
      const s = _.clone(session);
      s.hasRecurrence = value;
      if (value) {
        const dateIndex = s.dateStartAt.getDay();
        s[days[dateIndex]] = true;
        setSession(s);
      } else {
        s.monday = false;
        s.tuesday = false;
        s.wednesday = false;
        s.thursday = false;
        s.friday = false;
        s.saturday = false;
        s.sunday = false;
        setSession(s);
      }
    }
  };

  const _handleChangeInput = (attr, value) => {
    const s = _.clone(session);
    s[attr] = value;
    setSession(s);
  };

  const prepareSessionDto = () => {
    const prevSession = sessionProps;
    const session = new SessionDto();
    session.sport = prevSession.sport;
    session.description = prevSession.description;
    session.places = prevSession.places;
    session.price = prevSession.price;
    session.dateStartAt = prevSession.dateStartAt;
    session.dateExpireAt = prevSession.dateExpireAt;
    session.timeStartAt = prevSession.timeStartAt;
    session.hasRecurrence = prevSession.hasRecurrence;
    session.monday = prevSession.monday;
    session.tuesday = prevSession.tuesday;
    session.wednesday = prevSession.wednesday;
    session.thursday = prevSession.thursday;
    session.friday = prevSession.friday;
    session.saturday = prevSession.saturday;
    session.sunday = prevSession.sunday;
    setSession(session);
  };

  useEffect(() => {
    prepareSessionDto();
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : undefined}
    >
      <STGScrollView contentContainerStyle={{ paddingVertical: 20 }}>
        <STGContainer>
          <View style={styles.reccCard}>
            <TouchableOpacity
              style={[
                styles.subReccCard,
                styles.subReccCardLeft,
                session.hasRecurrence ? styles.subReccCardSelected : null,
              ]}
              onPress={() => handleChangeRecurrence(false)}
            >
              <Ionicons name="ios-arrow-down" size={24} color="#FFF" />
              <Text style={styles.subReccText}>{t("common:now")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.subReccCard,
                styles.subReccCardRight,
                session.hasRecurrence ? null : styles.subReccCardSelected,
              ]}
              onPress={() => handleChangeRecurrence(true)}
            >
              <Foundation name="calendar" size={24} color="#FFF" />
              <Text style={styles.subReccText}>{t("common:regular")}</Text>
            </TouchableOpacity>
          </View>
          <STGScrollViewBody>
            {session.hasRecurrence && (
              <RecurrenceDays
                _handleChangeInput={_handleChangeInput}
                _renderDayFormat={_renderDayFormat}
                daysError={daysError}
                session={session}
                t={t}
              />
            )}

            <View style={styles.viewPadding}>
              <Text style={gStyles.textInputTitle}>
                {t("session:add.dateStartAt")}
              </Text>
              <STGDatePicker
                attr="dateStartAt"
                value={session.dateStartAt}
                handleChangeInput={_handleChangeInput}
                t={t}
                dateMode="date"
                dateFormat="dddd, DD MMM YYYY"
              />
              {dateStartAtError && (
                <Text style={gStyles.helper}>{dateStartAtError}</Text>
              )}
              {session.hasRecurrence && (
                <>
                  <Text style={gStyles.textInputTitle}>
                    {t("session:add.dateExpireAt")}
                  </Text>
                  <STGDatePicker
                    attr="dateExpireAt"
                    value={session.dateExpireAt}
                    handleChangeInput={_handleChangeInput}
                    t={t}
                    dateMode="date"
                    dateFormat="dddd, DD MMM YYYY"
                    minimumDate={session.dateStartAt}
                  />
                  {dateExpireAtError && (
                    <Text style={gStyles.helper}>{dateExpireAtError}</Text>
                  )}
                </>
              )}
              <Text style={gStyles.textInputTitle}>
                {t("session:add.timeStartAt")}
              </Text>
              <STGDatePicker
                attr="timeStartAt"
                value={session.timeStartAt}
                handleChangeInput={_handleChangeInput}
                t={t}
                dateMode="time"
                dateFormat="HH:mm"
              />
              {timeStartAtError && (
                <Text style={gStyles.helper}>{timeStartAtError}</Text>
              )}

              <Text style={gStyles.textInputTitle}>
                {`${t("common:duration")} ${_renderHoursMinutes(
                  session.durationHours
                )} : ${_renderHoursMinutes(session.durationMinutes)}`}
              </Text>
              <STGDurationPicker
                hoursValue={session.durationHours}
                minutesValue={session.durationMinutes}
                hoursText={t("common:hours")}
                minutesText={t("common:minutes")}
                onHoursChangeValue={_handleDurationHoursChange}
                onMinutesChangeValue={_handleDurationMinutesChange}
              />
            </View>
          </STGScrollViewBody>
          <STGButton onPress={next} btnText={t("common:next")} />
        </STGContainer>
      </STGScrollView>
    </KeyboardAvoidingView>
  );
}
