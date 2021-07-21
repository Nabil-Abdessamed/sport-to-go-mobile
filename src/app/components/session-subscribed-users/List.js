import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet, View } from "react-native";
import UserItem from "./UserItem";

const initialProps = {
  data: [],
};

export default function SessionSubscribedUsers(props = initialProps) {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const onPressItem = (user) => {
    navigation.navigate("ProfileShow", { user });
  };

  return (
    <FlatList
      data={props.data}
      keyExtractor={(_, key) => `session-subscribed-user-${key}`}
      renderItem={({ item }) => <UserItem item={item} t={t} onPressItem={onPressItem} />}
      ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
    />
  );
}

const styles = StyleSheet.create({
  itemSeparator: {
    height: 5,
    backgroundColor: "#F2F2F2",
  },
});
