import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import FastImage from "react-native-fast-image";
import { BASE_URL } from "@config";

export default function FollowerItem({ t, data, onPressRemove, onPressUser }) {
  const renderItemType = (type) => {
    switch (type) {
      case "COACH":
        return t("common:coach");
      case "ASSOCIATION":
        return t("common:association");
      case "CROSSFIT_CLUB":
        return t("common:crossfitClub");
      case "FITNESS_CLUB":
        return t("common:fitnessClub");
      default:
        return type;
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPressUser(data.userId)}
    >
      {/*  */}
      <View style={styles.avatarContainer}>
        <FastImage
          style={styles.avatar}
          {...(data.avatar
            ? { source: { uri: BASE_URL.concat(data.avatar) } }
            : null)}
        />
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>
          {data.type === "PRO" ? data.partnershipName : data.fullname}
        </Text>
        <Text style={styles.type}>{renderItemType(data.partnershipType)}</Text>
      </View>
      <TouchableOpacity
        style={styles.followButton}
        onPress={() => onPressRemove(data)}
      >
        <Text style={styles.followButtonText}>{t("common:remove")}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "rgba(0,0,0,0.5)",
    borderWidth: 0.3,
    backgroundColor: "#FFF",
    position: "relative",
  },
  avatarContainer: {
    height: 54,
    width: 54,
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderColor: "rgba(0,0,0,0.35)",
    borderWidth: 0.35,
    shadowColor: "#000",
    shadowOffset: { height: 2, width: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 12,
  },
  avatar: {
    height: 52,
    width: 52,
    borderRadius: 26,
  },
  nameContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: "center",
  },
  name: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
  },
  type: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  followButton: {
    position: "absolute",
    right: 10,
    padding: 10,
    borderRadius: 5,
    borderColor: "rgba(0,0,0,0.5)",
    borderWidth: 0.5,
  },
  followButtonText: {
    fontFamily: "Roboto-Bold",
    fontSize: 14,
    color: "rgba(0,0,0,0.8)",
  },
});
