import React from "react";
import { View, FlatList, Text } from "react-native";
import PostItem from "./item";
import PostItemCheckboard from "./ItemCheckerboard";
import gStyles from "@components/styles";

export default function PostList({
  posts = null,
  mode,
  navigation,
  showItemActions = () => {},
  likePost = () => {},
  sharePost = () => {},
  t = () => {},
  follow = () => {},
  unfollow = () => {},
  refreshing,
  onRefresh = () => {},
}) {
  const numColumns = mode === "GRID" ? 2 : 1;
  return (
    <FlatList
      key={numColumns}
      style={{ flex: 1 }}
      numColumns={numColumns}
      scrollEnabled={true}
      data={posts || []}
      keyExtractor={(_, index) => `post-${index}`}
      refreshing={refreshing}
      onRefresh={onRefresh}
      renderItem={({ item, index }) =>
        mode === "GRID" ? (
          <PostItemCheckboard
            navigation={navigation}
            item={item}
            t={t}
            showItemActions={() => showItemActions(item)}
          />
        ) : (
          <PostItem
            item={item}
            navigation={navigation}
            likePost={() => likePost(item, index)}
            sharePost={() => sharePost(item)}
            follow={follow}
            unfollow={unfollow}
            t={t}
            showItemActions={() => showItemActions(item)}
          />
        )
      }
      contentContainerStyle={{ paddingBottom: 80 }}
      ListHeaderComponent={() => {
        return !posts || (posts && posts.length === 0) ? (
          <View style={gStyles.listHeader}>
            <Text style={gStyles.listHeaderMessageText}>
              {t("common:searchEmpty")}
            </Text>
          </View>
        ) : null;
      }}
    />
  );
}
