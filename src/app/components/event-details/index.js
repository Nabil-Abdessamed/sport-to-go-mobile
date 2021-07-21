import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useSelector, shallowEqual } from "react-redux";
import styles from "./style";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import IconEntypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";
import { BASE_URL } from "@config";
import {
  STGContainer,
  STGImageZoom,
  STGAvatar,
  STGPictoMap,
  STGFullMap,
  STGListUsers,
  STGActionSheet,
  STGHeaderBack,
} from "stg-ui";
import EventService from "@services/EventService";
import _ from "lodash";
import Styles from "../styles";
import STGVideo from "stg-ui/STGVideo";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function EventDetails() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { params } = useRoute();
  // Props from Redux
  const { user } = useSelector((state) => state.auth, shallowEqual);
  // States
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [event, setEvent] = useState({});
  const [showParticipants, setShowParticipants] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const filetype = (event.filetype && event.filetype.substr(0, 5)) || null;

  const getEvent = async () => {
    if (event) {
      const { data, status } = await EventService.getEventByIdService(event.id);
      if (status === 200) {
        setEvent(data);
      }
    }
  };

  const subscribe = async () => {
    const e = params.event;
    const { data, status } = await EventService.subscribeToEventService(e.id);
    if (status === 201) {
      setEvent(data.event);
    } else {
      if (status === 409) {
        if (data.code === "EVENT_ALL_RESERVED") {
          Alert.alert("", t("event:errorMessage2"));
        }
        if (data.code === "USER_ALREADY_SUBSCRIBED") {
          Alert.alert("", t("event:errorMessage1"));
        }
      }
      if (status === 500) {
        Alert.alert(t("event:error"), t("event:errorMessage3"));
      }
    }
  };

  const unsubscribe = async () => {
    const e = params.event;
    const { data, status } = await EventService.unsubscribeToEventService(e.id);
    if (status === 201) {
      setEvent(data.event);
    } else {
      Alert.alert(t("event:error"), t("event:errorMessage3"));
    }
  };

  const beforeUnsubscribe = () => {
    Alert.alert(
      t("event:unsubscribeAlert"),
      t("event:unsubscribeAlertMessage"),
      [
        { text: t("common:no") },
        {
          text: t("common:yes"),
          onPress: unsubscribe,
          style: "destructive",
        },
      ]
    );
  };

  const showOptions = () => {
    setOptionsVisible(true);
  };

  const hideOptions = () => {
    setOptionsVisible(false);
  };

  const onPressEdit = () => {
    hideOptions();
    navigation.navigate("EventEdit", {
      event,
    });
  };

  const onPressDelete = () => {
    Alert.alert(t("event:deleteTitle"), t("event:deleteMessage"), [
      {
        text: t("common:yes"),
        onPress: deleteEvent,
        style: "destructive",
      },
      {
        text: t("common:no"),
      },
    ]);
  };

  const handleShowMap = () => {
    setShowMap(true);
  };

  const handleHideMap = () => {
    setShowMap(false);
  };

  const deleteEvent = async () => {
    setLoading(true);
    setLoadingText(t("event:delete.loadingText"));
    const { status } = await EventService.deleteEventSerivce(event.id);
    setLoading(false);
    setLoadingText("");
    if (_.inRange(status, 200, 300)) {
      navigation.replace("Event");
    }
  };

  const handleShowParticipants = () => {
    setOptionsVisible(false);
    setTimeout(() => {
      setShowParticipants(true);
    }, 1000);
  };

  const handleHideParticipants = () => {
    setShowParticipants(false);
  };

  const getParticipants = async () => {
    const { data, status } = await EventService.getEventParticipantsService(
      event.id
    );
    if (status === 200) {
      setParticipants(data);
    } else {
      setParticipants([]);
    }
  };

  const _renderHoursMinutes = (item) => {
    return item < 10 ? `0${item}` : item;
  };

  const showUserInfo = (userId) => {
    handleHideParticipants();
    navigation.navigate("ProfileShow", {
      user: userId,
    });
  };

  const onVideoBackPress = () => {
    navigation.goBack();
  };

  const onVideoFullscreenEnter = () => {
    setFullscreen(true);
  };

  const onVideoFullscreenExit = () => {
    setFullscreen(false);
  };

  useEffect(() => {
    const e = params.event;
    setEvent(e);
    getParticipants();
  }, []);

  return (
    <>
      <STGContainer loading={loading} loadingText={loadingText}>
        {!fullscreen && (
          <STGHeaderBack
            navigation={navigation}
            hasOptions={Number(event.owner) === 1}
            onPressShowOptions={showOptions}
          />
        )}
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{
            paddingVertical: fullscreen ? 0 : 20,
          }}
        >
          {!fullscreen && (
            <>
              <TouchableWithoutFeedback>
                <TouchableOpacity
                  style={Styles.userContainer}
                  onPress={() => {
                    if (Number(event.userId) === Number(user.id)) {
                      navigation.navigate("MySpace");
                    } else {
                      navigation.navigate("ProfileShow", {
                        user: event.userId,
                      });
                    }
                  }}
                >
                  <STGAvatar
                    uri={`${BASE_URL}/upload/avatars/${event.userAvatar}`}
                  />
                  <Text style={Styles.userFullname}>{event.userFullname}</Text>
                </TouchableOpacity>
              </TouchableWithoutFeedback>
              <Text style={Styles.detailsItemTitle}>
                {(event && event.activity) || ""}
              </Text>
              <Text style={Styles.detailsItemDescription}>
                {(event && event.description) || ""}
              </Text>
            </>
          )}
          {event.image && filetype === "image" && (
            <STGImageZoom
              uri={`${BASE_URL}/upload/events/${event.image}`}
              withZoom={true}
            />
          )}
          {event.image && filetype === "video" && (
            <STGVideo
              source={{ uri: `${BASE_URL}/upload/events/${event.image}` }}
              fullscreen={fullscreen}
              disableFullscreen={false}
              disableBack={false}
              onVideoBackPress={onVideoBackPress}
              onVideoFullscreenEnter={onVideoFullscreenEnter}
              onVideoFullscreenExit={onVideoFullscreenExit}
            />
          )}
          {!fullscreen && (
            <>
              <View style={Styles.detailsItem}>
                <MaterialCommunityIcons
                  name="calendar-month-outline"
                  size={18}
                />
                <Text style={Styles.detailsItemTitle}>
                  {moment(event.date).format("ddd DD MMM YYYY") || ""}
                </Text>
              </View>
              <View style={Styles.detailsItem}>
                <MaterialCommunityIcons name="clock-outline" size={18} />
                <Text style={Styles.detailsItemTitle}>
                  {(event.timeStartAt && event.timeStartAt.substr(0, 5)) || ""}
                  {" | "}
                  {(event.timeEndAt && event.timeEndAt.substr(0, 5)) || ""}
                </Text>
              </View>

              {(event.durationHours > 0 || event.durationMinutes > 0) && (
                <View style={Styles.detailsItem}>
                  <MaterialCommunityIcons name="timer" size={18} />
                  <Text style={Styles.detailsItemTitle}>{`${_renderHoursMinutes(
                    event.durationHours
                  )} : ${_renderHoursMinutes(event.durationMinutes)}`}</Text>
                </View>
              )}

              <View style={Styles.detailsItem}>
                <IconEntypo name="location-pin" size={20} />
                <Text style={Styles.detailsItemTitle}>
                  {`${event.country}${event.country && ", "}${
                    event.city
                  }${event.city && ", "}${event.address}`}
                </Text>
              </View>

              {Number(event.subscribersCount) > 0 && (
                <TouchableOpacity
                  disabled={event.owner === 0}
                  style={Styles.detailsItem}
                  onPress={
                    Number(event.owner) === 1 ? getParticipants : () => {}
                  }
                  activeOpacity={Number(event.owner) === 1 ? 0 : 1}
                >
                  <FontAwesome5 name="users" size={16} />
                  <Text style={styles.title}>{`${event.subscribersCount} ${
                    Number(event.subscribersCount) > 1
                      ? t("event:moreParticipated")
                      : t("event:oneParticipated")
                  }`}</Text>
                </TouchableOpacity>
              )}

              {event.latitude && event.longitude && (
                <STGPictoMap
                  latitude={event.latitude}
                  longitude={event.longitude}
                  regionLatitude={event.latitude}
                  regionLongitude={event.longitude}
                  onPressFullscreen={handleShowMap}
                />
              )}
            </>
          )}
        </ScrollView>
        {!fullscreen && Number(event.owner) === 0 && (
          <TouchableOpacity
            style={[
              styles.participateBtn,
              Number(event.subscribed) === 1 ? styles.participatedBtn : {},
            ]}
            onPress={event.subscribed == 1 ? beforeUnsubscribe : subscribe}
          >
            <Text
              style={[
                styles.participateBtnText,
                event.subscribed == 1 ? styles.participatedBtnText : {},
              ]}
            >
              {Number(event.subscribed) === 1
                ? t("common:participated")
                : t("common:participate")}
            </Text>
          </TouchableOpacity>
        )}
      </STGContainer>
      {event.latitude && event.longitude && (
        <STGFullMap
          show={showMap}
          regionLatitude={event.latitude}
          regionLongitude={event.longitude}
          hideMap={handleHideMap}
          markers={[
            {
              latitude: event.latitude,
              longitude: event.longitude,
              title: event.sport,
              description: event.address,
            },
          ]}
        />
      )}
      <STGListUsers
        visible={showParticipants}
        data={participants}
        hide={handleHideParticipants}
        title={t("event:details.participantsListTitle")}
        navigation={navigation}
      />
      <STGActionSheet
        isVisible={optionsVisible}
        hide={hideOptions}
        cancelButtonText={t("common:cancel")}
        items={[
          {
            title: `(${event.subscribersCount}) ${t(
              "session:options.subscribers"
            )}`,
            onPress: handleShowParticipants,
            icon: <FontAwesome5 name="users" size={20} />,
          },
          {
            title: t("session:options.edit"),
            onPress: onPressEdit,
            icon: <FontAwesome5 name="edit" size={20} />,
          },
          {
            title: t("session:options.delete"),
            onPress: onPressDelete,
            icon: <FontAwesome5 name="trash-alt" size={20} />,
          },
        ]}
      />
    </>
  );
}
