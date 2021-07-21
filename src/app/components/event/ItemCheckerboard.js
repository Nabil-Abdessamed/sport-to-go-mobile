import React, { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import { useTranslation } from "react-i18next";
import FastImage from "react-native-fast-image";
import { BASE_URL } from "@config";
import { STGFonts, STGColors, STGAvatar } from "stg-ui";
import EventService from "@services/EventService";
import Video from "react-native-video";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import EventHelpers from "../event/Helpers";
import moment from "moment";
import CommonStyles from "../styles";

const { width } = Dimensions.get("window");

const itemCheckerboardContainerWidth = width / 2;
const itemCheckerboardBodyWidth = width / 2 - 10;
const imageCheckBoardWidth = itemCheckerboardContainerWidth - 20;

export default function ItemCheckerboard({ item }) {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const filetype = (item.filetype && item.filetype.substr(0, 5)) || null;
  const VideoPlayer = useRef();

  const subscribe = () => {
    EventService.subscribeToEventService(item.id).then(() =>
      EventHelpers.getEvents()
    );
  };

  const unsubscribe = () => {
    EventService.unsubscribeToEventService(item.id).then(() =>
      EventHelpers.getEvents()
    );
  };

  const beforeUnsubscribe = () => {
    Alert.alert(
      "Evènement",
      "Voulez-vous vraiment se désabonner de cet evènement ?",
      [
        { text: "Oui", onPress: unsubscribe, style: "destructive" },
        { text: "Non" },
      ]
    );
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("EventDetails", {
          event: item,
        })
      }
    >
      <View style={styles.body}>
        <View style={styles.user}>
          <STGAvatar
            uri={`${BASE_URL}/upload/avatars/${item.userAvatar}`}
            size={32}
          />
          <Text
            style={styles.userFullname}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {item.userFullname}
          </Text>
        </View>
        <Text style={styles.sport}>{item.activity}</Text>
        <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
          {item.description}
        </Text>
        {filetype === "image" && (
          <FastImage
            source={{
              uri: `${BASE_URL}/upload/events/${item.image}`,
              cache: FastImage.cacheControl.immutable,
            }}
            resizeMode={FastImage.resizeMode.cover}
            style={styles.image}
          />
        )}

        {filetype === "video" && (
          <View
            style={[
              styles.postItemCheckImage,
              styles.postItemCheckVideo,
              { position: "relative" },
            ]}
          >
            <Video
              source={{ uri: `${BASE_URL}/upload/events/${item.image}` }}
              style={[styles.postItemCheckImage, { position: "absolute" }]}
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
              size={48}
            />
          </View>
        )}

        <View style={CommonStyles.detailsItem}>
          <MaterialCommunityIcons name="calendar-month-outline" size={16} />
          <Text style={CommonStyles.detailsItemText}>
            {moment(item.date)
              .locale(i18n.language)
              .format("dddd DD MMM YYYY") || ""}
          </Text>
        </View>
        <View style={CommonStyles.detailsItem}>
          <MaterialCommunityIcons name="clock-outline" size={16} />
          <Text style={CommonStyles.detailsItemText}>
            {(item.timeStartAt && item.timeStartAt.substr(0, 5)) || ""}
            {" | "}
            {(item.timeEndAt && item.timeEndAt.substr(0, 5)) || ""}
          </Text>
        </View>

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
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: itemCheckerboardContainerWidth,
    padding: 5,
    alignItems: "center",
  },
  body: {
    width: itemCheckerboardBodyWidth,
    minHeight: itemCheckerboardBodyWidth,
    padding: 5,
    borderColor: "#00000035",
    borderWidth: 0.5,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderColor: "rgba(0,0,0,0.6)",
    borderWidth: 0.5,
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
  },
  userFullname: {
    fontFamily: STGFonts.RobotoMedium,
    paddingHorizontal: 10,
  },
  sport: {
    fontFamily: STGFonts.RobotoBold,
    marginVertical: 10,
  },
  description: {
    fontFamily: STGFonts.RobotoRegular,
    marginVertical: 5,
  },
  priceContainter: {
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderTopColor: "rgba(0,0,0,0.2)",
    borderTopWidth: 0.5,
  },
  price: {
    fontFamily: STGFonts.RobotoBold,
    fontSize: 18,
  },
  image: {
    width: itemCheckerboardBodyWidth,
    height: itemCheckerboardBodyWidth,
    alignSelf: "center",
  },
  participateBtn: {
    // position: "absolute",
    // right: 5,
    // bottom: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: "rgba(255,255,255,0.8)",
    borderWidth: 0.2,
    backgroundColor: STGColors.container,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  participateBtnText: {
    color: "ghostwhite",
    fontFamily: STGFonts.RobotoRegular,
  },
  participatedBtn: {
    backgroundColor: "ghostwhite",
    borderColor: "rgba(0,0,0,0.4)",
  },
  participatedBtnText: {
    color: "rgba(0,0,0,0.8)",
  },
  postItemCheckImage: {
    width: imageCheckBoardWidth,
    height: 100,
    alignSelf: "center",
    alignItems: "stretch",
    borderRadius: 2,
  },
  postItemCheckVideo: {
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
});
