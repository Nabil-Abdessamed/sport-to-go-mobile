import React from "react";
import { TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function ButtonEdit({ onPress = () => {} }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 5,
        position: "absolute",
        top: 5,
        right: 5,
      }}
    >
      <FontAwesome name="edit" size={24} />
    </TouchableOpacity>
  );
}
