import React, { useRef } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { BASE_URL } from "@config";
import styles from "./style";
import { STGColors, STGAvatar } from "stg-ui";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Video from "react-native-video";
import { useNavigation } from "@react-navigation/native";

export default function ItemCheckerboard({ item }) {
  const navigation = useNavigation();
  const videoPlayerRef = useRef();
  const filetype =
    (item && item.filetype && item.filetype.substr(0, 5)) || null;

  return (
    <TouchableOpacity
      style={styles.itemCheckerboardContainer}
      activeOpacity={0.6}
      onPress={() =>
        navigation.navigate("PostDetails", {
          post: item,
          changed: false,
        })
      }
    >
      <View style={styles.itemCheckBoardBody}>
        <View style={styles.userCard}>
          <STGAvatar
            uri={`${BASE_URL}/upload/avatars/${item.userAvatar || ""}`}
            size={32}
          />
          <Text style={styles.userFullname}>{item.partnershipName || ""}</Text>
        </View>
        <Text
          style={styles.postCheckArticleText}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {item.article || ""}
        </Text>
        {filetype === "image" && (
          <FastImage
            source={{
              uri: `${BASE_URL}/upload/posts/${item.image}`,
              cache: FastImage.cacheControl.immutable,
              priority: FastImage.priority.high,
            }}
            style={styles.postItemCheckImage}
          />
        )}
        {filetype === "video" && (
          <View
            style={[
              styles.postItemCheckImage,
              styles.postItemCheckVideo,
              { position: "relative" },
            ]}
          >
            <Video
              source={{ uri: `${BASE_URL}/upload/posts/${item.image}` }}
              style={[styles.postItemCheckImage, { position: "absolute" }]}
              paused={true}
              ref={videoPlayerRef}
              onLoad={(data) => {
                const seek = data.duration / 2;
                videoPlayerRef.current.seek(seek, 50);
              }}
            />
            <MaterialCommunityIcons
              name="play-circle-outline"
              color={"#fff"}
              size={48}
            />
          </View>
        )}
        <View style={styles.postCheckActionGroup}>
          <View style={styles.postCheckAction}>
            <Text style={styles.postCheckActionText}>
              {Number(item.likesCount) > 0 ? item.likesCount : ""}
            </Text>
            <AntDesign
              name={Number(item.liked) > 0 ? "heart" : "hearto"}
              size={12}
              color={STGColors.container}
            />
          </View>
          <View style={styles.postCheckAction}>
            <Text style={styles.postCheckActionText}>
              {Number(item.commentsCount) > 0 ? item.commentsCount : ""}
            </Text>
            <MaterialCommunityIcons
              name={
                Number(item.commentsCount) > 0 ? "comment" : "comment-outline"
              }
              size={12}
              color={STGColors.container}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
