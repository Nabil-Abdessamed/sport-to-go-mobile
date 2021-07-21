import React, { useState, useEffect } from "react";
import { View, FlatList, Text, ActivityIndicator } from "react-native";
import { useTranslation } from "react-i18next";
import { useSelector, shallowEqual } from "react-redux";
import SessionItem from "./item";
import ItemCheckerboard from "./ItemCheckerboard";
import Styles from "../styles";
import Constants from "./Constants";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function SessionsList({
  numColumns,
  sessions,
  mode,
  subscribeToSession,
  unSubscribeToSession,
  getSessions,
  showItemOptions,
  isRefreshing,
  onRefresh,
  loadMoreSessions,
  isInfiniteScroll,
}) {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  return (
    <FlatList
      ListHeaderComponent={() => {
        return sessions.length === 0 ? (
          <View style={Styles.listHeader}>
            <Text style={Styles.listHeaderMessageText}>
              {t("common:searchEmpty")}
            </Text>
          </View>
        ) : null;
      }}
      ListFooterComponent={() =>
        isInfiniteScroll ? (
          <View style={Styles.listFooter}>
            <ActivityIndicator size="large" />
          </View>
        ) : null
      }
      key={numColumns}
      numColumns={numColumns}
      contentInsetAdjustmentBehavior="automatic"
      keyboardDismissMode={"none"}
      keyboardShouldPersistTaps={"handled"}
      data={sessions}
      keyExtractor={(_, index) => `session-key-${index}`}
      renderItem={({ item }) =>
        mode === Constants.List ? (
          <SessionItem
            language={i18n.language}
            item={item}
            navigation={navigation}
            subscribeToSession={subscribeToSession}
            unSubscribeToSession={unSubscribeToSession}
            onEdit={getSessions}
            onDelete={getSessions}
            showOptions={() => showItemOptions(item)}
          />
        ) : (
          <ItemCheckerboard
            item={item}
            navigation={navigation}
            onEdit={getSessions}
            onDelete={getSessions}
          />
        )
      }
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      scrollEventThrottle={16}
      onEndReachedThreshold={0.5}
      onEndReached={() => {
        loadMoreSessions();
      }}
    />
  );
}
