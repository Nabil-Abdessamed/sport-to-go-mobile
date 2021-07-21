import React, { useEffect } from "react";
import { View, FlatList } from "react-native";
import { STGContainer } from "stg-ui";
import { getUsersAction } from "@redux/actions";
import { getUsersService } from "@services";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import UserItem from "./Item";

export default function ChatUsers() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // Props from Redux
  const { users } = useSelector((state) => state.chat, shallowEqual);

  const getUsers = async () => {
    const { data, status } = await getUsersService();
    if (status === 200) {
      dispatch(getUsersAction(data));
    } else {
      dispatch(getUsersAction([]));
    }
  };

  const onPressItem = (item) => {
    navigation.navigate("MessageScreen", {
      item,
      from: "users"
    });
  };

  useEffect(() => {
    const willFocusEvent = navigation.addListener("focus", () => {
      getUsers();
    });
    return willFocusEvent;
  }, []);

  return (
    <STGContainer>
      <FlatList
        scrollEnabled
        data={users}
        keyExtractor={(_, index) => `user-index-${index}`}
        renderItem={({ item }) => (
          <UserItem item={item} onPressItem={() => onPressItem(item)} t={t} />
        )}
        ItemSeparatorComponent={() => <View style={{ marginVertical: 5 }} />}
        contentContainerStyle={{ paddingTop: 10 }}
      />
    </STGContainer>
  );
}
