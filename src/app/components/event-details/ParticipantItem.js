import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BASE_URL } from "@config";
import { STGFonts, STGAvatar } from "stg-ui";

export default function ParticipantItem({ item }) {
  return (
    <View style={styles.container}>
      <STGAvatar uri={`${BASE_URL}/upload/avatars/${item.avatar}`} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.fullname}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomColor: "rgba(0,0,0,0.2)",
    borderBottomWidth: 0.4,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  avatar: {
    height: 48,
    width: 48,
    borderRadius: 24,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 0.2,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  info: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  name: {
    color: "#000",
    fontFamily: STGFonts.RobotoBold,
    fontSize: 18,
    alignSelf: "stretch",
    paddingHorizontal: 10,
  },
});
