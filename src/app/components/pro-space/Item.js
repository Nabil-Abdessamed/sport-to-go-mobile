import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./style";
import { BASE_URL } from "@config";
import { STGAvatar } from "stg-ui";

export default function Item({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={{ flexDirection: "row" }}>
        <STGAvatar uri={`${BASE_URL}/upload/avatars/${item.avatar}`} />
        <View style={{ marginLeft: 10, justifyContent: "center" }}>
          <Text style={styles.structureName}>{item.partnershipName}</Text>
          <Text style={styles.userName}>{item.fullname}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
