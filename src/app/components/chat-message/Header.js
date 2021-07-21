import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { BASE_URL } from "@config";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FastImage from "react-native-fast-image";
import styles from "./styles";

export default function HeaderLeft({
  conversation,
  onPressButtonBack = () => {},
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonBack} onPress={onPressButtonBack}>
        <FontAwesome5 name="chevron-left" size={24} />
      </TouchableOpacity>
      {conversation && (
        <View style={styles.infoContainer}>
          <View style={styles.avatarContainer}>
            <FastImage
              source={{
                uri: `${BASE_URL}/upload/avatars/${(conversation &&
                  conversation.avatar) ||
                  ""}`,
              }}
              style={styles.avatar}
            />
          </View>
          {conversation && (
            <Text style={styles.name}>
              {conversation.partnershipName !== ""
                ? conversation.partnershipName
                : conversation.fullname}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}
