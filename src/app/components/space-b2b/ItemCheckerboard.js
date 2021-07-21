import React, { useRef } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { BASE_URL } from "@config";
import styles from "../post/style";
import b2bStyles from "./Styles";
import { STGColors, STGAvatar } from "stg-ui";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Video from "react-native-video";

export default function ItemCheckerboard({
  item,
  onPressItem,
  onPressActions,
  t,
}) {
  const videoPlayerRef = useRef();
  const filetype =
    (item && item.filetype && item.filetype.substr(0, 5)) || null;

  return (
    <TouchableOpacity
      style={styles.itemCheckerboardContainer}
      activeOpacity={0.8}
      onPress={onPressItem}
      onLongPress={onPressActions}
    >
      <View style={styles.itemCheckBoardBody}>
        <View style={styles.userCard}>
          <STGAvatar
            uri={`${BASE_URL}/upload/avatars/${item.avatar || ""}`}
            size={32}
          />
          <Text style={styles.userFullname}>{item.partnershipName || ""}</Text>
        </View>
        {item.type !== "" && (
          <Text style={b2bStyles.type} numberOfLines={2} ellipsizeMode="tail">
            {t(`b2b:${item.type.toLowerCase()}`)}
          </Text>
        )}
        {item.description !== "" && (
          <Text
            style={styles.postCheckArticleText}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {item.description}
          </Text>
        )}
        {filetype === "image" && (
          <FastImage
            source={{
              uri: `${BASE_URL}/upload/b2b/${item.file}`,
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
              source={{ uri: `${BASE_URL}/upload/b2b/${item.file}` }}
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
              style={styles.videoIndicator}
              size={48}
            />
          </View>
        )}
        <View style={styles.postCheckActionGroup}>
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
