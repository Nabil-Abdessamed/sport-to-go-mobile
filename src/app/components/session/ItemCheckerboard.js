import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import FastImage from "react-native-fast-image";
import { BASE_URL } from "@config";
import { STGFonts, STGColors, STGAvatar } from "stg-ui";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const itemCheckerboardContainerWidth = width / 2;
const itemCheckerboardBodyWidth = width / 2 - 10;

export default function ItemCheckerboard({ item }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={() =>
        navigation.navigate("SessionDetails", {
          session: { ...item },
        })
      }
    >
      <View style={styles.body}>
        <View style={styles.user}>
          <STGAvatar
            uri={`${BASE_URL}/upload/avatars/${item.userAvatar}`}
            size={32}
          />
          <Text
            style={styles.userFullname}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {item.partnershipName || item.userFullname}
          </Text>
        </View>
        <Text style={styles.sport}>{item.sport}</Text>
        {item && item.image && (
          <FastImage
            source={{
              uri: `${BASE_URL}/upload/sessions/${item.image}`,
              cache: FastImage.cacheControl.immutable,
            }}
            resizeMode={FastImage.resizeMode.cover}
            style={styles.image}
          />
        )}
        <View style={styles.priceContainter}>
          <Text style={styles.price}>{`${Number(item.price).toFixed(
            2
          )} €`}</Text>
        </View>
      </View>
      {Number(item.subscribed) === 1 && (
        <MaterialCommunityIcons
          name="bookmark-check"
          color={STGColors.container}
          size={48}
          style={styles.itemSubscribed}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: itemCheckerboardContainerWidth,
    padding: 5,
    alignItems: "center",
  },
  body: {
    width: itemCheckerboardBodyWidth,
    borderWidth: 0.2,
    borderColor: "rgba(0,0,0,0.2)",
    padding: 2,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderColor: "rgba(0,0,0,0.6)",
    borderWidth: 0.5,
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
  },
  userFullname: {
    fontFamily: STGFonts.RobotoMedium,
    paddingHorizontal: 10,
  },
  sport: {
    fontFamily: STGFonts.RobotoBold,
    marginVertical: 10,
  },
  priceContainter: {
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderTopColor: "rgba(0,0,0,0.2)",
    borderTopWidth: 0.5,
  },
  price: {
    fontFamily: STGFonts.RobotoBold,
    fontSize: 18,
  },
  image: {
    width: itemCheckerboardBodyWidth,
    height: itemCheckerboardBodyWidth,
    alignSelf: "center",
  },
  itemSubscribed: {
    position: "absolute",
    top: 0,
    right: 0,
  },
});
