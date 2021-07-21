import React, { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import styles from "./style";
import IconEntypo from "react-native-vector-icons/Entypo";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";
import { BASE_URL } from "@config";
import FastImage from "react-native-fast-image";
import { useTranslation } from "react-i18next";
import EventService from "@services/EventService";
import Styles from "../styles";
import { STGImageZoom, STGAvatar } from "stg-ui";
import Video from "react-native-video";
import { useNavigation } from "@react-navigation/native";
import EventHelpers from "../event/Helpers";

export default function Item({ item = {}, showOptions = () => {} }) {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const filetype = (item.filetype && item.filetype.substr(0, 5)) || null;
  const VideoPlayer = useRef();

  const subscribe = async () => {
    const { data, status } = await EventService.subscribeToEventService(
      item.id
    );
    if (status === 201) {
      EventHelpers.getEvents();
    } else {
      if (status === 409) {
        if (data.code === "EVENT_ALL_RESERVED") {
          Alert.alert(t("event:error"), t("event:errorMessage2"));
        }
        if (data.code === "USER_ALREADY_SUBSCRIBED") {
          Alert.alert(t("event:error"), t("event:errorMessage1"));
        }
      }
      if (status === 500) {
        Alert.alert(t("event:error"), t("event:errorMessage3"));
      }
    }
  };

  const unsubscribe = async () => {
    const { status } = await EventService.unsubscribeToEventService(item.id);
    if (status === 201) {
      EventHelpers.getEvents();
    }
  };

  const beforeUnsubscribe = () => {
    Alert.alert(
      t("event:unsubscribeAlert"),
      t("event:unsubscribeAlertMessage"),
      [
        { text: t("common:yes"), onPress: unsubscribe },
        { text: t("common:no") },
      ]
    );
  };

  const _renderHoursMinutes = (i) => {
    return i < 10 ? `0${i}` : i;
  };

  return (
    <TouchableOpacity
      style={Styles.detailsContainer}
      onPress={() =>
        navigation.navigate("EventDetails", {
          event: item,
        })
      }
    >
      <TouchableWithoutFeedback>
        <View style={styles.itemHeader}>
          <TouchableOpacity
            style={Styles.userContainer}
            onPress={() => {
              +item.owner === 1
                ? navigation.navigate("MySpace")
                : navigation.navigate("ProfileShow", {
                    user: item.userId,
                  });
            }}
          >
            <STGAvatar uri={`${BASE_URL}/upload/avatars/${item.userAvatar}`} />
            <Text
              numberOfLines={1}
              ellipsizeMode={"tail"}
              style={Styles.userFullname}
            >
              {item.userFullname}
            </Text>
          </TouchableOpacity>
          {item.owner === "1" && (
            <TouchableOpacity style={styles.itemOptions} onPress={showOptions}>
              <MaterialCommunityIcons name="dots-vertical" size={28} />
            </TouchableOpacity>
          )}
        </View>
      </TouchableWithoutFeedback>
      <Text selectable ellipsizeMode={"tail"} style={Styles.detailsItemTitle}>
        {item.activity || ""}
      </Text>
      <Text
        selectable
        ellipsizeMode={"tail"}
        style={Styles.detailsItemDescription}
      >
        {item.description || ""}
      </Text>
      {item.image !== null && filetype === "image" && (
        <STGImageZoom
          uri={`${BASE_URL}/upload/events/${item.image}`}
          withZoom={false}
        />
      )}

      {item.image &&
        filetype === "video" &&
        (Platform.OS === "android" ? (
          <View style={Styles.androidPostVideoPoster}>
            <FastImage
              source={{ uri: `${BASE_URL}/upload/events/${item.image}` }}
              withZoom={false}
              style={Styles.androidPostVideoPosterImage}
            />
            <MaterialCommunityIcons
              name="play-circle-outline"
              color={"#fff"}
              style={Styles.videoIndicator}
              size={64}
            />
          </View>
        ) : (
          <View
            style={[Styles.androidPostVideoPoster, { backgroundColor: "#000" }]}
          >
            <Video
              source={{ uri: `${BASE_URL}/upload/events/${item.image}` }}
              style={Styles.androidPostVideoPosterImage}
              paused={true}
              ref={VideoPlayer}
              onLoad={(data) => {
                const seek = data.duration / 2;
                VideoPlayer.current.seek(seek, 50);
              }}
            />
            <MaterialCommunityIcons
              name="play-circle-outline"
              color={"#fff"}
              style={Styles.videoIndicator}
              size={64}
            />
          </View>
        ))}

      <View style={Styles.detailsItem}>
        <MaterialCommunityIcons name="calendar-month-outline" size={16} />
        <Text style={Styles.detailsItemText}>
          {moment(item.date)
            .locale(i18n.language)
            .format("dddd DD MMM YYYY") || ""}
        </Text>
      </View>
      <View style={Styles.detailsItem}>
        <MaterialCommunityIcons name="clock-outline" size={16} />
        <Text style={Styles.detailsItemText}>
          {(item.timeStartAt && item.timeStartAt.substr(0, 5)) || ""}
          {" | "}
          {(item.timeEndAt && item.timeEndAt.substr(0, 5)) || ""}
        </Text>
      </View>

      {(item.durationHours > 0 || item.durationMinutes > 0) && (
        <View style={Styles.detailsItem}>
          <MaterialCommunityIcons name="timer" size={16} />
          <Text style={Styles.detailsItemText}>{`${_renderHoursMinutes(
            item.durationHours
          )} : ${_renderHoursMinutes(item.durationMinutes)}`}</Text>
        </View>
      )}

      <View style={Styles.detailsItem}>
        <IconEntypo name="location-pin" size={16} />
        <Text style={Styles.detailsItemText}>
          {`${item.country}${item.country && ", "}${item.city}${item.city &&
            ", "}${item.address}`}
        </Text>
      </View>

      {Number(item.places) > 0 && (
        <View style={Styles.detailsItem}>
          <FontAwesome5 name="users" size={12} />
          <Text style={Styles.detailsItemText}>
            {`${item.places} ${t("session:places")}`}
          </Text>
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
          <Text style={Styles.detailsItemText}>
            {`${Number(item.places) - Number(item.subscribersCount)} ${t(
              "session:availablePlaces"
            )}`}
          </Text>
        </View>
      )}

      {Number(item.owner) === 0 && (
        <TouchableWithoutFeedback>
          <TouchableOpacity
            style={[
              styles.participateBtn,
              item.subscribed == 1 ? styles.participatedBtn : {},
            ]}
            onPress={item.subscribed == 1 ? beforeUnsubscribe : subscribe}
          >
            <Text
              style={[
                styles.participateBtnText,
                item.subscribed == 1 ? styles.participatedBtnText : {},
              ]}
            >
              {Number(item.subscribed) === 1
                ? t("common:participated")
                : t("common:participate")}
            </Text>
          </TouchableOpacity>
        </TouchableWithoutFeedback>
      )}
    </TouchableOpacity>
  );
}
