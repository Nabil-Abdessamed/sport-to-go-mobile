import React, { useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { useSelector, shallowEqual } from "react-redux";
import { useTranslation } from "react-i18next";
import styles from "./style";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { BASE_URL } from "@config";
import { colors } from "@constants";
import { STGColors, STGImageZoom, STGAvatar } from "stg-ui";
import Styles from "../styles";
import FastImage from "react-native-fast-image";
import Video from "react-native-video";
import { useNavigation } from "@react-navigation/native";

export default function PostItem({
  item,
  likePost,
  follow,
  unfollow,
  showItemActions,
}) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth, shallowEqual);
  const videoPlayerRef = useRef();
  const filetype =
    (item && item.filetype && item.filetype.substr(0, 5)) || null;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("PostDetails", {
          post: item,
          changed: false,
        })
      }
      activeOpacity={1}
    >
      <TouchableWithoutFeedback>
        <View style={styles.userActions}>
          <View style={styles.itemHeader}>
            <TouchableOpacity
              onPress={() => {
                Number(item.userId) === Number(user.id)
                  ? navigation.navigate("MySpace")
                  : navigation.navigate("ProfileShow", {
                      user: item.userId,
                    });
              }}
              style={Styles.userContainer}
            >
              <STGAvatar
                uri={`${BASE_URL}/upload/avatars/${item.userAvatar || ""}`}
              />
              <Text
                ellipsizeMode={"tail"}
                numberOfLines={1}
                style={Styles.userFullname}
              >
                {item.partnershipName || item.userFullname}
              </Text>
            </TouchableOpacity>
            {Number(item.owner) === 0 && Number(item.followed) === 0 && (
              <TouchableOpacity
                style={Styles.followBtn}
                onPress={() => follow(item.userId)}
              >
                <SimpleLineIcons name="user-follow" size={24} />
              </TouchableOpacity>
            )}
            {Number(item.owner) === 0 && Number(item.followed) > 0 && (
              <TouchableOpacity
                style={[Styles.followBtn, Styles.followBtnFollowed]}
                onPress={() => unfollow(item.userId)}
              >
                <SimpleLineIcons name="user-following" size={24} />
              </TouchableOpacity>
            )}
          </View>
          {Number(item.owner) === 1 && (
            <TouchableOpacity
              onPress={showItemActions}
              style={styles.itemOptions}
            >
              <MaterialCommunityIcons name="dots-vertical" size={28} />
            </TouchableOpacity>
          )}
        </View>
      </TouchableWithoutFeedback>
      <Text
        ellipsizeMode={"tail"}
        numberOfLines={3}
        style={Styles.detailsItemDescription}
      >
        {item.article}
      </Text>
      {item.image && filetype === "image" && (
        <STGImageZoom
          uri={`${BASE_URL}/upload/posts/${item.image}`}
          withZoom={false}
        />
      )}
      {item.image &&
        filetype === "video" &&
        (Platform.OS === "android" ? (
          <View style={Styles.androidPostVideoPoster}>
            <FastImage
              source={{ uri: `${BASE_URL}/upload/posts/${item.image}` }}
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
            style={[Styles.androidPostVideoPoster, { backgroundColor: "#000" }]}
          >
            <Video
              source={{ uri: `${BASE_URL}/upload/posts/${item.image}` }}
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
      <View style={{ flexDirection: "row" }}>
        {Number(item.likesCount) > 0 && (
          <View style={styles.postItemActionInfo}>
            <Text style={styles.postItemActionInfoText}>{item.likesCount}</Text>
            <AntDesign name="heart" size={12} color={colors.background} />
            <View style={{ flex: 1, flexDirection: "row" }} />
          </View>
        )}
        {Number(item.commentsCount) > 0 && (
          <View style={{ ...styles.postItemActionInfo, marginLeft: 20 }}>
            <Text style={styles.postItemActionInfoText}>
              {item.commentsCount}
            </Text>
            <MaterialCommunityIcons
              name="comment"
              size={12}
              color={STGColors.container}
            />
            <View style={{ flex: 1, flexDirection: "row" }} />
          </View>
        )}
      </View>
      <TouchableWithoutFeedback>
        <View style={styles.postItemAction}>
          <TouchableOpacity
            style={styles.postItemActionBtn}
            onPress={() => likePost()}
          >
            <AntDesign
              name={Number(item.liked) > 0 ? "heart" : "hearto"}
              size={20}
              color={STGColors.container}
            />
            <Text style={styles.postItemActionBtnText}>{t("post:like")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.postItemActionBtn}
            onPress={() =>
              navigation.navigate("PostDetails", {
                post: item,
                comment: true,
              })
            }
          >
            <MaterialCommunityIcons
              name="comment-outline"
              size={20}
              color={STGColors.container}
            />
            <Text style={styles.postItemActionBtnText}>
              {t("post:comment")}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </TouchableOpacity>
  );
}
