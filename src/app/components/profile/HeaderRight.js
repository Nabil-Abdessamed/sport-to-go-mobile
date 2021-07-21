import React from "react";
import { Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./style";

export default function HeaderRight({ save, title }) {
  return (
    <TouchableOpacity onPress={save} style={styles.headerRightButtonContainer}>
      <Text style={styles.headerRightButtonTitle}>{title}</Text>
      <MaterialCommunityIcons name="content-save" size={28} />
    </TouchableOpacity>
  );
}
