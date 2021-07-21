import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  StyleSheet,
} from "react-native";
import FastImage from "react-native-fast-image";
import Ionicons from "react-native-vector-icons/Ionicons";
import Moment from "moment";
import { BASE_URL } from "../../config";

const { width } = Dimensions.get("screen");
const itemWidth = width / 2;
const imageWidth = itemWidth - 10;
const imageHeight = imageWidth * 0.5625;

const Styles = StyleSheet.create({
  container: { minHeight: 60, width: itemWidth, alignItems: "center" },
  cardGrid: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: "#FFF",
    width: itemWidth - 10,
  },
  cardGridHeader: {
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontFamily: "Roboto-Medium",
    fontSize: 12,
    paddingHorizontal: 10,
  },
  avatarContainer: {
    backgroundColor: "#FFF",
    height: 32,
    width: 32,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { height: 3, width: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 3,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 16,
  },
  cardGridContent: {
    padding: 5,
  },
  cardGridContent2: {
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 12,
    paddingHorizontal: 5,
    marginVertical: 5,
  },
  description: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    paddingHorizontal: 5,
  },
  price: {
    fontFamily: "Roboto-Bold",
    fontSize: 18,
    alignSelf: "stretch",
    textAlign: "center",
    paddingHorizontal: 5,
    marginVertical: 5,
  },
  cardGridMedia: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    width: imageWidth,
    height: imageHeight,
  },
  image: {
    width: imageWidth,
    height: imageHeight,
  },
  dateText: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    textTransform: "capitalize",
  },
  dateText2: {
    fontFamily: "Roboto-Medium",
    fontSize: 12,
    textTransform: "capitalize",
  },
});

export default function SessionUniqueItemGrid({
  session,
  onPressItem,
  t,
  i18n,
}) {
  useEffect(() => {}, []);

  const renderDate = (date) => {
    if (date) {
      return Moment(date)
        .locale(i18n.language)
        .format("ddd DD MMM YYYY");
    } else {
      return "";
    }
  };

  const renderTime = (time) => {
    if (time && typeof time === "string") {
      return time.substr(0, 5);
    } else {
      return "";
    }
  };

  return (
    <TouchableOpacity
      style={Styles.container}
      activeOpacity={0.8}
      onPress={onPressItem}
    >
      <View style={Styles.cardGrid}>
        <View style={Styles.cardGridHeader}>
          <View style={Styles.avatarContainer}>
            <FastImage
              source={{
                uri: BASE_URL.concat(session.userAvatar),
              }}
              style={Styles.avatar}
            />
          </View>
          <Text style={Styles.name}>{session.userPartnershipName}</Text>
        </View>
        <View style={Styles.cardGridContent}>
          <Text style={Styles.title}>{`${session.title}`}</Text>
          <Text
            style={Styles.description}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {session.description}
          </Text>
        </View>
        <View style={Styles.cardGridMedia}>
          {session.fileId && (
            <FastImage
              source={{
                uri: BASE_URL.concat(session.filePath.replace("public", "")),
              }}
              style={Styles.image}
              resizeMode="contain"
            />
          )}
        </View>
        <View style={Styles.cardGridContent}>
          <Text style={Styles.price}>{session.price.toFixed(2)} €</Text>
        </View>
        {session.date && session.timeStartAt && session.timeEndAt && (
          <View style={Styles.cardGridContent2}>
            <View style={Styles.cardGridContent}>
              <Ionicons name="calendar-outline" size={16} />
            </View>
            <View style={Styles.cardGridContent}>
              <Text style={Styles.dateText2}>{renderDate(session.date)}</Text>
              <Text style={Styles.dateText2}>
                {renderTime(session.timeStartAt)}{" | "}
                {renderTime(session.timeEndAt)}
              </Text>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
