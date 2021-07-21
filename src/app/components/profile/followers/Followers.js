import React from "react";
import { Alert, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { STGContainer } from "stg-ui";
import FollowerItem from "./Item";
import { getUserFollowersService, unfollowUserService } from "@services";
import { useTranslation } from "react-i18next";

export default function UserFollowers() {
  const { t } = useTranslation();
  const { params } = useRoute();
  const navigation = useNavigation();
  const [data, setData] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const getUserFollowers = async (userId) => {
    setRefreshing(true);
    const { data, status } = await getUserFollowersService(userId);
    setData(status === 200 ? data : []);
    setRefreshing(false);
  };

  const remove = async (userId) => {
    setRefreshing(true);
    const { status } = await unfollowUserService(userId);
    if (status < 300) {
      getUserFollowers(userId);
    } else {
      Alert.alert("Oops !", t("proSpace:unfollowError"));
    }
    setRefreshing(false);
  };

  const onPressRemove = async (item) => {
    Alert.alert(
      t("followers:removeTitle"),
      t("followers:removeMessage").replace("$1", item.name),
      [
        {
          text: t("followers:removeButtonDone"),
          onPress: () => remove(item.userId),
          style: "destructive",
        },
        { text: t("common:cancel"), style: "cancel" },
      ]
    );
  };

  const onPressUser = (userId) => {
    navigation.navigate("ProfileShow", { user: userId });
  };

  React.useEffect(() => {
    if (params && params.userId) {
      getUserFollowers(params.userId);
    }
  }, []);

  return (
    <STGContainer>
      <FlatList
        keyExtractor={(_, index) => `user-follower-index-${index}`}
        data={data}
        renderItem={({ item }) => (
          <FollowerItem data={item} t={t} onPressRemove={onPressRemove} onPressUser={onPressUser} />
        )}
        refreshing={refreshing}
        onRefresh={() => getUserFollowers(params.userId)}
      />
    </STGContainer>
  );
}
