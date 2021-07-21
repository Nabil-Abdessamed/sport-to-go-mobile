import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  StyleSheet,
} from "react-native";
import FastImage from "react-native-fast-image";
import { BASE_URL } from "../../config";
import SessionRegularItemRecurrences from "./SessionRegularItemRecurrences";
import RecurrenceDateTime from "../session-regular-details/RecurrenceDateTime";

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
    width: itemWidth - 4,
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
    paddingVertical: 5,
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
});

export default function SessionRegularItemGrid({ session, onPressItem, t }) {
  const [recurrences, setRecurrences] = useState(null);

  useEffect(() => {
    setRecurrences({
      monday: session.monday,
      tuesday: session.tuesday,
      wednesday: session.wednesday,
      thursday: session.thursday,
      friday: session.friday,
      saturday: session.saturday,
      sunday: session.sunday,
    });
  }, []);

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
        {/* <SessionRegularItemRecurrences t={t} item={recurrences} isGrid={true} /> */}
        <RecurrenceDateTime item={session} t={t} isGridItem={true} />
        <View style={Styles.cardGridContent}>
          <Text style={Styles.price}>{session.price.toFixed(2)} €</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
