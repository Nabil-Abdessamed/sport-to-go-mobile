import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import styles from "./style";
import { useTranslation } from "react-i18next";
import { useSelector, shallowEqual } from "react-redux";
import { BASE_URL } from "@config";
import { STGContainer, STGAvatar } from "stg-ui";
import IconEntypo from "react-native-vector-icons/Entypo";
import GalleryItem from "./gallery-item";
import {
  getGalleryItemsService,
  getUserFollowersCountService,
} from "@services";
import { useNavigation } from "@react-navigation/native";

const Item = ({ text, onPress }) => (
  <View style={styles.card}>
    <TouchableOpacity style={styles.item} activeOpacity={0.8} onPress={onPress}>
      <Text ellipsizeMode={"tail"} numberOfLines={2} style={styles.itemText}>
        {text || ""}
      </Text>
      <MaterialIcons name={"navigate-next"} size={22} />
    </TouchableOpacity>
  </View>
);

export default function MySpace() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  // Props from Redux
  const { user } = useSelector((state) => state.auth, shallowEqual);
  // States
  const [items, setItems] = useState();
  const [follwersCount, setFollwersCount] = useState(0);

  const getGalleryItems = async () => {
    const { status, data } = await getGalleryItemsService(user.id);
    if (status === 200) {
      setItems(data);
    } else {
      setItems([]);
    }
  };

  const getUserFollowersCount = async () => {
    const { status, data } = await getUserFollowersCountService(user.id);
    setFollwersCount(status === 200 ? data : 0);
  };

  const renderMySpaceBody = () => (
    <View
      style={{
        marginBottom: 20,
        paddingHorizontal: 10,
      }}
    >
      <View
        style={{
          ...styles.card,
          paddingVertical: 32,
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View style={styles.avatarContainer}>
            <STGAvatar
              uri={`${BASE_URL}/upload/avatars/${user.avatar}`}
              size={80}
            />
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.fullname}>{user.fullname}</Text>
            <Text style={styles.partnershipName}>{user.partnershipName}</Text>
          </View>
        </View>
        {user.description !== "" && (
          <Text
            style={styles.description}
            ellipsizeMode="tail"
            numberOfLines={2}
          >
            {user.description}
          </Text>
        )}
      </View>
      {follwersCount > 0 && (
        <Item
          text={`${follwersCount} ${t("followers:followers")}`}
          onPress={() =>
            navigation.navigate("UserFollowers", { userId: user.id })
          }
        />
      )}
      <Item
        text={t("mySpace:linkPersonalInfo")}
        onPress={() => navigation.navigate("Profile")}
      />
      {user.type === "PRO" && (
        <Item
          text={t("mySpace:linkProfessionalInfo")}
          onPress={() => navigation.navigate("Structure")}
        />
      )}
      {user.type === "PRO" && user.registrationType === "PAID" && (
        <Item
          text={t("mySpace:myContracts")}
          onPress={() => navigation.navigate("Contracts")}
        />
      )}
      <Item
        text={t("mySpace:changeMyPassword")}
        onPress={() => navigation.navigate("ChangePassword")}
      />
    </View>
  );

  useEffect(() => {
    const willFocusEvent = navigation.addListener("focus", () => {
      getGalleryItems();
      getUserFollowersCount();
    });
    return willFocusEvent;
  }, []);

  return (
    <STGContainer>
      <FlatList
        ListHeaderComponent={() => renderMySpaceBody()}
        numColumns={2}
        contentInsetAdjustmentBehavior="automatic"
        keyboardDismissMode={"none"}
        keyboardShouldPersistTaps={"handled"}
        data={items}
        keyExtractor={(_, index) => `gallery-item-${index}`}
        renderItem={({ item }) => (
          <GalleryItem
            item={item}
            navigation={navigation}
            showItem={() => navigation.navigate("GalleryShow", { item })}
          />
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
      <TouchableOpacity
        style={styles.btnAdd}
        onPress={() => navigation.navigate("GalleryCreate")}
      >
        <IconEntypo name="plus" size={30} />
      </TouchableOpacity>
    </STGContainer>
  );
}
