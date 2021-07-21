import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import FastImage from "react-native-fast-image";
import { BASE_URL } from "@config";
import styles from "./styles";
import moment from "moment";

export default function ConversationItem({ item, onPressItem }) {
  const renderDateTimeFormat = (d) => {
    const now = new Date();
    const date = new Date(d);
    if (
      moment(now).format("YYYY-MM-DD") === moment(date).format("YYYY-MM-DD")
    ) {
      return moment(date).format("HH:mm");
    } else if (
      moment(now).format("YYYY-MM") === moment(date).format("YYYY-MM")
    ) {
      return moment(date).format("DDD, dd HH:mm");
    } else if (moment(now).format("YYYY") === moment(now).format("YYYY")) {
      return moment(now).format("DDD, dd MMM HH:mm");
    } else {
      return moment(now).format("DDD, dd MMM YYYY HH:mm");
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPressItem}
      activeOpacity={0.8}
    >
      <View style={styles.avatarContainer}>
        <FastImage
          source={{ uri: `${BASE_URL}/upload/avatars/${item.avatar}` }}
          style={styles.avatar}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text
          style={styles.title1}
          ellipsizeMode="tail"
          numberOfLines={1}
        >{`${item.partnershipName || item.fullname || ""}`}</Text>
        <Text style={styles.title2} ellipsizeMode="tail" numberOfLines={1}>{`${
          item.lastMessageText
        }`}</Text>
        <Text
          style={styles.title3}
          ellipsizeMode="tail"
          numberOfLines={1}
        >{`${renderDateTimeFormat(item.lastMessageDate)}`}</Text>
      </View>
    </TouchableOpacity>
  );
}
