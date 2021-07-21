import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Styles from "./Styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function HeaderRight({
  onSaveButtonPress = () => {},
  onImageButtonPress = () => {},
  onMapButtonPress = () => {},
}) {
  return (
    <View style={Styles.headerRight}>
      <TouchableOpacity
        style={Styles.headerRightButton}
        onPress={onMapButtonPress}
      >
        <MaterialCommunityIcons name="google-maps" size={28} />
      </TouchableOpacity>
      <TouchableOpacity
        style={Styles.headerRightButton}
        onPress={onImageButtonPress}
      >
        <MaterialCommunityIcons name="file-image-outline" size={28} />
      </TouchableOpacity>
      <TouchableOpacity
        style={Styles.headerRightButton}
        onPress={onSaveButtonPress}
      >
        <MaterialCommunityIcons name="content-save" size={28} />
      </TouchableOpacity>
    </View>
  );
}
