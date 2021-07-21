import React, { useRef } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import styles from "./Styles";
import { STGAvatar, STGImageZoom, STGColors, STGImage } from "stg-ui";
import * as Animatable from "react-native-animatable";
import { BASE_URL } from "@config";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Styles from "../styles";
import FastImage from "react-native-fast-image";
import Video from "react-native-video";

export default function Item({
  item,
  onPressItem,
  onPressActions,
  onPressUser,
  t,
}) {
  const videoPlayerRef = useRef();
  const filetype =
    (item && item.filetype && item.filetype.substr(0, 5)) || null;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPressItem}
      onLongPress={onPressActions}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={onPressUser}
          style={{ flexDirection: "row", flex: 1 }}
        >
          <STGAvatar uri={`${BASE_URL}/upload/avatars/${item.avatar}`} />
          <View style={styles.userInfo}>
            <Text style={styles.userTitleOne}>{item.partnershipName}</Text>
            <Text style={styles.userTitleTwo}>{item.partnershipType}</Text>
          </View>
        </TouchableOpacity>
        {item.owner === "1" && (
          <TouchableOpacity
            style={styles.headerActions}
            onPress={onPressActions}
          >
            <MaterialCommunityIcons name="dots-vertical" size={28} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.body}>
        {item.type !== "" && (
          <Animatable.Text
            style={styles.type}
            numberOfLines={6}
            ellipsizeMode={"tail"}
          >
            {t(`b2b:${item.type.toLowerCase()}`)}
          </Animatable.Text>
        )}
        {item.description !== "" && (
          <Animatable.Text
            style={styles.text}
            numberOfLines={6}
            ellipsizeMode={"tail"}
          >
            {item.description}
          </Animatable.Text>
        )}
        {item.file && filetype === "image" && (
          <View style={{ marginVertical: 10 }}>
            <STGImage
              zoom={true}
              data={{
                uri: `${BASE_URL}/upload/b2b/${item.file}`,
                height: item.fileHeight,
                width: item.fileWidth,
                isVertical: item.fileIsVertical,
              }}
            />
          </View>
        )}

        {item.file &&
          filetype === "video" &&
          (Platform.OS === "android" ? (
            <View style={Styles.androidPostVideoPoster}>
              <FastImage
                source={{ uri: `${BASE_URL}/upload/b2b/${item.file}` }}
                withZoom={false}
                style={Styles.androidPostVideoPosterImage}
              />
              <MaterialCommunityIcons
                name="play-circle-outline"
                color={"#fff"}
                style={Styles.videoIndicator}
                size={64}
              />
            </View>
          ) : (
            <View
              style={[
                Styles.androidPostVideoPoster,
                { backgroundColor: "#000" },
              ]}
            >
              <Video
                source={{ uri: `${BASE_URL}/upload/b2b/${item.file}` }}
                style={Styles.androidPostVideoPosterImage}
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
                style={Styles.videoIndicator}
                size={64}
              />
            </View>
          ))}
      </View>
      {Number(item.commentsCount) > 0 && (
        <View style={styles.footer}>
          <Text style={styles.commentsCount}>{item.commentsCount}</Text>
          <MaterialCommunityIcons
            name="comment"
            size={18}
            color={STGColors.container}
          />
        </View>
      )}
    </TouchableOpacity>
  );
}
