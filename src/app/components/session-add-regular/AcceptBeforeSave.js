import React from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const { width } = Dimensions.get("screen");

const AcceptBeforeSave = ({ accepted, onPressAccept }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={onPressAccept}
      >
        {accepted ? (
          <MaterialCommunityIcons name="checkbox-marked-outline" size={30} />
        ) : (
          <MaterialCommunityIcons name="checkbox-blank-outline" size={30} />
        )}
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{t("session:acceptBeforeSave")}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width,
    padding: 5,
    flexDirection: "row",
    backgroundColor: "#f2f2f280",
    borderTopColor: "#00000035",
    borderTopWidth: 1.5,
  },
  checkboxContainer: {
    width: 60,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: width - 60,
    paddingHorizontal: 10,
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
});

export default AcceptBeforeSave;
