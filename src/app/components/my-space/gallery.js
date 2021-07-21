import React from "react";
import { FlatList } from "react-native";
import { GalleryItem } from "./gallery-item";

export default function Gallery() {
  return (
    <FlatList
      numColumns={2}
      scrollEnabled={false}
      contentInsetAdjustmentBehavior="automatic"
      keyboardDismissMode={"none"}
      keyboardShouldPersistTaps={"handled"}
      data={[]}
      keyExtractor={(_, index) => `gallery-item-${index}`}
      renderItem={({ item }) => (
        <GalleryItem item={item} navigation={navigation} />
      )}
    />
  );
}
