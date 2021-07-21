import React from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import SessionUniqueItem from "./SessionUniqueItem";
import Styles from "../session-regular/SessionRegularStyles";
import SessionUniqueItemGrid from "./SessionUniqueItemGrid";

const MODE = {
  GRID: "GRID",
  LIST: "LIST",
};

const ListFooterComponent = () => (
  <View styles={Styles.listFooter}>
    <ActivityIndicator size="large" />
  </View>
);

export default function SessionUniqueList({
  numColumns = 2,
  data = null,
  mode = MODE.GRID,
  loadMore = false,
  refreshing = false,
  onPressItem = () => {},
  onPressItemUser = () => {},
  loadMoreSessionsRegular = () => {},
  refreshSessionsRegular = () => {},
  t = () => {},
  i18n = {}
}) {
  return data ? (
    <FlatList
      key={numColumns}
      numColumns={numColumns}
      data={data.items}
      keyExtractor={(_, index) => `session-unique-item-${index}`}
      renderItem={({ item }) =>
        mode === MODE.GRID ? (
          <SessionUniqueItemGrid
            t={t}
            i18n={i18n}
            session={item}
            onPressItem={() => onPressItem(item)}
          />
        ) : (
          <SessionUniqueItem
            t={t}
            i18n={i18n}
            item={item}
            onPressItem={() => onPressItem(item)}
            onPressItemUser={() => onPressItemUser(item)}
          />
        )
      }
      contentContainerStyle={Styles.listContent}
      contentInsetAdjustmentBehavior="automatic"
      keyboardDismissMode={"none"}
      keyboardShouldPersistTaps={"handled"}
      ItemSeparatorComponent={() => (
        <View style={{ height: 10, backgroundColor: "#F2F2F2" }} />
      )}
      ListFooterComponent={() =>
        loadMore ? (
          <ListFooterComponent
            loadMoreSessionsRegular={loadMoreSessionsRegular}
          />
        ) : null
      }
      ListFooterComponentStyle={loadMore ? Styles.listFooter : null}
      initialNumToRender={10}
      scrollEventThrottle={16}
      onEndReachedThreshold={0.5}
      onEndReached={loadMoreSessionsRegular}
      refreshing={refreshing}
      onRefresh={() => refreshSessionsRegular()}
    />
  ) : null;
}
