import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
  Linking,
} from "react-native";
import { STGContainer, STGAvatar, STGPictoMap, STGFullMap } from "stg-ui";
import styles from "./style";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "@config";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import {
  getGalleryItemsService,
  getUserProfileService,
  followUserService,
  unfollowUserService,
} from "@services";
import GalleryItem from "@components/my-space/gallery-item";
import { useNavigation, useRoute } from "@react-navigation/native";
import _ from "lodash";

export default function ProfileShow() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { params } = useRoute();
  // States
  const [user, setUser] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [items, setItmes] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUserInfo = async (userId) => {
    setLoading(true);
    const { data, status } = await getUserProfileService(userId);
    setLoading(false);
    if (status === 200) {
      setUser(data);
    } else {
      setUser(null);
      navigation.goBack();
    }
  };

  const getConversation = async (reciever) => {
    navigation.navigate("MessageScreen", {
      item: reciever,
      from: "ProfileShow",
    });
  };

  const showUserPosts = (user) => {
    const postParams = {
      mode: "USER_POST",
      user,
    };
    navigation.navigate("Post", {
      screen: "Post",
      params: postParams,
    });
  };

  const showUserSessions = (user) => {
    const sessionParams = {
      mode: "USER_SESSIONS",
      user,
    };
    navigation.navigate("SessionUser", {
      ...sessionParams,
    });
  };

  const getGalleryItems = async (user) => {
    const { status, data } = await getGalleryItemsService(user);
    if (status === 200) {
      setItmes(data);
    } else {
      setItmes([]);
    }
  };

  const follow = async () => {
    const { status } = await followUserService(user.id);
    if (_.inRange(status, 200, 300)) {
      getUserInfo(user.id);
    } else {
      Alert.alert("Oops !", t("proSpace:followError"));
    }
  };

  const unfollow = async () => {
    const { status } = await unfollowUserService(user.id);
    if (_.inRange(status, 200, 300)) {
      getUserInfo(user.id);
    } else {
      Alert.alert("Oops !", t("proSpace:unfollowError"));
    }
  };

  const handleShowMap = () => {
    setShowMap(true);
  };

  const handleHideMap = () => {
    setShowMap(false);
  };

  const renderProfileBody = (user) => (
    <View
      style={{
        backgroundColor: "white",
        marginBottom: 20,
        paddingVertical: 20,
        paddingHorizontal: 5,
        paddingBottom: 80,
      }}
    >
      <View style={styles.firstItem}>
        <STGAvatar
          uri={`${BASE_URL}/upload/avatars/${user.avatar}`}
          size={120}
        />
        {user.type === "PRO" && (
          <Text style={styles.userSCorporateName}>{user.partnershipName}</Text>
        )}
        {user.type === "PARTICULAR" && (
          <Text style={styles.userSCorporateName}>{user.fullname}</Text>
        )}
        {user.description && user.description !== "" && (
          <Text style={styles.userFullname}>{user.description}</Text>
        )}
        {user.type === "PRO" && (
          <TouchableOpacity
            style={[
              styles.follow,
              Number(user.follow) === 1 ? styles.followed : {},
            ]}
            onPress={Number(user.follow) === 0 ? follow : unfollow}
          >
            <Text
              style={[
                styles.followText,
                Number(user.follow) === 1 ? styles.followedText : {},
              ]}
            >
              {Number(user.follow) === 1
                ? t("common:followed")
                : t("common:follow")}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {typeof user.email === "string" && user.email !== "" && (
        <View style={styles.item}>
          <MaterialIcons name="email" size={20} style={{ marginRight: 5 }} />
          <Text style={styles.itemText}>{user.email}</Text>
        </View>
      )}
      {typeof user.phone === "string" && user.phone !== "" && (
        <View style={styles.item}>
          <MaterialIcons name="phone" size={20} style={{ marginRight: 5 }} />
          <Text style={styles.itemText}>{user.phone}</Text>
        </View>
      )}
      {typeof user.country === "string" && user.country !== "" && (
        <View style={styles.item}>
          <MaterialIcons name="place" size={20} style={{ marginRight: 5 }} />
          <Text style={styles.itemText}>{`${t("common:country")}: ${
            user.country
          }`}</Text>
        </View>
      )}
      {typeof user.city === "string" && user.city !== "" && (
        <View style={styles.item}>
          <MaterialIcons name="place" size={20} style={{ marginRight: 5 }} />
          <Text style={styles.itemText}>{`${t("common:city")}: ${
            user.city
          }`}</Text>
        </View>
      )}
      {typeof user.address === "string" && user.address !== "" && (
        <View style={styles.item}>
          <MaterialIcons name="place" size={20} style={{ marginRight: 5 }} />
          <Text style={styles.itemText}>{`${t("common:address")}: ${
            user.address
          }`}</Text>
        </View>
      )}
      {typeof user.postalCode === "string" && user.postalCode !== "" && (
        <View style={styles.item}>
          <MaterialIcons name="place" size={20} style={{ marginRight: 5 }} />
          <Text style={styles.itemText}>{`${t("common:postalCode")}: ${
            user.postalCode
          }`}</Text>
        </View>
      )}
      {typeof user.website === "string" && user.website !== "" && (
        <TouchableOpacity
          style={styles.item}
          onPress={() => Linking.openURL(`http://${user.website}`)}
        >
          <MaterialCommunityIcons
            name="web"
            size={20}
            style={{ marginRight: 5 }}
          />
          <Text style={styles.itemText}>{`${user.website}`}</Text>
        </TouchableOpacity>
      )}
      {user && user.latitude && user.longitude && (
        <STGPictoMap
          regionLatitude={user.latitude}
          regionLongitude={user.longitude}
          latitude={user.latitude}
          longitude={user.longitude}
          onPressFullscreen={handleShowMap}
        />
      )}
      {user.type === "PRO" && (
        <>
          <TouchableOpacity
            style={{ ...styles.item, ...styles.link }}
            onPress={() => showUserPosts(user)}
          >
            <Text style={styles.itemText}>{t("profileShow:showPosts")}</Text>
            <Entypo name="chevron-right" size={18} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.item, ...styles.link }}
            onPress={() => showUserSessions(user)}
          >
            <Text style={styles.itemText}>{t("profileShow:showSessions")}</Text>
            <Entypo name="chevron-right" size={18} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );

  useEffect(() => {
    const u = (params && params.user) || null;
    if (u) {
      getUserInfo(u);
      getGalleryItems(u);
    }
  }, []);

  return (
    <>
      <STGContainer loading={loading}>
        {user && (
          <FlatList
            ListHeaderComponent={() =>
              (user && renderProfileBody(user)) || null
            }
            numColumns={2}
            contentInsetAdjustmentBehavior="automatic"
            keyboardDismissMode={"none"}
            keyboardShouldPersistTaps={"handled"}
            contentContainerStyle={{ paddingVertical: 20, paddingBottom: 80 }}
            data={items}
            keyExtractor={(_, index) => `gallery-item-${index}`}
            renderItem={({ item }) => (
              <GalleryItem
                item={item}
                navigation={navigation}
                showItem={() => navigation.navigate("GalleryShow", { item })}
              />
            )}
          />
        )}
        <TouchableOpacity
          style={styles.chatBtn}
          onPress={() => getConversation(user)}
        >
          <MaterialIcons name="chat" size={24} />
        </TouchableOpacity>
      </STGContainer>
      {user && user.latitude && user.longitude && (
        <STGFullMap
          show={showMap}
          hideMap={handleHideMap}
          regionLatitude={user.latitude}
          regionLongitude={user.longitude}
          markers={[
            {
              latitude: user.latitude,
              longitude: user.longitude,
            },
          ]}
        />
      )}
    </>
  );
}
