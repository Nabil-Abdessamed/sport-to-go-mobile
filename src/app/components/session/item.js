import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useTranslation } from "react-i18next";
import styles from "./style";
import IconEntypo from "react-native-vector-icons/Entypo";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import PropTypes from "prop-types";
import Moment from "moment";
import FastImage from "react-native-fast-image";
import { BASE_URL } from "@config";
import Styles from "../styles";
import { STGColors, STGImageZoom, STGAvatar } from "stg-ui";
import { Recurrences } from "./recurrences";
import Days from "./Days";
import { useNavigation } from "@react-navigation/native";

function capitalize(date) {
  const firstLetter = date.charAt(0);
  return date.replace(firstLetter, firstLetter.toUpperCase());
}

function renderDateFormat(value, language = "fr") {
  return Moment(value)
    .locale(language)
    .format(
      `dddd, DD MMM ${
        new Date(value).getFullYear() !== new Date().getFullYear() ? "YYYY" : ""
      }`
    );
}

function renderTimeFormat(value = "") {
  if (value) {
    return value.substr(0, 5);
  } else {
    return "";
  }
}

export default function SessionItem({ item, showOptions }) {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();

  const _renderHoursMinutes = (item) => {
    return item < 10 ? `0${item}` : item;
  };

  const days = new Days({ ...item });
  return (
    <TouchableOpacity
      style={Styles.detailsContainer}
      activeOpacity={1}
      onPress={() => {
        navigation.navigate("SessionDetails", {
          session: { ...item },
        });
      }}
    >
      <TouchableWithoutFeedback>
        <View style={styles.itemHeader}>
          <TouchableOpacity
            style={Styles.userContainer}
            onPress={() => {
              Number(item.owner) === 1
                ? navigation.navigate("MySpace")
                : navigation.navigate("ProfileShow", {
                    user: item.userId,
                  });
            }}
          >
            <STGAvatar uri={`${BASE_URL}/upload/avatars/${item.userAvatar}`} />
            <View style={{ marginHorizontal: 2.5 }} />
            <Text style={Styles.userFullname}>
              {item.partnershipName || item.userFullname || ""}
            </Text>
          </TouchableOpacity>
          {Number(item.owner) === 1 && (
            <TouchableOpacity style={styles.itemOptions} onPress={showOptions}>
              <MaterialCommunityIcons name="dots-vertical" size={28} />
            </TouchableOpacity>
          )}
        </View>
      </TouchableWithoutFeedback>
      <Text style={[Styles.detailsItemTitle, { marginTop: 10 }]}>
        {item.sport || ""}
      </Text>
      <Text style={[Styles.detailsItemTitle, { marginTop: 10 }]}>{`${
        item.price
      } €`}</Text>
      <Text style={Styles.detailsItemDescription}>{item.description}</Text>
      {item.image && (
        <STGImageZoom
          uri={`${BASE_URL}/upload/sessions/${item.image}`}
          withZoom={false}
        />
      )}
      <View style={Styles.detailsItem}>
        <IconEntypo name="location-pin" size={16} />
        <Text style={Styles.detailsItemText}>
          {`${item.country}${item.city !== "" ? ", " : ""}${item.city}${
            item.address !== "" ? ", " : ""
          }${item.address}`}
        </Text>
      </View>

      <View style={Styles.detailsItem}>
        <MaterialCommunityIcons name="calendar-month-outline" size={16} />
        <Text style={Styles.detailsItemText}>{`${capitalize(
          renderDateFormat(item.dateStartAt, i18n.language)
        )}`}</Text>
      </View>

      {item.hasRecurrence === 1 && (
        <View style={Styles.detailsItem}>
          <MaterialCommunityIcons name="calendar-month-outline" size={16} />
          <Text style={Styles.detailsItemText}>{`${capitalize(
            renderDateFormat(item.dateExpireAt, i18n.language)
          )}`}</Text>
        </View>
      )}

      <View style={Styles.detailsItem}>
        <MaterialCommunityIcons name="clock" size={16} />
        <Text style={Styles.detailsItemText}>{`${renderTimeFormat(
          item.timeStartAt
        )}`}</Text>
      </View>

      {(item.durationHours > 0 || item.durationMinutes > 0) && (
        <View style={Styles.detailsItem}>
          <MaterialCommunityIcons name="timer" size={16} />
          <Text style={Styles.detailsItemText}>{`${_renderHoursMinutes(
            item.durationHours
          )} : ${_renderHoursMinutes(item.durationMinutes)}`}</Text>
        </View>
      )}

      {Number(item.places) > 0 && (
        <View style={Styles.detailsItem}>
          <FontAwesome5 name="users" size={12} />
          <Text style={Styles.detailsItemText}>{`${item.places} ${t(
            "session:places"
          )}`}</Text>
        </View>
      )}

      {Number(item.subscribersCount) > 0 && (
        <View style={Styles.detailsItem}>
          <MaterialCommunityIcons name="human-greeting" size={12} />
          <Text style={Styles.detailsItemText}>{`${item.subscribersCount} ${
            Number(item.subscribersCount) > 1
              ? t("event:moreParticipated")
              : t("event:oneParticipated")
          }`}</Text>
        </View>
      )}

      {Number(item.places) > 0 && (
        <View style={Styles.detailsItem}>
          <MaterialCommunityIcons name="human-handsup" size={16} />
          <Text style={Styles.detailsItemText}>{`${Number(item.places) -
            Number(item.subscribersCount)} ${t(
            "session:availablePlaces"
          )}`}</Text>
        </View>
      )}
      {Number(item.subscribed) === 1 && (
        <MaterialCommunityIcons
          name="bookmark-check"
          color={STGColors.container}
          size={48}
          style={styles.itemSubscribed}
        />
      )}

      {item.hasRecurrence === 1 && (
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <Recurrences days={days} t={t} />
        </View>
      )}
    </TouchableOpacity>
  );
}
