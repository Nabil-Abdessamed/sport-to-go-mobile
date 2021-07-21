import React, { useRef } from "react";
import { TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import Video from "react-native-video";
import styles from "./style";
import { BASE_URL } from "@config";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

export default function GalleryItem({ item, showItem }) {
  const navigation = useNavigation();
  const VideoPlayer = useRef();
  const type =
    item && item.filetype && item.filetype.startsWith("image")
      ? "image"
      : "video" || undefined;
  const path = `${BASE_URL}/upload/gallery/${item.file}`;
  return (
    <>
      {type && type === "image" && (
        <TouchableOpacity activeOpacity={0.8} onPress={() => showItem()}>
          <FastImage
            source={{
              uri: path,
              cache: FastImage.cacheControl.immutable,
            }}
            resizeMode={FastImage.resizeMode.cover}
            style={styles.galleryItem}
          />
        </TouchableOpacity>
      )}
      {type && type === "video" && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("GalleryShow", { item })}
          style={styles.videoContainer}
        >
          <Video
            ref={VideoPlayer}
            source={{
              uri: path,
            }}
            style={styles.galleryItem}
            paused={true}
            pointerEvents="none"
            controls={false}
            onLoad={(data) => {
              const seek = data.duration > 5 ? 3 : 1;
              VideoPlayer.current.seek(seek, 50);
            }}
          />
          <MaterialCommunityIcons
            name="play-circle-outline"
            color={"#fff"}
            style={styles.videoIndicator}
            size={64}
          />
        </TouchableOpacity>
      )}
    </>
  );
}
