import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import FastImage from "react-native-fast-image";
import { BASE_URL } from "@config";
import styles from "../chat-conversation/styles";

export default function UserItem({ item, onPressItem, t }) {
  const renderPartnershipType = (type) => {
    switch (type) {
      case "COACH":
        return t("common:coach");
      case "FITNESS_CLUB":
        return t("common:fitnessClub");
      case "CROSSFIT_CLUB":
        return t("common:crossfitClub");
      case "ASSOCIATION":
        return t("common:association");
      default:
        return type;
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
        {item.type === "PRO" && (
          <Text
            style={styles.title2}
            ellipsizeMode="tail"
            numberOfLines={1}
          >{`${renderPartnershipType(item.partnershipType)}`}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
