import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { View } from "react-native-animatable";
import FastImage from "react-native-fast-image";
import { BASE_URL } from "../../config";

const initialProps = {
  item: {},
  t: () => {},
  onPressItem: () => {},
};

export default function UserItem(props = initialProps) {
  const { t, item, onPressItem } = props;

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
      onPress={() => onPressItem(item.id)}
    >
      <View style={styles.avatarContainer}>
        <FastImage
          style={styles.avatar}
          source={{ uri: item.avatar ? BASE_URL.concat(item.avatar) : "" }}
        />
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{item.partnershipName || item.fullname}</Text>
        {item.partnershipType !== "" && (
          <Text style={styles.type}>
            {renderItemType(item.partnershipType)}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
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
});
