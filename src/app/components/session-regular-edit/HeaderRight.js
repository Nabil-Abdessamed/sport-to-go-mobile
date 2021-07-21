import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Styles from "../session-add-regular/Styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function HeaderRight({
  onSaveButtonPress = () => {},
  disableButton = false,
  isImage = false,
  onImageButtonPress = () => {},
  isMap = false,
  onMapButtonPress = () => {},
}) {
  return (
    <View style={Styles.headerRight}>
      {isMap && (
        <TouchableOpacity
          style={Styles.headerRightButton}
          onPress={onMapButtonPress}
          disabled={disableButton}
        >
          <MaterialCommunityIcons name="google-maps" size={28} />
        </TouchableOpacity>
      )}
      {isImage && (
        <TouchableOpacity
          style={Styles.headerRightButton}
          onPress={onImageButtonPress}
          disabled={disableButton}
        >
          <MaterialCommunityIcons name="image-edit" size={28} />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={Styles.headerRightButton}
        onPress={onSaveButtonPress}
        disabled={disableButton}
      >
        <MaterialCommunityIcons name="content-save" size={28} />
      </TouchableOpacity>
    </View>
  );
}
